"use strict";
/* Overall goal:
- Initialize module settings
- Create a file named EventLog_(date)
- Log every event with details to that file
*/
const fs = require("filesystem");
// Initialize module
let mod = new Module("EventLogger", "Event Logger", "Logs every Latite event to a file", 0 /* KeyCode.None */);
client.getModuleManager().registerModule(mod);
// unload script is done later
// Initialize options
let appSuspended = mod.addBoolSetting("appSuspended", "Log App Suspends", "Log when the game is closed or suspended", false);
let click = mod.addBoolSetting("click", "Log Clicks", "Log clicks (mouse button, state, and mouse position)", false);
let joinGame = mod.addBoolSetting("joinGame", "Log Game Joins", "Log world joins and transfers", true);
let keyPress = mod.addBoolSetting("keyPress", "Log Key Presses", "Log key presses (button and state)", false);
let leaveGame = mod.addBoolSetting("leaveGame", "Log Game Leaves", "Log world leaves", true);
let loadScript = mod.addBoolSetting("loadScript", "Log New Plugins", "Log whenever a new plugin is loaded and details about it", true);
let receiveChat = mod.addBoolSetting("receiveChat", "Log Received Messages", "Logs received chat messages and details about them", true);
let sendChat = mod.addBoolSetting("sendChat", "Log Sent Messages", "Logs messages you send", true);
let title = mod.addBoolSetting("title", "Log Titles", "Logs titles sent by the server and their type", true);
let unloadScript = mod.addBoolSetting("unloadScript", "Log Unloaded Plugins", "Log whenever a plugin is unloaded and details about it", true);
let worldTick = mod.addBoolSetting("worldTick", "Log World Ticks", "Logs when the world ticks (not recommended)", false);
let textInput = mod.addBoolSetting("textInput", "Log Text Inputs", "Log finalized character inputs", false);
let worldChange = mod.addBoolSetting("worldChange", "Log Dimension Changes", "Logs when the dimension changes (commonly used by servers to move across games)", true);
// Common functions
/**
 * Returns the current Unix timestamp as a string.
 * @returns String form of the current Unix timestamp
 */
function now() {
    return Date.now().toString();
}
// File management
// Create (and technically cache) file
let fileName = "EventLogger_" + now() + ".txt";
fs.write(fileName, util.stringToBuffer("")); // initializes file
function logToFile(text) {
    if (fs.exists(fileName)) {
        // append to file
        fs.append(fileName, util.stringToBuffer(text.concat("\n")));
    }
    else {
        client.showNotification("EventLogger: Something went horribly wrong when attempting to log");
        return;
    }
}
// Event hooks
/* Click format:
(timestamp): Click
  Button: (x)
  [Down/Up]
  Position: (x), (y)
*/
client.on("click", e => {
    if (click.getValue() && mod.isEnabled()) {
        let down = e.isDown ? "Down" : "Up"; // bool ? val if true : val if false
        let position = e.mouseX.toString() + ", " + e.mouseY.toString();
        logToFile(now() +
            ": Click\n  Button: " +
            e.button.toString() +
            "\n  " +
            down +
            "\n  Position: " +
            position);
    }
});
/* Key press format:
(timestamp): Key pressed
  Key: (key)
  [Down/Up]
*/
client.on("key-press", e => {
    if (keyPress.getValue() && mod.isEnabled()) {
        let down = e.isDown ? "Down" : "Up"; // bool ? valIfTrue : valIfFalse
        logToFile(now() +
            ": Key Press\n  Key: " +
            e.keyAsChar +
            "\n  " +
            down);
    }
});
/* Text input format:
(timestamp): Text input
  Characters: (characters)
*/
client.on("text-input", e => {
    if (textInput.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Text input\n  Characters: " + e.characters);
    }
});
/* Receive chat format:
(timestamp): Received (type)
  from (sender) ((xuid))
  “(message)”
*/
client.on("receive-chat", e => {
    if (receiveChat.getValue() && mod.isEnabled()) {
        let chatType = e.type;
        let message = e.message;
        let sender = (e.sender !== "") ? ("from: " + e.sender) : "";
        let xuid = (e.xuid !== "") ? (" (" + e.xuid + ")") : "";
        logToFile((now() + ": Received " + chatType + "\n  " + message + "\n  " + sender + xuid).trim());
    }
});
/* Send chat format:
(timestamp): Message sent
  “(message)”
*/
client.on("send-chat", e => {
    if (sendChat.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Message sent\n  " + e.message);
    }
});
/* Title format:
(timestamp): Title received
  Type: (type)
  “(text)”
*/
client.on("title", e => {
    if (title.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Title received\n  Type: " + e.type + "\n  " + e.text);
    }
});
/* Load script format:
(timestamp): Loaded plugin (name) (version) by (author)
*/
client.on("load-script", e => {
    if (loadScript.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Loaded plugin " + e.scriptName + " " + e.scriptVersion + " by " + e.scriptAuthor);
    }
});
/* Unload script format:
(timestamp): Unloaded plugin (name) (version) by (author)
*/
client.on("unload-script", e => {
    if (unloadScript.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Unloaded plugin " + e.scriptName + " " + e.scriptVersion + " by " + e.scriptAuthor);
    }
});
/* Suspended format:
(timestamp): App suspended
*/
client.on("app-suspended", e => {
    if (appSuspended.getValue() && mod.isEnabled()) {
        logToFile(now() + ": App suspended");
    }
});
/* Join game format:
(timestamp): Joined a game
*/
client.on("join-game", e => {
    if (joinGame.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Joined game");
    }
});
/* Leave game format:
(timestamp): Left a game
*/
client.on("leave-game", e => {
    if (leaveGame.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Left a game");
    }
});
/* World tick format:
(timestamp): World ticked
*/
client.on("world-tick", e => {
    if (worldTick.getValue() && mod.isEnabled()) {
        logToFile(now() + ": World ticked");
    }
});
client.on("change-dimension", e => {
    if (worldChange.getValue() && mod.isEnabled()) {
        logToFile(now() + ": Dimension changed");
    }
});
