"use strict";
// Compact Badges: Replaces the default chat badges (Player, Helper, etc.) with their unused short counterparts.
// Note 1: Short badges are 0x0010 behind their corresponding long badges
// Note 2: Elite + Ultra has no short version; which should it be replaced by? (solution is an option lol why not)
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
let compactBadges = new Module("compactbadges", "GXU: Compact Badges", "Adds options to trim or remove the chat badges", 0 /* KeyCode.None */);
let optionRemoveBadges = compactBadges.addBoolSetting("removebadges", "Remove Player Badges", "Completely hides all non-staff badges (Player, ELITE, etc.).\n\nIf this is disabled, all badges will be compacted instead.", 
// Hides Player, ULTRA, ELITE, ELITE + ULTRA, VIP, and Influencer
false);
let optionHidePrestigeIcons = compactBadges.addBoolSetting("hideprestige", "Hide Prestige Badges", "Hides all battlepass prestige badges.", false);
let optionComboToggle = compactBadges.addBoolSetting("combotoggle", "Combination Badge Acts as ELITE", "If this setting is enabled, players with the combination ELITE & ULTRA badge appear as ELITE. If disabled, ULTRA.", true);
client.getModuleManager().registerModule(compactBadges);
// respectively: elite & ultra, elite, player, vip, ultra, influencer
let rgxPlayerBadges = /(\uE096|\uE099|\uE09A|\uE09D|\uE09E|\uE09F) /;
// elite, player, staff, helper, vip, ultra, influencer. combo badge excluded for its own test
let rgxBadges = /(\uE099|\uE09A|\uE09B|\uE09C|\uE09D|\uE09E|\uE09F) /;
// p1-p5 respectively
let rgxPrestiges = /(\uE1D9|\uE1DA|\uE1DB|\uE1DC|\uE1DD) /;
// map that converts long badges to short badges
let badgeMap = new Map([
    ["\uE099 ", "\uE089 "],
    ["\uE09A ", "\uE08A "],
    ["\uE09B ", "\uE08B "],
    ["\uE09C ", "\uE08C "],
    ["\uE09D ", "\uE08D "],
    ["\uE09E ", "\uE08E "],
    ["\uE09F ", "\uE08F "], // influencer
]);
client.on("receive-chat", c => {
    if ((0, exports_1.notOnGalaxite)() || !compactBadges.isEnabled())
        return;
    let editedMessage = c.message; // cache a message to edit and resend later
    if (optionHidePrestigeIcons.getValue()) { // if the user wants to hide prestige icons:
        if (rgxPrestiges.test(editedMessage)) { // check if message has a prestige icon
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxPrestiges, ""); // delete the prestige icon
        }
    }
    if (optionRemoveBadges.getValue()) { // if the user wants to delete player badges:
        if (rgxPlayerBadges.test(editedMessage)) { // check if message has a player badge
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxPlayerBadges, ""); // delete the player badge
        }
    }
    else { // if user wants to just shorten badges:
        if (editedMessage.includes("\uE096")) { // check for elite & ultra
            c.cancel = true;
            editedMessage = editedMessage.replace("\uE096", optionComboToggle.getValue() ? "\uE089" : "\uE08E" // replace combo badge with short elite if option is on, short ultra if off
            );
        }
        if (rgxBadges.test(editedMessage)) { // check for any badge except elite & ultra
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxBadges, (substring) => {
                var _a;
                return (_a = badgeMap.get(substring)) !== null && _a !== void 0 ? _a : substring; // use the matching badge as a key in the badge -> short badge map; if there's an error just return the long badge
            });
        }
    }
    if (c.cancel)
        clientMessage(editedMessage.trim()); // if the message was changed, cancel the source message and resend the edited one
});
