"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionShulkerIDSuffix = exports.optionShulkerIDPrefix = exports.optionCommitIDSuffix = exports.optionCommitIDPrefix = exports.optionPodNameSuffix = exports.optionPodNamePrefix = exports.optionServerUUIDSuffix = exports.optionServerUUIDPrefix = exports.optionDevFields = exports.optionParkourUUIDSuffix = exports.optionParkourUUIDPrefix = exports.optionParkourUUID = exports.optionPrivacySuffix = exports.optionPrivacyPrefix = exports.optionPrivacy = exports.optionRegionSuffix = exports.optionRegionPrefix = exports.optionRegion = exports.optionServerNameSuffix = exports.optionServerNamePrefix = exports.optionFormatServerName = exports.optionServerName = exports.optionHideResponse = exports.whereAmIHUD = void 0;
// Core
exports.whereAmIHUD = new TextModule("whereAmIHUD", "GXU: WhereAmIHUD", "Automatically runs /whereami on every server join, and shows selected details as a module", 0 /* KeyCode.None */);
exports.optionHideResponse = exports.whereAmIHUD.addBoolSetting("HideResponse", "Hide Response", "Runs command in the background without a chat message (disable if normal /whereami doesn't work)", true);
// Server Name
exports.optionServerName = exports.whereAmIHUD.addBoolSetting("ServerName", "Server Name", "Shows the ServerName (game/lobby name) field", true);
exports.optionFormatServerName = exports.whereAmIHUD.addBoolSetting("FormatServerName", "Format Server Name", "Makes the server name field use proper formatting (currently does nothing)", true);
exports.optionFormatServerName.setCondition("ServerName");
exports.optionServerNamePrefix = exports.whereAmIHUD.addTextSetting("ServerNamePrefix", "Prefix (Server Name)", "Text to display before the server name entry", "");
exports.optionServerNamePrefix.setCondition("ServerName");
exports.optionServerNameSuffix = exports.whereAmIHUD.addTextSetting("ServerNameSuffix", "Suffix (Server Name)", "Text to display after the server name entry", "");
exports.optionServerNameSuffix.setCondition("ServerName");
// Region
exports.optionRegion = exports.whereAmIHUD.addBoolSetting("Region", "Region", "Shows the Region field", true);
exports.optionRegionPrefix = exports.whereAmIHUD.addTextSetting("RegionPrefix", "Prefix (Region)", "Text to display before the region entry", "Region: ");
exports.optionRegionPrefix.setCondition("Region");
exports.optionRegionSuffix = exports.whereAmIHUD.addTextSetting("RegionSuffix", "Suffix (Region)", "Text to display after the region entry", "");
exports.optionRegionSuffix.setCondition("Region");
// Privacy
exports.optionPrivacy = exports.whereAmIHUD.addBoolSetting("Privacy", "Privacy", "Shows the Privacy (public/private game) field", true);
exports.optionPrivacyPrefix = exports.whereAmIHUD.addTextSetting("PrivacyPrefix", "Prefix (Privacy)", "Text to display before the Privacy entry", "");
exports.optionPrivacyPrefix.setCondition("Privacy");
exports.optionPrivacySuffix = exports.whereAmIHUD.addTextSetting("PrivacySuffix", "Suffix (Privacy)", "Text to display after the Privacy entry", " Game");
exports.optionPrivacySuffix.setCondition("Privacy");
// Parkour UUID
exports.optionParkourUUID = exports.whereAmIHUD.addBoolSetting("ParkourUUID", "Parkour UUID", "Shows the Parkour UUID field (if in parkour)", true);
exports.optionParkourUUIDPrefix = exports.whereAmIHUD.addTextSetting("ParkourUUIDPrefix", "Prefix (Parkour UUID)", "Text to display before the Parkour UUID entry", "ParkourUUID: ");
exports.optionParkourUUIDPrefix.setCondition("ParkourUUID");
exports.optionParkourUUIDSuffix = exports.whereAmIHUD.addTextSetting("ParkourUUIDSuffix", "Suffix (Parkour UUID)", "Text to display after the Parkour UUID entry", "");
exports.optionParkourUUIDSuffix.setCondition("ParkourUUID");
// Dev Fields
exports.optionDevFields = exports.whereAmIHUD.addBoolSetting("DevFields", "Developer Fields", "Shows details less important to normal users (ServerUUID, PodName, CommitID, and ShulkerID, plus ParkourUUID in Parkour Builders)", false);
// Server UUID
exports.optionServerUUIDPrefix = exports.whereAmIHUD.addTextSetting("ServerUUIDPrefix", "Prefix (Server UUID)", "Text to display before the Server UUID entry", "Server UUID: ");
exports.optionServerUUIDPrefix.setCondition("DevFields");
exports.optionServerUUIDSuffix = exports.whereAmIHUD.addTextSetting("ServerUUIDSuffix", "Suffix (Server UUID)", "Text to display after the Suffix entry", "");
exports.optionServerUUIDSuffix.setCondition("DevFields");
// Pod Name
exports.optionPodNamePrefix = exports.whereAmIHUD.addTextSetting("PodNamePrefix", "Prefix (Pod Name)", "Text to display before the Pod Name entry", "Pod Name: ");
exports.optionPodNamePrefix.setCondition("DevFields");
exports.optionPodNameSuffix = exports.whereAmIHUD.addTextSetting("PodNameSuffix", "Suffix (Pod Name)", "Text to display after the Pod Name entry", "");
exports.optionPodNameSuffix.setCondition("DevFields");
// Commit ID
exports.optionCommitIDPrefix = exports.whereAmIHUD.addTextSetting("CommitIDPrefix", "Prefix (Commit ID)", "Text to display before the Commit ID entry", "CommitID: ");
exports.optionCommitIDPrefix.setCondition("DevFields");
exports.optionCommitIDSuffix = exports.whereAmIHUD.addTextSetting("CommitIDSuffix", "Suffix (Commit ID)", "Text to display after the Commit ID entry", "");
exports.optionCommitIDSuffix.setCondition("DevFields");
// Shulker ID
exports.optionShulkerIDPrefix = exports.whereAmIHUD.addTextSetting("ShulkerIDPrefix", "Prefix (Shulker ID)", "Text to display before the Shulker ID entry", "ShulkerID: ");
exports.optionShulkerIDPrefix.setCondition("DevFields");
exports.optionShulkerIDSuffix = exports.whereAmIHUD.addTextSetting("ShulkerIDSuffix", "Suffix (Shulker ID)", "Text to display after the Shulker ID entry", "");
exports.optionShulkerIDSuffix.setCondition("DevFields");
client.getModuleManager().registerModule(exports.whereAmIHUD); // Putting this after settings makes the custom settings appear first
