class CharaController {
    constructor(chara, scene, x, y, lvlcontroller) {
        //stats of the character
        this.chara = JSON.parse(JSON.stringify(chara));

        //elements showing up on the screen
        this.mesh;
        this.sprite;
        this.shadow;
        this.healthBar;
        this.healthBarBackground;
        this.dead = false;
        this.barrier = 0;


        //current hp
        this.hp = chara.hp;

        //max hp
        this.maxhp = chara.hp;

        this.scene = scene;

        //initial x and y
        this.x = x;
        this.y = y;

        //timer of atk
        this.atktimer = 99999;

        //sprite number when the game is paused
        this.pauseSpriteIndex = 0;

        //status booleans
        this.isattacking = false;
        this.running = false;
        this.skillproc = false;

        //current game speed : 1 is x2, 2 is x1, 8 is slow motion
        this.gamespeed = 1;

        //level controller
        this.lvlcontroller = lvlcontroller
        this.isfrozen = false;

    }

    //update health bar value
    updateHpBar() {
        this.healthBar.value = Math.round(this.hp / (this.maxhp + this.barrier) * 100)
        if (this.barrierBar != undefined) {
            if (this.barrier == 0) {
                this.barrierBar.value = 0;
                this.barriericon.isVisible = false
            }
            else {
                this.barriericon.isVisible = true
                this.barrierBar.value = Math.round((this.hp + this.barrier) / (this.maxhp + this.barrier) * 100)
            }
        }
        this.healthBarBackground.value = Math.max(this.healthBar.value, this.healthBarBackground.value - 1)
    }
    /*
        addParticleEffects(){
            var particleSystem = new BABYLON.ParticleSystem("particles", 30 , this.lvlcontroller.scene, null, true);
            particleSystem.particleTexture = new BABYLON.Texture("images/textures/steamanger.png", this.lvlcontroller.scene, true,
                false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);
    
            particleSystem.startSpriteCellID = 0;
            particleSystem.endSpriteCellID = 31;
            particleSystem.spriteCellHeight = 256;
            particleSystem.spriteCellWidth = 128;
            particleSystem.spriteCellChangeSpeed = 4;
    
            particleSystem.minScaleX = 50.0;
            particleSystem.minScaleY = 80.0;
            particleSystem.maxScaleX = 50.0;
            particleSystem.maxScaleY = 80.0;
            particleSystem.worldOffset = new BABYLON.Vector3(0,0, 3);
    
    
            particleSystem.addSizeGradient(0, 0.0, 0.0);
            particleSystem.addSizeGradient(1.0, 1, 1);
    
            particleSystem.translationPivot = new BABYLON.Vector2(0, -0.5);
    
            // Where the particles come from
            var radius = 10;
            var angle = Math.PI;
            var coneEmitter = new BABYLON.ConeParticleEmitter(radius, 0);
            coneEmitter.radiusRange = 0;
            coneEmitter.heightRange = 0;
    
            particleSystem.particleEmitterType = coneEmitter;
            particleSystem.emitter= this.mesh;
    
            // Life time of each particle (random between...
            particleSystem.minLifeTime = 1.0;
            particleSystem.maxLifeTime = 1.0;
    
            particleSystem.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_Y;
    
            // Color gradient over life
            particleSystem.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0));
            particleSystem.addColorGradient(0.5, new BABYLON.Color4(1, 1, 1, 70/255));
            particleSystem.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));
    
            // Emission rate
            particleSystem.emitRate = 20 ;
    
            // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    
            // Set the gravity of all particles
            particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    
            // Speed
            particleSystem.minEmitPower = 0;
            particleSystem.maxEmitPower = 0 ;
            particleSystem.updateSpeed = 1/50;
    
            // Start the particle system
            particleSystem.start();
    
        }
        */

    //applies cold effect to self, if cold already exists, then apply frozen instead
    applyCold(duration) {
        var statusres = this.buffs.getStatusRes();
        duration *= statusres
        if (this.buffs.effects["cold"] == undefined && this.buffs.effects["frozen"] == undefined) {
            this.buffs.buffs["cold"] = { "name": "cold", "modifiers": { "aspd": -30 } }
            this.buffs.effects["cold"] = duration
            if (this.buffs.effectSprite["cold"] == undefined)
                this.createDebuffAura("cold", 9)
        }
        else {
            this.buffs.effects["cold"] = 0
            if (this.buffs.effects["frozen"] == undefined) {
                this.buffs.buffs["frozen"] = { "name": "frozen", "modifiers": { "frozen": true } }
                this.buffs.effects["frozen"] = duration
                if (this.buffs.effectSprite["frozen"] == undefined)
                    this.createDebuffAura("frozen", 15)
            }
            else this.buffs.effects["frozen"] = Math.max(duration, this.buffs.effects["frozen"])
        }
        if (this.hp <= 0) {
            var keys = Object.keys(this.buffs.effectSprite)
            for (let i = 0; i < keys.length; i++)
                this.buffs.effectSprite[keys[i]].dispose()
        }
    }

    //applies silence effect to self (cannot use any special abilities)
    applySilence(duration) {
        this.buffs.buffs["silence"] = { "name": "silence", "modifiers": { "silence": true } }
        this.buffs.effects["silence"] = duration
        if (this.buffs.effectSprite["silence"] == undefined)
            this.createDebuffAura("silence", 16)
    }

    //applies asleep effect to self (cannot move or attack)
    applyAsleep(duration) {
        this.buffs.buffs["asleep"] = { "name": "asleep", "modifiers": { "asleep": true } }
        this.buffs.effects["asleep"] = duration
        if (this.buffs.effectSprite["asleep"] == undefined)
            this.createDebuffAura("asleep", 17)
    }


    //if healed, then receive healing
    receiveHealing(healer) {
        var dmg = healer.buffs.getFinalAtk(healer.chara.atk)
        this.hp = Math.min(this.maxhp, this.hp + dmg)
        this.updateHpBar();
    }

    //creates a debuff icon on top of the player or enemy
    createDebuffAura(name, cellindex) {
        if (this.buffs.effectSprite[name] == undefined) {
            var icon = new BABYLON.Sprite("", this.lvlcontroller.spriteManagers["icons"]);
            icon.cellIndex = cellindex
            icon.position = new BABYLON.Vector3(this.sprite.position.x, 21, this.sprite.position.z);
            icon.size = 65;
            icon.width = 90;
            this.buffs.effectSprite[name] = icon
        }
    }


    //used by enemy, get first player in range
    // players is the list of all the active players
    //range is the range of the enemy
    //targets is the number of targets that can be hit
    getFirstPlayerInRange(playerz, range, targets) {
        var res = []
        var targetcount = targets;

        if (range == 0 && this.blockingplayer != undefined) {
            res.push(this.blockingplayer)
            targetcount--
            if (targetcount <= 0)
                return res;
        }
        let players = [];
        //to avoid sort that permanently affects order
        for (let i = 0; i < playerz.length; i++)
            players.push(playerz[i])
        //sort by taunt
        players.sort(function (x, y) {
            if (x.buffs.getTauntLevel() < y.buffs.getTauntLevel()) {
                return -1;
            }
            if (x.buffs.getTauntLevel() > y.buffs.getTauntLevel()) {
                return 1;
            }
            return 0;
        });
        for (let i = players.length - 1; i >= 0; i--) {
            if (this.distanceFromCenter(players[i].y * 30, players[i].x * 30, this.mesh.position.z, this.mesh.position.x, range * 30 + 16)) {
                res.push(players[i])
                targetcount--
                if (targetcount <= 0)
                    return res;
            }
        }

        // if range is 0 but the number of targets is higher than 1...
        // then the enemy is ranged,
        // blocked and can still attack more players on top of who's blocking
        if (range == 0 && targets > 1) {
            // get the chara real range
            range = this.chara.range

            for (let i = players.length - 1; i >= 0; i--) {
                if (this.distanceFromCenter(players[i].y * 30, players[i].x * 30, this.mesh.position.z, this.mesh.position.x, range * 30 + 16)) {
                    var found = false;
                    //check if player is not already a target
                    for (let j = 0; j < res.length; j++) {
                        if (res[j].chara.name == players[i].chara.name)
                            found = true;
                    }
                    if (!found) {
                        res.push(players[i])
                        targetcount--
                    }
                    if (targetcount <= 0)
                        return res;
                }
            }
        }
        return res;

    }

    correctDirection(i, j) {
        return true
    }


    //finds if points reside at the center of the range circle of the enemy
    distanceFromCenter(a, b, x, y, r) {
        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
        r *= r;

        if (dist_points < r) {
            return true;
        }
        return false;
    }


    //if player is blocked, then hit the blocked enemies in priority
    getBlockedEnemyInRange(enemies, targets, canasleep = false) {
        var res = [];
        var targetcount = targets;
        var squarerange = [[this.x * 30 - 15, this.x * 30 + 15], [this.y * 30 - 15, this.y * 30 + 15]];

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].blockingplayer == this && !enemies[i].spawning && !enemies[i].invincible
                && !enemies[i].stairs && (!enemies[i].isasleep || canasleep)) {
                res.push(enemies[i])
                targetcount--;
                if (targetcount <= 0)
                    return res;
            }
        }

        //sort by distance from final destination
        enemies.sort(function (x, y) {
            if (x.getCloseToDestination() < y.getCloseToDestination()) {
                return -1;
            }
            if (x.getCloseToDestination() > y.getCloseToDestination()) {
                return 1;
            }
            return 0;
        });

        //sort by taunt
        enemies.sort(function (x, y) {

            if (x.buffs.getTauntLevel() > y.buffs.getTauntLevel()) {
                return -1;
            }
            if (x.buffs.getTauntLevel() < y.buffs.getTauntLevel()) {
                return 1;
            }
            return 0;
        });
        this.buffs.sortByPriority(enemies);

        //if player can hit more targets, get player range and find enemies that can be hit outside of blocked

        var rangeexpand = 0
        var range = this.buffs.getFinalRange(this.chara.range)
        var line = false
        if (range / 0.5 % 2 != 0) {
            if (Math.round(range - 0.3) % Math.round(range) == 0) {
                range = Math.round(this.buffs.getFinalRange(this.chara.range) - 0.3)
                line = true;
            }
            else {
                range = this.buffs.getFinalRange(this.chara.range) - 0.5
                rangeexpand += 1
            }
        }



        if (range > 0 && targets > 1) {
            var squarerange = [[this.x * 30 - 15 - 30 * range, this.x * 30 + 15 + 30 * range], [this.y * 30 - 15 - 30 * range, this.y * 30 + 15 + 30 * range]];
            for (let i = enemies.length - 1; i >= 0; i--) {
                var counter = Math.abs(Math.abs(Math.round(enemies[i].mesh.position.x / 30) - this.x) - range);
                if (this.between(enemies[i].mesh.position.x, squarerange[0]) && this.between(enemies[i].mesh.position.z, squarerange[1])
                    && !enemies[i].spawning && !enemies[i].invincible && !enemies[i].stairs && (!enemies[i].isasleep || canasleep)) {
                    var x = Math.round(enemies[i].mesh.position.x / 30)
                    var z = Math.round(enemies[i].mesh.position.z / 30)
                    if (Math.abs(z - this.y) <= counter + rangeexpand && this.correctDirection(x, z)) {
                        var found = false;
                        //check if enemy is not already a target
                        for (let j = 0; j < res.length; j++) {
                            if (res[j].id == enemies[i].id)
                                found = true;
                        }
                        if (line && !(x - this.x == 0 || z - this.y == 0)) {
                            found = false
                        }
                        if (!found) {
                            res.push(enemies[i])
                            targetcount--
                        }
                        if (targetcount <= 0)
                            return res;
                    }
                }
            }
        }
        return res;
    }

    //get player for healing, heal the player with the least amount of hp % in priority
    getLowestHpPlayerInRange(players, ranget, targets) {
        var rangeexpand = 0
        var range = ranget
        if (range / 0.5 % 2 != 0) {
            range = ranget - 0.5
            rangeexpand += 1
        }
        var squarerange = [[this.x * 30 - 15 - 30 * range, this.x * 30 + 15 + 30 * range], [this.y * 30 - 15 - 30 * range, this.y * 30 + 15 + 30 * range]];
        var targetcount = targets;
        var res = [];
        for (let i = 0; i < players.length; i++) {
            var counter = Math.abs(Math.abs(Math.round(players[i].mesh.position.x / 30) - this.x) - range);
            if (this.between(players[i].x * 30, squarerange[0]) && this.between(players[i].y * 30, squarerange[1]) && players[i].chara.subclass != "Juggernaut" && players[i].hp < players[i].maxhp) {
                if (Math.abs(Math.round(players[i].mesh.position.z / 30) - this.y) <= counter + rangeexpand && this.correctDirection(players[i].x, players[i].y)) {
                    if (res.length < targetcount)
                        res.push(players[i])
                    else {
                        let count = 99
                        for (let j = 0; j < res.length; j++) {
                            if ((players[i].hp / players[i].maxhp) < res[j].hp / res[j].maxhp) {
                                if (count == 99) {
                                    count = j;
                                }
                                else if (res[count].hp / res[count].maxhp > res[j].hp / res[j].maxhp)
                                    count = j
                            }
                        }
                        if (count != 99)
                            res[count] = players[i];
                    }

                }
            }
        }
        return res;
    }

    //get player for healing, heal the player with the least amount of hp % in priority
    getHpPlayerInRange(players, ranget, targets) {
        var rangeexpand = 0
        var range = ranget
        if (range / 0.5 % 2 != 0) {
            range = ranget - 0.5
            rangeexpand += 1
        }
        var squarerange = [[this.x * 30 - 15 - 30 * range, this.x * 30 + 15 + 30 * range], [this.y * 30 - 15 - 30 * range, this.y * 30 + 15 + 30 * range]];
        var targetcount = targets;
        var res = [];
        for (let i = 0; i < players.length; i++) {
            var counter = Math.abs(Math.abs(Math.round(players[i].mesh.position.x / 30) - this.x) - range);
            if (this.between(players[i].x * 30, squarerange[0]) && this.between(players[i].y * 30, squarerange[1])) {
                if (Math.abs(Math.round(players[i].mesh.position.z / 30) - this.y) <= counter + rangeexpand && this.correctDirection(players[i].x, players[i].y)) {
                    if (res.length < targetcount)
                        res.push(players[i])
                    else {
                        let count = 99
                        for (let j = 0; j < res.length; j++) {
                            if ((players[i].hp / players[i].maxhp) < res[j].hp / res[j].maxhp) {
                                if (count == 99) {
                                    count = j;
                                }
                                else if (res[count].hp / res[count].maxhp > res[j].hp / res[j].maxhp)
                                    count = j
                            }
                        }
                        if (count != 99)
                            res[count] = players[i];
                    }

                }
            }
        }
        return res;
    }

    // get first enemy in range
    // enemies is the list of the enemies on the map
    // range is the range of the player
    // targets is the number of targets
    getFirstEnemyInRange(enemies, ranget, targets, canasleep = false) {

        //sort by distance between the player
        enemies.sort(function (x, y) {
            if (x.getCloseToDestination() < y.getCloseToDestination()) {
                return -1;
            }
            if (x.getCloseToDestination() > y.getCloseToDestination()) {
                return 1;
            }
            return 0;
        });

        //sort enemies by taunt level
        enemies.sort(function (x, y) {
            if (x.buffs.getTauntLevel() > y.buffs.getTauntLevel()) {
                return -1;
            }
            if (x.buffs.getTauntLevel() < y.buffs.getTauntLevel()) {
                return 1;
            }
            return 0;
        });
        this.buffs.sortByPriority(enemies);

        var res = [];
        var targetcount = targets;
        var rangeexpand = 0
        var range = ranget
        var line = false
        if (range / 0.5 % 2 != 0) {
            if (Math.round(range - 0.3) % Math.round(range) == 0) {
                range = Math.round(ranget - 0.3)
                line = true;
            }
            else {
                range = ranget - 0.5
                rangeexpand += 1
            }
        }

        var squarerange = [[this.x * 30 - 15 - 30 * range, this.x * 30 + 15 + 30 * range], [this.y * 30 - 15 - 30 * range, this.y * 30 + 15 + 30 * range]];

        for (let i = 0; i < enemies.length; i++) {
            var counter = Math.abs(Math.abs(Math.round(enemies[i].mesh.position.x / 30) - this.x) - range);
            if (this.between(enemies[i].mesh.position.x, squarerange[0]) && this.between(enemies[i].mesh.position.z, squarerange[1])
                && !enemies[i].spawning && !enemies[i].invincible && !enemies[i].stairs && (!enemies[i].isasleep || canasleep)) {
                var x = Math.round(enemies[i].mesh.position.x / 30)
                var z = Math.round(enemies[i].mesh.position.z / 30)
                if (Math.abs(z - this.y) <= counter + rangeexpand && this.correctDirection(x, z)) {
                    if (line) {
                        if (x - this.x == 0 || z - this.y == 0) {
                            res.push(enemies[i])
                            targetcount--;
                        }
                    }
                    else {
                        res.push(enemies[i])
                        targetcount--;
                    }
                    if (targetcount <= 0)
                        return res;
                }
            }
        }
        return res;
    }

    //get players hit by splash in surrounding tiles from the center (main target)
    getSplashPlayersInRange(enemies, center, range) {

        var squarerange = [[center.mesh.position.x - 15 - 30 * range, center.mesh.position.x + 15 + 30 * range], [center.mesh.position.z - 15 - 30 * range, center.mesh.position.z + 15 + 30 * range]];
        var res = [];
        for (let i = 0; i < enemies.length; i++) {
            var counter = Math.abs(Math.abs(Math.round(enemies[i].mesh.position.x / 30) - Math.abs(Math.round(center.mesh.position.x / 30))) - range);
            if (this.between(enemies[i].mesh.position.x, squarerange[0]) && this.between(enemies[i].mesh.position.z, squarerange[1])) {
                var z = Math.round(enemies[i].mesh.position.z / 30)
                if (Math.abs(z - Math.abs(Math.round(center.mesh.position.z / 30))) <= counter && enemies[i].chara.name != center.chara.name)
                    res.push(enemies[i])
            }
        }
        return res;
    }

    //get enemies hit by splash in a radius from the center (first enemy hit)
    getSplashEnemiesInRange(enemies, center, radius, canasleep = false) {
        var res = [];
        var squarerange = [[center.mesh.position.x - 30 * radius, center.mesh.position.x + 30 * radius], [center.mesh.position.z - 30 * radius, center.mesh.position.z + 30 * radius]];

        for (let i = 0; i < enemies.length; i++) {
            if (this.between(enemies[i].mesh.position.x, squarerange[0]) && this.between(enemies[i].mesh.position.z, squarerange[1])
                && !enemies[i].spawning && !enemies[i].invincible && !enemies[i].stairs && (!enemies[i].isasleep || canasleep)) {
                res.push(enemies[i])
            }
        }
        return res;
    }

    //creates effect status icon
    createEffects(auraManager) {
        var aura = new BABYLON.Sprite("", auraManager);
        aura.playAnimation(0, 13, false, 60);
        aura.position = new BABYLON.Vector3(5 + this.mesh.position.x, 19, 10 + this.mesh.position.z);
        aura.size = 60;
        aura.width = 80;

        aura.position.z -= Math.min(5, this.y);
        aura.position.x -= this.x;
    }

    //receive damage used by player
    receiveDamage(enemy, hazard = false, mod = 1) {
        var dmg;
        var dmgtype;

        if (!hazard) {
            dmg = enemy.buffs.getFinalAtk(enemy.chara.atk) * mod
            dmg += enemy.getSpeedDmg();
            if (this.isfrozen)
                dmg *= enemy.buffs.getFrozenModifier();
            dmgtype = enemy.buffs.getDmgType()
            if (dmgtype == "")
                dmgtype = enemy.chara.dmgtype
        }
        else {
            //if hit by hazard, then always true damage
            dmgtype = "true"
            dmg = enemy.dmg
        }

        var dmgreceived;

        switch (dmgtype) {
            case "physical":
                dmgreceived = Math.max(dmg * 0.05, dmg - this.buffs.getFinalDef(this.chara.def))
                break;
            case "magic":
                dmgreceived = Math.max(dmg * 0.10, dmg * ((100 - this.buffs.getFinalRes(this.chara.res)) / 100))
                break;
            case "true":
                dmgreceived = dmg;
                break;
        }
        if (this.buffs.getHitOrMiss(dmgtype)) {
            var finaldmg = this.buffs.getFinalDamage(dmgreceived)
            if (this.barrier > 0) {
                this.barrier -= finaldmg
                if (this.barrier < 0)
                    finaldmg = Math.abs(this.barrier)
                else finaldmg = 0;
                this.barrier = Math.max(this.barrier, 0)
            }

            this.hp -= finaldmg
            if (!hazard) {
                //enemy life steal
                enemy.hp = Math.min(enemy.hp + enemy.buffs.getHPRecovered(finaldmg), enemy.maxhp)
                enemy.updateHpBar()
                if (this.barrier > 0) {
                    this.reflectDamage(enemy);
                }
            }
        }
        if (this.hp > 0) {
            //changes the color of the sprite to red to show they are getting hit
            this.sprite.color.r = 10
            this.sprite.color.g = 0
            this.sprite.color.b = 0
        }


        setTimeout(() => {
            if (this.hp > 0) {
                this.sprite.color.r = 1
                this.sprite.color.g = 1
                this.sprite.color.b = 1
            }
        }, 100)
        //TODO HARDCODED
        if (this.chara.name == "Liskarm") {
            let list = this.lvlcontroller.activePlayers.filter(op => (op.chara.name != "Liskarm" && op.playerSkill.chargetype != "passive" && !op.playerSkill.active))
            var players = shuffle(this.getFirstPlayerInRange(list, 1, 4))
            if (players.length > 0) {
                players[0].playerSkill.currentsp = Math.min(players[0].playerSkill.currentsp + 1, players[0].playerSkill.totalsp);
                players[0].updateSkillBarCharging();
            }
            if (!this.playerSkill.active)
                this.playerSkill.currentsp = Math.min(this.playerSkill.currentsp + 1, this.playerSkill.totalsp);
        }
        if (this.playerSkill.chargetype == "hit" && !this.playerSkill.active) {
            this.playerSkill.currentsp = Math.min(this.playerSkill.currentsp + 1, this.playerSkill.totalsp);
            this.updateSkillBarCharging();
        }
        //update hp bar after receiving damage
        this.updateHpBar();
        this.checkDeath();
    }

    //apply status effect to target when applicable
    applySpecialEffect(modifiers, target) {
        let keys = Object.keys(modifiers);
        for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "cold":
                    target.applyCold(modifiers[keys[i]]);
                    break;
                case "silence":
                    target.applySilence(modifiers[keys[i]])
                    break;
                case "asleep":
                    target.applyAsleep(modifiers[keys[i]])
                    break;
            }
        }
    }

    //reflects damage when applicable
    reflectDamage(enemy) {
        let dmg = this.buffs.getFinalBarrierReflect(this.chara.atk)
        let dmgreceived = Math.max(dmg * 0.10, (dmg) * ((100 - enemy.buffs.getFinalRes(enemy.chara.res)) / 100))
        enemy.hp -= dmgreceived
        if (dmgreceived > 0) {
            if (enemy.hp > 0) {
                //changes the color of the sprite to red to show they are getting hit
                enemy.sprite.color.r = 10
                enemy.sprite.color.g = 0
                enemy.sprite.color.b = 0
            }

            setTimeout(() => {
                if (enemy.hp > 0) {
                    enemy.sprite.color.r = 1
                    enemy.sprite.color.g = 1
                    enemy.sprite.color.b = 1
                }
            }, 100)
        }
        enemy.updateHpBar();
    }

    //checks if a player died and does the death related actions if they are
    checkDeath() {
        if (this.hp <= 0) {
            if (this.condtalent != undefined) {
                if (this.condtalent.condition == "death") {
                    this.hp = 0;
                    this.checkConditionTalent();
                }
            }
        }
        //if dead
        if (this.hp <= 0) {
            if (!this.dead) {
                //boolean to avoid playing the sound multiple times from different enemies hitting a dying player at once
                this.lvlcontroller.playSound("charadead", 0.3)
                this.dead = true;

                //dispose of all the scene elements
                this.mesh.dispose(true, true)
                this.healthBar.dispose()
                this.healthBarBackground.dispose()

                this.skillBar.dispose()
                this.skillready.dispose()
                this.barriericon.dispose()
                this.barrierBar.dispose()


                if (this.aura != undefined)
                    this.aura.dispose()
                var keys = Object.keys(this.buffs.effectSprite)
                for (let i = 0; i < keys.length; i++)
                    this.buffs.effectSprite[keys[i]].dispose()
                this.sprite.color.r = 1
                this.sprite.color.g = 1
                this.sprite.color.b = 1

                //play death animation
                var darkening = 1 / (this.chara.death.end - this.chara.death.start) / 2.5
                this.sprite.playAnimation(this.chara.death.start, this.chara.death.end, false, 30 * Math.min(2, this.gamespeed));

                var instance = this
                var interval = setInterval(() => {

                    this.sprite.color.r -= darkening / this.gamespeed
                    this.sprite.color.g -= darkening / this.gamespeed
                    this.sprite.color.b -= darkening / this.gamespeed
                    if (instance.sprite.cellIndex == instance.chara.death.end) {
                        //after death animation is over, remove the sprite
                        instance.sprite.dispose()
                        instance.shadow.dispose()
                        clearInterval(interval);
                    }
                }, 1);
                this.hp = -999
            }
        }
    }

    //if game paused, freeze the sprite and remember the pause sprite
    pause() {
        this.pauseSpriteIndex = this.sprite.cellIndex;
        this.sprite.stopAnimation();
    }

    //resume animations after finishing pause
    resume() {
        var keys = ["atkanim", "death", "start", "drop", "spatk"]

        this.running = false;
        for (let i = 0; i < keys.length; i++) {
            if (this.chara[keys[i]] != undefined) {
                if (this.pauseSpriteIndex >= this.chara[keys[i]].start && this.pauseSpriteIndex <= this.chara[keys[i]].end) {
                    this.sprite.playAnimation(this.pauseSpriteIndex, this.chara[keys[i]].end, false, 30 * this.gamespeed * this.chara[keys[i]].duration || 1);
                }
            }
        }
        if (this.pauseSpriteIndex >= this.chara.atkanim.start && this.pauseSpriteIndex <= this.chara.atkanim.end) {
            this.sprite.playAnimation(this.pauseSpriteIndex, this.chara.atkanim.end, false, 30 * this.gamespeed * this.buffs.getFinalAtkInterval(this.chara.atkanim.duration, true));
        }
        if (this.chara.skillatkanim != undefined) {
            if (this.pauseSpriteIndex >= this.chara.skillatkanim.start && this.pauseSpriteIndex <= this.chara.skillatkanim.end) {
                this.sprite.playAnimation(this.pauseSpriteIndex, this.chara.skillatkanim.end, false, 30 * this.gamespeed * this.buffs.getFinalAtkInterval(this.chara.atkanim.duration, true));
            }
        }

        if (this.chara.revival1 != undefined) {
            if (this.pauseSpriteIndex >= this.chara.revival1.start && this.pauseSpriteIndex <= this.chara.revival1.end) {
                this.sprite.playAnimation(this.pauseSpriteIndex, this.chara.revival1.end, false, 30 * this.gamespeed * (this.chara.revival1.duration));
            }
        }

        if (this.chara.revival2 != undefined) {
            if (this.pauseSpriteIndex >= this.chara.revival2.start && this.pauseSpriteIndex <= this.chara.revival2.end) {
                this.sprite.playAnimation( this.chara.revival2.start, this.chara.revival2.end, true, 30 * this.gamespeed * (this.chara.revival2.duration));
            }
        }

        if (this.pauseSpriteIndex >= this.chara.idle.start && this.pauseSpriteIndex <= this.chara.idle.end) {
            this.sprite.playAnimation(this.chara.idle.start, this.chara.idle.end, true, 30 * this.gamespeed * (this.chara.idle.duration || 1));
        }
        if (this.chara.skillidle != undefined) {
            if (this.pauseSpriteIndex >= this.chara.skillidle.start && this.pauseSpriteIndex <= this.chara.skillidle.end) {
                this.sprite.playAnimation(this.chara.skillidle.start, this.chara.skillidle.end, true, 30 * this.gamespeed * (this.chara.skillidle.duration || 1));
            }
        }
    }

    between(x, range) {
        return x >= range[0] && x <= range[1];
    }

    xleft() {
        return this.mesh.position.x - this.width / 2
    }

    xright() {
        return this.mesh.position.x + this.width / 2
    }

    yup() {
        return this.mesh.position.y + this.height / 2
    }

    ydown() {
        return this.mesh.position.y - this.height / 2
    }

    move() {
        throw "not implemented"
    }

    attack() {
        throw "not implemented"
    }

    die() {
        throw "not implemented"
    }


    xleft() {
        return this.mesh.position.x - this.width / 2
    }

    xright() {
        return this.mesh.position.x + this.width / 2
    }

    yup() {
        return this.mesh.position.y + this.height / 2
    }

    ydown() {
        return this.mesh.position.y - this.height / 2
    }

}