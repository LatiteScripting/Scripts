"use strict";
const module = new Module("CubecraftAutoGG", "Cubecraft Auto GG", 'Automatically say "gg" whenever a game ends on Cubecraft', 0 /* KeyCode.None */);
let useCustomMessageOption = module.addBoolSetting("useCustomMessage", "Use custom message", 'Send a custom message on game finish instead of "gg"', false);
let customMessageOption = module.addTextSetting("customMessage", "Message", "The custom message to send", "ggs!");
client.getModuleManager().registerModule(module);
client.on("receive-chat", (ev) => {
    if (!ev.message.includes("\u00a7r\u00a7a won the game!"))
        return;
    if (!module.isEnabled())
        return;
    const customMessageEnabled = useCustomMessageOption.getValue();
    const customMessage = customMessageOption.getValue();
    game.sendChatMessage(customMessageEnabled ? customMessage : "gg");
});
