let Jesus = new Module("JesusWarn", "JesusWarn", "Be not afraid.", 0);
let BypassUI = Jesus.addBoolSetting("BypassUI", "Bypass GUI", "Bypass the UI and let Jesus pass", false)
let Health = Jesus.addNumberSetting("Health", "Health", "Health Value to Trigger", 1, 19, 0.5, 6.5)
let lastPlayedTime = 0;
let texture = Texture.load("Jesus.png");
let HasReloadedTexturePackBecauseItShowsMagentaAndIHateIt = 0
let number = 1.0;

function ReloadTexturePackTwiceBecauseLatiteCantLoadIt() {
    if (HasReloadedTexturePackBecauseItShowsMagentaAndIHateIt != 1) {
        texture = Texture.load("Jesus.png");
        HasReloadedTexturePackBecauseItShowsMagentaAndIHateIt = 1
    }
}

function decrementNumber() {
    if (number > 0) {
      number -= 0.02;
    }
  }

function handleSoundPlayback() {
    const currentTime = Date.now(); // Weird hack to make the sound play forever in a 2 second interval because setinterval is broken asf
    const playerHealth = game.getLocalPlayer().getHealth(); // Get the player's current health

    if (playerHealth <= Health.getValue() && Jesus.isEnabled() && !game.isInUI() || playerHealth <= Health.getValue() && Jesus.isEnabled() && game.isInUI() && BypassUI.getValue()) {
        if (currentTime - lastPlayedTime >= 2000) { // Only play if 2 second has passed
            os.playSound("bell.wav"); 
            lastPlayedTime = currentTime; 
        }
    } else {
        lastPlayedTime = 0; // Reset
    }
}

client.on("render2d", () => {
    let screensize = game.getScreenSize();
    const currentTime = Date.now();
    
    if (lastPlayedTime !== 0) {
        if ((currentTime - lastPlayedTime >= 800)) { // Only play if 1.5 seconds has passed
            texture.dispose();
            number = 1.0
        }
        else {
            // Draw the texture with the calculated color
            graphics.drawTexture(texture, new Vector2(0, 0), screensize.x, screensize.y, new Color(parseFloat(number.toFixed(1)), parseFloat(number.toFixed(1)), parseFloat(number.toFixed(1)), parseFloat(number.toFixed(1))));
            decrementNumber()
        }
    }
    else {
        texture.dispose();
        number = 1.0
    }
});

client.on('world-tick', () => {
    handleSoundPlayback(); // Put in it a function to stop latite from crashing the damn game
});

client.on('join-game', () => {
    ReloadTexturePackTwiceBecauseLatiteCantLoadIt()
});

client.on('leave-game', () => {
    HasReloadedTexturePackBecauseItShowsMagentaAndIHateIt = 0
});

client.getModuleManager().registerModule(Jesus);