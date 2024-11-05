Object.defineProperty(exports, '__esModule', { value: true })

const x = i => Texture.load(i)

exports.textures = {
    "red":     { normal: x("./textures/red.png"),     broken: x("./textures/red_broken.png"),     eliminated: x("./textures/red_eliminated.png") },
    "yellow":  { normal: x("./textures/yellow.png"),  broken: x("./textures/yellow_broken.png"),  eliminated: x("./textures/yellow_eliminated.png") },
    "gray":    { normal: x("./textures/gray.png"),    broken: x("./textures/gray_broken.png"),    eliminated: x("./textures/gray_eliminated.png") },
    "blue":    { normal: x("./textures/blue.png"),    broken: x("./textures/blue_broken.png"),    eliminated: x("./textures/blue_eliminated.png") },
    "orange":  { normal: x("./textures/orange.png"),  broken: x("./textures/orange_broken.png"),  eliminated: x("./textures/orange_eliminated.png") },
    "aqua":    { normal: x("./textures/aqua.png"),    broken: x("./textures/aqua_broken.png"),    eliminated: x("./textures/aqua_eliminated.png") },
    "green":   { normal: x("./textures/green.png"),   broken: x("./textures/green_broken.png"),   eliminated: x("./textures/green_eliminated.png") },
    "magenta": { normal: x("./textures/magenta.png"), broken: x("./textures/magenta_broken.png"), eliminated: x("./textures/magenta_eliminated.png") },
}

exports.maps = {
    "default": {
        "distance": 50,
        "islands": [
            { "angle": 157.5, "team": "red"     },
            { "angle": 202.5, "team": "yellow"  },
            { "angle": 247.5, "team": "gray"    },
            { "angle": 292.5, "team": "blue"    },
            { "angle": 337.5, "team": "orange"  },
            { "angle": 22.50, "team": "aqua"    },
            { "angle": 67.50, "team": "green"   },
            { "angle": 112.5, "team": "magenta" }
        ]
    },

    // Solo Maps
    "Sway Bells": {
        "distance": 50,
        "islands": [
            { "angle": 67.50, "team": "red"     },
            { "angle": 112.5, "team": "yellow"  },
            { "angle": 157.5, "team": "gray"    },
            { "angle": 202.5, "team": "blue"    },
            { "angle": 247.5, "team": "orange"  },
            { "angle": 292.5, "team": "aqua"    },
            { "angle": 337.5, "team": "green"   },
            { "angle": 22.50, "team": "magenta" }
        ]
    },
    "Oceanic": {
        "distance": 50,
        "islands": [
            { "angle": 247.5, "team": "red"     },
            { "angle": 292.5, "team": "yellow"  },
            { "angle": 337.5, "team": "gray"    },
            { "angle": 22.50, "team": "blue"    },
            { "angle": 67.50, "team": "orange"  },
            { "angle": 112.5, "team": "aqua"    },
            { "angle": 157.5, "team": "green"   },
            { "angle": 202.5, "team": "magenta" }
        ]
    },

    // Duos Maps
    "Atlantis": {
        "distance": 50,
        "islands": [
            { "angle": 247.5, "team": "red"     },
            { "angle": 292.5, "team": "yellow"  },
            { "angle": 337.5, "team": "gray"    },
            { "angle": 22.50, "team": "blue"    },
            { "angle": 67.50, "team": "orange"  },
            { "angle": 112.5, "team": "aqua"    },
            { "angle": 157.5, "team": "green"   },
            { "angle": 202.5, "team": "magenta" }
        ]
    },
    "Ablaze": {
        "distance": 50,
        "islands": [
            { "angle": 157.5, "team": "red"     },
            { "angle": 247.5, "team": "yellow"  },
            { "angle": 202.5, "team": "gray"    },
            { "angle": 292.5, "team": "blue"    },
            { "angle": 337.5, "team": "orange"  },
            { "angle": 22.50, "team": "aqua"    },
            { "angle": 112.5, "team": "green"   },
            { "angle": 67.50, "team": "magenta" }
        ]
    },

    // Squads Maps
    "Autumn": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Cobalt": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Coven": {
        "distance": 30,
        "islands": [
            { "angle": 270.0, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Cyberspace": {
        "distance": 30,
        "islands": [
            { "angle": 0.000, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 270.0, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Gingerbread": {
        "distance": 30,
        "islands": [
            { "angle": 90.00, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 270.0, "team": "green"  }
        ]
    },
    "Grove": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Hanging Gardens": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 0.000, "team": "yellow" },
            { "angle": 90.00, "team": "blue"   },
            { "angle": 270.0, "team": "green"  }
        ]
    },
    "Monster Labs": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 90.00, "team": "blue"   },
            { "angle": 0.000, "team": "green"  }
        ]
    },
    "O2": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 0.000, "team": "yellow" },
            { "angle": 90.00, "team": "blue"   },
            { "angle": 270.0, "team": "green"  }
        ]
    },
    "Pirates": {
        "distance": 30,
        "islands": [
            { "angle": 90.00, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 270.0, "team": "blue"   },
            { "angle": 0.000, "team": "green"  }
        ]
    },
    "Prisma": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Quantum": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Rome": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 0.000, "team": "yellow" },
            { "angle": 90.00, "team": "blue"   },
            { "angle": 270.0, "team": "green"  }
        ]
    },
    "Ruins": {
        "distance": 30,
        "islands": [
            { "angle": 90.00, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 180.0, "team": "green"  }
        ]
    },
    "Serrano": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Spring": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Summer": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Summer Coast": {
        "distance": 30,
        "islands": [
            { "angle": 315.0, "team": "red"    },
            { "angle": 45.00, "team": "yellow" },
            { "angle": 225.0, "team": "blue"   },
            { "angle": 135.0, "team": "green"  }
        ]
    },
    "Temple": {
        "distance": 30,
        "islands": [
            { "angle": 0.000, "team": "red"    },
            { "angle": 90.00, "team": "yellow" },
            { "angle": 180.0, "team": "blue"   },
            { "angle": 270.0, "team": "green"  }
        ]
    },
    "Tesla Labs": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 90.00, "team": "blue"   },
            { "angle": 0.000, "team": "green"  }
        ]
    },
    "Tropical": {
        "distance": 30,
        "islands": [
            { "angle": 0.000, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 270.0, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    },
    "Winter": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    }
}