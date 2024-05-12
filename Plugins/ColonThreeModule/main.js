let colonThree = new TextModule("colonthree", ":3", ":3", 0);
client.getModuleManager().registerModule(colonThree);
colonThree.on("text", () => { return ":3"; });
