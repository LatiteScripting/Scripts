"use strict";
// WhereAmIHUD: Allows showing various details from the /whereami command, like game or region.
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./exports");
// Initialization
// Core
let whereAmIHUD = new TextModule("whereAmIHUD", "GXU: WhereAmIHUD", "Automatically runs /whereami on every server join, and shows selected details as a module", 0 /* KeyCode.None */);
let optionHideResponse = whereAmIHUD.addBoolSetting("HideResponse", "Hide Response", "Runs command in the background without a chat message (disable if normal /whereami doesn't work)", true);
// Server Name
let optionServerName = whereAmIHUD.addBoolSetting("ServerName", "Server Name", "Shows the ServerName (game/lobby name) field", true);
let optionFormatServerName = whereAmIHUD.addBoolSetting("FormatServerName", "Format Server Name", "Makes the server name field use proper formatting (currently does nothing)", true);
optionFormatServerName.setCondition("ServerName");
let optionServerNamePrefix = whereAmIHUD.addTextSetting("ServerNamePrefix", "Prefix (Server Name)", "Text to display before the server name entry", "");
optionServerNamePrefix.setCondition("ServerName");
let optionServerNameSuffix = whereAmIHUD.addTextSetting("ServerNameSuffix", "Suffix (Server Name)", "Text to display after the server name entry", "");
optionServerNameSuffix.setCondition("ServerName");
// Region
let optionRegion = whereAmIHUD.addBoolSetting("Region", "Region", "Shows the Region field", true);
let optionRegionPrefix = whereAmIHUD.addTextSetting("RegionPrefix", "Prefix (Region)", "Text to display before the region entry", "Region: ");
optionRegionPrefix.setCondition("Region");
let optionRegionSuffix = whereAmIHUD.addTextSetting("RegionSuffix", "Suffix (Region)", "Text to display after the region entry", "");
optionRegionSuffix.setCondition("Region");
// Privacy
let optionPrivacy = whereAmIHUD.addBoolSetting("Privacy", "Privacy", "Shows the Privacy (public/private game) field", true);
let optionPrivacyPrefix = whereAmIHUD.addTextSetting("PrivacyPrefix", "Prefix (Privacy)", "Text to display before the Privacy entry", "");
optionPrivacyPrefix.setCondition("Privacy");
let optionPrivacySuffix = whereAmIHUD.addTextSetting("PrivacySuffix", "Suffix (Privacy)", "Text to display after the Privacy entry", " Game");
optionPrivacySuffix.setCondition("Privacy");
// Dev Fields
let optionDevFields = whereAmIHUD.addBoolSetting("DevFields", "Developer Fields", "Shows details less important to normal users (ServerUUID, PodName, CommitID, and ShulkerID, plus ParkourUUID in Parkour Builders)", false);
// Server UUID
let optionServerUUIDPrefix = whereAmIHUD.addTextSetting("ServerUUIDPrefix", "Prefix (Server UUID)", "Text to display before the Server UUID entry", "Server UUID: ");
optionServerUUIDPrefix.setCondition("DevFields");
let optionServerUUIDSuffix = whereAmIHUD.addTextSetting("ServerUUIDSuffix", "Suffix (Server UUID)", "Text to display after the Suffix entry", "");
optionServerUUIDSuffix.setCondition("DevFields");
// Pod Name
let optionPodNamePrefix = whereAmIHUD.addTextSetting("PodNamePrefix", "Prefix (Pod Name)", "Text to display before the Pod Name entry", "Pod Name: ");
optionPodNamePrefix.setCondition("DevFields");
let optionPodNameSuffix = whereAmIHUD.addTextSetting("PodNameSuffix", "Suffix (Pod Name)", "Text to display after the Pod Name entry", "");
optionPodNameSuffix.setCondition("DevFields");
// Commit ID
let optionCommitIDPrefix = whereAmIHUD.addTextSetting("CommitIDPrefix", "Prefix (Commit ID)", "Text to display before the Commit ID entry", "CommitID: ");
optionCommitIDPrefix.setCondition("DevFields");
let optionCommitIDSuffix = whereAmIHUD.addTextSetting("CommitIDSuffix", "Suffix (Commit ID)", "Text to display after the Commit ID entry", "");
optionCommitIDSuffix.setCondition("DevFields");
// Shulker ID
let optionShulkerIDPrefix = whereAmIHUD.addTextSetting("ShulkerIDPrefix", "Prefix (Shulker ID)", "Text to display before the Shulker ID entry", "ShulkerID: ");
optionShulkerIDPrefix.setCondition("DevFields");
let optionShulkerIDSuffix = whereAmIHUD.addTextSetting("ShulkerIDSuffix", "Suffix (Shulker ID)", "Text to display after the Shulker ID entry", "");
optionShulkerIDSuffix.setCondition("DevFields");
// Parkour UUID
let optionParkourUUIDPrefix = whereAmIHUD.addTextSetting("ParkourUUIDPrefix", "Prefix (Parkour UUID)", "Text to display before the Parkour UUID entry", "ParkourUUID: ");
optionParkourUUIDPrefix.setCondition("DevFields");
let optionParkourUUIDSuffix = whereAmIHUD.addTextSetting("ParkourUUIDSuffix", "Suffix (Parkour UUID)", "Text to display after the Parkour UUID entry", "");
optionParkourUUIDSuffix.setCondition("DevFields");
client.getModuleManager().registerModule(whereAmIHUD); // Putting this after settings makes the custom settings appear first
/* Field list:
- ServerUUID (devFields)
- PodName (devFields)
- ServerName (serverName)
- CommitID (devFields)
- ShulkerID (devFields)
- Region (region)
- Privacy (privacy)

Order: ServerName, Region, Privacy, ServerUUID, PodName, CommitID, ShulkerID, ParkourUUID (if applicable)

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
    ["ParkourPlay", "Parkour Builders (Playing)"]
]);
// Initialize storage strings
let serverUUID = "Unknown", // internal identifier
podName = "Unknown", // internal identifier
serverName = "Unknown", // name of lobby (game name)
commitID = "Unknown", // internal identifier (latest update?)
shulkerID = "Unknown", // internal identifier
region = "Unknown", // region of lobby
privacy = "Unknown", // public game/private game
parkourUUID = "Unknown"; // parkour id
// Cache whether /whereami was sent automatically
let whereAmISent = false;
function runWhereAmI() {
    if ((0, exports_1.notOnGalaxite)())
        return;
    whereAmISent = true;
    setTimeout(() => {
        game.executeCommand("/whereami");
        return 1;
    }, 5000);
}
// Send /whereami every time a new server is joined
client.on("change-dimension", e => {
    runWhereAmI();
});
client.on("join-game", e => {
    runWhereAmI();
});
// Handle the response
/* Sample response:
    \u00bc\u0020\u00a7cServerUUID: \u00a7a93e0a641-bc66-4e34-b918-e0ff23684997
    \u00a7cPodName: \u00a7amainhub-b-665d8f7bf-kqrjq
    \u00a7cServerName: \u00a7aMainHub
    \u00a7cCommitID: \u00a7a975198ad
    \u00a7cShulkerID: \u00a7afd53c2d3-8ed9-4d2d-a850-3938b1109dc5
    \u00a7cRegion: \u00a7aus
    \u00a7cPrivacy: \u00a7aPublic
equivalent to:
    ServerUUID: 93e0a641-bc66-4e34-b918-e0ff23684997
    PodName: mainhub-b-665d8f7bf-kqrjq
    ServerName: MainHub
    CommitID: 975198ad
    ShulkerID: fd53c2d3-8ed9-4d2d-a850-3938b1109dc5
    Region: us
    Privacy: Public
0: ServerUUID
1: PodName
2: ServerName
3: CommitID
4. ShulkerID
5: Region
6: Privacy
7?: ParkourUUID
*/
// hook
client.on("receive-chat", msg => {
    if ((0, exports_1.notOnGalaxite)())
        return;
    if (msg.message.includes("ServerUUID: ") && msg.message.includes("\n")) { // Check for message (users can't send \n)
        let formattedMessage = msg.message.replace("\u00bc\u0020", ""); // cache message
        let entries = formattedMessage.split("\n\u00a7c"); // Split up the response at this substring, in the process splitting by line
        for (let i = 0; i < entries.length; i++) { // For each entry:
            entries[i] = entries[i].split(" \u00a7a")[1]; // Save only the part of the response after the category name
        }
        // serverUUID = entries[0];
        // podName = entries[1];
        // serverName = entries[2];
        // commitID = entries[3];
        // shulkerID = entries[4];
        // region = entries[5];
        // privacy = entries[6];
        [serverUUID, podName, serverName, commitID, shulkerID, region, privacy] = entries; // Store the entries to cache
        parkourUUID = (entries.length > 7) ? entries[7] : ""; // If ParkourUUID was sent, add it; otherwise store an empty string for it (is this needed?)
        if (optionHideResponse.getValue()) { // if the user chooses to hide the response
            if (whereAmISent) { // if the plugin has already sent /whereami
                msg.cancel = true;
                whereAmISent = false;
            }
        }
    }
});
// Cache new line (very important) (i use it a lot here)
const NL = "\n";
// Actually render stuff
whereAmIHUD.on("text", () => {
    var _a;
    if ((0, exports_1.notOnGalaxite)())
        return ("");
    // initialize render variable
    let render = "";
    // consider options and build text
    if (optionServerName.getValue())
        render = render.concat(optionServerNamePrefix.getValue(), optionFormatServerName.getValue() ? ((_a = formatMap.get(serverName)) !== null && _a !== void 0 ? _a : serverName) : serverName, // ?? is "choose the first defined value"
        optionServerNameSuffix.getValue(), NL);
    if (optionRegion.getValue())
        render = render.concat(optionRegionPrefix.getValue(), (region.toUpperCase()), optionRegionSuffix.getValue(), NL); // Uppercase region, as the server sends it lowercase
    if (optionPrivacy.getValue())
        render = render.concat(optionPrivacyPrefix.getValue(), privacy, optionPrivacySuffix.getValue(), NL);
    if (optionDevFields.getValue()) {
        render = render.concat(optionServerUUIDPrefix.getValue(), serverUUID, optionServerUUIDSuffix.getValue(), NL, optionPodNamePrefix.getValue(), podName, optionPodNameSuffix.getValue(), NL, optionCommitIDPrefix.getValue(), commitID, optionCommitIDSuffix.getValue(), NL, optionShulkerIDPrefix.getValue(), shulkerID, optionShulkerIDSuffix.getValue(), ((parkourUUID != "")
            ? (NL + optionParkourUUIDPrefix.getValue(), parkourUUID, optionParkourUUIDSuffix.getValue() // NL in here to reduce potential trim
            ) : "")); // no final NL since that's always the last data point
    }
    // remove possible trailing \n
    render = render.trim();
    // return finalized text
    return render;
});
