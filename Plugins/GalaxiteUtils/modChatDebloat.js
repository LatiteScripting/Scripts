"use strict";
// Chat Debloat: Hides a bunch of spammy chat messages and outputs invisible status to a HUD module
// (totally not stolen from an onix script of about the same name)
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/OnixClient-Scripts/OnixClient_Scripts/blob/bee9a02abc5469c3bb5aea4402ab4b0813c40fa7/Modules/gxt.lua
/* NOTES:
- Join: \ue0ba
- Info (ex. invisible): \ue0bc
  Note: only apply this to invisible messages, Info has some useful stuff + invisible is the module anyway
- Notice (ex. hub messages): \ue0b9
- Warn: (intentionally omitted)
- Melvin: \u00ad\u0020\u00a7\u006c\u00a7\u0036Miner
*/
const exports_1 = require("./exports");
// initialize
let chatDebloat = new Module("chatDebloat", "GXU: Chat Debloat", "Hides some spammy chat messages", 0 /* KeyCode.None */);
let optionHideJoins = chatDebloat.addBoolSetting("hideJoin", "Hide Joins", "Hide player join messages", false);
let optionHideNotices = chatDebloat.addBoolSetting("hideNotices", "Hide Notices", "Hides notice messages (ex. hub messages)", true);
let optionHideMelvin = chatDebloat.addBoolSetting("hideMelvin", "Hide Melvin Messages", "Hides chat messages relating to Melvin's Mine", false);
client.getModuleManager().registerModule(chatDebloat);
// hook
client.on("receive-chat", msg => {
    if ((0, exports_1.notOnGalaxite)() || !chatDebloat.isEnabled())
        return;
    // cache message for ease of reference
    let message = msg.message;
    if (message.startsWith("\ue0b9") && optionHideNotices.getValue()) { // notices
        msg.cancel = true;
    }
    if (message.startsWith("\ue0ba") && optionHideJoins.getValue()) { // join
        msg.cancel = true;
    }
    if (message.startsWith("\uE0AD \xa7l\xa76Miner Melvin\xa7r \xa7e\xa7l\xbb\xa7r") && optionHideMelvin.getValue()) { // melvin
        msg.cancel = true;
    }
});
