"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
const moduleOptions_1 = require("./moduleOptions");
exports.module = new Module("MentionChatPing", "MentionChatPing", "Plays a sound when someone mentions you in chat (Suggestion from emilyluvzzu in Latite Client Discord)", 0 /* KeyCode.None */);
client.on("receive-chat", (ev) => {
    var _a, _b, _c;
    if (ev.isChat && exports.module.isEnabled() && ((_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.isValid())) {
        if (ev.message.includes((_b = game.getLocalPlayer()) === null || _b === void 0 ? void 0 : _b.getName()) ||
            ev.message.includes((_c = client
                .getModuleManager()
                .getModuleByName("Nickname")) === null || _c === void 0 ? void 0 : _c.getSettings()[2].getValue())) {
            if (exports.module.isEnabled()) {
                game.playSoundUI("random.orb", moduleOptions_1.soundVolume.getValue(), moduleOptions_1.soundPitch.getValue());
                if (moduleOptions_1.debugMode.getValue()) {
                    script.log(`Played random.orb at vol ${moduleOptions_1.soundVolume.getValue()} and pitch ${moduleOptions_1.soundPitch.getValue()}`);
                }
            }
        }
    }
});
// adds the module into the client
client.getModuleManager().registerModule(exports.module);
