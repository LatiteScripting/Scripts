"use strict";
const module = new HudModule("BedwarsMap", "Bedwars Map", "Adds a minimalistic rotating map for The Hive's Bedwars gamemode!", 118, true);
client.getModuleManager().registerModule(module);

let borderRadius = module.addNumberSetting('borderradius', 'Border Radius', 'Border Radius', 2, 10, 1, 7);
let squareSize = module.addNumberSetting('squaresize', 'Square Size', 'Square Size', 5, 25, 1, 20);
let elimAlpha = module.addBoolSetting('elimalpha', 'Elimination Alpha', 'Make teams darker/transparent when eliminated (Does not work on teams that did not spawn in!)', false);

const { maps } = require('./maps.js');

let currentMap = maps.default;

const elimRegex = /(?:\xbb \xa7r\xa7\w)(\w+)(?= Team \xa77has been eliminated!)/;
const mapRegex = /(?:\xbb \xa7r\xa7e)(.+)(?= \xa77won with \xa7f\d+ \xa77votes!)/;

client.on('receive-chat', event => {
    if(!module.isEnabled()) return;

    let msg = event.message;

    if(elimRegex.test(msg) && elimAlpha.getValue())
        return elimTeam(msg.match(elimRegex)[1]);

    if(mapRegex.test(msg))
        return lookupMap(msg.match(mapRegex)[1]);
});

function elimTeam(team) {
    currentMap.islands.find(island => island.team == team.toLowerCase()).eliminated = true;
}

function lookupMap(map) {
    return currentMap = maps[map] || maps.default;
}

client.on('change-dimension', () => {
    if(dimension.getName() != 'Overworld') return;
    for(let island of currentMap.islands) island.eliminated = false;
})

let offset = 0;

module.on("render", () => {
    const modulePos = module.getPos();
    const rot = game.getLocalPlayer().getRotation().y;

    let angle = 0;

    if (rot >= 45 && rot <= 135) angle = 0;
    else if (rot > -45 && rot < 45) angle = 90;
    else if (rot >= -135 && rot < -45) angle = 180;
    else angle = -90;

    offset += (((angle - offset + 180) % 360) - 180) * 0.1;

    currentMap.islands.forEach(island => {
        const radians = ((island.angle + offset) * Math.PI) / 180;

        const x = 75 + currentMap.distance * Math.cos(radians);
        const y = 75 + currentMap.distance * Math.sin(radians);

        const size = squareSize.getValue() / 2;

        graphics.fillRect(new Rect(x - size - 1, y - size - 1, x + size + 1, y + size + 1), Color.BLACK.asAlpha(island.eliminated ? 0.25 : 1), borderRadius.getValue());
        graphics.fillRect(new Rect(x - size, y - size, x + size, y + size), new Color(...island.color, island.eliminated ? 0.25 : 1), borderRadius.getValue() - 1);
    });

    module.setRect(new Rect(modulePos.x, modulePos.y, modulePos.x + 150, modulePos.y + 150));
});

client.on("unload-script", event => {
    if(event.scriptName != script.name) return;
    client.getModuleManager().deregisterModule(module);
});