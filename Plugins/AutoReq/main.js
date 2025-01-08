"use strict";
let module = new Module("autoreq", "Auto ReQ", "Automatically requeue with The Hive", 0);
let soloMode = module.addBoolSetting("soloMode", "Solo mode", "ReQ when you finish or die in a game. please dont use while in a party", false);
soloMode.setCondition("teamMode", false);
let teamMode = module.addBoolSetting("teamMode", "Team mode", "ReQ when your team eliminated.", false);
teamMode.setCondition("soloMode", false);
let questMode = module.addBoolSetting("questMode", "Quest mode", "If the game ends with the quest completed, it will return to the hub", false);
questMode.setCondition("hubMode", false);
let hubMode = module.addBoolSetting("hubMode", "Hub mode", "Use /hub instead of /q", false);
hubMode.setCondition("questMode", false);
let queueMs = module.addNumberSetting("queueMs", "Queue ms", "ms until ReQueue", 0, 1000, 10, 0);
let deathRole = module.addBoolSetting("deathRole", "Death role", "ReQ when you get death role", false);
let runnerRole = module.addBoolSetting("runnerRole", "Runner role", "ReQ when you get runner role", false);
let hiderRole = module.addBoolSetting("hiderRole", "Hider role", "ReQ when you get hider role", false);
let seekerRole = module.addBoolSetting("seekerRole", "Seeker role", "ReQ when you get seeker role", false);
let innocentRole = module.addBoolSetting("innocentRole", "Innocent role", "ReQ when you get innocent role", false);
let murdererRole = module.addBoolSetting("murdererRole", "Murderer role", "ReQ when you get murderer role", false);
let sheriffRole = module.addBoolSetting("sheriffRole", "Sheriff role", "ReQ when you get sheriff role", false);
let reserveCmd = new Command("reserve", "Reserve the next game", "$ [gameCode|cancel]", ["r"]);
client.getModuleManager().registerModule(module);
client.getCommandManager().registerCommand(reserveCmd);
let checkText = "You are connected to ";
let gameMode = undefined;;
let reserveGame = undefined;
let teamName = RegExp("^[]$");
let questComplete = false;
let process = 0;

client.on("title", msg => {
    if (!module.isEnabled() || !soloMode.getValue()) {
        return;
    }
    if ((msg.text == "\u00A7cYou died!" || msg.text == "\u00A77You're spectating the \u00A7as\u00A7eh\u00A76o\u00A7cw\u00A77!")) {
        ReQ();
    }
})
client.on("receive-chat", msg => {
    if (msg.message.startsWith(checkText) && process == 1) {
        if (msg.message.startsWith(checkText+"server name ")) {
            gameMode = msg.message.replace(checkText+"server name ", "").replace(/\d+/g, "");
            if (reserveGame == undefined) {
                reserveGame = gameMode;
            }
        } else if (msg.message.startsWith(checkText+"server ")) {
            process = 0;
        }
        msg.cancel = true;
    }
    if (msg.message.startsWith("\u00A78\u00A7l[\u00A7a\u00A7l?\u00A78\u00A7l] \u00A7r\u00A7aQuest complete: ")) {
        questComplete = true;
    }
    if (/\u00A7.\u00A7l\u00BB \u00A7rYou are on the /.test(msg.message)) {
        teamName = msg.message.replace(/\u00A7.\u00A7l\u00BB \u00A7rYou are on the /, "").replace(/!$/, ""); // §?Color Team
        teamName = RegExp("\u00A7.\u00A7l\u00BB \u00A7r\u00A7."+teamName+" \u00A77has been \u00A7cELIMINATED\u00A77!"); // §?§l» §r§?${teamName} §7has been §cELIMINATED§7!
    }
    if (!module.isEnabled()) {
        return;
    }
    if (soloMode.getValue()) {
        if (msg.message.startsWith("\u00A7a\u00A7l\u00BB \u00A7r\u00A7eYou finished all maps and came in") || msg.message.startsWith("\u00A7a\u00A7l\u00bb \u00A7r\u00A7eYou finished in")) {
            ReQ();
        }
    }
    if (teamMode.getValue()) {
        if (teamName.test(msg.message)) {
            ReQ();
        }
    }
    if (msg.message == "\u00A7c\u00A7l\u00BB \u00A7r\u00A7c\u00A7lGame OVER!") {
        ReQ();
    }
    if (deathRole.getValue() && msg.message == "\u00A7d\u00A7l\u00BB \u00A7r\u00A7bYou are a \u00A7cDeath") {
        ReQ();
    }
    if (runnerRole.getValue() && msg.message == "\u00A7d\u00A7l\u00BB \u00A7r\u00A7bYou are a \u00A7aRunner") {
        ReQ();
    }
    if (hiderRole.getValue() && msg.message == "\u00A7e\u00A7l\u00BB \u00A7rYou are a \u00A7eHIDER") {
        ReQ();
    }
    if (seekerRole.getValue() && msg.message == "\u00A7c\u00A7l\u00BB \u00A7rYou are a \u00A7cSEEKER") {
        ReQ();
    }
    if (innocentRole.getValue() && msg.message == "\u00A7a\u00A7l\u00BB \u00A7r\u00A7a\u00A7lInnocent") {
        ReQ();
    }
    if (murdererRole.getValue() && msg.message == "\u00A7c\u00A7l\u00BB \u00A7r\u00A7c\u00A7lMurderer") {
        ReQ();
    }
    if (sheriffRole.getValue() && msg.message == "\u00A79\u00A7l\u00BB \u00A7r\u00A79\u00A7lSheriff") {
        ReQ();
    }
})

client.on("join-game", () => {
    if (game.getFeaturedServer() != "The Hive") {
        return;
    }
    if (process == 0 || process == 2) {
        process = 1;
        teamName = RegExp("^[]$");
        reserveGame = undefined;
        questComplete = false;
        setTimeout(() => {
            game.executeCommand("/connection");
        }, 400)
    }
})
client.on("change-dimension", () => {
    if (game.getFeaturedServer() != "The Hive") {
        return;
    }
    if (process == 0 || process == 2) {
        process = 1;
        teamName = RegExp("^[]$");
        if (reserveGame == gameMode) {
            reserveGame = undefined;
        }
        questComplete = false;
        setTimeout(() => {
            game.executeCommand("/connection");
        }, 400)
    }
})
reserveCmd.on("execute", (label, args, commandLine) => {
    if (module.isEnabled() && !questMode.getValue() && !hubMode.getValue() && game.getFeaturedServer() == "The Hive") {
        if (args.length > 0) {
            if (args[0] == "cancel") {
                if (reserveGame == gameMode) {
                    clientMessage("\u00A7cCannot cancel reserved game because it is the same as the default game");
                } else {
                reserveGame = gameMode;
                clientMessage(`Cancelled reserved game and set to default game (${reserveGame})`);
                }
            } else if (args[0] == reserveGame) {
                clientMessage("\u00A7cReserved game is already set to that game");
            } else {
                reserveGame = args[0];
                clientMessage(`Set reserved game to ${reserveGame}`);
            }
        } else {
            clientMessage(`Reserved game: ${reserveGame}`);
        }
    } else {
        if (!module.isEnabled()) {
            clientMessage("\u00A7cThis command cannot be used because module is disabled");
        } else if (questMode.getValue()){
            clientMessage("\u00A7cThis command cannot be used because Quest mode is enabled");
        } else if (hubMode.getValue()) {
            clientMessage("\u00A7cThis command cannot be used because Hub mode is enabled");
        } else {
            clientMessage("\u00A7cThis command cannot be used because you are not in The Hive");
        }
    }
    return true;
})

function ReQ() {
    if (process == 0){
        process = 2;
        if (questMode.getValue()) {
            if (questComplete) {
                setTimeout(() => {
                    client.showNotification("Return to HUB");
                    game.executeCommand("/hub");
                }, Number(queueMs.getValue()));
            } else {
                setTimeout(() => {
                    if (questComplete) {
                        client.showNotification("Return to HUB");
                        game.executeCommand("/hub");
                    } else {
                        client.showNotification(`ReQueueing ${gameMode}`);
                        game.executeCommand(`/q ${gameMode}`);
                    }
                }, Number(queueMs.getValue())+400);
            }
        } else {
            setTimeout(() =>{
                if (!hubMode.getValue()) {
                    client.showNotification(`ReQueueing ${reserveGame}`);
                    game.executeCommand(`/q ${reserveGame}`);
                    reserveGame = undefined;
                } else {
                    client.showNotification("Return to HUB");
                    game.executeCommand("/hub");
                }
            }, Number(queueMs.getValue()));
        }
    }
}