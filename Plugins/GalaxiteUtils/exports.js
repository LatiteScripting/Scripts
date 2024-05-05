"use strict";
// A few common functions for use across files.
// Put this everywhere:
// import { notOnGalaxite } from "./exports";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.notOnGalaxite = void 0;
/**
* Returns `true` if the player is not on Galaxite; `false` if they are.
*/
function notOnGalaxite() {
    // return true if you are on anything BUT galaxite. this way i can just do `if(notOnGalaxite()) return;` on every client.on()
    return (game.getFeaturedServer() != "Galaxite");
}
exports.notOnGalaxite = notOnGalaxite;
/**
 * Debug mode
 */
exports.debug = false;
// module.exports = notOnGalaxite;
