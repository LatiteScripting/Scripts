"use strict";
// Chat Editor: Allows for various changes to the in-game chat.
// CompactBadges file name kept for legacy compatibility.
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
let chatEditor = new Module("compactBadges", "GXU: Chat Editor", "Adds options to modify various parts of the Galaxite chat.\n\nThis module is incompatible with anything else that edits chat (such as the Timestamps plugin).", 0 /* KeyCode.None */);
let optionCompactBadges = chatEditor.addBoolSetting(// Shortens badges.
"compactbadges", "Compact Badges", "Shortens all badges.", false);
let optionComboToggle = chatEditor.addBoolSetting(// Controls combination badge behavior.
"combotoggle", "Combination Badge Acts as ELITE", "If this setting is enabled, players with the combination ELITE & ULTRA badge appear as ELITE. If disabled, ULTRA.", true);
optionComboToggle.setCondition("compactbadges", true); // this toggle makes sense only if you're shortening badges
let optionClassicBadges = chatEditor.addBoolSetting("classicbadges", "Classic Badges", "Uses normal Minecraft text for player badges instead of custom graphics", false);
optionClassicBadges.setCondition("compactbadges", false);
optionCompactBadges.setCondition("classicbadges", false);
let optionClassicServerBadges = chatEditor.addBoolSetting("classicserverbadges", "Classic Server Badges", "Uses normal Minecraft text for server badges (Warn, Info, etc.) instead of custom graphics", false);
let optionRemoveBadges = chatEditor.addBoolSetting(// Removes badges. Not mutually exclusive with Compact or Classic Badges because they would still work on staff badges
"removebadges", "Remove Player Badges", "Completely hides all non-staff player badges (Player, ELITE, etc.).", 
// Hides Player, ULTRA, ELITE, ELITE + ULTRA, VIP, and Influencer
false);
let optionHidePrestigeIcons = chatEditor.addBoolSetting("hideprestige", "Hide Prestige Badges", "Hides all battlepass prestige badges.", false);
let optionClassicPrestigeIcons = chatEditor.addBoolSetting("classicprestige", "Classic Prestige Icons", "Uses normal Minecraft text for Prestige icons instead of custom graphics", false);
optionClassicPrestigeIcons.setCondition("hideprestige", false);
optionHidePrestigeIcons.setCondition("classicprestige", false);
client.getModuleManager().registerModule(chatEditor);
// respectively: elite & ultra, elite, player, vip, ultra, influencer
let rgxPlayerBadges = /(\uE096|\uE099|\uE09A|\uE09D|\uE09E|\uE09F) /;
// elite, player, staff, helper, vip, ultra, influencer. combo badge excluded for its own test
let rgxBadges = /(\uE099|\uE09A|\uE09B|\uE09C|\uE09D|\uE09E|\uE09F) /;
// all badges (for classic badges)
let rgxAllBadges = /(\uE096|\uE099|\uE09A|\uE09B|\uE09C|\uE09D|\uE09E|\uE09F) /;
// p1-p5 respectively
let rgxPrestiges = /(\uE1D9|\uE1DA|\uE1DB|\uE1DC|\uE1DD) /;
// notice, join, warn, info, game, team, party
let rgxServerBadges = /(\uE0B9|\uE0BA|\uE0BB|\uE0BC|\uE0BD|\uE0BE|\uE0BF) /;
// map that converts long badges to short badges
let shortbadgeMap = new Map([
    ["\uE099 ", "\uE089 "],
    ["\uE09A ", "\uE08A "],
    ["\uE09B ", "\uE08B "],
    ["\uE09C ", "\uE08C "],
    ["\uE09D ", "\uE08D "],
    ["\uE09E ", "\uE08E "],
    ["\uE09F ", "\uE08F "], // influencer
]);
/* stole this character width key from a bukkit forum (https://bukkit.org/threads/formatting-plugin-output-text-into-columns.8481/):
A: 6    B: 6    C: 6    D: 6    E: 6    F: 6    G: 6    H: 6   *I: 4*   J: 6    K: 6    L: 6    M: 6
N: 6    O: 6    P: 6    Q: 6    R: 6    S: 6    T: 6    U: 6    V: 6    W: 6    X: 6    Y: 6    Z: 6
a: 6    b: 6    c: 6    d: 6    e: 6   *f: 5*   g: 6    h: 6   *i: 2*   j: 6   *k: 5*  *l: 3*   m: 6
n: 6    o: 6    p: 6    q: 6    r: 6    s: 6   *t: 4*   u: 6    v: 6    w: 6    x: 6    y: 6    z: 6
 *(space): 4*

evidently i didn't care about symmetry
*/
let classicBadgeMap = new Map([
    ["\uE096 ", "\xa78[\xa7eE\xa76L\xa7cI\xa7dT\xa75E\xa78]\xa7r "],
    ["\uE099 ", "\xa78[\xa7eELITE\xa78]\xa7r"],
    ["\uE09A ", "\xa78[\xa77PLAYER\xa78]\xa7r "],
    ["\uE09B ", "\xa78[\xa79STAFF\xa78]\xa7r "],
    ["\uE09C ", "\xa78[\xa72HELPER\xa78]\xa7r "],
    ["\uE09D ", "\xa78[\xa7dVIP\xa78]\xa7r "],
    ["\uE09E ", "\xa78[\xa75ULTRA\xa78]\xa7r "],
    ["\uE09F ", "\xa78[\xa7cINFLUENCER\xa78]\xa7r "], // influencer (red)
]);
let classicPrestigeMap = new Map([
    ["\uE1D9 ", "\xa78(\xa7nP1\xa78)\xa7r "],
    ["\uE1DA ", "\xa78(\xa7iP2\xa78)\xa7r "],
    ["\uE1DB ", "\xa78(\xa7gP3\xa78)\xa7r "],
    ["\uE1DC ", "\xa78(\xa7uP4\xa78)\xa7r "],
    ["\uE1DD ", "\xa78(\xa7sP5\xa78)\xa7r "], // p5 (diamond)
]);
let classicServerMap = new Map([
    ["\uE0B9 ", "\xa78[\xa7dNOTICE\xa78]\xa7r "],
    ["\uE0BA ", "\xa78[\xa72JOIN\xa78]\xa7r "],
    ["\uE0BB ", "\xa78[\xa74WARN\xa78]\xa7r "],
    ["\uE0BC ", "\xa78[\xa7eINFO\xa78]\xa7r "],
    ["\uE0BD ", "\xa78[\xa7aGAME\xa78]\xa7r "],
    ["\uE0BE ", "\xa78[\xa73TEAM\xa78]\xa7r "],
    ["\uE0BF ", "\xa78[\xa75PARTY\xa78]\xa7r "], // party
]);
client.on("receive-chat", c => {
    if ((0, exports_1.notOnGalaxite)() || c.cancel)
        return;
    let editedMessage = c.message; // cache a message to edit and resend later
    // PRESTIGES
    if (optionClassicPrestigeIcons.getValue()) { // classic
        if (rgxPrestiges.test(editedMessage)) {
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxPrestiges, (substring) => {
                var _a;
                return (_a = classicPrestigeMap.get(substring)) !== null && _a !== void 0 ? _a : substring;
            });
        }
    }
    if (optionHidePrestigeIcons.getValue()) { // hidden
        if (rgxPrestiges.test(editedMessage)) { // check if message has a prestige icon
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxPrestiges, ""); // delete the prestige icon
        }
    }
    // BADGES
    if (optionRemoveBadges.getValue()) { // delete player badges first
        if (rgxPlayerBadges.test(editedMessage)) { // check if message has a player badge
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxPlayerBadges, ""); // delete the player badge
        }
    }
    if (optionCompactBadges.getValue()) { // shorten
        if (editedMessage.includes("\uE096")) { // check for elite & ultra
            c.cancel = true;
            editedMessage = editedMessage.replace("\uE096", optionComboToggle.getValue() ? "\uE089" : "\uE08E" // replace combo badge with short elite if option is on, short ultra if off
            );
        }
        if (rgxBadges.test(editedMessage)) { // check for any badge except elite & ultra
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxBadges, (substring) => {
                var _a;
                return (_a = shortbadgeMap.get(substring)) !== null && _a !== void 0 ? _a : substring; // use the matching badge as a key in the badge -> short badge map; if there's an error just return the long badge
            });
        }
    }
    if (optionClassicBadges.getValue()) { // classic
        if (rgxAllBadges.test(editedMessage)) {
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxAllBadges, (substring) => {
                var _a;
                return (_a = classicBadgeMap.get(substring)) !== null && _a !== void 0 ? _a : substring;
            });
        }
    }
    // SERVER BADGES
    if (optionClassicServerBadges.getValue()) {
        if (rgxServerBadges.test(editedMessage)) {
            c.cancel = true;
            editedMessage = editedMessage.replace(rgxServerBadges, (substring) => {
                var _a;
                return (_a = classicServerMap.get(substring)) !== null && _a !== void 0 ? _a : substring;
            });
        }
        if (editedMessage.includes(" \xA7e\xA7l\xBB\xA7r ")) { // \xBB is », used for galaxite player messages
            c.cancel = true;
            editedMessage = editedMessage.replace(" \xA7e\xA7l\xBB\xA7r ", ": \xA7r");
        }
    }
    if (c.cancel)
        clientMessage(editedMessage.trim()); // if the message was changed, cancel the source message and resend the edited one
});
