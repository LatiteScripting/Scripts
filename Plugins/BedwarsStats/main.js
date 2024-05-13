"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("./stats");
const text3d_1 = require("./text3d");
const http = require("http");
let inBedWarsLobby = false;
let allStats = [];
let currentGame = "";
let cancelCommandMessages = false;
client.on("render3d", () => {
    if (!inBedWarsLobby) {
        allStats = [];
        return;
    }
    (0, text3d_1.drawText3D)("Top 3 Players In Your Lobby", 21.5, 23.5, -20, Color.WHITE, 2 /* Facing.South */, 0.1, true);
    if (allStats.length > 0)
        (0, text3d_1.drawText3D)(allStats[0].toString(), 19 + (0, text3d_1.textWidth)(allStats[0].toString(), 0.05), 23, -20, Color.WHITE, 2 /* Facing.South */, 0.05, true);
    if (allStats.length > 1)
        (0, text3d_1.drawText3D)(allStats[1].toString(), 21 + (0, text3d_1.textWidth)(allStats[0].toString(), 0.05), 23, -20, Color.WHITE, 2 /* Facing.South */, 0.05, true);
    if (allStats.length > 2)
        (0, text3d_1.drawText3D)(allStats[2].toString(), 17 + (0, text3d_1.textWidth)(allStats[0].toString(), 0.05), 23, -20, Color.WHITE, 2 /* Facing.South */, 0.05, true);
});
client.on("change-dimension", () => {
    if (dimension.getName() == "Overworld") {
        game.executeCommand("/connection");
        cancelCommandMessages = true;
        setTimeout(() => { cancelCommandMessages = false; }, 300);
    }
});
client.on("receive-chat", (params) => {
    let msg = params.message;
    if (cancelCommandMessages && msg.startsWith("You are connected to"))
        params.cancel = true;
    if (msg.startsWith("You are connected to server name")) {
        msg.startsWith("You are connected to server name BED") ? inBedWarsLobby = true : inBedWarsLobby = false;
        if (!inBedWarsLobby)
            return;
        if (currentGame == msg) {
            inBedWarsLobby = false;
            return;
        }
        currentGame = msg;
        setTimeout(() => {
            world.getPlayers().forEach((player) => {
                var _a;
                if (player != ((_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.getName())) {
                    getStats(player);
                }
            });
        }, 300);
    }
    //handle player join game
    else if (msg.includes(" joined. ") && inBedWarsLobby) {
        //msg = msg.replace(/§./g, "")
        let player = msg.split(" joined.")[0].split(" ").slice(1).join(" ");
        player = player.slice(4, player.length);
        getStats(player);
    }
});
function getStats(player) {
    http.getAsync(`https://api.playhive.com/v0/game/all/wars/${player}`, {}, (resp) => {
        let stats = null;
        try {
            stats = parseWarsStats(player, util.bufferToString(resp.body));
        }
        catch (e) {
            client.showNotification("Failed to get stats for " + player + " " + resp.statusCode);
        }
        if (stats) {
            allStats.push(stats);
            allStats.sort((a, b) => b.kd - a.kd);
        }
    });
}
function parseWarsStats(name, data) {
    let statObj = new stats_1.stats(name, 0, 0, 0, 0, 0, 0, 0);
    data.split(",").forEach((line) => {
        // clean up the line
        let key = line.split(":")[0].replace("{", "").replace("}", "").replace(/\"/g, "");
        let value = line.split(":")[1].replace("{", "").replace("}", "").replace(/\"/g, "");
        switch (key) {
            case "played":
                statObj.gamesPlayed = parseInt(value);
                break;
            case "victories":
                statObj.gamesWon = parseInt(value);
                break;
            case "final_kills":
                statObj.finalKills = parseInt(value);
                break;
            case "kills":
                statObj.kills = parseInt(value);
                break;
            case "deaths":
                statObj.deaths = parseInt(value);
                break;
        }
    });
    statObj.kd = statObj.kills / statObj.deaths;
    statObj.winloss = statObj.gamesWon / statObj.gamesPlayed * 100;
    return statObj;
}
