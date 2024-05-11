"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("filesystem");
const playtimeHud = new TextModule("playtime", "Playtime", "Shows your session and overall playtime", 0);
const showSessionTimer = playtimeHud.addBoolSetting("session", "Session Timer", "Shows the session timer", true);
const showOverallTimer = playtimeHud.addBoolSetting("overall", "Overall Timer", "Shows the overall timer", true);
client.getModuleManager().registerModule(playtimeHud);
let sessionTimer = 0;
let tickTimer = 0;
let overallPlaytime = 0;
if (!fs.exists("playtime"))
    fs.createDirectory("playtime");
// update the playtime every second while enabled
client.on("world-tick", () => {
    if (!playtimeHud.isEnabled())
        return;
    tickTimer++;
    if (tickTimer >= 20) {
        tickTimer = 0;
        sessionTimer++;
        overallPlaytime++;
    }
});
// reset session timer and update overall playtime when joining/leaving a game
client.on("join-game", () => {
    sessionTimer = 0;
    overallPlaytime = parseInt(util.bufferToString(fs.read("playtime/playtime.txt")));
    if (overallPlaytime === undefined)
        overallPlaytime = 0;
});
// save the overall playtime when leaving the game
client.on("leave-game", () => {
    fs.write("playtime/playtime.txt", util.stringToBuffer(`${overallPlaytime}`));
});
// render module
playtimeHud.on("text", () => {
    let renderText = "";
    if (showSessionTimer.getValue())
        renderText += `Session: ${formatTime(sessionTimer)}\n`;
    if (showOverallTimer.getValue())
        renderText += `Overall: ${formatTime(overallPlaytime)}`;
    return renderText;
});
// set values when enabled
playtimeHud.on("enable", () => {
    overallPlaytime = parseInt(util.bufferToString(fs.read("playtime/playtime.txt")));
    if (overallPlaytime === undefined)
        overallPlaytime = 0;
});
// save the overall playtime when disabled
playtimeHud.on("disable", () => {
    fs.write("playtime/playtime.txt", util.stringToBuffer(`${overallPlaytime}`));
});
// format the time into a readable format
function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
