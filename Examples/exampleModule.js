"use strict";
const mod = new Module("Example", "Example Mod", "A showcase of Latite Scripting", 75 /* KeyCode.K */);
// adds a new setting to the module
let sliderSetting = mod.addNumberSetting("setting", "Example Slider", "Example Description", 
/*the minimum*/ 0, /*the maximum*/ 10000, /*the precision*/ 50);
// adds the module into the client
client.getModuleManager().registerModule(mod);
mod.on("enable", () => {
    // this happens when the module is enabled
    script.log("module enabled!");
    // accessing our setting
    // if we set our setting to 400, it will print "setting is set to 400"
    script.log("setting is set to " + sliderSetting.getValue());
});
mod.on("disable", () => {
    // this happens when module is disabled
    script.log("module disabled!");
});
mod.on("get-hold-to-toggle", () => {
    return false; // put true if you want the module to have the freelook behavior where you need to hold it
});
client.on("unload-script", (ev) => {
    if (ev.scriptName === script.name) {
        // remove our module when our script is unloaded
        client.getModuleManager().deregisterModule(mod);
    }
});
