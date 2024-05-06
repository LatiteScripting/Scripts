"use strict";
// AutoGG: Automatically sends "gg" on game end
Object.defineProperty(exports, "__esModule", { value: true });
/* TO-DO:
- Significant overhauls (I'll need to redo this whole thing tbh)
*/
const exports_1 = require("./exports");
// Module setup
let autoGG = new Module("autoGG", "GXU: AutoGG", 'Automatically says "gg" when a game finishes.', 0 /* KeyCode.None */);
client.getModuleManager().registerModule(autoGG);
let ch = autoGG.addBoolSetting("ch", "Chronos", "Chronos support", true);
let ru = autoGG.addBoolSetting("ru", "Rush", "Rush support", true);
let hr = autoGG.addBoolSetting("hr", "Hyper Racers", "Hyper Racers support", true);
let cw = autoGG.addBoolSetting("cw", "Core Wars", "Core Wars support", true);
let ftg = autoGG.addBoolSetting("ftg", "Fill the Gaps", "Fill the Gaps support", true);
let ph = autoGG.addBoolSetting("ph", "Prop Hunt", "Prop Hunt support", true);
/* Galaxite Game End Messages:
hr            - "Finished!", "Out of Time!"
ftg           - "\u00a7l<team> Team\u00a7r\u00a7a won the game!"
ch (subtitle) - "Is The \u00a76\u00a7lChronos Champion!", "Are The \u00a76\u00a7lChronos Champions!"
ru (subtitle) - "Is The \u00a76\u00a7lRush Champion!", "Are The \u00a76\u00a7lRush Champions!"
cw            - "\u00a7l<team> Team\u00a7r\u00a7a won the game!"
ph            - "\u00a7bHiders\u00a7r\u00a7f Win", "\u00a7eSeekers\u00a7r\u00a7f Win"
No other modes have gg rewards */
// cache regex
let rgxFtgCw = /Team\u00a7r\u00a7a won the game!/; // does it work like this?
let rgxChRu = /(Is|Are) The \u00a76\u00a7l(Chronos|Rush) Champion(|s)!/;
let rgxPh = /\u00a7(bHiders|eSeekers)\u00a7r\u00a7f Win/;
function sendGG() {
    clientMessage("GG should've been sent.");
    game.sendChatMessage("gg");
}
let sendWhereAmI = false, awaitWhereAmI = false;
// All games have a title
client.on("title", title => {
    if ((0, exports_1.notOnGalaxite)())
        return;
    if (!autoGG.isEnabled())
        return;
    let text = title.text; // cache title
    // gg conditions
    if (hr.getValue()) {
        if (text == "Finished" || text == "Out of Time!")
            sendGG();
    }
    if (ftg.getValue() || cw.getValue()) {
        if (rgxFtgCw.test(text))
            sendGG();
    }
    if (ch.getValue() || ru.getValue()) {
        if (rgxChRu.test(text))
            sendGG();
    }
    // prop hunt
    if (ph.getValue()) {
        if (rgxPh.test(text)) {
            sendWhereAmI = true;
        }
    }
});
// prop hunt requires entering the postgame first
client.on("change-dimension", e => {
    if (sendWhereAmI) {
        sendWhereAmI = false;
        game.executeCommand("/whereami");
        awaitWhereAmI = true;
    }
});
// take in a whereami to confirm 
client.on("receive-chat", msg => {
    if (awaitWhereAmI) {
        if (msg.message.includes("ServerUUID: ") && msg.message.includes("\n")) { // if message actually is a whereami response
            msg.cancel = true;
            awaitWhereAmI = false;
            if (msg.message.includes("PropHunt"))
                game.sendChatMessage("gg"); // gg
        }
    }
});
