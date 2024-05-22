"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textWidth = exports.drawText3D = void 0;
// draw text in 3D space using 16 segnment display style
function drawText3D(text, x, y, z, color, facing, scale = 0.25, cull = false) {
    // iterate over each line and draw it using lines from graphics3d
    const lines = text.split("\n");
    const lineHeight = 3 * scale; // adjust as needed
    const startVector = new Vector3();
    const endVector = new Vector3();
    const offsetVector = new Vector3();
    graphics3D.setColor(color);
    lines.forEach((line, lineIndex) => {
        line = line.toUpperCase();
        const allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.,/";
        if (line.split("").some(letter => !allowedCharacters.includes(letter)))
            graphics3D.setColor(color);
        line.split("").forEach((letter, i) => {
            if (letter === ' ')
                return; // skip drawing for spaces
            const segments = letters[letter];
            if (!segments)
                return;
            segments.forEach(segment => {
                const [start, end] = segment;
                const startRotated = rotate(start, facing);
                const endRotated = rotate(end, facing);
                offsetVector.x = i * 1.5 * scale;
                offsetVector.y = -lineIndex * lineHeight;
                offsetVector.z = 0;
                const offset = rotate(offsetVector, facing);
                startVector.x = x + startRotated.x * scale + offset.x;
                startVector.y = y + startRotated.y * scale + offset.y;
                startVector.z = z + startRotated.z * scale + offset.z;
                endVector.x = x + endRotated.x * scale + offset.x;
                endVector.y = y + endRotated.y * scale + offset.y;
                endVector.z = z + endRotated.z * scale + offset.z;
                graphics3D.drawLine(startVector, endVector);
            });
        });
    });
    graphics3D.finish(!cull);
}
exports.drawText3D = drawText3D;
function rotate(v, facing) {
    switch (facing) {
        case 0 /* Facing.North */: return v;
        case 1 /* Facing.East */: return new Vector3(-v.z, v.y, v.x);
        case 2 /* Facing.South */: return new Vector3(-v.x, v.y, -v.z);
        case 3 /* Facing.West */: return new Vector3(v.z, v.y, -v.x);
    }
}
function textWidth(text, scale = 0.25) {
    const lines = text.split("\n");
    let width = 0;
    lines.forEach(line => {
        width = Math.max(width, line.length * 1.5 * scale);
    });
    return width;
}
exports.textWidth = textWidth;
// middle one from this image https://github.com/dmadison/LED-Segment-ASCII/blob/master/Images/Segment-Labels.png
const s = {
    top: [new Vector3(0, 2, 0), new Vector3(1, 2, 0)],
    topR: [new Vector3(1, 2, 0), new Vector3(1, 1, 0)],
    botR: [new Vector3(1, 1, 0), new Vector3(1, 0, 0)],
    bot: [new Vector3(1, 0, 0), new Vector3(0, 0, 0)],
    botL: [new Vector3(0, 0, 0), new Vector3(0, 1, 0)],
    topL: [new Vector3(0, 1, 0), new Vector3(0, 2, 0)],
    midL: [new Vector3(0, 1, 0), new Vector3(0.5, 1, 0)],
    midR: [new Vector3(0.5, 1, 0), new Vector3(1, 1, 0)],
    TopLMid: [new Vector3(0, 2, 0), new Vector3(0.5, 1, 0)],
    TopMMid: [new Vector3(0.5, 2, 0), new Vector3(0.5, 1, 0)],
    TopRMid: [new Vector3(1, 2, 0), new Vector3(0.5, 1, 0)],
    BotLMid: [new Vector3(0, 0, 0), new Vector3(0.5, 1, 0)],
    BotMMid: [new Vector3(0.5, 0, 0), new Vector3(0.5, 1, 0)],
    BotRMid: [new Vector3(1, 0, 0), new Vector3(0.5, 1, 0)],
    //optimizations
    left: [new Vector3(0, 0, 0), new Vector3(0, 2, 0)],
    right: [new Vector3(1, 0, 0), new Vector3(1, 2, 0)],
    middle: [new Vector3(0, 1, 0), new Vector3(1, 1, 0)],
    BotLTopR: [new Vector3(0, 0, 0), new Vector3(1, 2, 0)],
    TopLBotR: [new Vector3(0, 2, 0), new Vector3(1, 0, 0)],
    midLine: [new Vector3(0.5, 0, 0), new Vector3(0.5, 2, 0)],
};
const letters = {
    "0": [s.top, s.right, s.bot, s.left, s.BotLTopR],
    "1": [s.TopRMid, s.right],
    "2": [s.top, s.topR, s.middle, s.botL, s.bot],
    "3": [s.top, s.midR, s.right, s.bot],
    "4": [s.middle, s.topL, s.right],
    "5": [s.top, s.topL, s.midL, s.BotRMid, s.bot],
    "6": [s.top, s.left, s.middle, s.botR, s.bot],
    "7": [s.top, s.right],
    "8": [s.top, s.right, s.bot, s.left, s.middle],
    "9": [s.top, s.right, s.bot, s.middle, s.topL],
    "A": [s.top, s.middle, s.left, s.right],
    "B": [s.top, s.right, s.midLine, s.midR, s.bot],
    "C": [s.top, s.left, s.bot],
    "D": [s.top, s.right, s.bot, s.midLine],
    "E": [s.top, s.left, s.midL, s.bot],
    "F": [s.top, s.left, s.midL],
    "G": [s.top, s.left, s.bot, s.botR, s.midR],
    "H": [s.right, s.left, s.middle],
    "I": [s.top, s.midLine, s.bot],
    "J": [s.right, s.bot, s.botL],
    "K": [s.left, s.midL, s.TopRMid, s.BotRMid],
    "L": [s.left, s.bot],
    "M": [s.left, s.TopLMid, s.TopRMid, s.right],
    "N": [s.left, s.TopLBotR, s.right],
    "O": [s.top, s.right, s.bot, s.left],
    "P": [s.top, s.topR, s.middle, s.left],
    "Q": [s.top, s.right, s.bot, s.left, s.BotRMid],
    "R": [s.top, s.topR, s.middle, s.left, s.BotRMid],
    "S": [s.top, s.topL, s.middle, s.botR, s.bot],
    "T": [s.top, s.midLine],
    "U": [s.right, s.bot, s.left],
    "V": [s.left, s.BotLTopR],
    "W": [s.left, s.BotLMid, s.BotRMid, s.right],
    "X": [s.BotLTopR, s.TopLBotR],
    "Y": [s.topL, s.middle, s.right, s.bot],
    "Z": [s.top, s.BotLTopR, s.bot],
    "/": [s.BotLTopR],
    ":": [[new Vector3(0.3, 0.3, 0), new Vector3(0.7, 0.3, 0)], [new Vector3(0.7, 0.3, 0), new Vector3(0.7, 0.6, 0)], [new Vector3(0.7, 0.6, 0), new Vector3(0.3, 0.6, 0)], [new Vector3(0.3, 0.6, 0), new Vector3(0.3, 0.3, 0)], [new Vector3(0.3, 1.4, 0), new Vector3(0.7, 1.4, 0)], [new Vector3(0.7, 1.4, 0), new Vector3(0.7, 1.7, 0)], [new Vector3(0.7, 1.7, 0), new Vector3(0.3, 1.7, 0)], [new Vector3(0.3, 1.7, 0), new Vector3(0.3, 1.4, 0)]],
    ".": [[new Vector3(0.45, 0, 0), new Vector3(0.45, 0.1, 0)], [new Vector3(0.45, 0.1, 0), new Vector3(0.5, 0.1, 0)], [new Vector3(0.5, 0.1, 0), new Vector3(0.5, 0, 0)], [new Vector3(0.5, 0, 0), new Vector3(0.45, 0, 0)]],
    ",": [[new Vector3(0.45, 0.1, 0), new Vector3(0.55, 0.1, 0)], [new Vector3(0.55, 0.1, 0), new Vector3(0.5, -0.1, 0)], [new Vector3(0.5, -0.1, 0), new Vector3(0.4, -0.1, 0)], [new Vector3(0.4, -0.1, 0), new Vector3(0.45, 0.1, 0)]],
};
