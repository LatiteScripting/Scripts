"use strict";
const module = new HudModule("HiveBedwarsMap", "Hive Bedwars Map", "Adds a minimalistic rotating map for The Hive's Bedwars gamemode!", 118, true);

client.getModuleManager().registerModule(module);

const { maps, teamIcons, textures } = require("./maps.js");

let current = maps.default;

const mapRegex = /(?:\xbb \xa7r\xa7e)(.+)(?= \xa77won with \xa7f\d+ \xa77votes!)/;

const setState = (team, state) => {
    let island = current.islands.find(i => i.team == team.toLowerCase());
    if(island != undefined) island.state = state;
}

client.on("receive-chat", event => {
    if(!module.isEnabled()) return;

    let msg = event.message;
    
    if(mapRegex.test(msg)) current = maps[msg.match(mapRegex)[1]] || maps.default;
});

client.on("set-score", event => {
    if(!module.isEnabled()) return;

    let scores = JSON.parse(event.data).scoreInfo;
    let teams = scores.find(s => s.scoreValue == -3);

    if(!teams) return;

    for(let team of teamIcons) {
        if(teams.fakePlayerName.includes(team[1])) setState(team[0], "normal");
        else if(teams.fakePlayerName.includes(team[2])) setState(team[0], "broken");

        else setState(team[0], "eliminated");
    }
})

client.on("change-dimension", () => {
    if(!module.isEnabled()) return;

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

        graphics.drawTexture(texture, new Vector2(x, y), size, size, new Color(0, 0, 0, 1));
    });

    const pos = module.getPos();
    module.setRect(new Rect(pos.x, pos.y, pos.x + 150, pos.y + 150));
});