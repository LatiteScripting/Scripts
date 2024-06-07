"use strict";
// WhereAmAPI: Backend system that automatically sends and interprets /whereami responses, so it doesn't need to be handled module-by-module.
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.GameName = void 0;
const exports_1 = require("./exports");
const clipboard = require("clipboard");
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
    GameName[GameName["THE_ENITTY"] = 11] = "THE_ENITTY";
    GameName[GameName["MY_FARM_LIFE"] = 12] = "MY_FARM_LIFE";
    GameName[GameName["ALIEN_BLAST"] = 13] = "ALIEN_BLAST";
})(GameName || (exports.GameName = GameName = {}));
class WhereAmAPI {
    /**
     * Executes a given block of code when the API has been updated this lobby. This function is asynchronous.
     * @param code The code to run when the response is given.
     */
    onConfirmedResponse(code) {
        if (!this.whereAmIReceived) { // if there hasn't been a response yet this lobby:
            this.runWhereAmI(); // send the command
            this.delayedCode.push(code); // add the code to a block to run later
        }
        else { // if there has been a response, just run the code now
            code(); // run the code requested
        }
    }
    /**
     * Executes a given block of code the next time the API updates. This function is asynchronous.
     * @param code The code to run on the next response.
     */
    onNextTransfer(code) {
        this.delayedCode.push(code); // code runs next successful transfer anyway
    }
    runWhereAmI() {
        if ((0, exports_1.notOnGalaxite)())
            return;
        setTimeout(() => {
            game.executeCommand("/whereami");
            this.whereAmISent = true;
            this.whereAmIReceived = false;
        }, exports_1.optionWhereAmIDelay.getValue() * 1000);
    }
    assign(field) {
        var _a;
        let def; // default is reserved
        if (field == "ParkourUUID")
            def = "";
        else
            def = "Unknown";
        return ((_a = this.response[field]) !== null && _a !== void 0 ? _a : def);
    }
    constructor() {
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
         * Stores the results of the ParkourUUID field. (Will often be empty.)
         */
        this.parkourUUID = "";
        this.cmdExportWhereAmI = new Command("export", "Copies the results of the last whereami to the clipboard", "$", ["copywhereami", "whereami"]);
        /**
         * Whether /whereami has been sent this lobby.
         */
        this.whereAmISent = false;
        /**
         * Whether `/whereami` has been received this lobby.
         */
        this.whereAmIReceived = false;
        /**
         * Array of code to run on the next `/whereami` response.
         */
        this.delayedCode = [];
        /**
         * The `change-dimension` event fires twice. This works around it.
         */
        this.changeDimensionBandage = false;
        client.on("receive-chat", msg => {
            var _a;
            if ((0, exports_1.notOnGalaxite)())
                return;
            if (!this.whereAmISent)
                return; // if a whereami is being waited on:
            if (msg.message.includes("ServerUUID:") && msg.message.includes("\n")) { // Check for message (users can't send \n)
                let formattedMessage = msg.message.replace("\uE0BC \xA7c", ""); // Cache message
                let entries = formattedMessage.split("\n\xA7c"); // Split up the response at this substring, in the process splitting by line and removing color
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
                /* Response should look like:
                {
                    "Username" : username,
                    "ServerUUID" : serverUUID,
                    ...
                    "FieldName" : fieldResult
                }
                */
                // username =   entries[0];
                // serverUUID = entries[1];
                // podName =    entries[2];
                // serverName = entries[3];
                // commitID =   entries[4];
                // shulkerID =  entries[5];
                // region =     entries[6];
                // privacy =    entries[7];
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
                this.game = (_a = nameToGame.get(this.serverName)) !== null && _a !== void 0 ? _a : GameName.UNKNOWN; // Assign the shorter game name field
                if (exports_1.optionHideResponses.getValue())
                    msg.cancel = true; // hide the api-provided whereami
                this.whereAmIReceived = true; // whereami has been received
                this.whereAmISent = false;
                this.delayedCode.forEach(code => {
                    code(); // run the code
                    this.delayedCode.shift(); // delete the code reference
                });
            }
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
        client.getCommandManager().registerCommand(this.cmdExportWhereAmI);
        this.cmdExportWhereAmI.on("execute", () => {
            clipboard.set(`\`\`\`Username: ${this.username}` +
                `\nServerUUID: ${this.serverUUID}` +
                `\nPodName: ${this.podName}` +
                `\nServerName: ${this.serverName}` +
                `\nCommitID: ${this.commitID}` +
                `\nShulkerID: ${this.shulkerID}` +
                `\nRegion: ${this.region}` +
                `\nPrivacy: ${this.privacy}` +
                (this.parkourUUID != "")
                ? `\nParkourUUID: ${this.parkourUUID}`
                : "" +
                    "```");
            (0, exports_1.sendGXUMessage)("Copied the last /whereami to clipboard!");
            return true;
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
    ["Spooky", GameName.THE_ENITTY],
    ["Farming", GameName.MY_FARM_LIFE],
    ["ParkourLobby", GameName.PARKOUR_HUB],
    ["ParkourBuild", GameName.PARKOUR_BUILD],
    ["ParkourPlay", GameName.PARKOUR_PLAY]
]);
/**
 * The WhereAmAPI. Use this as a pseudo-API for finding server information.
 */
exports.api = new WhereAmAPI();
