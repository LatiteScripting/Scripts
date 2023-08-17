"use strict";
const cmd = new Command(
/*the name of the command*/ "bruh", 
/*short description that shows up in .help*/ "bruh", 
/*the usage of the command if someone doesnt use it right*/ "", 
/*alternative names (you can use .bruh or .bruh2) */ ["bruh2"]);
// this calls when the user executes the command
cmd.on("execute", (label, args) => {
    script.log("bruh");
    if (args.length > 0) { // if they put in more than just .bruh example: (.bruh 69)
        script.log("arguments:");
        // go through each argument
        for (let i = 0; i < args.length; ++i) {
            if (args[i] == "69") {
                return false; // this prints out the usage of the command
            }
            script.log(args[i]); // log the argument
        }
    }
    return true; // return false if they used the command wrong
});
// adds our command into the game
client.getCommandManager().registerCommand(cmd);
// remove our script when the script is unloaded
client.on("unload-script", ev => {
    if (ev.scriptName == script.name) {
        client.getCommandManager().deregisterCommand(cmd);
    }
});
