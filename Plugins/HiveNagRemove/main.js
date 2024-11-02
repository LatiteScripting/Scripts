"use strict"

let module = new Module("HiveNagRemove", "Hive Nag Remove", "Removes the naggy messages on the Hive!", 0);
client.getModuleManager().registerModule(module);

let proNag = module.addBoolSetting('proNag', 'Block Promotional Nag Messages', 'Messages promoting the Hive IG, Twitter, Discord, etc.', true);
let bedNag = module.addBoolSetting('bedNag', 'Block Bedwars Nag Messages', 'Messages on shop and upgrade purchases', false);

client.on('receive-chat', evt => {
    if(!module.isEnabled()) return

    // Promotion messages
    if(proNag.getValue() && evt.message.startsWith('\xa76[\xa7e!\xa76]')) evt.cancel = true

    // Bedwars messages
    if(bedNag.getValue()) {
        if(evt.message.startsWith('\xa7a\xa7l\xbb \xa7r\xa7aYou purchased: ')) evt.cancel = true
        if(evt.message.startsWith('\xa7b\xa7l\xbb \xa7r\xa77\xa7oYour armor was automatically equipped.')) evt.cancel = true
        if(evt.message.startsWith('\xa7m\xa7l\xbb \xa7r\xa7aNew Upgrade: ')) evt.cancel = true
        if(evt.message.startsWith('\xa7c\xa7l\xbb \xa7r\xa7cPurchase failed: \xa77you ')) evt.cancel = true
    }
})

client.on("unload-script", evt => {
    if (evt.scriptName != script.name) return
    client.getModuleManager().deregisterModule(module);
});