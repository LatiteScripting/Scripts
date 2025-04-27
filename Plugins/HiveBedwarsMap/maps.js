Object.defineProperty(exports, '__esModule', { value: true })

const x = i => Texture.load(i)
const y = i => String.fromCharCode(i)

exports.textures = {
    "red":     { normal: x("./red.png"),     broken: x("./red_broken.png"),     eliminated: x("./red_eliminated.png") },
    "yellow":  { normal: x("./yellow.png"),  broken: x("./yellow_broken.png"),  eliminated: x("./yellow_eliminated.png") },
    "gray":    { normal: x("./gray.png"),    broken: x("./gray_broken.png"),    eliminated: x("./gray_eliminated.png") },
    "blue":    { normal: x("./blue.png"),    broken: x("./blue_broken.png"),    eliminated: x("./blue_eliminated.png") },
    "orange":  { normal: x("./orange.png"),  broken: x("./orange_broken.png"),  eliminated: x("./orange_eliminated.png") },
    "aqua":    { normal: x("./aqua.png"),    broken: x("./aqua_broken.png"),    eliminated: x("./aqua_eliminated.png") },
    "green":   { normal: x("./green.png"),   broken: x("./green_broken.png"),   eliminated: x("./green_eliminated.png") },
    "magenta": { normal: x("./magenta.png"), broken: x("./magenta_broken.png"), eliminated: x("./magenta_eliminated.png") },
}

exports.teamIcons = [
    [ "red",     y(0xE1DC), y(0xE1DD) ],
    [ "yellow",  y(0xE1DE), y(0xE1DF) ],
    [ "gray",    y(0xE1D4), y(0xE1D5) ],
    [ "blue",    y(0xE1D2), y(0xE1D3) ],
    [ "orange",  y(0xE1DA), y(0xE1DB) ],
    [ "aqua",    y(0xE1D0), y(0xE1D1) ],
    [ "green",   y(0xE1D6), y(0xE1D7) ],
    [ "magenta", y(0xE1D8), y(0xE1D9) ]
]

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
    "Enchantment": {
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
    "Lumora": {
        "distance": 30,
        "islands": [
            { "angle": 90.00, "team": "red"    },
            { "angle": 180.0, "team": "yellow" },
            { "angle": 270.0, "team": "blue"   },
            { "angle": 0.000, "team": "green"  }
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
    "Soul's End": {
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
    },

    // LTM
    "Manor": {
        "distance": 30,
        "islands": [
            { "angle": 180.0, "team": "red"    },
            { "angle": 270.0, "team": "yellow" },
            { "angle": 0.000, "team": "blue"   },
            { "angle": 90.00, "team": "green"  }
        ]
    }
}