"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundPitch = exports.soundVolume = exports.debugMode = void 0;
const main_1 = require("./main");
exports.debugMode = main_1.module.addBoolSetting("DebugMode", "Debug mode", "Logs stuff to chat", false);
exports.soundVolume = main_1.module.addNumberSetting("SoundVolume", "Sound volume", "Loudness of ping sound (default is 1)", 0.1, 1, 0.1, 1);
exports.soundPitch = main_1.module.addNumberSetting("PitchVolume", "Pitch volume", "Pitch of ping sound (default is 1)", 0.1, 5, 0.1, 1);
