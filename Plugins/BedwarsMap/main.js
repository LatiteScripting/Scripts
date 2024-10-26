"use strict";

const module = new HudModule("BedwarsMap", "Bedwars Map", "Shows a minimalistic rotating map of The Hive Bedwars Solo and Duos maps!", 118, true);
let borderRadius = module.addNumberSetting('borderradius', 'Border Radius', 'Border Radius', 2, 10, 1, 7);
let squareSize = module.addNumberSetting('squaresize', 'Square Size', 'Square Size', 5, 25, 1, 20);

client.getModuleManager().registerModule(module);

const moduleSize = 150;
const distance = 50;

const bases = [
    { angle: 157.5, color: { r: 1.0, g: 0.00, b: 0.0, a: 1 } }, // Island 1 (Red)
    { angle: 202.5, color: { r: 1.0, g: 1.00, b: 0.0, a: 1 } }, // Island 2 (Yellow)
    { angle: 247.5, color: { r: 0.5, g: 0.50, b: 0.5, a: 1 } }, // Island 3 (Gray)
    { angle: 292.5, color: { r: 0.0, g: 0.00, b: 1.0, a: 1 } }, // Island 4 (Blue)
    { angle: 337.5, color: { r: 1.0, g: 0.65, b: 0.0, a: 1 } }, // Island 5 (Orange)
    { angle: 22.50, color: { r: 0.0, g: 1.00, b: 1.0, a: 1 } }, // Island 6 (Cyan)
    { angle: 67.50, color: { r: 0.0, g: 1.00, b: 0.0, a: 1 } }, // Island 7 (Green)
    { angle: 112.5, color: { r: 0.6, g: 0.00, b: 1.0, a: 1 } }  // Island 8 (Purple)
];

let offset = 0;
let override = 0;

client.on('receive-chat', evt => {
    if (!module.isEnabled()) return;

    if (!evt.message.includes('won with')) return;

    override = 0;

    if (evt.message.includes('Sway Bells')) override = -90;
    if (evt.message.includes('Oceanic')) override = 90;
    if (evt.message.includes('Atlantis')) override = 90;
});

module.on("render", () => {
    const modulePos = module.getPos();
    const rot = game.getLocalPlayer().getRotation().y;

    let angle = 0;

    if (rot >= 45 && rot <= 135) angle = 0;
    else if (rot > -45 && rot < 45) angle = 90;
    else if (rot >= -135 && rot < -45) angle = 180;
    else angle = -90;

    if (override !== 0) angle += override;

    angle = (angle + 360) % 360;

    offset += (((angle - offset + 180) % 360) - 180) * 0.1;

    bases.forEach(base => {
        const radians = ((base.angle + offset) * Math.PI) / 180;

        const x = (moduleSize / 2) + distance * Math.cos(radians);
        const y = (moduleSize / 2) + distance * Math.sin(radians);

        const size = squareSize.getValue() / 2;

        graphics.fillRect(new Rect(x - size - 1, y - size - 1, x + size + 1, y + size + 1), Color.BLACK, borderRadius.getValue());
        graphics.fillRect(new Rect(x - size, y - size, x + size, y + size), base.color, borderRadius.getValue() - 1);
    });

    module.setRect(new Rect(modulePos.x, modulePos.y, modulePos.x + moduleSize, modulePos.y + moduleSize));
});

client.on("unload-script", evt => {
    if (evt.scriptName !== script.name) return;
    client.getModuleManager().deregisterModule(module);
});