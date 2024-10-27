let module = new TextModule('dirhud', 'Direction Hud', 'Shows the cardinal directions in your HUD.', 0);
client.getModuleManager().registerModule(module);

const directions = [ "W", "NW", "N", "NE", "E", "SE", "S", "SW"]

module.on('text', () => {
    const rotation = (game.getLocalPlayer().getRotation().y + 180) % 360;
    const idx = Math.round(rotation / 45) % 8;
    const idxL = (idx - 1 + 8) % 8;
    const idxR = (idx + 1) % 8;

    return `${directions[idxL]} . . . . . . . . ${directions[idx]} . . . . . . . . ${directions[idxR]}`;
});

client.on('unload-script', evt => {
    if (evt.scriptName != script.name) return;
    client.getModuleManager().deregisterModule(module);
});