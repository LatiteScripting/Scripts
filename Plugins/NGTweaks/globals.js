/// <reference types="..\\node_modules\\@latitescripting\\latiteapi\\definitions"/>
// @ts-check
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const teamColors = {
    "a": "G",
    "c": "R",
    "d": "P",
    "e": "Y",
    "f": "W",
    "1": "B",
    "3": "C",
    "8": "G",
};

const tierUnicodes = {
    diamond: "\uE1A7",
    sapphire: "\uE1A6",
    amethyst: "\uE1A5",
    opal: "\uE1A4",
    gold: "\uE1A3",
    silver: "\uE1A2",
    bronze: "\uE1A1",
    steel: "\uE1A0"
};

const rankUnicodes = {
    designer: "\uE5FA",
    trainee: "\uE5F9",
    supervisor: "\uE5F8",
    advisor: "\uE5F7",
    admin: "\uE5F6",
    mod: "\uE5F5",
    crew: "\uE5F4",
    builder: "\uE5F3",
    developer: "\uE5F2",
    titan: "\uE5F0",
    partner: "\uE5E6",
    youtube: "\uE5E4",
    ultra: "\uE5E2",
    legend: "\uE5E1",
    emerald: "\uE5E0"
};

const acceptablePlayerCounts = [
    8,
    16,
    20
]

function fixFormat(_str) {
    return _str.replace(/§/g, "\u00A7").replace(/Â/g, '')
}

const NGAPITOKEN = "IjExNDYwNjExMzcwNjY4NTY0NTAi.Zs8aGw.XyuEYLZc5Jm7UKwIfDS8Nmq11Yk";
function getQueryParams() {
    return `?Authorization=${NGAPITOKEN}&withFactionData=false&withGuildData=true&withOnline=false&withPunishments=false&withVoteStatus=false`
}

module.exports = { teamColors, tierUnicodes, rankUnicodes, acceptablePlayerCounts, fixFormat, getQueryParams };