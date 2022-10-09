let enemylist = {};


enemylist['dog'] = {
    name:"dog",
    hp: 1700,
    atk: 260,
    def: 0,
    res:20,
    atkinterval: 1.4,
    speed:1.7,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/dog-sheet-min.png",

    hasskill:false,

    idle:{
        start:34,
        end:48,
        duration:1,

    },

    move:{
        start:15,
        end:22,
        duration:0.66,

    },

    atkanim:{
        start:1,
        end:14,
        contact:8,
        duration:1,
    },

    death:{
        start:23,
        end:32,
        duration:0.86,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume:0.05
        }
    }

}

enemylist['crossbowman'] = {
    name:"crossbowman",
    hp: 1900,
    atk: 310,
    def: 150,
    res:0,
    atkinterval: 2.4,
    speed:0.7,
    blockcount:1,
    type:"g",
    range:2,
    dmgtype:"physical",

    enemytype:"normal",
    targets:1,
    size:1,

    spritesheet:"images/sprites/crossbowman-sheet-min.png",

    hasskill:false,

    idle:{
        start:30,
        end:42,
        duration:1,
    },

    move:{
        start:44,
        end:58,
        duration:1,

    },

    atkanim:{
        start:0,
        end:13,
        contact:8,
        duration:1,

    },

    death:{
        start:14,
        end:29,
        duration:1,

    },
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume:0.1
        }
    }
}


enemylist['sarkaz grudgebearer'] = {
    name:"sarkaz grudgebearer",
    hp: 15000,
    atk: 700,
    def: 250,
    res:50,
    atkinterval: 5,
    speed:0.2,
    blockcount:1,
    type:"g",
    range:2,
    dmgtype:"arts",

    targets:2,

    enemytype:"standby",

    hasskill:true,
    size:1.1,


    spritesheet:"images/sprites/sarkaz-grudgebearer-sheet.png",

    idle:{
        start:39,
        end:62,
        duration:1,
    },

    move:{
        start:63,
        end:87,
        duration:1.5,
    },

    atkanim:{
        start:0,
        end:23,
        contact:14,
        duration:1,

    },

    death:{
        start:24,
        end:38,
        duration:1,

    },

    skill:{
        name :"standby",
        triggertype:"on_hit",
        skilltype:"sarkazstandby",
        target:"self",
        modifiers:{
            speed:0.4,
            standby:false,
        },
        aura:false,

        move:{
            start:88,
            end:107,
            duration:0.5,
    
        },
        idle:{
            start:108,
            end:125,
            duration:1,
        },
    }
    ,
    sfx: {
        atk: {
            src: "grudgebearer-atk",
            volume:0.1
        }
    }
}

enemylist['sarkaz sentinel'] = {
    name:"sarkaz sentinel",
    hp: 4000,
    atk: 0,
    def: 100,
    res:30,
    atkinterval: 1,
    speed:0.3,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",

    targets:1,

    enemytype:"normal",

    hasskill:true,
    size:1,


    spritesheet:"images/sprites/sarkaz-sentinel-sheet.png",

    idle:{
        start:15,
        end:64,
        duration:2,
    },

    move:{
        start:115,
        end:134,
        duration:1.3,

    },
    
    atkanim:{
        start:9999,
        end:9999,
        contact:8,
        duration:1,

    },
    

    death:{
        start:0,
        end:14,
        duration:1,

    },

    skill:{
        name :"standby",
        triggertype:"on_hit",
        skilltype:"sarkazalert",
        target:"all",
        modifiers:{
            atk:0.3,
            def:0.3,
        },
        aura:true,

        idle:{
            start:65,
            end:84,
            duration:1.3,
        },
    
        move:{
            start:95,
            end:114,
            duration:1.3,
    
        },

        begin:{
            start:85,
            end:94,
            duration:0.6,
        },

    },
    sfx: {
        skillact: {
            src: "sentinel-skill",
            volume:2
        }
    }
}

enemylist['sarkaz swordsman'] = {
    name:"sarkaz swordsman",
    hp: 4000,
    atk: 370,
    def: 100,
    res:50,
    atkinterval: 2.5,
    speed:0.8,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/sarkaz-swordsman-sheet.png",

    hasskill:false,
    

    idle:{
        start:37,
        end:51,
        duration:1,

    },

    move:{
        start:52,
        end:65,
        duration:0.94,

    },

    atkanim:{
        start:0,
        end:21,
        contact:13,
        duration:1,
    },

    death:{
        start:23,
        end:36,
        duration:1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume:0.1
        }
    }

}

enemylist['sarkaz greatswordsman'] = {
    name:"sarkaz greatswordsman",
    hp: 7500,
    atk: 600,
    def: 230,
    res:50,
    atkinterval: 2,
    speed:0.65,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1.05,

    enemytype:"normal",

    spritesheet:"images/sprites/sarkaz-greatswordsman-sheet.png",

    hasskill:false,

    idle:{
        start:37,
        end:51,
        duration:1,

    },

    move:{
        start:52,
        end:76,
        duration:1.1,

    },

    atkanim:{
        start:0,
        end:21,
        contact:15,
        duration:1.25,
    },

    death:{
        start:22,
        end:36,
        duration:1,

    },
    sfx: {
        atk: {
            src: "greatswordsman-atk",
            volume:0.1
        }
    }

}

enemylist['sarkaz crossbowman'] = {
    name:"sarkaz crossbowman",
    hp: 6000,
    atk: 450,
    def: 200,
    res:50,
    atkinterval: 3,
    speed:0.6,
    blockcount:1,
    type:"g",
    range:2,
    dmgtype:"physical",
    targets:1,
    size:1.05,

    enemytype:"normal",

    spritesheet:"images/sprites/sarkaz-crossbowman-sheet.png",

    hasskill:false,

    idle:{
        start:34,
        end:48,
        duration:1,

    },

    move:{
        start:49,
        end:72,
        duration:1,

    },

    atkanim:{
        start:0,
        end:19,
        contact:10,
        duration:1,
    },

    death:{
        start:20,
        end:33,
        duration:1,

    },
    sfx: {
        atk: {
            src: "crossbowman-atk",
            volume:0.1
        }
    }

}

enemylist['sarkaz bladeweaver'] = {
    name:"sarkaz bladeweaver",
    hp: 6500,
    atk: 400,
    def: 200,
    res:50,
    atkinterval: 2.5,
    speed:0.2,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"arts",

    targets:1,
    size:1.1,

    enemytype:"standby",

    hasskill:true,


    spritesheet:"images/sprites/sarkaz-bladeweaver-sheet.png",

    idle:{
        start:52,
        end:71,
        duration:1,
    },

    move:{
        start:72,
        end:87,
        duration:2.5,

    },

    atkanim:{
        start:0,
        end:32,
        contact:13,
        duration:1,

    },

    death:{
        start:33,
        end:51,
        duration:1,

    },

    skill:{
        name :"standby",
        triggertype:"on_hit",
        skilltype:"sarkazstandby",
        target:"self",
        modifiers:{
            speed:0.4,
            standby:false,
        },
        aura:false,
    },
    sfx: {
        atk: {
            src: "bladeweaver-atk",
            volume:0.1
        }
    }
}

enemylist["guerrilla fighter"] = {
    name:"guerrilla fighter",
    hp: 3300,
    atk: 300,
    def: 300,
    res:20,
    atkinterval: 2,
    speed:0.9,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-fighter-sheet.png",

    hasskill:true,
    

    idle:{
        start:29,
        end:43,
        duration:1,

    },

    move:{
        start:44,
        end:67,
        duration:1.2,

    },

    atkanim:{
        start:0,
        end:14,
        contact:7,
        duration:1,
    },

    death:{
        start:15,
        end:28,
        duration:1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredfighter",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            speed:0.2,
        },
        aura:false,
    },

}

enemylist["guerrilla fighter leader"] = {
    name:"guerrilla fighter leader",
    hp: 4500,
    atk: 330,
    def: 350,
    res:20,
    atkinterval: 2,
    speed:0.9,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-fighter-leader-sheet.png",

    hasskill:true,
    

    idle:{
        start:29,
        end:43,
        duration:1,

    },

    move:{
        start:44,
        end:67,
        duration:1.2,

    },

    atkanim:{
        start:0,
        end:14,
        contact:7,
        duration:1,
    },

    death:{
        start:15,
        end:28,
        duration:1,

    }
    ,
    sfx: {
        hit: {
            src: "swordsman-hit",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredfighter",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            speed:0.3,
        },
        aura:false,
    },

}

enemylist["guerrilla sniper"] = {
    name:"guerrilla sniper",
    hp: 3000,
    atk: 340,
    def: 300,
    res:20,
    atkinterval: 2.5,
    speed:0.6,
    blockcount:1,
    type:"g",
    range:2,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-sniper-sheet.png",

    hasskill:true,
    

    idle:{
        start:38,
        end:52,
        duration:1,

    },

    move:{
        start:53,
        end:67,
        duration:1,

    },

    atkanim:{
        start:0,
        end:22,
        contact:8,
        duration:0.8,
    },

    death:{
        start:23,
        end:37,
        duration:1,

    }
    ,
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredsniper",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            targets:1,
        },
        aura:false,
    },

}

enemylist["guerrilla sniper leader"] = {
    name:"guerrilla sniper leader",
    hp: 4000,
    atk: 390,
    def: 300,
    res:20,
    atkinterval: 2.7,
    speed:0.6,
    blockcount:1,
    type:"g",
    range:2,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-sniper-leader-sheet.png",

    hasskill:true,
    

    idle:{
        start:38,
        end:52,
        duration:1,

    },

    move:{
        start:53,
        end:67,
        duration:1,

    },

    atkanim:{
        start:0,
        end:22,
        contact:8,
        duration:0.8,
    },

    death:{
        start:23,
        end:37,
        duration:1,

    }
    ,
    sfx: {
        atk: {
            src: "crossbow-atk",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredsniper",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            targets:1,
        },
        aura:false,
    },

}

enemylist['guerrilla hound'] = {
    name:"guerrilla hound",
    hp: 2900,
    atk: 350,
    def: 150,
    res:20,
    atkinterval: 1.4,
    speed:1.6,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-hound-sheet.png",

    hasskill:false,

    idle:{
        start:29,
        end:43,
        duration:1,

    },

    move:{
        start:44,
        end:59,
        duration:1.2,

    },

    atkanim:{
        start:0,
        end:14,
        contact:8,
        duration:1,
    },

    death:{
        start:15,
        end:28,
        duration:1,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume:0.05
        }
    }

}

enemylist['guerrilla hound pro'] = {
    name:"guerrilla hound pro",
    hp: 3080,
    atk: 420,
    def: 150,
    res:20,
    atkinterval: 1.4,
    speed:1.6,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-hound-pro-sheet.png",

    hasskill:false,

    idle:{
        start:30,
        end:44,
        duration:1,

    },

    move:{
        start:45,
        end:60,
        duration:1.2,

    },

    atkanim:{
        start:0,
        end:14,
        contact:8,
        duration:1,
    },

    death:{
        start:15,
        end:29,
        duration:1,

    },
    sfx: {
        atk: {
            src: "dog-atk",
            volume:0.05
        }
    }

}

enemylist["guerrilla siegebreaker"] = {
    name:"guerrilla siegebreaker",
    hp: 3800,
    atk: 360,
    def: 550,
    res:20,
    atkinterval: 1.9,
    speed:0.8,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-siegebreaker-sheet.png",

    hasskill:true,
    

    idle:{
        start:30,
        end:44,
        duration:1,

    },

    move:{
        start:45,
        end:59,
        duration:1,

    },

    atkanim:{
        start:0,
        end:14,
        contact:7,
        duration:1.2,
    },

    death:{
        start:15,
        end:29,
        duration:1,

    },
    start:{
        start:60,
        end:81,
        duration:1,
    }
    ,
    sfx: {
        start: {
            src: "trooper-start",
            volume:0.1
        },
        hit: {
            src: "swordsman-hit",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredsiegebreaker",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            atk:0.5,
        },
        aura:false,
    },
}

enemylist["guerrilla siegebreaker leader"] = {
    name:"guerrilla siegebreaker leader",
    hp: 5000,
    atk: 430,
    def: 550,
    res:20,
    atkinterval: 1.9,
    speed:0.8,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-siegebreaker-leader-sheet.png",

    hasskill:true,
    

    idle:{
        start:30,
        end:44,
        duration:1,

    },

    move:{
        start:45,
        end:59,
        duration:1,

    },

    atkanim:{
        start:0,
        end:14,
        contact:7,
        duration:1.2,
    },

    death:{
        start:15,
        end:29,
        duration:1,

    },
    start:{
        start:60,
        end:81,
        duration:1,
    }
    ,
    sfx: {
        start: {
            src: "trooper-start",
            volume:0.1
        },
        hit: {
            src: "swordsman-hit",
            volume:0.1
        }
    },

    skill:{
        name :"inspiredsiegebreaker",
        triggertype:"on_inspire",
        skilltype:"guerrilainspire",
        target:"self",
        modifiers:{
            atk:0.5,
        },
        aura:false,
        
    },
}

enemylist["sarkaz guerrilla fighter leader"] = {
    name:"sarkaz guerrilla fighter leader",
    hp: 12000,
    atk: 580,
    def: 400,
    res:50,
    atkinterval: 2.5,
    speed:0.65,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1.1,

    enemytype:"normal",

    spritesheet:"images/sprites/sarkaz-guerrilla-fighter-leader-sheet.png",

    hasskill:true,
    

    atkanim:{
        start:0,
        end:17,
        contact:8,
        duration:1,
    },

    death:{
        start:18,
        end:31,
        duration:1,

    },
    idle:{
        start:32,
        end:59,
        duration:1,

    },
    move:{
        start:60,
        end:79,
        duration:1.5,

    },
    
    sfx: {
        hit: {
            src: "sarkaz-guerrilla-hit",
            volume:0.1
        }
    },


    skill:{
        name :"altarfighter",
        triggertype:"on_altar",
        skilltype:"sarkazaltar",
        target:"self",
        modifiers:{
            dmgtype:"arts",
        },
        aura:false,
        atkanim:{
            start:80,
            end:103,
            contact:94,
            duration:1,
        },
    
        death:{
            start:104,
            end:117,
            duration:1,
    
        },
        idle:{
            start:118,
            end:145,
            duration:1,
    
        },
        move:{
            start:146,
            end:165,
            duration:1.5,
    
        },
    },
}

enemylist["guerrilla shieldguard"] = {
    name:"guerrilla shieldguard",
    hp: 15000,
    atk: 700,
    def: 1300,
    res:60,
    atkinterval: 3.8,
    speed:0.5,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1.1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-shieldguard-sheet.png",

    hasskill:true,
    

    atkanim:{
        start:0,
        end:23,
        contact:15,
        duration:1,
    },

    death:{
        start:24,
        end:37,
        duration:1,

    },
    idle:{
        start:38,
        end:53,
        duration:1,

    },
    move:{
        start:54,
        end:71,
        duration:1.5,

    },
    
    sfx: {
        hit: {
            src: "shieldguard-hit",
            volume:0.1
        }
    },


    skill:{
        name :"tauntguerrilla",
        triggertype:"on_start",
        skilltype:"taunt",
        target:"self",
        modifiers:{
            taunt:1,
        },
        aura:false,
    },
}

enemylist["guerrilla shieldguard leader"] = {
    name:"guerrilla shieldguard leader",
    hp: 25000,
    atk: 800,
    def: 1500,
    res:60,
    atkinterval: 3.8,
    speed:0.5,
    blockcount:1,
    type:"g",
    range:0,
    dmgtype:"physical",
    size:1.1,

    enemytype:"normal",

    spritesheet:"images/sprites/guerrilla-shieldguard-leader-sheet.png",

    hasskill:true,
    

    atkanim:{
        start:0,
        end:24,
        contact:15,
        duration:1,
    },

    death:{
        start:25,
        end:38,
        duration:1,

    },
    idle:{
        start:39,
        end:54,
        duration:1,

    },
    move:{
        start:55,
        end:72,
        duration:1.5,

    },
    
    sfx: {
        hit: {
            src: "shieldguard-hit",
            volume:0.1
        }
    },


    skill:{
        name :"tauntguerrilla",
        triggertype:"on_start",
        skilltype:"taunt",
        target:"self",
        modifiers:{
            taunt:1,
        },
        aura:false,
    },
}

