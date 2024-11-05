"use strict";
const module = new HudModule("HiveBedwarsMap", "Hive Bedwars Map", "Adds a minimalistic rotating map for The Hive's Bedwars gamemode!", 118, true);
client.getModuleManager().registerModule(module);

const { maps, textures } = require("./maps.js");

let current = maps.default;

const elimRegex = /(?:\xbb \xa7r\xa7\w)(\w+)(?= Team \xa77has been eliminated!)/;
const mapRegex = /(?:\xbb \xa7r\xa7e)(.+)(?= \xa77won with \xa7f\d+ \xa77votes!)/;
const bedRegex = /\xa7\w(\w+)(?= Team Bed Destroyed)/;

const setState = (team, state) =>
    current.islands.find(i => i.team == team.toLowerCase()).state = state;

client.on("receive-chat", event => {
    if(!module.isEnabled()) return;

    let msg = event.message;

    if(elimRegex.test(msg)) return setState(msg.match(elimRegex)[1], "eliminated");
    if(bedRegex.test(msg)) return setState(msg.match(bedRegex)[1], "broken");
    
    if(mapRegex.test(msg)) current = maps[msg.match(mapRegex)[1]] || maps.default;
});

client.on("change-dimension", () => {
    if(dimension.getName() != "Overworld") return;
    for(let island of current.islands) island.state = "normal"
})

let offset = 0;

module.on("render", () => {
    const rot = game.getLocalPlayer().getRotation().y;

    let angle =
        ((rot >=   45 && rot <= 135) *   0) +
        ((rot >=  -45 && rot <=  45) *  90) +
        ((rot >= -135 && rot <= -45) * 180) +
        ((rot <= -135 || rot >= 135) * -90) ;

    offset += (((angle - offset + 180) % 360) - 180) * 0.1;

    current.islands.forEach(island => {
        const radians = ((island.angle + offset) * Math.PI) / 180;

        const size = 25;
        
        const x = 75 + (current.distance * Math.cos(radians)) - size / 2;
        const y = 75 + (current.distance * Math.sin(radians)) - size / 2;

        const texture = textures[island.team][island.state || "normal"]

        graphics.drawTexture(texture, new Vector2(x, y), size, size, new Color(0, 0, 0, 0.25));
    });

    const pos = module.getPos();
    module.setRect(new Rect(pos.x, pos.y, pos.x + 150, pos.y + 150));
});