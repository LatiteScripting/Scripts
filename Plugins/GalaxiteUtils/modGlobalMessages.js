"use strict";
// Global Messages: Assorted global messages for informational purposes
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
const http = require("http");
const fs = require("filesystem");
// initialization
let modGlobalMessages = new Module("globalmessages", "GXU: Global Messages", "Configures what GalaxiteUtils-related messages should be sent. (The toggle state of this module is useless)", 0 /* KeyCode.None */);
let optionSplashText = modGlobalMessages.addBoolSetting("gxuactive", "GalaxiteUtils Splashes", "Sends a fun message upon joining Galaxite", true);
client.getModuleManager().registerModule(modGlobalMessages);
// get and compare version from last launch
let version = plugin.version;
let updated;
let versionPath = "GalaxiteUtilsVersion";
// make the file if needed
if (fs.exists(versionPath)) { // if there is a version stored
    let storedVersion = util.bufferToString(fs.read(versionPath)); // read the file
    updated = (version != storedVersion); // set whether the plugin has updated to the opposite of whether the versions match
}
else {
    updated = true;
}
fs.write(versionPath, util.stringToBuffer(version)); // regardless of stored version, update (or create) the version file
// send messages
client.on("join-game", e => {
    if ((0, exports_1.notOnGalaxite)())
        return;
    setTimeout(() => {
        var _a;
        // splash texts
        if (optionSplashText.getValue()) {
            (0, exports_1.sendGXUMessage)(getSplash());
        }
        // patch notes
        if (updated) {
            (0, exports_1.sendGXUMessage)((_a = exports_1.patchNotes.get(plugin.version)) !== null && _a !== void 0 ? _a : `Something went wrong when getting the patch notes! (version: ${util.bufferToString(fs.read(versionPath))})`);
        }
        // updater notifications (i do not want this to be an option)
        let githubRaw = http.get("https://raw.githubusercontent.com/LatiteScripting/Scripts/master/Plugins/GalaxiteUtils/plugin.json", {});
        if (githubRaw.statusCode == 200) { // if github sent a response
            let githubInterpretation = util.bufferToString(githubRaw.body);
            let onlineJson = JSON.parse(githubInterpretation);
            if (onlineJson.version != plugin.version) {
                (0, exports_1.sendGXUMessage)(`A GalaxiteUtils update (v${onlineJson.version}) is available! Run \xa7l.plugin install GalaxiteUtils\xa7r and relaunch the client to update.`);
            }
        }
    }, 5000);
});
// client.on("key-press", e => { // debug function comment this for release
//     if(!e.isDown) return;
//     if(e.keyCode == KeyCode.K)
//         sendGXUMessage(getSplash());
// });
function getSplash() {
    return exports_1.gxuSplashes[Math.floor(Math.random() * exports_1.gxuSplashes.length)];
}
