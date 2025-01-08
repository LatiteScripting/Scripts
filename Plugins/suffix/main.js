let mod = new Module("suffix", ":3 Chat", "Adds ':3' to the end of every message (Or a custom suffix, but thats weird)\n- 4urxra", 0);
client.getModuleManager().registerModule(mod);

let wink = mod.addBoolSetting("wink", "Wink", "Winking :3", false);
let useCustom = mod.addBoolSetting("useCustom", "Use Custom Suffix", "Use custom suffix", false);
let customSuffix = mod.addTextSetting("custom", "Custom", "Custom suffix (Does the space automatically)", ">:3");

// Other shit
let ignorePrefixes = mod.addBoolSetting("ignorePrefixes", "Ignore Prefixes", "Ignore prefixes such as !, - (Realm addons)", false);
let uwu = mod.addBoolSetting("uwu", "UwU", "UwU", false);
let includeL = mod.addBoolSetting("includeL", "Include L", "Include L", false);
let betterUwu = mod.addBoolSetting("betterUwu", "Better UwU", "Better UwU", false);

let colouredPrefix = mod.addBoolSetting("colouredPrefix", "Colour Prefix", "Makes ur messages POP!", false);
let prefix = mod.addTextSetting("prefix", "Prefix", "The prefix for the coloured message (Must start with §)", "§u");
let randomColour = mod.addBoolSetting("randomColour", "Random Colour", "Randomly change the colour", false);

const colours = ["§0", "§1", "§2", "§3", "§4", "§5", "§6", "§7", "§8", "§9", "§a", "§b", "§c", "§d", "§e", "§f", "§u", "§n", "§m", "§h", "§y", "§s"];

client.on("send-chat", (event) => {
    try {
        if(
            !mod.isEnabled() || 
            (ignorePrefixes.getValue() && event.message[0] == "!" || event.message[0] == "-")
        ) return;
        event.cancel = true;
        const suf = useCustom.getValue() ? " " + customSuffix.getValue() : wink.getValue() ? " ;3" : " :3";
        let msg = event.message;
        if(uwu.getValue()) {
            if(includeL.getValue()) msg = msg.replace(/l/g, "w");
            msg = msg.replace(/([^o])r/g, "$1w");
            //if there are 2 w's in a row remove the first one
            msg = msg.replace(/ww/g, "w");
        }
        const prefix_col = colouredPrefix.getValue() ? colours[Math.floor(Math.random() * colours.length)] : "";
        if(prefix.getValue()) msg = prefix_col + "" + msg;
        // If the last character of event.message is a space remove it because yeah it's better idfk
        if(event.message[event.message.length - 1] == " ") msg = event.message.slice(0, event.message.length - 1);
        if(randomColour.getValue() && prefix_col != "") msg = msg.slice(1);
        game.sendChatMessage(msg + suf);
    } catch (e) {
        event.cancel = false;
        clientMessage("[:3] Couldn't add the suffix bc Latite's scripting API is a meanie and doesn't allow it on this server! :sad:")
    }
});

client.on("unload-script", evt => {
    if (evt.scriptName != script.name) return
    client.getModuleManager().deregisterModule(mod);
});

// :3 rat
// scary