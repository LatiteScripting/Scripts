"use strict";
// AutoGG: Automatically sends "gg" on game end
Object.defineProperty(exports, "__esModule", { value: true });
/* TO-DO:
- Significant overhauls (I'll need to redo this whole thing tbh)
*/
const exports_1 = require("./exports");
const WhereAmAPI_1 = require("./WhereAmAPI");
const fs = require("filesystem");
// Module setup
let autoGG = new Module("autoGG", "GXU: AutoGG", 'Automatically says "gg" when a game finishes', 0 /* KeyCode.None */);
client.getModuleManager().registerModule(autoGG);
let ch = autoGG.addBoolSetting("ch", "Chronos", "Chronos support", true);
let ru = autoGG.addBoolSetting("ru", "Rush", "Rush support", true);
let hr = autoGG.addBoolSetting("hr", "Hyper Racers", "Hyper Racers support", true);
let cw = autoGG.addBoolSetting("cw", "Core Wars", "Core Wars support", true);
let ftg = autoGG.addBoolSetting("ftg", "Fill the Gaps", "Fill the Gaps support", true);
let ph = autoGG.addBoolSetting("ph", "Prop Hunt", "Prop Hunt support", true);
let nerdToggle;
if (fs.exists("NerdToggle")) {
    nerdToggle = autoGG.addBoolSetting("nerdtoggle", "Nerd Toggle", 'Says the full "Good game!" when saying GG', true);
}
/* Galaxite Game End Messages:
hr            - "Finished!", "Out of Time!"
ftg           - "\xA7l<team> Team\xA7r\xA7a won the game!"
ch (subtitle) - "Is The \xA76\xA7lChronos Champion!", "Are The \xA76\xA7lChronos Champions!"
ru (subtitle) - "Is The \xA76\xA7lRush Champion!", "Are The \xA76\xA7lRush Champions!"
cw            - "\xA7l<team> Team\xA7r\xA7a won the game!"
ph            - "\xA7bHiders\xA7r\xA7f Win", "\xA7eSeekers\xA7r\xA7f Win"
No other modes have gg rewards */
// cache regex
const rgxFtgCw = /Team\xA7r\xA7a won the game!/; // does it work like this?
const rgxChRu = /(Is|Are) The \xA76\xA7l(Chronos|Rush) Champion(|s)!/;
const rgxPh = /\xA7(bHiders|eSeekers)\xA7r\xA7f Win/;
function sendGG() {
    if ((0, exports_1.nerdRadar)() && (nerdToggle.getValue() == null || nerdToggle.getValue())) { // if the sender is wiki team, and either the nerd toggle setting does not exist or is on
        sendMessage("Good game!");
        if (!fs.exists("NerdToggle")) { // if the nerdtoggle file does not exist
            fs.write("NerdToggle", util.stringToBuffer(exports_1.gxuSplashes[Math.floor(Math.random() * exports_1.gxuSplashes.length)])); // force it to exist and write anything on it really
        }
    }
    else {
        sendMessage("gg");
    }
}
function sendMessage(message) {
    try {
        game.sendChatMessage(message);
    }
    catch (error) {
        (0, exports_1.sendGXUMessage)("Error: there is currently no permission to send messages");
    }
}
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
            WhereAmAPI_1.api.onNextTransfer(() => {
                if (WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.PROP_HUNT) {
                    sendGG();
                }
            });
        }
    }
});
