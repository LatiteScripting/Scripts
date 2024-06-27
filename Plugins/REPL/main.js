"notrust";
/// <reference path="./definitions/index.d.ts" />
let cmd = new Command("execute", "Execute JavaScript code.", "$ [...]", ["exec"]);

client.getCommandManager().registerCommand(cmd);

let colors = {
    "undefined": TextColor.GRAY,
    "null": TextColor.DARK_BLUE,
    "number": TextColor.MINECOIN_GOLD,
    "object": TextColor.WHITE,
    "string": TextColor.DARK_GREEN,

    // this will never happen but its just there because why not
    "bigint": TextColor.MINECOIN_GOLD,

    "function": TextColor.AQUA,
    "boolean": TextColor.MINECOIN_GOLD
}

function stringify(val) {
	if (typeof val === "string") {
		return JSON.stringify(val);
	}
	
	return val + '';
}

cmd.on("execute", (label, args, commandLine) => {
    if (args.length === 0) return false;

    let code = commandLine.trim().substring(client.getCommandManager().getPrefix().length + label.length).trim();
    runJS(code);
});

client.on("send-chat", m => {
    if(!m.message.startsWith("> ")) return; // avoid just the "> " case

    m.cancel = true;
    let code = m.message.trim().substring(2).trim();
    runJS(code);
});

function runJS(code) {
    clientMessage(TextColor.GRAY + "> " + code)
    try {
        let ret = eval(code);
        clientMessage(`${colors[typeof ret]}${stringify(ret)}`)
    } catch (e) {
        clientMessage(`${TextColor.RED}` + e);
    }
    return true;
}