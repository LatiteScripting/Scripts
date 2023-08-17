// example 1: find modules by names
// returns null if theres no module with the name Fullbright
let fMod = client.getModuleManager().getModuleByName("Fullbright");
if (fMod != null) {
    fMod.setEnabled(true); // turn on fullbright if it exists
    script.log("Fullbright exists");
} else {
    script.log("Fullbright does not exist")
}

// example 2: through each module in the client
let mods = client.getModuleManager().forEachModule(mod => {
    // print out the modules display name + description
    script.log(TextColor.AQUA + mod.displayName + ": " + mod.description);
    // whether the module is hud or not
    script.log(TextColor.GRAY + "- isHUD: " + mod.visual)
    // whether the module is visible in the menu or not
    script.log(TextColor.GRAY + "- visible: " + mod.visible)

    // get all of that module's settings
    let settings = mod.getSettings()


    script.log(TextColor.GRAY + "- Settings: ")
    // go through all settings
    for (let setting of settings) {
        // prints out the settings name and the value of the setting
        script.log(TextColor.GRAY + "- - " + setting.name + " = " + setting.getValue());
    }
});