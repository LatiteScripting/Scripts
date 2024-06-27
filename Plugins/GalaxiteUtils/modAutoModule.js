"use strict";
// Auto-Module: Automatically toggles the state of certain modules in certain games.
// List:
// - The Entity: Toggle Sprint
// - Alien Blast: Toggle Sprint
// - Chronos: Coordinates
// - Parkour Builders: Environment Changer
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
const WhereAmAPI_1 = require("./WhereAmAPI");
let autoModule = new Module("automodule", "GXU: Auto Module Toggles", "Automatically turns off specific modules in certain games.\nIf a setting is on, its corresponding module will be enabled automatically.", 0 /* KeyCode.None */);
// let ch_coords = autoModule.addBoolSetting(
//     "chronos-coordinates",
//     "Coordinates (Chronos)",
//     "Turns off Coordinates while in Chronos.",
//     false
// );
let en_toggle = autoModule.addBoolSetting("entity-toggles", "Toggle Sprint (The Entity)", "Turns off Toggle Sprint while in The Entity.", false);
let ab_toggle = autoModule.addBoolSetting("alienblast-toggles", "Toggle Sprint (Alien Blast)", "Turns off Toggle Sprint while in Alien Blast.", false);
let pkb_environment = autoModule.addBoolSetting("pkb-environment", "Environment Changer (Parkour Builders)", "Turns off Environment Changer while playing or building a parkour in Parkour Builders.", false);
let pkb_toggle = autoModule.addBoolSetting("pkb-toggles", "Toggle Sprint (Parkour Builders)", "Turns off Toggle Sprint while playing or building a parkour in Parkour Builders. (Mainly useful for certain jumps with precise inputs.)", false);
client.getModuleManager().registerModule(autoModule);
/*
Some points:
- How to know if the module should be enabled?
  - Cop-out: Just use the setting as an indication of whether the user wants the setting
  - `leave-game` event doesn't fire on game close, so other methods would be too unreliable given the chance of ragequits
*/
function tryDisableModules() {
    const mmg = client.getModuleManager();
    let toggles = mmg.getModuleByName("ToggleSprintSneak");
    // let coords = client.getModuleManager().getModuleByName("Coordinates")!;
    let environmentChanger = mmg.getModuleByName("EnvironmentChanger");
    if (en_toggle.getValue()) {
        if (WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.THE_ENITTY)
            toggles.setEnabled(false);
        else
            toggles.setEnabled(true);
    }
    if (ab_toggle.getValue()) {
        if (WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.ALIEN_BLAST)
            toggles.setEnabled(false);
        else
            toggles.setEnabled(true);
    }
    if (pkb_environment.getValue()) {
        if (WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.PARKOUR_BUILD || WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.PARKOUR_PLAY)
            environmentChanger.setEnabled(false);
        else
            environmentChanger.setEnabled(true);
    }
    if (pkb_toggle.getValue()) {
        if (WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.PARKOUR_BUILD || WhereAmAPI_1.api.game == WhereAmAPI_1.GameName.PARKOUR_PLAY)
            toggles.setEnabled(false);
        else
            toggles.setEnabled(true);
    }
}
function resetOtherModules() {
    const mmg = client.getModuleManager();
    let toggles = mmg.getModuleByName("ToggleSprintSneak");
    // let coords = client.getModuleManager().getModuleByName("Coordinates")!;
    let environmentChanger = mmg.getModuleByName("EnvironmentChanger");
    if (ab_toggle.getValue() || en_toggle.getValue() || pkb_toggle.getValue())
        toggles.setEnabled(true);
    if (pkb_environment.getValue())
        environmentChanger.setEnabled(true);
}
// Main hook
WhereAmAPI_1.api.on("whereami-update", () => {
    if (!autoModule.isEnabled())
        return; // no notOnGalaxite() since this event covers it already
    tryDisableModules();
});
// Handle the case of the module being enabled while in a game
autoModule.on("enable", () => {
    if ((0, exports_1.notOnGalaxite)())
        return;
    tryDisableModules();
});
// Handle the case of a ragequit where the user does not log back into Galaxite (aka desync correction)
client.on("join-game", e => {
    if (!autoModule.isEnabled())
        return;
    if (!(0, exports_1.notOnGalaxite)())
        return; // If ON GALAXITE, do nothing (this case is handled by whereami-update)
    resetOtherModules();
});
// Handle the case of AutoModules being disabled while in action
autoModule.on("disable", () => {
    resetOtherModules();
});
