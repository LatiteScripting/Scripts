"use strict";
// Extra Things Prevent: Makes you need to click twice to use Extra Things.
// TO-DO: Add a cooldown to the notification
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
// initialization
let extraThingsPrevent = new Module("etprevent", "GXU: Confirm Extra Things", "Adds a confirmation click before using Extra Things", 0 /* KeyCode.None */);
client.getModuleManager().registerModule(extraThingsPrevent);
// initialize settings
let optionInterval = extraThingsPrevent.addNumberSetting("interval", "Max Interval (ms)", "Maximum amount of time between a click and the confirmation click", 0, 1000, 50, 500);
let optionNotif = extraThingsPrevent.addBoolSetting("notif", "Show Notification", "Shows a notification when Extra Things use was successfully blocked", true);
// the actual function
let timePrev = 0; // the first click will always be cancelled, might as well make it all use the same code
let timeCurrent;
function prevent(button) {
    // return cases
    if ((0, exports_1.notOnGalaxite)())
        return false; // are you on galaxite
    if (!extraThingsPrevent.isEnabled())
        return false; // is the module enabled
    if (!game.getLocalPlayer())
        return false; // are you in a game
    if (game.getLocalPlayer().getSelectedSlot() != 8)
        return false; // are you on slot 9 (zero-indexed)
    if (game.isInUI())
        return false; // this may have issues. if necessary use game.getScreen()
    // get use button - not cached because it might change mid-game
    let bind = game.getInputBinding("use");
    if (bind < 0)
        bind += 100; // fix mouse button oddities
    if (bind != button)
        return false; // is the pressed button the use button
    // actual prevention code
    timeCurrent = Date.now(); // get current time
    if (timeCurrent - timePrev <= optionInterval.getValue()) { // if the difference between the times is less than or equal to the interval specified by the player,
        timePrev = timeCurrent; // update previous click time
        return false; // do not cancel the event
    }
    else { // otherwise,
        timePrev = timeCurrent; // update previous click time
        game.playSoundUI("item.shield.block", 0.25, 0.8); // play a sound effect to indicate the block
        if (optionNotif.getValue()) {
            (0, exports_1.sendGXUMessage)("Click again to confirm using Extra Things"); // show a notif if wanted
        }
        return true; // cancel it
    }
}
// listen for potential inputs
client.on("key-press", e => {
    e.cancel = prevent(e.keyCode);
});
client.on("click", e => {
    e.cancel = prevent(e.button);
});
