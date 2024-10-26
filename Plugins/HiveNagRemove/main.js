"use strict"

let module = new Module("HiveNagRemove", "Hive Nag Remove", "Removes the naggy messages on the hive.", 0);
client.getModuleManager().registerModule(module);

client.on('receive-chat', evt => {
    if(!module.isEnabled()) return
    
    if(evt.message.startsWith('\xa76[\xa7e!\xa76]')) evt.cancel = true
})

client.on("unload-script", evt => {
    if (evt.scriptName != script.name) return
    client.getModuleManager().deregisterModule(module);
});