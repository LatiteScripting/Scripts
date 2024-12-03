"use strict";
// WhereAmIHUD: Allows showing various details from the /whereami command, like game or region.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
const w = __importStar(require("./WhereAmIHUDOptions"));
const WhereAmAPI_1 = require("./WhereAmAPI");
// Initialization
/* Field list:
- ServerUUID (devFields)
- PodName (devFields)
- ServerName (serverName)
- CommitID (devFields)
- ShulkerID (devFields)
- Region (region)
- Privacy (privacy)

Order: ServerName, Region, Privacy, ParkourUUID, Username, [ServerUUID, PodName, CommitID, ShulkerID]

Internal game names (for formatting):
- RushSolo, RushDouble, RushQuad                            Rush (Solos), Rush (Doubles), Rush (Quads)
- PlanetsSolo, PlanetsDouble, PlanetsQuad, PlanetsPush      Core Wars (Solos), Core Wars (Doubles), Core Wars (Quads), Core Wars Push
- ChronosSolo, ChronosDouble. ChronosMega                   Chronos (Solos), Chronos (Doubles), Chronos (Mega)
- FillTheGapsSolo, FillTheGapsDouble, FillTheGapsQuad       Fill the Gaps (Solos), Fill the Gaps (Doubles), Fill the Gaps (Quads)
- PropHunt                                                  Prop Hunt
- HyperRacersSingle                                         Hyper Racers
- Playground                                                Playground
- Parkour<Lobby/Build/Play>                                 Parkour Builders (Lobby), Parkour Builders (Building), Parkour Builders (Playing)
- AlienBlast                                                Alien Blast
- Spooky                                                    The Entity
- Farming                                                   My Farm Life
*/
let formatMap = new Map([
    ["MainHub", "Main Hub"],
    ["RushSolo", "Rush (Solos)"],
    ["RushDouble", "Rush (Doubles)"],
    ["RushQuad", "Rush (Quads)"],
    ["PlanetsSolo", "Core Wars (Solo)"],
    ["PlanetsDouble", "Core Wars (Doubles)"],
    ["PlanetsQuad", "Core Wars (Quads)"],
    ["PlanetsPush", "Core Wars Push"],
    ["ChronosSolo", "Chronos (Solo)"],
    ["ChronosDouble", "Chronos (Doubles)"],
    ["ChronosMega", "Chronos (Mega)"],
    ["FillTheGapsSolo", "Fill the Gaps (Solos)"],
    ["FillTheGapsDouble", "Fill the Gaps (Doubles)"],
    ["FillTheGapsQuad", "Fill the Gaps (Quads)"],
    ["PropHunt", "Prop Hunt"],
    ["HyperRacersSingle", "Hyper Racers"],
    ["Playground", "Playground"],
    ["AlienBlast", "Alien Blast"],
    ["Spooky", "The Entity"],
    ["Farming", "My Farm Life"],
    ["ParkourLobby", "Parkour Builders (Lobby)"],
    ["ParkourBuild", "Parkour Builders (Building)"],
    ["ParkourPlay", "Parkour Builders (Playing)"],
    ["FrostFight", "Frost Fight"]
]);
// Cache new line (very important) (i use it a lot here)
const NL = "\n";
// Actually render stuff
w.whereAmIHUD.on("text", () => {
    var _a;
    if ((0, exports_1.notOnGalaxite)())
        return ("");
    // initialize render variable
    let render = "";
    // consider options and build text
    if (w.optionServerName.getValue()) {
        render = render.concat(w.optionServerNamePrefix.getValue(), w.optionFormatServerName.getValue() ? ((_a = formatMap.get(WhereAmAPI_1.api.serverName)) !== null && _a !== void 0 ? _a : WhereAmAPI_1.api.serverName) : WhereAmAPI_1.api.serverName, // ?? is "choose the first defined value"
        w.optionServerNameSuffix.getValue(), NL);
    }
    if (w.optionRegion.getValue()) {
        render = render.concat(w.optionRegionPrefix.getValue(), (w.optionUseNAName.getValue() && WhereAmAPI_1.api.region == "us" // if the user wants to see na instead of us and the region actually is us
            ? "na"
            : WhereAmAPI_1.api.region).toUpperCase(), w.optionRegionSuffix.getValue(), NL); // Uppercase region, as the server sends it lowercase
    }
    if (w.optionPrivacy.getValue())
        render = render.concat(w.optionPrivacyPrefix.getValue(), WhereAmAPI_1.api.privacy, w.optionPrivacySuffix.getValue(), NL);
    if (w.optionParkourUUID.getValue()) {
        render = render.concat((w.optionParkourUUID.getValue() && WhereAmAPI_1.api.parkourUUID)
            ? (w.optionParkourUUIDPrefix.getValue() + WhereAmAPI_1.api.parkourUUID + w.optionParkourUUIDSuffix.getValue() + NL)
            : "");
    }
    if (w.optionUsername.getValue())
        render = render.concat(w.optionUsernamePrefix.getValue(), WhereAmAPI_1.api.username, w.optionUsernameSuffix.getValue(), NL);
    if (w.optionDevFields.getValue()) {
        render = render.concat(w.optionServerUUIDPrefix.getValue(), WhereAmAPI_1.api.serverUUID, w.optionServerUUIDSuffix.getValue(), NL, w.optionPodNamePrefix.getValue(), WhereAmAPI_1.api.podName, w.optionPodNameSuffix.getValue(), NL, w.optionCommitIDPrefix.getValue(), WhereAmAPI_1.api.commitID, w.optionCommitIDSuffix.getValue(), NL, w.optionShulkerIDPrefix.getValue(), WhereAmAPI_1.api.shulkerID, w.optionShulkerIDSuffix.getValue());
    }
    // remove possible trailing \n
    render = render.trim();
    // return finalized text
    return render;
});
