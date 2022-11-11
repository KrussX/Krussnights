let enemylist = {};


enemylist['Hound'] = {
    name: "Hound",
    hp: 1700,
    atk: 260,
    def: 0,
    res: 20,
    atkinterval: 1.4,
    speed: (1.7 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/dog-sheet.webp",

    hasskill: false,

    idle: {
        start: 34,
        end: 48,
        duration: 1,

    },

    move: {
        start: 15,
        end: 22,
        duration: 0.66,

    },

    atkanim: {
        start: 1,
        end: 14,
        contact: 8,
        duration: 1,
    },

    death: {
        start: 23,
        end: 32,
        duration: 0.86,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume: 0.05
        }
    }

}

enemylist['Crossbowman'] = {
    name: "Crossbowman",
    hp: 1900,
    atk: 310,
    def: 150,
    res: 0,
    atkinterval: 2.4,
    speed: (0.7 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2,
    hploss: 1,
    dmgtype: "physical",

    enemytype: "normal",
    targets: 1,
    size: 1,

    spritesheet: "images/sprites/crossbowman-sheet.webp",

    hasskill: false,

    idle: {
        start: 30,
        end: 42,
        duration: 1,
    },

    move: {
        start: 44,
        end: 58,
        duration: 1,

    },

    atkanim: {
        start: 0,
        end: 13,
        contact: 8,
        duration: 1,

    },

    death: {
        start: 14,
        end: 29,
        duration: 1,

    },
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume: 0.1
        }
    }
}


enemylist['Sarkaz Grudgebearer'] = {
    name: "Sarkaz Grudgebearer",
    hp: 15000,
    atk: 700,
    def: 250,
    res: 50,
    atkinterval: 5,
    speed: (0.2 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2,
    hploss: 1,
    dmgtype: "arts",

    targets: 2,

    enemytype: "standby",

    hasskill: true,
    size: 1.1,


    spritesheet: "images/sprites/sarkaz-grudgebearer-sheet.webp",

    idle: {
        start: 39,
        end: 62,
        duration: 1,
    },

    move: {
        start: 63,
        end: 87,
        duration: 1.5,
    },

    atkanim: {
        start: 0,
        end: 23,
        contact: 14,
        duration: 1,

    },

    death: {
        start: 24,
        end: 38,
        duration: 1,

    },

    skill: {
        name: "standby",
        triggertype: "on_hit",
        skilltype: "sarkazstandby",
        target: "self",
        modifiers: {
            speed: 0.4,
            standby: false,
        },
        aura: false,

        move: {
            start: 88,
            end: 107,
            duration: 0.5,

        },
        idle: {
            start: 108,
            end: 125,
            duration: 1,
        },
    }
    ,
    sfx: {
        atk: {
            src: "grudgebearer-atk",
            volume: 0.1
        }
    }
}

enemylist['Sarkaz Sentinel'] = {
    name: "Sarkaz Sentinel",
    hp: 4000,
    atk: 0,
    def: 100,
    res: 30,
    atkinterval: 1,
    speed: (0.3 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",

    targets: 1,

    enemytype: "normal",

    hasskill: true,
    size: 1,


    spritesheet: "images/sprites/sarkaz-sentinel-sheet.webp",

    idle: {
        start: 15,
        end: 64,
        duration: 2,
    },

    move: {
        start: 115,
        end: 134,
        duration: 1.3,

    },

    atkanim: {
        start: 9999,
        end: 9999,
        contact: 8,
        duration: 1,

    },


    death: {
        start: 0,
        end: 14,
        duration: 1,

    },

    skill: {
        name: "standby",
        triggertype: "on_hit",
        skilltype: "sarkazalert",
        target: "all",
        modifiers: {
            atk: 0.3,
            def: 0.3,
        },
        aura: true,
        auratype: 5,
        idle: {
            start: 65,
            end: 84,
            duration: 1.3,
        },

        move: {
            start: 95,
            end: 114,
            duration: 1.3,

        },

        begin: {
            start: 85,
            end: 94,
            duration: 0.6,
        },

    },
    sfx: {
        skillact: {
            src: "sentinel-skill",
            volume: 2
        }
    }
}

enemylist['Sarkaz Swordsman'] = {
    name: "Sarkaz Swordsman",
    hp: 4000,
    atk: 370,
    def: 100,
    res: 50,
    atkinterval: 2.5,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    targets: 1,


    enemytype: "normal",

    spritesheet: "images/sprites/sarkaz-swordsman-sheet.webp",

    hasskill: false,


    idle: {
        start: 37,
        end: 51,
        duration: 1,

    },

    move: {
        start: 52,
        end: 65,
        duration: 0.94,

    },

    atkanim: {
        start: 0,
        end: 21,
        contact: 13,
        duration: 1,
    },

    death: {
        start: 23,
        end: 36,
        duration: 1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    }

}

enemylist['Sarkaz Greatswordsman'] = {
    name: "Sarkaz Greatswordsman",
    hp: 7500,
    atk: 600,
    def: 230,
    res: 50,
    atkinterval: 2,
    speed: (0.65 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.05,
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/sarkaz-greatswordsman-sheet.webp",

    hasskill: false,

    idle: {
        start: 37,
        end: 51,
        duration: 1,

    },

    move: {
        start: 52,
        end: 76,
        duration: 1.1,

    },

    atkanim: {
        start: 0,
        end: 21,
        contact: 15,
        duration: 1.25,
    },

    death: {
        start: 22,
        end: 36,
        duration: 1,

    },
    sfx: {
        atk: {
            src: "greatswordsman-atk",
            volume: 0.1
        }
    }

}

enemylist['Sarkaz Crossbowman'] = {
    name: "Sarkaz Crossbowman",
    hp: 6000,
    atk: 450,
    def: 200,
    res: 50,
    atkinterval: 3,
    speed: (0.6 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2,
    hploss: 1,
    dmgtype: "physical",
    targets: 1,
    size: 1.05,

    enemytype: "normal",

    spritesheet: "images/sprites/sarkaz-crossbowman-sheet.webp",

    hasskill: false,

    idle: {
        start: 34,
        end: 48,
        duration: 1,

    },

    move: {
        start: 49,
        end: 72,
        duration: 1,

    },

    atkanim: {
        start: 0,
        end: 19,
        contact: 10,
        duration: 1,
    },

    death: {
        start: 20,
        end: 33,
        duration: 1,

    },
    sfx: {
        atk: {
            src: "crossbowman-atk",
            volume: 0.1
        }
    }

}

enemylist['Sarkaz Bladeweaver'] = {
    name: "Sarkaz Bladeweaver",
    hp: 6500,
    atk: 400,
    def: 200,
    res: 50,
    atkinterval: 2.5,
    speed: (0.2 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "arts",

    targets: 1,
    size: 1.1,

    enemytype: "standby",

    hasskill: true,


    spritesheet: "images/sprites/sarkaz-bladeweaver-sheet.webp",

    idle: {
        start: 52,
        end: 71,
        duration: 1,
    },

    move: {
        start: 72,
        end: 87,
        duration: 2.5,

    },

    atkanim: {
        start: 0,
        end: 32,
        contact: 13,
        duration: 1,

    },

    death: {
        start: 33,
        end: 51,
        duration: 1,

    },

    skill: {
        name: "standby",
        triggertype: "on_hit",
        skilltype: "sarkazstandby",
        target: "self",
        modifiers: {
            speed: 0.4,
            standby: false,
        },
        aura: false,
    },
    sfx: {
        atk: {
            src: "bladeweaver-atk",
            volume: 0.1
        }
    }
}

enemylist["Guerrilla Fighter"] = {
    name: "Guerrilla Fighter",
    hp: 3300,
    atk: 300,
    def: 300,
    res: 20,
    atkinterval: 2,
    speed: (0.9 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Moves faster when Inspired\n by a Herald or by Patriot.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-fighter-sheet.webp",


    hasskill: true,


    idle: {
        start: 29,
        end: 43,
        duration: 1,

    },

    move: {
        start: 44,
        end: 67,
        duration: 1.2,

    },

    atkanim: {
        start: 0,
        end: 14,
        contact: 7,
        duration: 1,
    },

    death: {
        start: 15,
        end: 28,
        duration: 1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredfighter",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            speed: 0.2,
        },
        aura: true,
        auratype: 2
    },

}

enemylist["Guerrilla Fighter Leader"] = {
    name: "Guerrilla Fighter Leader",
    hp: 4500,
    atk: 330,
    def: 350,
    res: 20,
    atkinterval: 2,
    speed: (0.9 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Moves faster when Inspired\n by a Herald or by Patriot.",
    targets: 1,


    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-grunts-leader-sheet.webp",

    hasskill: true,


    idle: {
        start: 29,
        end: 43,
        duration: 1,

    },

    move: {
        start: 44,
        end: 67,
        duration: 1.2,

    },

    atkanim: {
        start: 0,
        end: 14,
        contact: 7,
        duration: 1,
    },

    death: {
        start: 15,
        end: 28,
        duration: 1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredfighter",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            speed: 0.2,
        },
        aura: true,
        auratype: 2
    },

}

enemylist["Guerrilla Sniper"] = {
    name: "Guerrilla Sniper",
    hp: 3000,
    atk: 340,
    def: 300,
    res: 20,
    atkinterval: 2.5,
    speed: (0.6 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 1.3,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Attacks two targets at once when\nInspired by a Herald or by Patriot.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-sniper-sheet.webp",

    hasskill: true,


    idle: {
        start: 38,
        end: 52,
        duration: 1,

    },

    move: {
        start: 53,
        end: 67,
        duration: 1,

    },

    atkanim: {
        start: 0,
        end: 22,
        contact: 8,
        duration: 0.8,
    },

    death: {
        start: 23,
        end: 37,
        duration: 1,

    }
    ,
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredsniper",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            targets: 1,
        },
        aura: true,
        auratype: 2
    },

}

enemylist["Guerrilla Sniper Leader"] = {
    name: "Guerrilla Sniper Leader",
    hp: 4000,
    atk: 390,
    def: 300,
    res: 20,
    atkinterval: 2.7,
    speed: (0.6 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 1.3,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Attacks two targets at once when\nInspired by a Herald or by Patriot.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-grunts-leader-sheet.webp",

    hasskill: true,


    idle: {
        start: (38 + 68),
        end: (52 + 68),
        duration: 1,

    },

    move: {
        start: (53 + 68),
        end: (67 + 68),
        duration: 1,

    },

    atkanim: {
        start: (0 + 68),
        end: (22 + 68),
        contact: (8 + 68),
        duration: 0.8,
    },

    death: {
        start: (23 + 68),
        end: (37 + 68),
        duration: 1,

    }
    ,
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredsniper",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            targets: 1,
        },
        aura: true,
        auratype: 2
    },
}

enemylist['Guerrilla Hound'] = {
    name: "Guerrilla Hound",
    hp: 2900,
    atk: 350,
    def: 150,
    res: 20,
    atkinterval: 1.4,
    speed: (1.6 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    targets: 1,

    tooltip: "A basic guerrilla-ops war hound\nhaving decent defenses while\nstill being able to move quickly.",

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-hound-sheet.webp",

    hasskill: false,

    idle: {
        start: 29,
        end: 43,
        duration: 1,

    },

    move: {
        start: 44,
        end: 59,
        duration: 1.2,

    },

    atkanim: {
        start: 0,
        end: 14,
        contact: 8,
        duration: 1,
    },

    death: {
        start: 15,
        end: 28,
        duration: 1,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume: 0.05
        }
    }

}

enemylist['Guerrilla Hound Pro'] = {
    name: "Guerrilla Hound Pro",
    hp: 3080,
    atk: 420,
    def: 150,
    res: 20,
    atkinterval: 1.4,
    speed: (1.6 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "An elite guerrilla-ops war hound\nmore aggressive than\nstandard guerrilla hounds.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-grunts-leader-sheet.webp",

    hasskill: false,

    idle: {
        start: (30 + 68 + 68 + 82),
        end: (44 + 68 + 68 + 82),
        duration: 1,

    },

    move: {
        start: (45 + 68 + 68 + 82),
        end: (60 + 68 + 68 + 82),
        duration: 1.2,

    },

    atkanim: {
        start: (0 + 68 + 68 + 82),
        end: (14 + 68 + 68 + 82),
        contact: (8 + 68 + 68 + 82),
        duration: 1,
    },

    death: {
        start: (15 + 68 + 68 + 82),
        end: (29 + 68 + 68 + 82),
        duration: 1,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume: 0.05
        }
    }

}

enemylist["Guerrilla Siegebreaker"] = {
    name: "Guerrilla Siegebreaker",
    hp: 3800,
    atk: 360,
    def: 550,
    res: 20,
    atkinterval: 1.9,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Has significantly increased\n ATK when Inspired\n by a Herald or by Patriot.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-siegebreaker-sheet.webp",

    hasskill: true,


    idle: {
        start: 30,
        end: 44,
        duration: 1,

    },

    move: {
        start: 45,
        end: 59,
        duration: 1,

    },

    atkanim: {
        start: 0,
        end: 14,
        contact: 7,
        duration: 1.2,
    },

    death: {
        start: 15,
        end: 29,
        duration: 1,

    },
    start: {
        start: 60,
        end: 81,
        duration: 1,
    }
    ,
    sfx: {
        start: {
            src: "trooper-start",
            volume: 0.1
        },
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredsiegebreaker",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            atk: 0.5,
        },
        aura: true,
        auratype: 2
    },
}

enemylist["Guerrilla Siegebreaker Leader"] = {
    name: "Guerrilla Siegebreaker Leader",
    hp: 5000,
    atk: 430,
    def: 550,
    res: 20,
    atkinterval: 1.9,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Has significantly increased\n ATK when Inspired\n by a Herald or by Patriot.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-grunts-leader-sheet.webp",

    hasskill: true,


    idle: {
        start: (30 + 68 + 68),
        end: (44 + 68 + 68),
        duration: 1,

    },

    move: {
        start: (45 + 68 + 68),
        end: (59 + 68 + 68),
        duration: 1,

    },

    atkanim: {
        start: (0 + 68 + 68),
        end: (14 + 68 + 68),
        contact: (7 + 68 + 68),
        duration: 1.2,
    },

    death: {
        start: (15 + 68 + 68),
        end: (29 + 68 + 68),
        duration: 1,

    },
    start: {
        start: (60 + 68 + 68),
        end: (81 + 68 + 68),
        duration: 1,
    }
    ,
    sfx: {
        start: {
            src: "trooper-start",
            volume: 0.1
        },
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    },

    skill: {
        name: "inspiredsiegebreaker",
        triggertype: "on_inspire",
        skilltype: "guerrilainspire",
        target: "self",
        modifiers: {
            atk: 0.5,
        },
        aura: true,
        auratype: 2

    },
}

enemylist["Sarkaz Guerrilla Fighter Leader"] = {
    name: "Sarkaz Guerrilla Fighter Leader",
    hp: 12000,
    atk: 580,
    def: 400,
    res: 50,
    atkinterval: 2.5,
    speed: (0.65 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.2,
    tooltip: "Does not take damage when \ncoming in contact with \na pulse wave and attacks\n instead deal Arts damage.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/sarkaz-guerrilla-fighter-leader-sheet.webp",

    hasskill: true,


    atkanim: {
        start: 0,
        end: 17,
        contact: 8,
        duration: 1,
    },

    death: {
        start: 18,
        end: 32,
        duration: 1,

    },
    idle: {
        start: 33,
        end: 60,
        duration: 1,

    },
    move: {
        start: 61,
        end: 80,
        duration: 1.5,

    },

    sfx: {
        hit: {
            src: "sarkaz-guerrilla-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "altarfighter",
        triggertype: "on_altar",
        skilltype: "sarkazaltar",
        target: "self",
        modifiers: {
            dmgtype: "arts",
        },
        aura: true,
        auratype: 2,
        atkanim: {
            start: 81,
            end: 105,
            contact: 95,
            duration: 1,
        },
    },
}

enemylist["Guerrilla Shieldguard"] = {
    name: "Guerrilla Shieldguard",
    hp: 15000,
    atk: 700,
    def: 1300,
    res: 60,
    atkinterval: 3.8,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.2,
    tooltip: "Covers the advance of \nenemy troops by making themselves\n more likely to be attacked.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-shieldguard-sheet.webp",

    hasskill: true,


    atkanim: {
        start: 0,
        end: 23,
        contact: 15,
        duration: 1,
    },

    death: {
        start: 24,
        end: 37,
        duration: 1,

    },
    idle: {
        start: 38,
        end: 53,
        duration: 1,

    },
    move: {
        start: 54,
        end: 71,
        duration: 1.5,

    },

    sfx: {
        hit: {
            src: "shieldguard-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "tauntguerrilla",
        triggertype: "on_start",
        skilltype: "taunt",
        target: "self",
        modifiers: {
            taunt: 1,
        },
        aura: false,
    },
}

enemylist["Guerrilla Shieldguard Leader"] = {
    name: "Guerrilla Shieldguard Leader",
    hp: 25000,
    atk: 800,
    def: 1500,
    res: 60,
    atkinterval: 3.8,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.2,
    tooltip: "Covers the advance of \nenemies by making themselves\nmore likely to be attacked.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-shieldguard-leader-sheet.webp",

    hasskill: true,


    atkanim: {
        start: 0,
        end: 24,
        contact: 15,
        duration: 1,
    },

    death: {
        start: 25,
        end: 38,
        duration: 1,

    },
    idle: {
        start: 39,
        end: 54,
        duration: 1,

    },
    move: {
        start: 55,
        end: 72,
        duration: 1.5,

    },

    sfx: {
        hit: {
            src: "shieldguard-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "tauntguerrilla",
        triggertype: "on_start",
        skilltype: "taunt",
        target: "self",
        modifiers: {
            taunt: 1,
        },
        aura: false,
    },
}

enemylist["Guerrilla Herald"] = {
    name: "Guerrilla Herald",
    hp: 7000,
    atk: 300,
    def: 120,
    res: 50,
    atkinterval: 2.7,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "When on the battlefield,\n Inspires all enemies,\n increasing their ATK and DEF.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-herald-sheet.webp",

    hasskill: true,


    atkanim: {
        start: 0,
        end: 15,
        contact: 8,
        duration: 1,
    },

    death: {
        start: 16,
        end: 32,
        duration: 1,

    },
    idle: {
        start: 33,
        end: 47,
        duration: 1,

    },
    move: {
        start: 48,
        end: 61,
        duration: 1.5,

    },

    sfx: {
        hit: {
            src: "herald-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "inspireguerrilla",
        triggertype: "on_start",
        skilltype: "alive",
        target: "all",
        modifiers: {
            inspire: true,
            atk: 0.1,
            flatdef: 100,
        },
        aura: false,
        auratype: 2
    },
}

enemylist["Guerrilla Herald Leader"] = {
    name: "Guerrilla Herald Leader",
    hp: 10000,
    atk: 360,
    def: 120,
    res: 50,
    atkinterval: 2.5,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "When on the battlefield,\n Inspires all enemies,\n increasing their ATK and DEF.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/guerrilla-herald-leader-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 15,
        contact: 8,
        duration: 1,
    },

    death: {
        start: 16,
        end: 32,
        duration: 1,

    },
    idle: {
        start: 33,
        end: 47,
        duration: 1,

    },
    move: {
        start: 48,
        end: 61,
        duration: 1.5,

    },

    sfx: {
        hit: {
            src: "herald-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "inspireguerrilla",
        triggertype: "on_start",
        skilltype: "alive",
        target: "all",
        modifiers: {
            inspire: true,
            atk: 0.1,
            flatdef: 100,
        },
        aura: false,
        auratype: 2

    },
}

enemylist["Patriot"] = {
    name: "Patriot",
    hp: 45000,
    atk: 4000,
    def: 1900,
    res: 90,
    atkinterval: 4,
    speed: (0.3 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 2,
    dmgtype: "physical",
    size: 1,
    tooltip: "Has extremely high DEF & RES.\n Inspires all enemies,\n increasing their ATK and DEF.",
    revive: true,
    revivetimer: 30,
    revivemax: 30,
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/patriot-sheet.webp",

    hasskill: true,


    atkanim: {
        start: 0,
        end: 22,
        contact: 12,
        duration: 1,
    },


    idle: {
        start: 23,
        end: 47,
        duration: 1,

    },
    move: {
        start: 48,
        end: 76,
        duration: 1.5,

    },
    revival1: {
        start: 77,
        end: 94,
        duration: 1,
    },
    revival2: {
        start: 95,
        end: 114,
        duration: 1,
    },

    sfx: {
        revival: {
            src: "patriot-revival",
            volume: 0.1
        },
        atk: {
            src: "patriot1-atk",
            volume: 0.1
        },
        hit: {
            src: "patriot1-hit",
            volume: 0.1
        }
    },
    skill: {
        name: "inspireguerrilla",
        triggertype: "on_start",
        skilltype: "alive",
        target: "all",
        modifiers: {
            inspire: true,
            atk: 0.2,
            flatdef: 200,
        },
        aura: false,
        auratype: 2
    },
}

enemylist["Patriot2"] = {
    name: "Patriot2",
    hp: 45000,
    atk: 1600,
    def: 500,
    res: 45,
    atkinterval: 4.5,
    speed: (0.4 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0.85,
    hploss: 2,
    dmgtype: "physical",
    size: 1,
    tooltip: "Has extremely high DEF and RES.\n Inspires all enemies,\n increasing their ATK and DEF.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/patriot2-sheet.webp",

    hasskill: true,
    invincible: 15,

    atkanim: {
        start: 0,
        end: 20,
        contact: 10,
        duration: 1.6,
    },
    death: {
        start: 21,
        end: 98,
        duration: 1,
    },

    idle: {
        start: 99,
        end: 116,
        duration: 1,

    },
    move: {
        start: 117,
        end: 146,
        duration: 1.5,

    },
    start: {
        start: 147,
        end: 200,
        duration: 2,
    },


    sfx: {
        start: {
            src: "patriot2-start1",
            volume: 0.3
        },
        start2: {
            src: "patriot2-start2",
            volume: 0.3,
            sprite: 160,
            playing: false
        },
        start3: {
            src: "patriot2-start3",
            volume: 0.3,
            sprite: 188,
            playing: false
        },
        atk: {
            src: "patriot2-atk",
            volume: 0.1
        },
        hit: {
            src: "patriot2-hit",
            volume: 0.1
        }
    },
    skill: {
        name: "inspireguerrilla",
        triggertype: "on_start",
        skilltype: "alive",
        target: "all",
        modifiers: {
            inspire: true,
            atk: 0.2,
            flatdef: 200,
        },
        aura: false,
        auratype: 2
    },

    spattack: {
        name: "javelin",
        target: "r",
        range: 99,
        dmgmodifier: 1.35,
        initialsp: 5,
        sp: 20,
    }
}

enemylist["Roar Knightclub Elite"] = {
    name: "Roar Knightclub Elite",
    hp: 3800,
    atk: 420,
    def: 100,
    res: 0,
    atkinterval: 2.4,
    speed: (0.7 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2,
    hploss: 1,
    dmgtype: "physical",
    size: 0.9,
    tooltip: "Has significantly increased DEF\nand RES for a period of time.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/roar-knightclub-elite-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 19,
        contact: 9,
        duration: 0.8,
    },

    death: {
        start: 20,
        end: 36,
        duration: 1,

    },
    idle: {
        start: 37,
        end: 56,
        duration: 1,

    },

    move: {
        start: 57,
        end: 71,
        duration: 1.5,

    },
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume: 0.1
        }
    },

    skill: {
        name: "knightshield",
        triggertype: "on_start",
        skilltype: "duration",
        target: "self",
        modifiers: {
            flatdef: 3000,
            flatres: 95,
            duration: 30
        },
        aura: true,
        auratype: 7
    },

}

enemylist["Bloodboil Knightclub Elite"] = {
    name: "Bloodboil Knightclub Elite",
    hp: 13000,
    atk: 800,
    def: 800,
    res: 0,
    atkinterval: 2.3,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.2,
    tooltip: "Each time an enemy is defeated,\ngains ATK and ASPD,\nstacking up to 10 times.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/bloodboil-knightclub-elite-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 28,
        contact: 14,
        duration: 0.8,
    },

    death: {
        start: 29,
        end: 43,
        duration: 1,

    },
    idle: {
        start: 44,
        end: 73,
        duration: 1,

    },

    move: {
        start: 74,
        end: 93,
        duration: 1.3,

    },
    sfx: {
        atk: {
            src: "bloodboil-atk",
            volume: 0.1
        },
        hit: {
            src: "bloodboil-hit",
            volume: 0.1
        }
    },

    skill: {
        name: "bloodboil",
        triggertype: "on_anydeath",
        skilltype: "bloodboil",
        target: "self",
        modifiers: {
            atk: 0.1,
            aspd: 5,
            stack: 10
        },
        aura: false,
        auratype: 8
    },
}

enemylist["Elite Knight Shielder"] = {
    name: "Elite Knight Shielder",
    hp: 12000,
    atk: 700,
    def: 1300,
    res: 0,
    atkinterval: 3,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.3,
    tooltip: "A Kazimierz knight with\ndefensive equipment, relying\non a slow-and-steady approach.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/elite-knight-shielder-sheet.webp",

    hasskill: false,

    atkanim: {
        start: 0,
        end: 28,
        contact: 10,
        duration: 0.8,
    },

    death: {
        start: 29,
        end: 45,
        duration: 1,

    },
    idle: {
        start: 46,
        end: 85,
        duration: 1,

    },

    move: {
        start: 86,
        end: 104,
        duration: 1.3,

    },
    sfx: {
        hit: {
            src: "knightshield-hit",
            volume: 0.1
        }
    },

}

enemylist["Vicious Training Gloompincer"] = {
    name: "Vicious Training Gloompincer",
    hp: 3000,
    atk: 450,
    def: 700,
    res: 50,
    atkinterval: 2.5,
    speed: (0.8 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 0.95,
    tooltip: "An Infected creature commonly\nfound in the rivers of Kazimierz.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/vicious-training-gloompincer-sheet.webp",

    hasskill: false,

    atkanim: {
        start: 0,
        end: 17,
        contact: 7,
        duration: 1.3,
    },

    death: {
        start: 17,
        end: 31,
        duration: 1,

    },
    idle: {
        start: 32,
        end: 51,
        duration: 1,

    },

    move: {
        start: 52,
        end: 66,
        duration: 1.5,

    },
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume: 0.1
        }
    },

}


enemylist["Tytus Topola"] = {
    name: "Tytus Topola",
    hp: 20000,
    atk: 750,
    def: 700,
    res: 50,
    atkinterval: 3,
    speed: (0.55 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 1.3,
    hploss: 1,
    dmgtype: "arts",
    size: 1.1,
    tooltip: "Decreases the ATK of the unit\n with the highest ATK;\nRevives.",
    revive: true,
    revivetimer: 0,
    revivemax: 0,
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/tytus-topola-sheet.webp",

    hasskill: false,
    hasspatk: true,

    atkanim: {
        start: 0,
        end: 28,
        contact: 14,
        duration: 0.7,
    },


    idle: {
        start: 49,
        end: 73,
        duration: 1,

    },
    move: {
        start: 74,
        end: 93,
        duration: 1.2,

    },
    spatk: {
        start: 94,
        end: 115,
        duration: 1,

    },

    sfx: {
        atk: {
            src: "lancer-atk",
            volume: 0.1
        },
        hit: {
            src: "lancer-hit",
            volume: 0.1
        }
    },
    spattack: {
        name: "bladehelmdebuff",
        target: "highestatk",
        range: 99,
        initialsp: 0,
        sp: 10,
        applyeffects: {
            modifiers: {
                flatmultiatk: 0.50,
            },
            duration: 25,
            effecticon: 3
        },
    }
}

enemylist["Tytus Topola2"] = {
    name: "Tytus Topola2",
    hp: 25000,
    atk: 750,
    def: 700,
    res: 50,
    atkinterval: 3,
    speed: (0.55 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 1.3,
    hploss: 1,
    dmgtype: "arts",
    size: 1,
    tooltip: "Decreases the ATK of the unit\n with the highest ATK;\nRevives.",

    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/tytus-topola-sheet.webp",

    hasskill: false,
    hasspatk: true,


    atkanim: {
        start: 0,
        end: 28,
        contact: 14,
        duration: 0.8,
    },
    death: {
        start: 29,
        end: 48,
        duration: 1,
    },

    idle: {
        start: 49,
        end: 73,
        duration: 1,

    },
    move: {
        start: 74,
        end: 93,
        duration: 1.2,

    },
    spatk: {
        start: 94,
        end: 115,
        duration: 1,

    },
    start: {
        start: 116,
        end: 202,
        duration: 1.1,
    },
    sfx: {
        atk: {
            src: "lancer-atk",
            volume: 0.1
        },
        hit: {
            src: "lancer-hit",
            volume: 0.1
        }
    },

    spattack: {
        name: "bladehelmdebuff",
        target: "highestatk",
        range: 99,
        initialsp: 0,
        sp: 10,
        applyeffects: {
            modifiers: {
                flatmultiatk: 0.50,
            },
            duration: 25,
            effecticon: 3
        },
    }
}

enemylist["Possessed Soldier Leader"] = {
    name: "Possessed Soldier Leader",
    hp: 4000,
    atk: 300,
    def: 150,
    res: 30,
    atkinterval: 1.8,
    speed: (0.7 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1,
    tooltip: "Regenerates HP rapidly.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/possessed-soldier-leader-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 14,
        contact: 6,
        duration: 1,
    },

    death: {
        start: 15,
        end: 29,
        duration: 1,

    },
    idle: {
        start: 30,
        end: 59,
        duration: 1,

    },
    move: {
        start: 60,
        end: 84,
        duration: 1.1,

    },

    sfx: {
        atk: {
            src: "soldier-atk",
            volume: 0.1
        },
        hit: {
            src: "soldier-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: 150,
        },
        aura: false,
    },
}

enemylist["Possessed Defender Leader"] = {
    name: "Possessed Defender Leader",
    hp: 16000,
    atk: 800,
    def: 1000,
    res: 0,
    atkinterval: 2.6,
    speed: (0.55 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.2,
    tooltip: "Possesses high defense.\nRegenerates HP rapidly.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/possessed-heavy-defender-leader-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 14,
        contact: 6,
        duration: 1,
    },

    death: {
        start: 15,
        end: 28,
        duration: 1,

    },
    idle: {
        start: 29,
        end: 43,
        duration: 1,

    },
    move: {
        start: 44,
        end: 61,
        duration: 1.2,

    },

    sfx: {

        hit: {
            src: "shieldguard-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: 250,
        },
        aura: false,
    },
}

enemylist["Possessed Veteran Junkman"] = {
    name: "Possessed Veteran Junkman",
    hp: 11000,
    atk: 650,
    def: 200,
    res: 30,
    atkinterval: 3,
    speed: (0.45 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.1,
    tooltip: "Regenerates HP rapidly.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/possessed-veteran-junkman-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 22,
        contact: 14,
        duration: 1,
    },

    death: {
        start: 23,
        end: 36,
        duration: 1,

    },
    idle: {
        start: 37,
        end: 56,
        duration: 1,

    },
    move: {
        start: 57,
        end: 76,
        duration: 1.1,

    },

    sfx: {

        hit: {
            src: "junkman-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: 150,
        },
        aura: false,
    },
}

enemylist["Enraged Possessed Bonethrower"] = {
    name: "Enraged Possessed Bonethrower",
    hp: 22000,
    atk: 1050,
    def: 220,
    res: 30,
    atkinterval: 2,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2.5,
    hploss: 1,
    dmgtype: "physical",
    size: 1.05,
    tooltip: "Has extremely ATK.\nLoses HP over time.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/enraged-possessed-bonethrower-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 37,
        contact: 28,
        duration: 1.1,
    },

    death: {
        start: 38,
        end: 52,
        duration: 1,

    },
    idle: {
        start: 53,
        end: 76,
        duration: 1,

    },
    move: {
        start: 77,
        end: 94,
        duration: 1.1,

    },

    sfx: {

        hit: {
            src: "thrower-hit",
            volume: 0.05
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: -350,
        },
        aura: false,
    },
}

enemylist["Enraged Possessed Thrower"] = {
    name: "Enraged Possessed Thrower",
    hp: 15000,
    atk: 750,
    def: 200,
    res: 30,
    atkinterval: 2,
    speed: (0.5 + 0.2) * 0.66,
    blockcount: 1,
    type: "g",
    range: 2.5,
    hploss: 1,
    dmgtype: "physical",
    size: 1.05,
    tooltip: "Has high ATK.\nLoses HP over time.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/enraged-possessed-thrower-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 37,
        contact: 28,
        duration: 1.1,
    },

    death: {
        start: 38,
        end: 52,
        duration: 1,

    },
    idle: {
        start: 53,
        end: 76,
        duration: 1,

    },
    move: {
        start: 77,
        end: 94,
        duration: 1.1,

    },

    sfx: {

        hit: {
            src: "thrower-hit",
            volume: 0.05
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: -250,
        },
        aura: false,
    },
}

enemylist["Enraged Possessed Leader"] = {
    name: "Enraged Possessed Leader",
    hp: 30000,
    atk: 1750,
    def: 230,
    res: 30,
    atkinterval: 1.3,
    speed: 1.2 * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.05,
    tooltip: "Has massive ATK.\nLoses HP over time.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/enraged-possessed-leader-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 19,
        contact: 9,
        duration: 1,
    },

    death: {
        start: 20,
        end: 33,
        duration: 1,

    },
    idle: {
        start: 34,
        end: 63,
        duration: 1,

    },
    move: {
        start: 64,
        end: 75,
        duration: 1.2,

    },

    sfx: {

        hit: {
            src: "rage-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: -500,
        },
        aura: false,
    },
}

enemylist["Enraged Possessed Soldier"] = {
    name: "Enraged Possessed Soldier",
    hp: 20000,
    atk: 1000,
    def: 200,
    res: 30,
    atkinterval: 1.3,
    speed: 1.2 * 0.66,
    blockcount: 1,
    type: "g",
    range: 0,
    hploss: 1,
    dmgtype: "physical",
    size: 1.05,
    tooltip: "Has extremely high ATK.\nLoses HP over time.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/enraged-possessed-soldier-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 19,
        contact: 9,
        duration: 1,
    },

    death: {
        start: 20,
        end: 33,
        duration: 1,

    },
    idle: {
        start: 34,
        end: 63,
        duration: 1,

    },
    move: {
        start: 64,
        end: 75,
        duration: 1.2,

    },

    sfx: {

        hit: {
            src: "rage-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            flathpregen: -330,
        },
        aura: false,
    },
}

enemylist["Mephisto"] = {
    name: "Mephisto",
    hp: 60000,
    atk: 1000,
    def: 300,
    res: 60,
    atkinterval: 10,
    speed: (0.5) * 0.66,
    blockcount: 1,
    type: "g",
    range: 99,
    hploss: 2,
    dmgtype: "heal",
    size: 1.05,
    tooltip: "Less likely to be attacked.\nAttacks heal up to 3 enemies.\nWhile on the battlefield,\nincrease all enemies'\nATK and ASPD.",
    targets: 3,

    enemytype: "normal",

    spritesheet: "images/sprites/mephisto-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 47,
        contact: 20,
        duration: 1,
    },

    death: {
        start: 48,
        end: 61,
        duration: 1,

    },
    idle: {
        start: 62,
        end: 82,
        duration: 1,

    },
    move: {
        start: 83,
        end: 102,
        duration: 1.2,

    },

    sfx: {
        hit: {
            src: "mephisto-hit",
            volume: 0.2
        }
    },


    skill: {
        name: "inspireguerrilla",
        triggertype: "on_start",
        skilltype: "alive",
        target: "all",
        modifiers: {
            atk: 0.2,
            aspd: 10,
            hpregenbuff: 2
        },
        aura: false,
        auratype: 2
    },
}

enemylist["Sarkaz Centurion Nidus Guard"] = {
    name: "Sarkaz Centurion Nidus Guard",
    hp: 14000,
    atk: 700,
    def: 220,
    res: 60,
    atkinterval: 5,
    speed: 0.8 * 0.66,
    blockcount: 1,
    type: "g",
    range: 1.5,
    hploss: 1,
    dmgtype: "arts",
    size: 1.1,
    tooltip: "Attacks 3 targets at once;\neach attack restores\nsome of this unit's HP.",
    targets: 1,

    enemytype: "normal",

    spritesheet: "images/sprites/sarkaz-centurion-nidus-guard-sheet.webp",

    hasskill: true,

    atkanim: {
        start: 0,
        end: 51,
        contact: 16,
        duration: 1,
    },

    death: {
        start: 52,
        end: 66,
        duration: 1,

    },
    idle: {
        start: 67,
        end: 81,
        duration: 1,

    },
    move: {
        start: 82,
        end: 106,
        duration: 1.2,
    },

    sfx: {

        hit: {
            src: "centurion-hit",
            volume: 0.1
        }
    },


    skill: {
        name: "possessedsoldier",
        triggertype: "on_start",
        skilltype: "possess",
        target: "self",
        modifiers: {
            lifesteal: 1.5,
        },
        aura: false,
    },
}



