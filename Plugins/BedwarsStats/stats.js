"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = void 0;
class stats {
    constructor(name, gamesPlayed, gamesWon, finalKills, kills, deaths, kd, winloss) {
        this.name = name;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.finalKills = finalKills;
        this.kills = kills;
        this.deaths = deaths;
        this.kd = kd;
        this.winloss = winloss;
    }
    toString() {
        return `Player: ${this.name}\nGames Played: ${this.gamesPlayed}\nGames Won: ${this.gamesWon}\nFinal Kills: ${this.finalKills}\nKills: ${this.kills}\nDeaths: ${this.deaths}\nK/D: ${this.kd.toFixed(1)}\nWin rate: ${this.winloss.toFixed(1)}%%%%%%%%`;
    }
}
exports.stats = stats;
