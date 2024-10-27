"use strict";

const module = new HudModule("BedwarsMap", "Bedwars Map", "Shows a minimalistic rotating map of The Hive BedWars Solo and Duo maps", 118, true);
let borderRadius = module.addNumberSetting('borderradius', 'Border Radius', 'Border Radius', 2, 10, 1, 7);
let squareSize = module.addNumberSetting('squaresize', 'Square Size', 'Square Size', 5, 25, 1, 20);
let alphaElim = module.addBoolSetting('alphaelim', 'Elimination Alpha', 'Make teams darker/transparent when eliminated (Does not work on teams that did not spawn in!)', false);

client.getModuleManager().registerModule(module);

const moduleSize = 150;
const distance = 50;

const bases = [
    { angle: 157.5, color: new Color(1.0, 0.00, 0.0, 1), eliminated: false, team: 'red'     },
    { angle: 202.5, color: new Color(1.0, 1.00, 0.0, 1), eliminated: false, team: 'yellow'  },
    { angle: 247.5, color: new Color(0.5, 0.50, 0.5, 1), eliminated: false, team: 'gray'    },
    { angle: 292.5, color: new Color(0.0, 0.00, 1.0, 1), eliminated: false, team: 'blue'    },
    { angle: 337.5, color: new Color(1.0, 0.65, 0.0, 1), eliminated: false, team: 'orange'  },
    { angle: 22.50, color: new Color(0.0, 1.00, 1.0, 1), eliminated: false, team: 'aqua'    },
    { angle: 67.50, color: new Color(0.0, 1.00, 0.0, 1), eliminated: false, team: 'green'   },
    { angle: 112.5, color: new Color(0.6, 0.00, 1.0, 1), eliminated: false, team: 'magenta' }
];

let offset = 0;
let override = 0;

client.on('receive-chat', evt => {
    if (!module.isEnabled()) return;

    if(evt.message.includes('has been eliminated!')) return parseTeamElim(evt.message);
    if(evt.message.includes('won with')) return parseMap(evt.message);
});

client.on('change-dimension', () => {
    if(dimension.getName() != 'Overworld') return
    for(let base of bases) base.eliminated = false;
})

function parseTeamElim(message) {
    if(!alphaElim.getValue()) return;
    const team = message.replace(/\xa7.|\xbb |has been eliminated!| team./gi, '').toLowerCase();
    bases.find(base => base.team == team).eliminated = true;
}

function parseMap(message) {
    if (message.includes('Sway Bells')) return override = -90;
    if (message.includes('Oceanic'))    return override =  90;
    if (message.includes('Atlantis'))   return override =  90;
    
    override = 0;
}

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

        graphics.fillRect(new Rect(x - size - 1, y - size - 1, x + size + 1, y + size + 1), Color.BLACK.asAlpha(base.eliminated ? 0.25 : 1), borderRadius.getValue());
        graphics.fillRect(new Rect(x - size, y - size, x + size, y + size), base.color.asAlpha(base.eliminated ? 0.25 : 1), borderRadius.getValue() - 1);
    });

    module.setRect(new Rect(modulePos.x, modulePos.y, modulePos.x + moduleSize, modulePos.y + moduleSize));
});

client.on("unload-script", evt => {
    if (evt.scriptName !== script.name) return;
    client.getModuleManager().deregisterModule(module);
});