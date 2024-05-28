"use strict";
/// <reference path="C:/l-api/defs/index.d.ts"/>
let ssc = new Module("structurescanner", "Structure Scanner", "Scans and lists blocks/items used inside a pre-determined box. Useful for getting the list for a farm/structure", 0);
let pos1;
let pos2;
let ssccmd = new Command("sscan", "Structure Scanner Command", "\n$ pos1|pos2 [x] [y] [z]\n$ scan [export] [clipboard|csv] [name]", ["ssc"]);
let clipboard = require("clipboard");
let fs = require("filesystem");
function send(message) {
    clientMessage(`[\xa79Structure Scanner\xa7r] ${message}`);
}
ssccmd.on("execute", (label, args, commandLine) => {
    var _a, _b;
    if (game.getServer()) {
        send("This command is not available in multiplayer");
        return true;
    }
    switch (args[0]) {
        case "pos1":
        case "1":
        case "p1":
            let selected = (_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.getSelectedBlock();
            if (args[1]) {
                if (!args[3])
                    return false;
                selected = new Vector3(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
            }
            if (!selected) {
                send("You must be looking at a block to use this command");
                return true;
            }
            pos1 = selected;
            send("Position 1 set to " + pos1.x + ", " + pos1.y + ", " + pos1.z);
            break;
        case "pos2":
        case "2":
        case "p2":
            let selected2 = (_b = game.getLocalPlayer()) === null || _b === void 0 ? void 0 : _b.getSelectedBlock();
            if (args[1]) {
                if (!args[3])
                    return false;
                selected2 = new Vector3(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
            }
            if (!selected2) {
                send("You must be looking at a block to use this command");
                return true;
            }
            pos2 = selected2;
            send("Position 2 set to " + pos2.x + ", " + pos2.y + ", " + pos2.z);
            break;
        case "scan":
            let startTime = new Date().getTime();
            if (!pos1 || !pos2) {
                send("You must set both positions before scanning");
                return true;
            }
            let blocks = new Map();
            let x1 = Math.min(pos1.x, pos2.x);
            let x2 = Math.max(pos1.x, pos2.x);
            let y1 = Math.min(pos1.y, pos2.y);
            let y2 = Math.max(pos1.y, pos2.y);
            let z1 = Math.min(pos1.z, pos2.z);
            let z2 = Math.max(pos1.z, pos2.z);
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    for (let z = z1; z <= z2; z++) {
                        let block = dimension.getBlock(x, y, z);
                        if (block) {
                            let blockName = block.name;
                            if (blockName == "minecraft:air")
                                continue;
                            blockName = blockName.split(":")[1];
                            if (blocks.get(blockName)) {
                                blocks.set(blockName, blocks.get(blockName) + 1);
                            }
                            else {
                                blocks.set(blockName, 1);
                            }
                        }
                    }
                }
            }
            let blockList = Array.from(blocks.keys());
            let blockCount = Array.from(blocks.values());
            send("Scanned " + blockList.length + " unique blocks");
            for (let i = 0; i < blockList.length; i++) {
                //beutify the block name
                let name = blockList[i].replace(/_/g, " ");
                name = name.replace(/\b\w/g, l => l.toUpperCase());
                send(name + ": " + blockCount[i]);
            }
            let endTime = new Date().getTime();
            let time = endTime - startTime;
            send("Scan completed in " + time + "ms");
            send(`Total blocks scanned: ${x2 - x1 + 1}x${y2 - y1 + 1}x${z2 - z1 + 1} = ${(x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1)}`);
            let totalcount = 0;
            for (let i = 0; i < blockCount.length; i++) {
                totalcount += blockCount[i];
            }
            send(`Total blocks found: ${totalcount}`);
            if (args[1] == "export") {
                if (args[2] == null || args[2] == "clipboard") { // default
                    let exportString = "Blocks/Count\n";
                    for (let i = 0; i < blockList.length; i++) {
                        let name = blockList[i].replace(/_/g, " ");
                        name = "\n" + name.replace(/\b\w/g, l => l.toUpperCase());
                        exportString += name + ": " + blockCount[i];
                    }
                    clipboard.set(exportString);
                    send("Exported to clipboard");
                    return true;
                }
                else if (args[2] == "csv") {
                    let exportString = "Block,Count\n";
                    for (let i = 0; i < blockList.length; i++) {
                        exportString += blockList[i] + "," + blockCount[i] + "\n";
                    }
                    let filename = args[3] ? args[3] : `structure_scan_${new Date().getTime()}`;
                    fs.write(filename + ".csv", util.stringToBuffer(exportString));
                    send("Exported to " + filename + ".csv");
                    return true;
                }
                return false;
            }
            break;
        default: return false;
    }
    return true;
});
client.on("render3d", e => {
});
client.getCommandManager().registerCommand(ssccmd);
