"use strict";

let moduleDescription = `Format the Hive Chat to your liking with these colors:\n\t 0 - Black\n\t 1 - Dark Blue\n\t 2 - Dark Green\n\t 3 - Dark Aqua\n\t 4 - Dark Red\n\t 5 - Dark Purple\n\t 6 - Gold\n\t 7 - Gray (Regular Default)\n\t 8 - Dark Gray\n\t 9 - Blue\n\t10 - Green (Hive+ Default)\n\t11 - Aqua\n\t12 - Red\n\t13 - Light Purple\n\t14 - Yellow\n\t15 - White`;
let module = new Module("HiveChatFormatter", "Hive Chat Formatter", moduleDescription, 0);

let plus = module.addNumberSetting('plus', 'Hive+', 'Hive+', 0, 15, 1, 10);
let reg  = module.addNumberSetting('reg', 'Regular', 'Regular', 0, 15, 1, 7);

client.getModuleManager().registerModule(module);

client.on('receive-chat', evt => {
    if (!module.isEnabled()) return;

    let colorPlus = plus.getValue().toString(16);
    let colorReg  = reg.getValue().toString(16);

    // Hive+ User
    if(/\[\xa7a\+\xa78\]/.test(evt.message)) {
        evt.cancel = true;
        clientMessage(evt.message.replace(/\xa7a/g, '\xa7' + colorPlus));
    }

    // Regular User
    if (/\xa77(?=\D\w+ \xa77\xa7l\xbb)/.test(evt.message)) {
        evt.cancel = true;
        clientMessage(evt.message.replace(/\xa77(?=\D\w+ \xa77\xa7l\xbb)/, '\xa7' + colorReg));
    }
});

client.on("unload-script", evt => {
    if (evt.scriptName != script.name) return;
    client.getModuleManager().deregisterModule(module);
});