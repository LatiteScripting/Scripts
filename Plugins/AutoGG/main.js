let mod = new Module("AutoGG", "Auto GG", "Responds with \"gg\" in chat on victory.", 0);
client.getModuleManager().registerModule(mod);

function sendGGChatMessage() {
    game.sendChatMessage("gg");
}

client.on("title", title => {
    let text = title.text;
    
    if (game.getFeaturedServer() == "Hive")
    {
        if (text.includes("Sweet Victory") || text.includes("Game Over"))
        {
            sendGGChatMessage();
        }
    }

    // more soon
});
