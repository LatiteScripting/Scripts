"use strict";

const fs = require("filesystem");
let config = { mapAvoider: [] };
if (!fs.exists("./config.json")) {
    fs.write("./config.json", util.stringToBuffer(JSON.stringify(config, null, 4)));
} else {
    try {
        config = JSON.parse(util.bufferToString(fs.read("./config.json")));
    } catch (e) {
        const d = new Date();
        const YYYY = d.getFullYear();
        const MM = String(d.getMonth() + 1).padStart(2, "0");
        const DD = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        const ss = String(d.getSeconds()).padStart(2, "0");

        const brokenConfigName = `broken-config-${YYYY}${MM}${DD}${hh}${mm}${ss}.json`;

        fs.move("./config.json", `./${brokenConfigName}`);
        client.showNotification(`"config.json" is broken. moved to "${brokenConfigName}"`);
        if (!fs.exists(`./${brokenConfigName}`)) client.showNotification(`"${brokenConfigName}" could not be moved as expected.`);
        fs.write("./config.json", util.stringToBuffer(JSON.stringify(config, null, 4)));
    }

    if (!Array.isArray(config.mapAvoider)) {
        config.mapAvoider = [];
    }
}

let module = new Module("AutoReQ", "Auto ReQ", "Automatically requeue with The Hive", 0);
let manuallyReq = module.addKeySetting("ManuallyReQ", "ReQ key", "Manually requeue", 80 /* P key */);
let soloMode = module.addBoolSetting("SoloMode", "Solo mode", "ReQ when you finish or die in a game. please dont use while in a party", false);
soloMode.setCondition("TeamMode", false);
let teamMode = module.addBoolSetting("TeamMode", "Team mode", "ReQ when your team eliminated.", false);
teamMode.setCondition("SoloMode", false);
let questMode = module.addBoolSetting("QuestMode", "Quest mode", "If the game ends with the quest completed, it will return to the hub", false);
questMode.setCondition("HubMode", false);
let hubMode = module.addBoolSetting("HubMode", "Hub mode", "Return to hub without requeue", false);
hubMode.setCondition("QuestMode", false);
let mapAvoider = module.addBoolSetting("MapAvoider", "Map avoider", "Avoid the map (use commands for operations such as add maps)", true);
let runnerRole = module.addBoolSetting("RunnerRole", "Runner role", "ReQ when you get runner role", false);
let deathRole = module.addBoolSetting("DeathRole", "Death role", "ReQ when you get death role", false);
let hiderRole = module.addBoolSetting("HiderRole", "Hider role", "ReQ when you get hider role", false);
let seekerRole = module.addBoolSetting("SeekerRole", "Seeker role", "ReQ when you get seeker role", false);
let innocentRole = module.addBoolSetting("InnocentRole", "Innocent role", "ReQ when you get innocent role", false);
let sheriffRole = module.addBoolSetting("SheriffRole", "Sheriff role", "ReQ when you get sheriff role", false);
let murdererRole = module.addBoolSetting("MurdererRole", "Murderer role", "ReQ when you get murderer role", false);
let mapAvoiderCmd = new Command("avoid", "Auto ReQ: Specify maps to avoid", "$ [add|delete|list] [MapName]", ["ma", "mapAvoider", "mapAvoid", "avoider"]);
client.getModuleManager().registerModule(module);
client.getCommandManager().registerCommand(mapAvoiderCmd);

let inHiveServer = false;
let gameMode = "";
let teamColor = "";
let questComplete = false;
let connectionExecuted = false;
let reqExecuted = false;
let lastCommandUsedTime = 0;

const roleText = [
    [runnerRole, "\u00A7d\u00A7l\u00BB \u00A7r\u00A7bYou are a \u00A7aRunner", "Runner"],
    [deathRole, "\u00A7d\u00A7l\u00BB \u00A7r\u00A7bYou are a \u00A7cDeath", "Death"],
    [hiderRole, "\u00A7e\u00A7l\u00BB \u00A7rYou are a \u00A7eHIDER", "Hider"],
    [seekerRole, "\u00A7c\u00A7l\u00BB \u00A7rYou are a \u00A7cSEEKER", "Seeker"],
    [seekerRole, "\u00A7c\u00A7l\u00BB \u00A7rYou are a\u00A7c SEEKER", "Seeker"],
    [innocentRole, "\u00A7a\u00A7l\u00BB \u00A7r\u00A7a\u00A7lInnocent", "Innocent"],
    [sheriffRole, "\u00A79\u00A7l\u00BB \u00A7r\u00A79\u00A7lSheriff", "Sheriff"],
    [murdererRole, "\u00A7c\u00A7l\u00BB \u00A7r\u00A7c\u00A7lMurderer", "Murderer"]
];

const hiveAddresses = [
    "geo.hivebedrock.cloud",
    "geo.hivebedrock.network",
    "ca.hivebedrock.network",
    "fr.hivebedrock.network",
    "sg.hivebedrock.network",
    "au.hivebedrock.network",
    "in.hivebedrock.network",
    "hivebedrock.cloud",
    "hivebedrock.network",
    // Global/North America
    "15.235.56.76",
    "15.235.102.99",
    "15.235.32.205",
    "15.235.73.149",
    "15.235.56.107",
    // Europe
    "51.178.216.177",
    "5.196.205.182",
    "46.105.88.71",
    "51.77.4.103",
    "51.77.4.86",
    // Asia
    "141.11.39.2",
    "141.11.39.110",
    "141.11.39.100",
    "141.11.39.104",
    "141.11.39.112",
    // Australia
    "51.161.142.92",
    "51.161.142.93",
    "51.161.140.50",
    // India
    "148.113.15.56",
    "148.113.15.183",
    "148.113.15.63"
];

client.on("key-press", key => {
    if (module.isEnabled() && inHiveServer && !game.isInUI() && key.isDown && key.keyCode === manuallyReq.getValue()) req();
});

client.on("join-game", () => {
    if (hiveAddresses.includes(game.getServer())) { // game.getFeaturedServer() no longer returns "The Hive", we are determining whether it is The Hive server within the plugin. If this is fixed I will revert to the original code.
        inHiveServer = true;
    } else {
        inHiveServer = false;
        return;
    }

    gameMode = "";
    teamColor = "";
    questComplete = false;
    reqExecuted = false;

    connectionExecuted = true;
    sendCommand("/connection", 500);
});

client.on("leave-game", () => {
    inHiveServer = false;
    gameMode = "";
    teamColor = "";
    questComplete = false;
    connectionExecuted = false;
    reqExecuted = false;
    lastCommandUsedTime = 0;
});

client.on("change-dimension", () => {
    if (hiveAddresses.includes(game.getServer())) {
        inHiveServer = true;
    } else {
        inHiveServer = false;
        return;
    }

    teamColor = "";
    questComplete = false;
    reqExecuted = false;

    if (!connectionExecuted) {
        connectionExecuted = true;
        sendCommand("/connection", 500);
    }
});

client.on("title", msg => {
    if (!inHiveServer || !module.isEnabled()) return;

    if (soloMode.getValue() && (msg.text === "\u00A7cYou died!" || msg.text === "\u00A77You're spectating the \u00A7as\u00A7eh\u00A76o\u00A7cw\u00A77!")) req();
});

client.on("receive-chat", msg => {
    if (!inHiveServer) return;

    const chatText = msg.message;
    const localName = game.getLocalPlayer().getName();

    if (chatText.startsWith("You are connected to ")) {
        if (connectionExecuted) msg.cancel = true;

        if (chatText.startsWith("You are connected to server name ")) gameMode = chatText.replace("You are connected to server name ", "").replace(/\d+/g, "");
        else if (connectionExecuted && chatText.startsWith("You are connected to server ")) connectionExecuted = false;

        return;
    }

    if (chatText === "\u00A7cYou're issuing commands too quickly, try again later.") {
        if (connectionExecuted) {
            sendCommand("/connection", 500);
            msg.cancel = true;
        } else if (reqExecuted) {
            req();
            msg.cancel = true;
        }

        return;
    }

    if (chatText === "\u00A7cUnknown command. Sorry!") {
        if (connectionExecuted || reqExecuted) msg.cancel = true;
        return;
    }

    if (reqExecuted && chatText === "\u00A7cYou are already connected to this server!") {
        reqExecuted = false;
        return;
    }

    if (chatText.startsWith("\u00A78\u00A7l[\u00A7a\u00A7l?\u00A78\u00A7l] \u00A7r\u00A7aQuest complete: ")) {
        questComplete = true;
        return;
    }

    if (chatText.startsWith("\u00A7") && chatText.startsWith("\u00A7l\u00BB \u00A7rYou are on the ", 2) && chatText.endsWith(" Team!")) {
        teamColor = chatText.slice(0, 2);
        return;
    }

    if (chatText.startsWith("\u00A7i\u00A7l\u00BB \u00A7r\u00A7cFINAL KILL!\u00A7r ") && chatText.includes(" \u00A77eliminated ")) {
        const usernames = chatText.replace("\u00A7i\u00A7l\u00BB \u00A7r\u00A7cFINAL KILL!\u00A7r ", "").split(" \u00A77eliminated ");

        if (usernames[0].slice(2) === localName) {
            teamColor = usernames[0].slice(0, 2);
        } else if (usernames[1].slice(2) === localName) {
            teamColor = usernames[1].slice(0, 2);
        }

        return;
    }

    if (!module.isEnabled()) return;

    if (chatText.startsWith("\u00A7a\u00A7l\u00BB \u00A7r\u00A7eYou finished all maps and came in") || chatText.startsWith("\u00A7a\u00A7l\u00BB \u00A7r\u00A7eYou finished in")) {
        if (soloMode.getValue()) {
            req();
        }
        return;
    }

    if (chatText.startsWith(`${teamColor}\u00A7l\u00BB \u00A7r${teamColor}${teamColor}`) && chatText.endsWith(` Team \u00A77has been \u00A7cELIMINATED\u00A77!`)) {
        if (teamMode.getValue() && teamColor !== "") {
            req();
        }
        return;
    }

    if (chatText.startsWith(`${teamColor}\u00A7l\u00BB \u00A7r${teamColor}`) && chatText.endsWith(" Team \u00A77has been eliminated!")) {
        if (teamMode.getValue() && teamColor !== "") {
            req();
        }
        return;
    }

    if (chatText === "\u00A7c\u00A7l\u00BB \u00A7r\u00A7c\u00A7lGame OVER!") {
        req();
        return;
    }

    for (const [setting, text, role] of roleText) {
        if (chatText === text) {
            if (setting.getValue()) {
                client.showNotification(`Got the role: ${role}`);
                req();
            }
            return;
        }
    }

    if (mapAvoider.getValue() && config.mapAvoider.length >= 1) {
        if (chatText.startsWith("\u00A7b\u00A7l\u00BB \u00A7r\u00A7e") && chatText.includes(" \u00A77won with \u00A7f") && chatText.endsWith(" \u00A77votes!")) {
            let detectMapName = chatText.replace("\u00A7b\u00A7l\u00BB \u00A7r\u00A7e", "").replace(" \u00A77votes!", "");
            detectMapName = detectMapName.slice(0, detectMapName.indexOf(" \u00A77won with \u00A7f"));
            if (config.mapAvoider.includes(detectMapName)) {
                client.showNotification(`Avoided map won: ${detectMapName}`);
                req();
                return;
            }
        } else if (chatText.startsWith("\u00A7b\u00A7l\u00BB \u00A7r\u00A7eThe winning maps are: ") && chatText.endsWith("\u00A7e!")) {
            let detectMapName = chatText.replace("\u00A7b\u00A7l\u00BB \u00A7r\u00A7eThe winning maps are: ", "").replace("\u00A7e!", "").replace(/(\u00A7.| \[\d+\])/g, "").split(", ");
            let checkMapName = containsAny(detectMapName, config.mapAvoider);
            if (checkMapName[0]) {
                client.showNotification(`Avoided map won: ${checkMapName[1]}`);
                req();
                return;
            }
        }
    }
});

mapAvoiderCmd.on("execute", (label, args, commandLine) => {
    if (args.length >= 1) {
        if (args[0] === "add" || args[0] === "delete") {
            if (args.length >= 2) {
                editAvoidMap(args[0], formatStrOrArray(args.slice(1)));
            } else {
                clientMessage("\u00A7cNo MapName specified.");
            }
        } else if (args[0] === "list") {
            if (config.mapAvoider.length === 0) {
                clientMessage("\u00A7cNo maps are avoided.");
            } else {
                clientMessage(`Avoided maps:\n \u00A7e${config.mapAvoider.join("\u00A7r\n \u00A7e")}`);
            }
        } else {
            clientMessage(`\u00A7cUnknown command: ${args[0]}`);
        }
    } else {
        if (config.mapAvoider.length === 0) {
            clientMessage("\u00A7cNo maps are avoided.");
        } else {
            clientMessage(`Avoided maps:\n \u00A7e${config.mapAvoider.join("\u00A7r\n \u00A7e")}`);
        }
    }
});

function req() {
    if (reqExecuted) return;
    reqExecuted = true;

    const currentTime = Date.now();
    const requireDelay = questMode.getValue() && !questComplete ? 100 : 0;
    const delay = Math.max(lastCommandUsedTime + 500 - currentTime, requireDelay);

    setTimeout(() => {
        let notifyText = "";
        let command = "";

        const goHub = hubMode.getValue() || (questMode.getValue() && questComplete);
        notifyText = goHub ? "Return to HUB" : `ReQueueing ${gameMode}`;
        command = goHub ? "/hub" : `/q ${gameMode}`;

        client.showNotification(notifyText);
        game.executeCommand(command);
        lastCommandUsedTime = Date.now();
    }, delay);
    lastCommandUsedTime = currentTime + delay;
}

function sendCommand(command, minDelay = 0, notifyText = "") {
    const currentTime = Date.now();
    const delay = Math.max(lastCommandUsedTime + 500 - currentTime, minDelay);

    setTimeout(() => {
        if (notifyText) client.showNotification(notifyText);
        game.executeCommand(command);
        lastCommandUsedTime = Date.now();
    }, delay);
    lastCommandUsedTime = currentTime + delay;
}

function formatStrOrArray(str) {
    if (Array.isArray(str)) {
        return str.map(s => formatStrOrArray(s));
    }
    const words = str.split(" ");
    const capitalizedWords = words.map(word => {
        if (word.length === 0) return "";
        return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    });
    return capitalizedWords.join(" ");
}

function editAvoidMap(editType, mapName) {
    const mapNameArray = Array.isArray(mapName) ? mapName : [mapName];
    let successMap = [];
    let failedMap = [];
    let avoidSet = new Set(config.mapAvoider);

    if (editType === "add") {
        mapNameArray.forEach(name => {
            if (avoidSet.has(name)) {
                failedMap.push(name);
            } else {
                avoidSet.add(name);
                successMap.push(name);
            }
        });
        const notifyText = generateMapEditMessage(successMap, failedMap, "Added", "to avoid list", "is already avoided");
        clientMessage(notifyText);
    } else if (editType === "delete") {
        mapNameArray.forEach(name => {
            if (avoidSet.has(name)) {
                avoidSet.delete(name);
                successMap.push(name);
            } else {
                failedMap.push(name);
            }
        });
        const notifyText = generateMapEditMessage(successMap, failedMap, "Deleted", "from avoid list", "is not avoided");
        clientMessage(notifyText);
    }
    if (successMap.length >= 1) {
        config.mapAvoider = Array.from(avoidSet);
        fs.write("./config.json", util.stringToBuffer(JSON.stringify(config, null, 4)));
    }
}

function generateMapEditMessage(successMap, failedMap, action, successMsg, failMsg) {
    let notifyText = "";
    if (successMap.length >= 1) {
        notifyText += `${action} \u00A7e${successMap.join("\u00A7r, \u00A7e")}\u00A7r ${successMsg}`;
    }
    if (failedMap.length >= 1) {
        if (successMap.length >= 1) notifyText += ", ";
        notifyText += `\u00A7e${failedMap.join("\u00A7r, \u00A7e")}\u00A7c ${failMsg}`;
    }
    return notifyText;
}

function containsAny(array1, array2) {
    const set2 = new Set(array2);
    for (const element of array1) {
        if (set2.has(element)) {
            return [true, element];
        }
    }
    return [false, "Unknown"];
}