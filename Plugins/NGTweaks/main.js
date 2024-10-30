/// <reference types="..\\node_modules\\@latitescripting\\latiteapi\\definitions"/>
// @ts-check
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const mod = new Module("ngtweaks", "NG Tweaks", "NetherGames Tweaks", 0);


const http = require("http");
const Globals = require("./globals.js");


var cacheOwnStats = mod.addBoolSetting("cacheOwnStats", "Cache Own Stats", "Cache your own stats", true);
var maxCacheTime = mod.addNumberSetting("maxCacheTime", "Max Cache Time (mins)", "Max time (in mins) before cached stats are refreshed", 1, 60, 1, 30);
var showLevel = mod.addBoolSetting("showLevel", "Show Level", "Show level", true);
var showTier = mod.addBoolSetting("showTier", "Show Tier", "Show tier", true);
var showRank = mod.addBoolSetting("showRank", "Show Rank", "Show rank", true);
var showGuild = mod.addBoolSetting("showGuild", "Show Guild", "Show guild", true);
var showKDR = mod.addBoolSetting("showKDR", "Show KDR", "Show KDR", true);


var playerCache = {};


function getTeam(teamColor, playerCount) {
    if (Globals.acceptablePlayerCounts.includes(Number(
        playerCount.substring(playerCount.indexOf('/') + 3, playerCount.length - 3)
    ))) {
        const color = teamColor.charAt(1);
        if (!Globals.teamColors[color]) {
            return teamColor
        } else {
            return `\u00A7${color}\u00A7l${Globals.teamColors[color]} \u00A7r\u00A7${color}`
        }
    } else {
        return teamColor
    }
}

function getPrintStr(name, team, playerCount, extra) {
    if (playerCache[name]["nicked"]) {
        return `${getTeam(team, playerCount)}${name} \u00A7ehas joined ${playerCount}! \u00A7r\u00A7cNicked\u00A7r${extra}`
    } else {
        var printStr = '';
        if (showLevel.getValue()) {
            printStr += playerCache[name]["level"] + ' ';
        }
        if (showTier.getValue() && playerCache[name]["tier"]) {
            printStr += Globals.tierUnicodes[playerCache[name]["tier"].toLowerCase()];
        }
        if (showRank.getValue() && playerCache[name]["ranks"].length > 0) {
            printStr += Globals.rankUnicodes[playerCache[name]["ranks"][0].toLowerCase()];
        }
        if (showTier.getValue() || showRank.getValue()) {
            printStr += ' ';
        }
        printStr += getTeam(team, playerCount) + name + '\u00A7r ';
        if (showGuild.getValue()) {
            printStr += playerCache[name]["guild"] + ' ';
        }
        if (showKDR.getValue()) {
            printStr += `(${playerCache[name]["kdr"]}) `;
        }
        printStr += `\u00A7ehas joined ${playerCount}!${extra}`;
        return printStr;
    }
}



client.on("receive-chat", (event) => {

    // if (mod.isEnabled()) {
    if (true) {

        // if (world.getName().toLowerCase().includes("nethergames")) {
        if (world.getName().toLowerCase().includes("nethergames") || !game.getServer()) {

            const mesg = Globals.fixFormat(event.message);
            const startIndex = mesg.indexOf(" \u00A7ehas joined ");

            if (startIndex != -1) {

                event.cancel = true;

                const start_time = Date.now();

                const teamColor = mesg.substring(0, 2);
                const playerName = mesg.substring(2, startIndex);
                const playerCount = "\u00A7e" + mesg.substring(startIndex + 14, mesg.length - 1);

                var send_new_api_req = true;

                if (playerName in playerCache) {
                    // @ts-ignore
                    if (playerName != game.getLocalPlayer().getName() || cacheOwnStats.getValue()) {
                        if (playerCache[playerName]["cacheTime"] > Date.now() - maxCacheTime.getValue() * 60000) {
                            send_new_api_req = false;
                            clientMessage(getPrintStr(playerName, teamColor, playerCount, " \u00A7r\u00A77(Cached)"));
                        }
                    }
                }

                if (send_new_api_req) {

                    // @ts-ignore
                    http.getAsync(`https://api.ngmc.co/v1/players/${playerName.split(' ').join("%20")}${Globals.getQueryParams()}`, {}, (resp) => {

                        const exec_time = Date.now() - start_time;

                        if (resp.statusCode == 404) {

                            playerCache[playerName] = {
                                "nicked": true,
                                "cacheTime": Date.now(),
                            };

                            clientMessage(getPrintStr(playerName, teamColor, playerCount, ` \u00A7r\u00A77(${exec_time / 1000}s)`));
                            
                        } else if (resp.statusCode == 200) {

                            const r = JSON.parse(util.bufferToString(resp.body));

                            var guild_tag = '';
                            if (r["guildData"]) {
                                if (r["guildData"]["rawTag"]) {
                                    guild_tag = `\u00A7r\u00A7l${Globals.fixFormat(r["guildData"]["rawTag"])}\u00A7r`;
                                } else {
                                    guild_tag = `\u00A7r[${r["guildData"]["name"]}] `;
                                }
                            }

                            playerCache[playerName] = {
                                "nicked": false,
                                "cacheTime": Date.now(),
                                "level": Globals.fixFormat(r["formattedLevel"] + "\u00A7r"),
                                "guild": guild_tag,
                                "kdr": r["kdr"],
                                "tier": r["tier"],
                                "ranks": r["ranks"]
                            };

                            clientMessage(getPrintStr(playerName, teamColor, playerCount, ` \u00A7r\u00A77(${exec_time / 1000}s)`));

                        } else {

                            clientMessage(`${mesg} \u00A7r\u00A77(\u00A7cNG API Error ${resp.statusCode}\u00A7r, \u00A77${exec_time / 1000}s)`);

                        }

                    });

                }

            }

        }

    }

});


client.getModuleManager().registerModule(mod);


// §bPrathpro17 §ehas joined (§b5§e/§b12§e)!
