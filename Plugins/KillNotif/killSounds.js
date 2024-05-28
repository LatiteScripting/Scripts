"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedSound = exports.soundToPlay = void 0;
const modOptions_1 = require("./modOptions");
exports.soundToPlay = "random.orb";
function getSelectedSound() {
    if (modOptions_1.useOrbSound.getValue()) {
        exports.soundToPlay = "random.orb";
    }
    else if (modOptions_1.useExplosionSound.getValue()) {
        exports.soundToPlay = "random.explode";
    }
    else if (modOptions_1.useScreenshotSound.getValue()) {
        exports.soundToPlay = "random.screenshot";
    }
    else if (modOptions_1.usePillagerDeathSound.getValue()) {
        exports.soundToPlay = "mob.pillager.death";
    }
    else {
        exports.soundToPlay = "random.orb";
    }
}
exports.getSelectedSound = getSelectedSound;
