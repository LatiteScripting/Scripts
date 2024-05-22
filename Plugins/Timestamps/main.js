"use strict";
/// <reference path="C:/l-api/defs/index.d.ts" />
let mod = new Module("timestamps", "Timestamps", "add timestamps to your messages, might confict with other plugins that modifies messages", 0);
let fs = require("filesystem");
let http = require("http");
if (!fs.exists("./moment.js")) {
    let response = http.get("https://momentjs.com/downloads/moment.js");
    fs.write("./moment.js", response.body);
}
let moment = require("./moment.js");
var format = "HH:mm:ss A"; // check https://momentjs.com/docs/#/parsing/string-format/ for reference
client.on("receive-chat", (mev) => {
    let msg = mev.message;
    let author = mev.sender ? `<${mev.sender}>` : " ";
    let totalmsg = `[${moment().format(format)}] ${author} ${msg}`;
    mev.cancel = true;
    clientMessage(totalmsg);
});
