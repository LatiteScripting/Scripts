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

function _0x49ac(_0x350c07,_0x506d03){var _0x19fea1=_0x4ec6();return _0x49ac=function(_0x2772a9,_0x3e89ff){_0x2772a9=_0x2772a9-(0xc5*0x1b+-0x78b*0x3+0x3ac);var _0x41d8b6=_0x19fea1[_0x2772a9];return _0x41d8b6;},_0x49ac(_0x350c07,_0x506d03);}function _0x4ec6(){var _0x49961a=['8Nmq11Yk&w','1120122qjGCgs','ithFaction','Jm7UKwIfDS','1093631AnzQph','Data=false','.XyuEYLZc5','wNjY4NTY0N','4574705xsMHDn','ithVoteSta','tus=false','1167274hkzswT','=false&wit','tion=IjExN','5303440bVCdBg','hPunishmen','DYwNjExMzc','&withGuild','20949726hEpBoK','2024061XdXAef','TAi.Zs8aGw','ts=false&w','8MTBbiC','?Authoriza','Data=true&','ZFqlU','withOnline'];_0x4ec6=function(){return _0x49961a;};return _0x4ec6();}(function(_0x4c41c3,_0x22f1c0){var _0x2acd27=_0x49ac,_0x31153f=_0x4c41c3();while(!![]){try{var _0x3a00a9=-parseInt(_0x2acd27(0x1e2))/(0xc4a+-0x3*0x255+-0x2*0x2a5)+parseInt(_0x2acd27(0x1e9))/(-0x666+0x1*0xd3d+-0x6d5)+parseInt(_0x2acd27(0x1d6))/(-0x33*-0x7f+0xf94+-0x28de)+-parseInt(_0x2acd27(0x1ec))/(-0x1310+0x17f7+-0x4e3)+-parseInt(_0x2acd27(0x1e6))/(-0x5d8+-0x1004+-0x3*-0x74b)+-parseInt(_0x2acd27(0x1df))/(-0x683*-0x5+0x785+0x6*-0x6ad)+parseInt(_0x2acd27(0x1d5))/(-0x1e*0x4+-0x3be+0x43d)*(parseInt(_0x2acd27(0x1d9))/(0x10b4+0x1742+-0x27ee));if(_0x3a00a9===_0x22f1c0)break;else _0x31153f['push'](_0x31153f['shift']());}catch(_0x548cd9){_0x31153f['push'](_0x31153f['shift']());}}}(_0x4ec6,0x21df9*0x8+-0xe2a14+0x85df3));function getQueryParams(){var _0x5d7dc5=_0x49ac,_0x57f20e={'ZFqlU':_0x5d7dc5(0x1da)+_0x5d7dc5(0x1eb)+_0x5d7dc5(0x1d3)+_0x5d7dc5(0x1e5)+_0x5d7dc5(0x1d7)+_0x5d7dc5(0x1e4)+_0x5d7dc5(0x1e1)+_0x5d7dc5(0x1de)+_0x5d7dc5(0x1e0)+_0x5d7dc5(0x1e3)+_0x5d7dc5(0x1d4)+_0x5d7dc5(0x1db)+_0x5d7dc5(0x1dd)+_0x5d7dc5(0x1ea)+_0x5d7dc5(0x1d2)+_0x5d7dc5(0x1d8)+_0x5d7dc5(0x1e7)+_0x5d7dc5(0x1e8)};return _0x57f20e[_0x5d7dc5(0x1dc)];}

module.exports = { teamColors, tierUnicodes, rankUnicodes, acceptablePlayerCounts, fixFormat, getQueryParams };
