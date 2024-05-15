let mod = new TextModule("customtext","Custom Text","Displays custom text",0);
let textSetting = mod.addTextSetting("ctext","Text to display","Text to display","hi");
client.getModuleManager().registerModule(mod);

mod.on("text",()=>{
    return textSetting.getValue();
});