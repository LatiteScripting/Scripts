class Layer {
    // TODO: layer-specific stuff (in newer format versions)
    constructor() {
        this.notes = new Map();
    }
}

class Note {
    constructor(id, key, volume = 1, pitch = 1) {
        this.id = id;
        this.key = key;
        this.sound = Note.Sounds[id];
        this.volume = volume;
        this.pitch = pitch;
        if (this.sound == undefined)
            throw new Error("Unknown note " + id);
    }
}
Note.Sounds = [
    "note.harp",
    "note.bass",
    "note.bd",
    "note.snare",
    "note.hat",
    "note.guitar",
    "note.flute",
    "note.bell",
    "note.xylophone",
    "note.iron_xylophone",
    "note.cow_bell",
    "note.didgeridoo",
    "note.bit",
    "note.banjo",
    "note.pling", // glowstone
];

// https://opennbs.org/nbs#part1
var nbs;
(function (nbs) {
    class File {
        constructor() {
            this.begin = 0;
            this.version = 0;
            this.instrumentCount = 0;
            this.songLength = 0;
            this.layerCount = 0;
            this.songName = "";
            this.songAuthor = "";
            this.songOriginalAuthor = "";
            this.songDescription = "";
            this.songTempo = 0;
            /// Map<currentLayer, Layer>
            this.layers = new Map();
        }
        static parse(buf) {
            let file = new File();
            // PART 1: Header
            file.begin = buf.readShort();
            if (!file.begin) {
                script.log("New NBS format detected");
            }
            else
                script.log("Old NBS format detected");
            if (!file.begin) {
                file.version = buf.readUint8();
                file.instrumentCount = buf.readUint8();
                if (file.version >= 3)
                    file.songLength = buf.readShort();
            }
            else {
                file.version = 0;
                file.songLength = file.begin;
            }
            file.layerCount = buf.readShort();
            file.songName = buf.readNBSString();
            file.songAuthor = buf.readNBSString();
            file.songOriginalAuthor = buf.readNBSString();
            file.songDescription = buf.readNBSString();
            file.songTempo = buf.readShort() / 100;
            buf.readUint8(); // autosaving
            buf.readUint8(); // autosaveduration
            buf.readUint8(); // timesignature
            buf.readInt(); // minutesSpent
            buf.readInt(); // leftClicks
            buf.readInt(); // rightClicks
            buf.readInt(); // noteBlocksAdded
            buf.readInt(); // noteblocksRemoved
            buf.readNBSString(); // schematicName
            if (file.version >= 4) {
                buf.readUint8(); // shouldLoop
                buf.readUint8(); // maxLoop
                buf.readShort(); // loopStartTick
            }
            // PART 2: Noteblocks
            let tick = -1;
            while (true) {
                let jumps = buf.readShort();
                if (jumps == 0)
                    break; // no more noteblocks
                tick += jumps;
                let layer = -1;
                while (true) {
                    let jmpNextLayer = buf.readShort();
                    if (jmpNextLayer == 0)
                        break; // no more layers
                    layer += jmpNextLayer;
                    let myLayer;
                    if (file.layers.has(layer)) {
                        myLayer = file.layers.get(layer);
                    }
                    else {
                        myLayer = new Layer();
                    }
                    let instrument = buf.readUint8();
                    let key = buf.readUint8();
                    let volume = 1;
                    //let panning = 100;
                    let pitch = 1;
                    if (file.version >= 4) {
                        volume = buf.readUint8() / 100;
                        buf.readUint8(); // panning
                        pitch = buf.readShort(); // pitch
                        // idk how the new pitch works send help
                    }
                    // https://minecraft.gamepedia.com/Note_Block#Notes
                    pitch = 2 ** ((key - 45) / 12);
                    let note = new Note(instrument, key, volume, pitch);
                    myLayer.notes.set(tick, note);
                    file.layers.set(layer, myLayer);
                }
            }
            return file;
        }
    }
    nbs.File = File;
})(nbs || (nbs = {}));

// there might be a better way to do this but idk
function baseNum(num) {
    return num < 10 ? '0' + num : num.toString();
}
function formatSeconds(secs) {
    let numMins = Math.floor(secs / 60);
    let numSecs = secs % 60;
    return `${numMins}:${baseNum(Math.round(numSecs))}`;
}
function slog(str, error = false) {
    if (!error)
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: ${str}`);
    else
        script.log(`${TextColor.RED}${str}`);
}

class NotePlayer {
    constructor() {
        this.song = null;
        this.currentTick = 0;
        this.lastTime = 0;
        this.tempo = 0;
        this.paused = false;
        this.commandMode = false;
        this.loop = true;
    }
    getSongLengthSeconds() {
        return this.song.length / this.tempo;
    }
    getSeconds() {
        return this.currentTick / this.tempo;
    }
    slower() {
        if (!this.song)
            return;
        this.tempo -= 0.5;
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: (Slow Down) New tempo is ${this.song.tempo}`);
    }
    faster() {
        if (!this.song)
            return;
        this.tempo += 0.5;
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: (Speed Up) New tempo is ${this.song.tempo}`);
    }
    setSong(song) {
        this.song = song;
        script.log(`${TextColor.GREEN}${TextColor.BOLD}Now Playing\n${TextColor.RESET}${TextColor.GREEN}${song.name} by ${song.originalAuthor}\nSong Tempo: ${song.tempo}`);
        script.log(`Song Length: ${formatSeconds(this.getSongLengthSeconds())}`);
        this.currentTick = 0;
        this.lastTime = Date.now();
        this.paused = false;
        this.tempo = song.tempo;
    }
    isPlaying() {
        return this.song ? true : false;
    }
    pause() {
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: Paused`);
        this.paused = true;
    }
    resume() {
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: Resumed`);
        this.paused = false;
    }
    stop() {
        script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: Stopped`);
        this.song = null;
    }
    isPaused() {
        return this.paused;
    }
    restart() {
        if (this.song) {
            script.log(`${TextColor.BLUE}NBSRadio${TextColor.WHITE}: Restarting Song`);
            this.currentTick = -10;
        }
    }
    onTick() {
        if (this.song) {
            if (this.paused)
                return;
            if (!game.getLocalPlayer())
                return;
            if (this.song.length != 0 && this.currentTick > this.song.length) {
                this.restart();
                return;
            }
            let songSpeed = 20 / this.tempo;
            let time = Date.now();
            let diff = time - this.lastTime;
            if (diff < (songSpeed * 50)) {
                return;
            }
            this.lastTime = time;
            // Step 1: Go through all layers
            for (let [_, layer] of this.song.layers) {
                // Step 2: Go through all ticks in the layers
                for (let [tk, note] of layer.notes) {
                    if (this.currentTick == tk) {
                        if (this.commandMode) {
                            game.executeCommand(`/playsound ${note.sound} @a ~ ~ ~ ${note.volume} ${note.pitch}`);
                        }
                        else
                            // the moment we've all (me) been waiting for:
                            game.playSoundUI(note.sound, note.volume, note.pitch);
                    }
                }
            }
            ++this.currentTick;
        }
    }
}

class Song {
    constructor(name, author, ogAuthor, tempo, length) {
        this.layers = new Map();
        this.name = name;
        this.author = author;
        this.originalAuthor = ogAuthor;
        this.tempo = tempo;
        this.length = length;
    }
}

class DynamicBuffer {
    constructor(buf) {
        this.underlyingBuffer = buf;
    }
    move(amount) {
        this.underlyingBuffer = this.underlyingBuffer.slice(amount);
    }
    readShort() {
        let num = this.underlyingBuffer.readInt16(0);
        this.move(2);
        return num;
    }
    readString() {
        let str = this.underlyingBuffer.readString(0);
        this.move(str.length + 1 /*NUL character*/);
        return str;
    }
    readUint8() {
        let num = this.underlyingBuffer[0];
        this.move(1);
        return num;
    }
    readInt() {
        let num = this.underlyingBuffer.readInt32(0);
        this.move(4);
        return num;
    }
    readNBSString() {
        let numChars = this.readInt();
        let str = "";
        for (let i = 0; i < numChars; ++i) {
            str += String.fromCharCode(this.underlyingBuffer[i]);
        }
        this.move(numChars);
        return str;
    }
}

const visMod = new HudModule("NBSRadioVisualizer", "NBS Radio Visualizer", "The overlay for the NBS Radio script.", 0 /* KeyCode.None */, false);
client.getModuleManager().registerModule(visMod);
graphics.use("minecraft"); // use minecraft renderer
let size = new Vector2(280, 120);
visMod.on("render", (prev, editor) => {
    visMod.setBounds(size.x, size.y);
});
function drawOverlay() {
    if (!notePlayer.song)
        return;
    let pos = visMod.getPos();
    let rect = new Rect(pos.x, pos.y, pos.x + size.x, pos.y + size.y);
    let color = Color.RGB(0x1E, 0x1E, 0x1E, 255 / 2);
    const fontSize = 30;
    let titleRect = new Rect(rect.left, rect.top, rect.right, rect.top + fontSize);
    let authorRect = new Rect(rect.left, titleRect.bottom + 4, rect.right, titleRect.bottom + fontSize + 4);
    graphics.fillRect(rect, color);
    graphics.drawRect(rect, Color.WHITE, 6);
    graphics.drawTextFull(titleRect, notePlayer.song.name, fontSize, Color.WHITE, 0 /* TextAlignment.Left */, 0 /* VerticalAlignment.Top */);
    graphics.drawTextFull(authorRect, notePlayer.song.originalAuthor, 20, new Color(0.7, 0.7, 0.7, 1), 0 /* TextAlignment.Left */, 0 /* VerticalAlignment.Top */);
    let statusRect = new Rect(rect.left + 5, rect.bottom - 8, rect.right - 5, rect.bottom - 5);
    let completedRect = statusRect;
    completedRect.right = completedRect.left + (completedRect.getWidth() * notePlayer.getSeconds() / notePlayer.getSongLengthSeconds());
    let compTextRect = new Rect(statusRect.left, statusRect.top - 3 - 15, statusRect.right, statusRect.top - 3);
    graphics.fillRect(statusRect, Color.WHITE);
    graphics.fillRect(completedRect, Color.GREEN);
    graphics.drawTextFull(compTextRect, formatSeconds(notePlayer.getSeconds()) + '/' + formatSeconds(notePlayer.getSongLengthSeconds()), 15, Color.WHITE.asAlpha(0.8), 0 /* TextAlignment.Left */, 0 /* VerticalAlignment.Top */);
}
client.on("render2d", () => {
    if (visMod.isEnabled()) {
        drawOverlay();
    }
});

script.name = "NBS Radio";
script.author = "JayRSky";
script.description = "Plays .nbs sounds!";
let cmd = new Command("nbs", "Plays an NBS Song!", "<songFile>", ["nbsplay"]);
const fs = require("filesystem");
const notePlayer = new NotePlayer();
cmd.on("execute", (_, args) => {
    if (args.length < 1) {
        return false; // print the usage
    }
    switch (args[0]) {
        case 'stop':
            if (notePlayer.isPlaying())
                notePlayer.stop();
            slog(`Stopped current song`);
            return true;
    }
    //script.log(`${TextColor.RED}Could not find NBS file ${args[0]}`);
    if (!fs.existsSync(args[0])) {
        slog(`Could not find NBS file ${args[0]}`, true);
        return true;
    }
    fs.read(args[0], (err, content) => {
        if (err != 0) {
            slog(`Could not open NBS file ${args[0]}`, true);
        }
        let myFile = nbs.File.parse(new DynamicBuffer(content));
        let mySong = new Song(myFile.songName, myFile.songAuthor, myFile.songOriginalAuthor, myFile.songTempo, myFile.songLength);
        mySong.layers = myFile.layers;
        notePlayer.setSong(mySong);
    });
    return true;
});
let cmdModeCmd = new Command("nbscommandmode", "Set NBSRadio to use commands instead (be careful)", "", []);
cmdModeCmd.on("execute", () => {
    notePlayer.commandMode = !notePlayer.commandMode;
    slog(`Command mode is ON`);
    return true;
});
client.getCommandManager().registerCommand(cmd);
client.on('key-press', ev => {
    if (!notePlayer.isPlaying())
        return;
    if (game.isInUI())
        return;
    if (ev.isDown) {
        if (ev.keyCode == 75 /* KeyCode.K */) {
            if (notePlayer.isPaused()) {
                notePlayer.resume();
            }
            else
                notePlayer.pause();
        }
        if (ev.keyCode == 74 /* KeyCode.J */) {
            notePlayer.restart();
        }
        if (ev.keyCode == 188 /* KeyCode.Comma */) {
            notePlayer.slower();
        }
        if (ev.keyCode == 190 /* KeyCode.Dot */) {
            notePlayer.faster();
        }
    }
});
client.on("unload-script", ev => {
    if (ev.scriptName == script.name) {
        client.getCommandManager().deregisterCommand(cmd);
        client.getCommandManager().deregisterCommand(cmdModeCmd);
    }
});
client.on('renderDX', () => {
    notePlayer.onTick();
});
client.getCommandManager().registerCommand(cmdModeCmd);
setInterval(() => {
    if (!notePlayer.isPlaying())
        return;
    script.log(`${formatSeconds(notePlayer.getSeconds())} / ${formatSeconds(notePlayer.getSongLengthSeconds())}`);
}, 10000);
