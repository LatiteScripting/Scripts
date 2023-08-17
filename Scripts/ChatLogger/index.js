const fs = require("filesystem");
script.name = "Chat Logger";
script.description = "Logs all chat messages to a text file.";
script.version = "0.0.0";
script.author = "Plextora";
client.showNotification(`Script ${script.name} has been loaded!`);
script.log('§c[Chat Logger] In order for this script to function properly, you MUST have a "log.txt" file in the dist folder\nwhere the "index.js" file is, or else it\'ll trigger an API error');
let chatLoggerModule = new Module("ChatLogger", script.name, script.description, 0 /* KeyCode.None */);
client.getModuleManager().registerModule(chatLoggerModule);
client.on("unload-script", (ev) => {
    if (ev.scriptName === script.name) {
        client.showNotification(`Script ${script.name} has been unloaded!`);
        client.getModuleManager().deregisterModule(chatLoggerModule);
    }
});
function appendFile(file, textToAppend, newLine) {
    let text = fs.readSync(file);
    text += textToAppend;
    if (newLine)
        text += "\n";
    fs.writeSync(file, text);
}
client.on("receive-chat", (ev) => {
    let sender = `<${ev.sender}>`;
    if (sender !== "<>") {
        appendFile("log.txt", `<${ev.sender}> ${ev.message}`, true);
    }
    else {
        appendFile("log.txt", `${ev.message}`, true);
    }
});
