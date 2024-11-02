"use strict";
const module = new HudModule("BedwarsMap", "Bedwars Map", "Adds a minimalistic rotating map for The Hive's Bedwars gamemode!", 118, true);
client.getModuleManager().registerModule(module);

const { maps } = require('./maps.js');

let currentMap = maps.default;

const elimRegex = /(?:\xbb \xa7r\xa7\w)(\w+)(?= Team \xa77has been eliminated!)/;
const mapRegex = /(?:\xbb \xa7r\xa7e)(.+)(?= \xa77won with \xa7f\d+ \xa77votes!)/;
const bedRegex = /\xa7\w(\w+)(?= Team Bed Destroyed)/;

client.on('receive-chat', event => {
    if(!module.isEnabled()) return;

    let msg = event.message;

    if(elimRegex.test(msg)) return elimTeam(msg.match(elimRegex)[1]);
    if(bedRegex.test(msg)) return breakTeam(msg.match(bedRegex)[1]);
    if(mapRegex.test(msg)) return lookupMap(msg.match(mapRegex)[1]);
});

function breakTeam(team) {
    currentMap.islands.find(island => island.team == team.toLowerCase()).broken = true;
}

function elimTeam(team) {
    currentMap.islands.find(island => island.team == team.toLowerCase()).eliminated = true;
}

function lookupMap(map) {
    return currentMap = maps[map] || maps.default;
}

client.on('change-dimension', () => {
    if(dimension.getName() != 'Overworld') return;
    for(let island of currentMap.islands) {
        island.eliminated = false;
        island.broken = false;
    }
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

        let size = 10;

        graphics.fillRect(new Rect(x - size - 1, y - size - 1, x + size + 1, y + size + 1), Color.BLACK.asAlpha(island.eliminated ? 0.25 : 1), 7);

        if(island.broken && !island.eliminated) size -= 2;
        graphics.fillRect(new Rect(x - size, y - size, x + size, y + size), new Color(...island.color, island.eliminated ? 0.25 : 1), 6);
    });

    module.setRect(new Rect(modulePos.x, modulePos.y, modulePos.x + 150, modulePos.y + 150));
});