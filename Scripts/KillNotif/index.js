// Script GitHub repository: https://github.com/Plextora/KillNotif
// Currently only works on The Hive
script.name = "Kill Notif";
script.description =
    "Plays a sound whenever you kill someone on supported servers";
script.version = "1.4.2";
script.author = "Plextora";
let mod = new Module("KillNotif", "Kill Notif", script.description, 0 /* KeyCode.None */);
client.getModuleManager().registerModule(mod);
client.on("receive-chat", (ev) => {
    var _a, _b;
    if (ev.isChat && mod.isEnabled() && ((_a = game.getLocalPlayer()) === null || _a === void 0 ? void 0 : _a.isValid())) {
        if (ev.message.includes(`${(_b = game.getLocalPlayer()) === null || _b === void 0 ? void 0 : _b.getName()} §ckilled`)) {
            game.playSoundUI(soundToPlay, soundVolume.getValue(), soundPitch.getValue());
            if (debugMode.getValue()) {
                script.log(`Played ${soundToPlay} at vol ${soundVolume.getValue()} and pitch ${soundPitch.getValue()}`);
            }
        }
    }
});

let debugMode = mod.addBoolSetting("DebugMode", "Debug mode", "Logs stuff to chat", false);
let soundVolume = mod.addNumberSetting("SoundVolume", "Sound volume", "Loudness of kill sound (default is 1)", 0.1, 1, 0.1, 1);
let soundPitch = mod.addNumberSetting("PitchVolume", "Pitch volume", "Pitch of kill sound (default is 1)", 0.1, 5, 0.1, 1);
let useOrbSound = mod.addBoolSetting("OrbSound", "Orb sound", "", true);
let useExplosionSound = mod.addBoolSetting("ExplosionSound", "Explosion sound", "", false);
let useScreenshotSound = mod.addBoolSetting("ScreenshotSound", "Screenshot sound", "", false);
let usePillagerDeathSound = mod.addBoolSetting("PillagerDeathSound", "Pillager death sound", "", false);

let soundToPlay = "random.orb";
let soundOptions;
let chosenSoundOption;
// i could probably do this without needing a loop running every 500ms, but meh
setInterval(() => {
    soundOptions = [
        { condition: useOrbSound.getValue(), sound: "random.orb" },
        { condition: useExplosionSound.getValue(), sound: "random.explode" },
        { condition: useScreenshotSound.getValue(), sound: "random.screenshot" },
        {
            condition: usePillagerDeathSound.getValue(),
            sound: "mob.pillager.death",
        },
    ];
    chosenSoundOption = soundOptions.find((option) => option.condition);
    soundToPlay = chosenSoundOption ? chosenSoundOption.sound : "random.orb";
}, 500);