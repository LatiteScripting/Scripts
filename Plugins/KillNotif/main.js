"use strict";
// Script GitHub repository: https://github.com/Plextora/KillNotif
// Currently only works on The Hive
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const killSounds_1 = require("./killSounds");
const modOptions_1 = require("./modOptions");
exports.mod = new Module("KillNotif", "Kill Notification", "Plays a sound whenever you kill someone on supported servers", 0 /* KeyCode.None */);
const playerName = (_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.getName();
const playerNickname = (_b = client
    .getModuleManager()
    .getModuleByName("Nickname")) === null || _b === void 0 ? void 0 : _b.getSettings()[2].getValue();
client.getModuleManager().registerModule(exports.mod);
// https://regex101.com/r/V3RC36/2
const hivePlayerKill = new RegExp(decodeURI(`^.*${playerName}.*\u00A7c.*$|You killed`));
const hiveNickKill = new RegExp(decodeURI(`^.*${playerNickname}.*\u00A7c.*$|You killed`));
client.on("receive-chat", (ev) => {
    var _a;
    if (ev.isChat && exports.mod.isEnabled() && ((_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.isValid())) {
        if (ev.message.match(hivePlayerKill) || ev.message.match(hiveNickKill)) {
            (0, killSounds_1.getSelectedSound)();
            game.playSoundUI(killSounds_1.soundToPlay, modOptions_1.soundVolume.getValue(), modOptions_1.soundPitch.getValue());
            if (modOptions_1.debugMode.getValue()) {
                clientMessage(`Played ${killSounds_1.soundToPlay} at vol ${modOptions_1.soundVolume.getValue()} and pitch ${modOptions_1.soundPitch.getValue()}`);
            }
        }
    }
});
