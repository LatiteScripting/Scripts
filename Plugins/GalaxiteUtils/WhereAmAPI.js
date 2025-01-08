"use strict";
// WhereAmAPI: Backend system that automatically sends and interprets /whereami responses, so it doesn't need to be handled module-by-module.
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.GameName = void 0;
const EventEmitter_1 = require("./EventEmitter");
const exports_1 = require("./exports");
var GameName;
(function (GameName) {
    GameName[GameName["UNKNOWN"] = -1] = "UNKNOWN";
    GameName[GameName["MAIN_HUB"] = 0] = "MAIN_HUB";
    GameName[GameName["FILL_THE_GAPS"] = 1] = "FILL_THE_GAPS";
    GameName[GameName["CORE_WARS"] = 2] = "CORE_WARS";
    GameName[GameName["PROP_HUNT"] = 3] = "PROP_HUNT";
    GameName[GameName["CHRONOS"] = 4] = "CHRONOS";
    GameName[GameName["HYPER_RACERS"] = 5] = "HYPER_RACERS";
    GameName[GameName["RUSH"] = 6] = "RUSH";
    GameName[GameName["PLAYGROUND"] = 7] = "PLAYGROUND";
    GameName[GameName["PARKOUR_HUB"] = 8] = "PARKOUR_HUB";
    GameName[GameName["PARKOUR_BUILD"] = 9] = "PARKOUR_BUILD";
    GameName[GameName["PARKOUR_PLAY"] = 10] = "PARKOUR_PLAY";
    GameName[GameName["THE_ENTITY"] = 11] = "THE_ENTITY";
    GameName[GameName["MY_FARM_LIFE"] = 12] = "MY_FARM_LIFE";
    GameName[GameName["ALIEN_BLAST"] = 13] = "ALIEN_BLAST";
    GameName[GameName["FROST_FIGHT"] = 14] = "FROST_FIGHT";
})(GameName || (exports.GameName = GameName = {}));
class WhereAmAPI extends EventEmitter_1.EventEmitter {
    runWhereAmI() {
        if ((0, exports_1.notOnGalaxite)())
            return;
        setTimeout(() => {
            game.executeCommand("/whereami");
            this.whereAmISent = true;
            this.whereAmIReceived = false;
        }, exports_1.optionWhereAmIDelay.getValue() * 1000);
    }
    /**
     * Reads a given field of the last /whereami response and returns the result.
     * @param field The field to read.
     * @returns Usually a string with the correct interpretation. Will only return `null` in case there is no ParkourUUID.
     */
    assign(field) {
        var _a;
        let def; // default is reserved
        if (field == "ParkourUUID")
            def = null;
        else
            def = "Unknown";
        return ((_a = this.response[field]) !== null && _a !== void 0 ? _a : def);
    }
    parseWhereAmI(message) {
        var _a, _b;
        let cancel = false;
        if (message.includes("ServerUUID:") && message.includes("\n")) { // Check for message (users can't send \n)
            let formattedMessage = message.replace("\uE3BC \xA7c", ""); // Cache message
            let entries = (_a = formattedMessage.split("\n\xA7c")) !== null && _a !== void 0 ? _a : ""; // Split up the response at this substring, in the process splitting by line and removing color
            let whereAmIPairs = [];
            for (let i = 0; i < entries.length; i++) { // For each entry:
                whereAmIPairs[i] = entries[i].split(": \xA7a"); // Save the key and its corresponding value, in the process removing color
            }
            /* The general structure of whereAmIPairs is:
            [
                ["Username" : username],
                ["ServerUUID" : serverUUID],
                ...
                ["FieldName" : fieldResult]
            ]
            */
            this.response = whereAmIPairs.reduce((prevVal, [key, value]) => {
                prevVal[key] = value;
                return prevVal;
            }, {});
            /* Response should now look like:
            {
                "Username" : username,
                "ServerUUID" : serverUUID,
                ...
                "FieldName" : fieldResult
            }
            */
            // Store entries
            this.username = game.getLocalPlayer().getName(); // this is being ran on a receive-chat event. there will be a player
            this.serverUUID = this.assign("ServerUUID");
            this.podName = this.assign("PodName");
            this.serverName = this.assign("ServerName");
            this.commitID = this.assign("CommitID");
            this.shulkerID = this.assign("ShulkerID");
            this.region = this.assign("Region");
            this.privacy = this.assign("Privacy");
            this.parkourUUID = this.assign("ParkourUUID"); // The assign function already considers the possibility of no entry
            this.game = (_b = nameToGame.get(this.serverName)) !== null && _b !== void 0 ? _b : GameName.UNKNOWN; // Assign the shorter game name field
            if (this.whereAmISent && exports_1.optionHideResponses.getValue())
                cancel = true;
            this.whereAmISent = false;
            this.whereAmIReceived = true; // whereami has been received
            this.emit("whereami-update");
        }
        return cancel;
    }
    constructor() {
        super();
        /**
         * For accuracy in sending bug reports, this doesn't actually store the results of the Username field.
         */
        this.username = "Unknown";
        /**
         * Stores the results of the ServerName field.
         */
        this.serverName = "Unknown";
        /**
         * Stores the ServerName field in enum form. Notably ignores team sizes.
         */
        this.game = GameName.UNKNOWN;
        /**
         * Stores the results of the Region field. (Will likely be either "us" or "eu".)
         */
        this.region = "Unknown";
        /**
         * Stores the results of the Privacy field. (Will likely either be "Public" or "Private".)
         */
        this.privacy = "Unknown";
        /**
         * Stores the results of the ServerUUID field.
         */
        this.serverUUID = "Unknown";
        /**
         * Stores the results of the PodName field.
         */
        this.podName = "Unknown";
        /**
         * Stores the results of the CommitID field.
         */
        this.commitID = "Unknown";
        /**
         * Stores the results of the ShulkerID field.
         */
        this.shulkerID = "Unknown";
        /**
         * Stores the results of the ParkourUUID field. (Will often be null.)
         */
        this.parkourUUID = null;
        /**
         * Whether /whereami has been sent this lobby.
         */
        this.whereAmISent = false;
        /**
         * Whether `/whereami` has been received this lobby.
         */
        this.whereAmIReceived = false;
        /**
         * The `change-dimension` event fires twice. This works around it.
         */
        this.changeDimensionBandage = false;
        client.on("receive-chat", msg => {
            if ((0, exports_1.notOnGalaxite)())
                return;
            msg.cancel = this.parseWhereAmI(msg.message);
        });
        // Send /whereami every time a new server is joined
        client.on("change-dimension", e => {
            if (this.changeDimensionBandage) { // if the dimension changes an odd number of times, the dimension has actually been changed
                this.runWhereAmI();
                this.changeDimensionBandage = false;
            }
            else { // even, ghost fire
                this.changeDimensionBandage = true;
            }
        });
        client.on("join-game", e => {
            this.runWhereAmI();
        });
    }
}
const nameToGame = new Map([
    ["MainHub", GameName.MAIN_HUB],
    ["RushSolo", GameName.RUSH],
    ["RushDouble", GameName.RUSH],
    ["RushQuad", GameName.RUSH],
    ["PlanetsSolo", GameName.CORE_WARS],
    ["PlanetsDouble", GameName.CORE_WARS],
    ["PlanetsQuad", GameName.CORE_WARS],
    ["PlanetsPush", GameName.CORE_WARS],
    ["ChronosSolo", GameName.CHRONOS],
    ["ChronosDouble", GameName.CHRONOS],
    ["ChronosMega", GameName.CHRONOS],
    ["FillTheGapsSolo", GameName.FILL_THE_GAPS],
    ["FillTheGapsDouble", GameName.FILL_THE_GAPS],
    ["FillTheGapsQuad", GameName.FILL_THE_GAPS],
    ["PropHunt", GameName.PROP_HUNT],
    ["HyperRacersSingle", GameName.HYPER_RACERS],
    ["Playground", GameName.PLAYGROUND],
    ["AlienBlast", GameName.ALIEN_BLAST],
    ["Spooky", GameName.THE_ENTITY],
    ["Farming", GameName.MY_FARM_LIFE],
    ["ParkourLobby", GameName.PARKOUR_HUB],
    ["ParkourBuild", GameName.PARKOUR_BUILD],
    ["ParkourPlay", GameName.PARKOUR_PLAY],
    ["FrostFight", GameName.FROST_FIGHT]
]);
/**
 * The WhereAmAPI. Use this as a pseudo-API for finding server information.
 */
exports.api = new WhereAmAPI();
