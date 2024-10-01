"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const mod = new Module("deathCoords", "DeathCoords", "Death Coordinates", 0);


const fs = require("filesystem");


var check = false;
const pluginText = "[\u00A79DeathCoordinates\u00A7r]"
const relativeFolder = "./deathcoords";
const relativeDir = relativeFolder + "/deathcoords.txt";


if (!fs.exists(relativeFolder)) {
    fs.createDirectory(relativeFolder);
    clientMessage(`\n${pluginText} Created <${relativeFolder}/>!\n `);
}

if (!fs.exists(relativeDir)) {
    fs.write(relativeDir, util.stringToBuffer(''));
    clientMessage(`\n${pluginText} Created <${relativeDir}>!\n `);
}


client.on("world-tick", () => {
    const player = game.getLocalPlayer();
    const health = player.getHealth();

    if (health > 0) {
        check = true;
    }

    if (health == 0 && check) {
        const playerPos = player.getPosition();
        const playerCoords = `[x:${playerPos.x.toFixed(2)} , y:${playerPos.y.toFixed(2)} , z:${playerPos.z.toFixed(2)}]`;
        clientMessage(`\n${pluginText} You died at ${playerCoords}\n `);
        fs.append(relativeDir, util.stringToBuffer(`[${new Date()}] -> ${playerCoords} -> ${world.getName()}\n`));
        check = false;
    }

});


client.getModuleManager().registerModule(mod);

