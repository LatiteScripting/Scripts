"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.module = void 0;
exports.module = new Module("ngtweaks", "NG Tweaks", "NetherGames Tweaks", 0);

exports.cacheOwnStats = void 0;
exports.cacheOwnStats = exports.module.addBoolSetting("cacheOwnStats", "Cache Own Stats", "Cache your own stats", true);
exports.maxCacheTime = void 0;
exports.maxCacheTime = exports.module.addNumberSetting("maxCacheTime", "Max Cache Time (mins)", "Max time (in mins) before cached stats are refreshed", 1, 60, 1, 15);

const http = require("http");

const NGAPITOKEN = "IjExNDYwNjExMzcwNjY4NTY0NTAi.Zs8aGw.XyuEYLZc5Jm7UKwIfDS8Nmq11Yk"; // DO NOT CHANGE THIS TOKEN, special permissions have been granted to it

var playerCache = {};

function fixFormat(_str) {
    return _str.split('§').join("\u00A7").split('Â').join('')
}

function getQueryParams(token) {
    return `?Authorization=${token}&withFactionData=false&withGuildData=true&withOnline=false&withPunishments=false&withVoteStatus=false`
}

function getTeam(teamColor) {
    const teamArray = {
        "a": "G",
        // "b": "C",
        "c": "R",
        "d": "P",
        "e": "Y",
        "f": "W",
        // "0": "B",
        "1": "B",
        // "2": "G",
        "3": "C",
        // "4": "R",
        // "5": "M",
        // "6": "O",
        "7": "G",
        "8": "G",
        // "9": "B"
    };
    const color = teamColor.charAt(1);
    return `\u00A7${color}\u00A7l${teamArray[color]} \u00A7r\u00A7${color}`
}

function getPrintStr(name, team, joinMesg, playerCount, extra) {
    if (playerCache[name]["nicked"]) {
        return `${getTeam(team)}${name}\u00A7r ${joinMesg} ${playerCount}! \u00A7r\u00A7cNicked\u00A7r ${extra}`;
    } else {
        return `${playerCache[name]["level"]} ${getTeam(team)}${name}\u00A7r [${playerCache[name]["guild"]}] (${playerCache[name]["kdr"]}) ${joinMesg} ${playerCount}! ${extra}`;
    }
}

client.on("receive-chat", (event) => {

    if (exports.module.isEnabled()) {

        if (game.getWorld().getName().toLowerCase().includes("nethergames")) {

            const mesg = fixFormat(event.message);
            const startIndex = mesg.indexOf(" \u00A7ehas joined ");

            if (startIndex != -1) {

                event.cancel = true;

                var teamColor, playerName = '';
                if (mesg.startsWith("\u00A7")) {
                    teamColor = mesg.substring(0, 2);
                    playerName = mesg.substring(2, startIndex);
                } else {
                    teamColor = "\u00A7f";
                    playerName = mesg.substring(0, startIndex);
                }
                const joinMesg = mesg.substring(startIndex + 1, startIndex + " §ehas joined ".length - 2);
                const playerCount = "\u00A7e" + mesg.substring(startIndex + " §ehas joined ".length - 1, mesg.length - 1);

                var send_new_api_req = true;

                if (playerCache[playerName]) {
                    if (playerName != game.getLocalPlayer().getName() || exports.cacheOwnStats.getValue()) {
                        if (playerCache[playerName]["cacheTime"] > new Date().getTime() - exports.maxCacheTime.getValue()*60*1000) {
                            send_new_api_req = false;
                            script.log(getPrintStr(playerName, teamColor, joinMesg, playerCount, "\u00A7r\u00A77(Cached)"));
                        }
                    }
                }

                if (send_new_api_req) {

                    const api_start = new Date().getTime();
                    http.getAsync(`https://api.ngmc.co/v1/players/${playerName.split(' ').join("%20")}${getQueryParams(NGAPITOKEN)}`, {}, (resp) => {

                        const api_time = (new Date().getTime() - api_start) / 1000;

                        if (resp.statusCode == 404) {

                            playerCache[playerName] = {
                                "nicked": true,
                                "cacheTime": new Date().getTime(),
                            };

                            script.log(getPrintStr(playerName, teamColor, joinMesg, playerCount, `\u00A7r\u00A77(${api_time}s)`));
                            
                        } else if (resp.statusCode == 200) {

                            const r = JSON.parse(util.bufferToString(resp.body));

                            var guild_tag = "N/a";
                            if (r["guildData"]) {
                                guild_tag = `\u00A7l${fixFormat(r["guildData"]["rawTag"])}\u00A7r`;
                            }

                            playerCache[playerName] = {
                                "nicked": false,
                                "cacheTime": new Date().getTime(),
                                "level": fixFormat(r["formattedLevel"] + "\u00A7r"),
                                "guild": guild_tag,
                                "kdr": r["kdr"],
                            };

                            script.log(getPrintStr(playerName, teamColor, joinMesg, playerCount, `\u00A7r\u00A77(${api_time}s)`));

                        } else {

                            script.log(`${mesg} \u00A7r\u00A77(\u00A7cNG API Error ${resp.statusCode}\u00A7r, \u00A77${api_time}s)`);

                        }

                    });

                }

            }

        }

    }

});

client.getModuleManager().registerModule(exports.module);
