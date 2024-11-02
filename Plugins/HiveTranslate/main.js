let module = new Module("Translate", "Translate", "Translates non English messages to English.", 0);
client.getModuleManager().registerModule(module);

const http = require("http");

client.on("receive-chat", event => {
    if(!module.isEnabled()) return;
    
    if(!/\xa77\xa7l\xbb \xa7r/.test(event.message)) return;

    const msg = event.message.split(/\xa77\xa7l\xbb \xa7r/)[1]
    
    try {
        http.getAsync("https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=en&q=" + msg.replace(/ /g, "%20"), {}, res => {
            const t = JSON.parse(util.bufferToString(res.body))[0];
            if(t[1] == "en") return;
            clientMessage(`\xa77(Translated from ${t[1]}: ${t[0]})`);
        });
    } catch(e) {
        client.showNotification("Something went wrong while translating!");
    }
}, 99999); // Idk how to make it work without having one of the highest priorities :sob:

client.on("unload-script", evt => {
    if (evt.scriptName != script.name) return;
    client.getModuleManager().deregisterModule(module);
});