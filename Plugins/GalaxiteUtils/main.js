"use strict";
// if you're reading this and know what you're doing please open a pr to fix my garbage ts
// i learned this language with freecodecamp, miniscule c#/python knowledge, and looking at the script examples lol
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
// Main file for non-module settings (currently unused).
// import { notOnGalaxite } from "./exports";
// Import other modules
let modAutoGG = require("modAutoGG");
// let modAutoModule = require("modAutoModule");
let modChatDebloat = require("modChatDebloat");
let modCompactBadges = require("modCompactBadges");
// let modEntitySpeedrunTimer = require("modEntitySpeedrunTimer");
let modExtraThingsPrevent = require("modExtraThingsPrevent");
// let modInvisibleIndicator = require("modInvisibleIndicator"); // Galaxite removed a lot of invisibility cues
// let modKitUI = require("modKitUI");
// let modPKBAttempts = require("modPKBAttempts");
// let modTeamUI = require("modTeamUI");
let modWhereAmIHUD = require("modWhereAmIHUD");
client.on("key-press", k => {
    if (k.isDown &&
        k.keyCode == 187 /* KeyCode.Plus */ &&
        !(0, exports_1.notOnGalaxite)() &&
        exports_1.debug) {
        let str = "";
        for (let i = 0xe000; i < 0xe300; i++) { // gala uses 0xe0?? - 0xe2??
            str += (i - 0xe000).toString(16) + ": " + String.fromCharCode(i) + ", ";
        }
        clientMessage(str);
    }
});
