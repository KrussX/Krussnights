class EnemyController extends CharaController {
    constructor(chara, scene, x, y, lvlcontroller, id) {
        super(chara, scene, x, y, lvlcontroller)

        //pattern to follow before reaching its goal
        this.pattern;
        //checkpoints to reach a point
        this.checkpoints;
        //point to reach
        this.currentpoint;
        this.id = id;

        this.finish = false;
        this.blocked = false;
        this.blockingplayer;
        this.attacking = false;
        this.waittimer = 0;
        this.wait = false;
        this.aura;
        if (this.chara.hasskill)
            this.enemySkill = new EnemySkill(chara.skill.name + id, chara.skill.triggertype, chara.skill.modifiers, chara.skill.aura, chara.skill.skilltype, chara.skill.target, chara.skill.auratype)

        this.buffs = new EnemyBuffs();

        this.spawning = false;
        this.invincible = false;
        this.invincibleaura;
        this.spattacktimer;
        this.skillBar;
        if (this.chara.hasspatk)
            this.spattacktimer = this.chara.spattack.initialsp

    }

    //create invincibility aura if enemy can be invincible
    startInvincibility() {
        this.invincible = true;
        this.invincibleaura = new BABYLON.Sprite("", this.lvlcontroller.spriteManagers["skillaura"]);
        this.invincibleaura.position = new BABYLON.Vector3(-15 + this.mesh.position.x, 20, 6 + this.mesh.position.z);
        this.invincibleaura.size = 70 * this.chara.size;
        this.invincibleaura.width = 100 * this.chara.size;
        this.invincibleaura.playAnimation(4, 7, true, 30 * this.gamespeed);

    }

    //update invincibility timer, if timer is zero then remove it, and remove the aura
    updateInvincibility() {
        this.chara.invincible -= (1 / 30) / this.gamespeed;
        if (this.chara.invincible <= 0) {
            this.invincible = false;
            this.invincibleaura.dispose()
        }
    }

    //create buff icon depending on buff type
    createBuffAura(bufftype) {
        this.aura = new BABYLON.Sprite("", this.lvlcontroller.spriteManagers["icons"]);
        this.aura.position = new BABYLON.Vector3(-5 + this.mesh.position.x, 22, 2 + this.mesh.position.z);
        this.aura.cellIndex = bufftype
        this.aura.size = 65;
        this.aura.width = 90;

        this.aura.position.z -= (8 - (this.mesh.position.z / 30));
        this.aura.position.x -= (13 - (this.mesh.position.x / 30));


    }

    //update speed if game speed changes
    updateSpeed(gamespeed, pause) {
        this.gamespeed = gamespeed;
        var x = this.sprite.cellIndex;

        var keys = ["move", "atkanim", "death", "idle", "start", "spatk"]
        for (let i = 0; i < keys.length; i++) {
            if (this.chara[keys[i]] != undefined) {
                if (x <= this.chara[keys[i]].end && x >= this.chara[keys[i]].start) {
                    var duration = this.chara[keys[i]].duration
                    var delay = 30 * this.gamespeed * duration
                    if (keys[i] == "move") {
                        delay = 30 * this.gamespeed * duration
                        //this.running = false
                    }
                    if (keys[i] == "atkanim") {
                        delay = 30 * this.gamespeed * this.buffs.getFinalAtkInterval(duration)
                        this.sprite.playAnimation(x, this.chara.atkanim.end, false, delay);
                    }
                    if (keys[i] == "start")
                        this.sprite.playAnimation(x, this.chara.start.end, false, delay);
                    if (keys[i] == "spatk")
                        this.sprite.playAnimation(x, this.chara.spatk.end, false, delay);

                    else this.sprite.delay = delay
                }
            }
        }
        //if the game is paused, then don't let the animations play
        if (pause)
            this.sprite.stopAnimation()
    }

    //move the enemy across the map
    patrol() {

        if (!this.running) {
            var duration = this.chara.move.duration
            this.sprite.playAnimation(this.chara.move.start, this.chara.move.end, true, 30 * this.gamespeed * duration );
            this.running = true;
        }

        //move on x axis first to the current point x
        var xfound = false;

        if (this.mesh.position.x <= this.currentpoint[1] * 30 + 1 && this.mesh.position.x >= this.currentpoint[1] * 30 - 1)
            xfound = true;
        else {
            var dir = 1;
            if (this.mesh.position.x > this.currentpoint[1] * 30)
                dir = -1;
            this.mesh.position.x += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
            this.sprite.position.x += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
            this.shadow.position.x += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
            if (this.aura != undefined)
                this.aura.position.x += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
            if (this.invincibleaura != undefined)
                this.invincibleaura.position.x += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;

        }
        //if x found then move on the y axis to the current pooint z
        if (xfound) {
            if (this.mesh.position.z <= this.currentpoint[0] * 30 + 1 && this.mesh.position.z >= this.currentpoint[0] * 30 - 1) {
                //if reached, then get the next point of the checkpoint path
                if (this.checkpoints.path.length > 0)
                    this.currentpoint = this.checkpoints.path.shift();
                else {
                    //if there isn't any left, wait
                    this.wait = true;
                }
                this.sprite.position.x -= Math.round(this.mesh.position.x / 30) / 40;
                this.sprite.position.z -= Math.round(this.mesh.position.z / 30) / 40;

                this.shadow.position.x -= Math.round(this.mesh.position.x / 30) / 40;
                this.shadow.position.z -= Math.round(this.mesh.position.z / 30) / 40;

                if (this.aura != undefined) {
                    this.aura.position.x -= Math.round(this.mesh.position.x / 30) / 40;
                    this.aura.position.z -= Math.round(this.mesh.position.z / 30) / 40;
                }
                if (this.invincibleaura != undefined) {
                    this.invincibleaura.position.x -= Math.round(this.mesh.position.x / 30) / 40;
                    this.invincibleaura.position.z -= Math.round(this.mesh.position.z / 30) / 40;
                }


            }
            else {
                var dir = 1;
                if (this.mesh.position.z > this.currentpoint[0] * 30) {
                    this.sprite.invertU = 1;
                    dir = -1;
                }
                else this.sprite.invertU = 0;
                this.mesh.position.z += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
                this.sprite.position.z += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
                this.shadow.position.z += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;

                if (this.aura != undefined)
                    this.aura.position.z += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;
                if (this.invincibleaura != undefined)
                    this.invincibleaura.position.z += (1 * (this.buffs.getFinalSpeed(this.chara.speed)) * dir) / this.gamespeed;


            }

        }

    }

    //update hp bar, if hp max then hide the hp bar
    updateHpBar() {
        super.updateHpBar()
        if (this.hp == this.maxhp)
            this.healthBar.isVisible = false;
        else this.healthBar.isVisible = true;
        this.healthBar.linkOffsetX = 0 + (this.sprite.position.z - this.mesh.position.z) * 2

        if (this.spattacktimer != undefined) {
            this.skillBar.value = this.spattacktimer / this.chara.spattack.sp * 100;
            this.skillBar.linkOffsetX = 0 + (this.sprite.position.z - this.mesh.position.z) * 2
        }

    }

    //create enemy
    //matrix is the matrix of the map that defines which tiles can be passed through or not for the pathfinding of the enemy,
    //points are the checkpoints the enemy has to pass through,
    //spritemanager contains the sprites of the enemy,
    //gui is the gui of the level,
    //iconsmanager contains the icon sprites
    createEnemy(matrix, points, spriteManager, gui, iconsmanager) {
        this.mesh = this.scene.assets.meshchara.clone(this.id)

        this.shadow = new BABYLON.Sprite(this.id + "shadow", iconsmanager);
        this.shadow.size = 65 * this.chara.size;
        this.shadow.width = 90 * this.chara.size;

        this.shadow.position = new BABYLON.Vector3(-15 + this.x * 30, 20, 6 + this.y * 30 - (30 * this.chara.size - 30));

        var player0 = new BABYLON.Sprite(this.id, spriteManager[this.chara.spritesheet]);
        player0.position = new BABYLON.Vector3(-15 + this.x * 30, 20, 6 + this.y * 30 - (30 * this.chara.size - 30));
        player0.size = 65 * this.chara.size;
        player0.width = 90 * this.chara.size;
        this.sprite = player0;

        this.mesh.position.z = 0 + this.y * 30;
        this.mesh.position.x = 0 + this.x * 30;
        this.mesh.position.y = 0;

        //activate starting talents
        this.startingTalents()

        //create pathfinding route
        this.pattern = this.createPathfinding(points, matrix);
        this.checkpoints = this.pattern.shift();
        this.currentpoint = this.checkpoints.path.shift();

        //create hp bar
        this.addHPBar(gui);

        //TODO HARD CODED BAD
        if (this.chara.name == "Patriot") {
            this.buffs.buffs["patriottaunt"] = { "name": "patriottaunt", "modifiers": { "taunt": 2 } }
        }
    }

    //skills and talents activating as soon as the enemy spawns
    startingTalents() {

        //if enemy has starting animation
        if (this.chara.start != undefined) {
            this.spawning = true;
            this.sprite.playAnimation(this.chara.start.start, this.chara.start.end, false, this.gamespeed * 30 * this.chara.start.duration);

            if (this.chara.sfx.start != undefined) {
                this.lvlcontroller.playSound(this.chara.name + "-start", this.chara.sfx.start.volume)
            }
            var instance = this;
            //do chain of animations if has multiple
            //TODO clean up
            var interval = setInterval(() => {
                if (instance.chara.sfx.start2 != undefined) {
                    if (instance.sprite.cellIndex == instance.chara.sfx.start2.sprite && !instance.chara.sfx.start2.playing) {
                        instance.chara.sfx.start2.playing = true;
                        instance.lvlcontroller.playSound(instance.chara.name + "-start2", this.chara.sfx.start2.volume)
                    }
                }
                if (instance.chara.sfx.start3 != undefined) {
                    if (instance.sprite.cellIndex == instance.chara.sfx.start3.sprite && !instance.chara.sfx.start3.playing) {
                        instance.chara.sfx.start3.playing = true;
                        instance.lvlcontroller.playSound(instance.chara.name + "-start3", this.chara.sfx.start3.volume)
                    }
                }
                if (instance.sprite.cellIndex == instance.chara.start.end) {
                    instance.spawning = false;
                    if (instance.chara.invincible != undefined) {
                        instance.startInvincibility()
                        instance.invincible = true;
                    }
                    clearInterval(interval);
                }
            }, 1);
        }
        //if has skill that activates on spawn, activate
        if (this.enemySkill != undefined) {
            if (this.enemySkill.triggertype == "on_start") {
                if (this.enemySkill.targettype == "all") {
                    this.enemySkill.activateSkill(this.lvlcontroller.enemies)
                    this.enemySkill.activateSkill([this], true)
                }
                else this.enemySkill.activateSkill([this])
            }
        }
    }

    //creates pathfinding
    createPathfinding(points, matrix) {
        var checks = [];
        for (let i = 0; i < points.length; i++) {
            var grid = new PF.Grid(matrix);
            var finder = new PF.AStarFinder();

            var path = finder.findPath(points[i].start[1], points[i].start[0], points[i].end[1], points[i].end[0], grid);
            checks.push({ "path": path, "pause": points[i].pause });
        }
        return checks;
    }

    //attack a player if available
    attack(players) {
        var player = [];
        if (!this.blocked && this.chara.range != 0) {
            player = this.getFirstPlayerInRange(players, this.chara.range, this.chara.targets + this.buffs.getTargets());
        }
        else {
            if (this.blocked)
                player = this.getFirstPlayerInRange(players, 0, this.chara.targets + this.buffs.getTargets())
        }
        //if player found
        if (player.length > 0) {
            //turn towards the player to hit
            if (player[0].mesh.position.z <= this.mesh.position.z)
                this.sprite.invertU = 1
            else this.sprite.invertU = 0;
            if (this.running) {
                this.sprite.playAnimation(this.chara.idle.start, this.chara.idle.end, true, 30 * this.gamespeed * this.chara.idle.duration);
                this.running = false;
            }
            this.sprite.playAnimation(this.chara.atkanim.start, this.chara.atkanim.end, false, 30 * this.gamespeed * this.buffs.getFinalAtkInterval(this.chara.atkanim.duration));
            if (this.chara.sfx.atk != undefined) {
                //dog rawr spam prevention
                if (Math.random() < 0.20 || this.chara.sfx.atk.src != "dog-atk")
                    this.lvlcontroller.playSound(this.chara.name + "-atk", this.chara.sfx.atk.volume)
            }
            var instance = this
            var interval1 = setInterval(() => {
                if (instance.sprite.cellIndex >= instance.chara.atkanim.contact && instance.hp > 0) {
                    for (let i = 0; i < player.length; i++)
                        player[i].receiveDamage(instance);
                    if (this.chara.sfx.hit != undefined)
                        this.lvlcontroller.playSound(this.chara.name + "-hit", this.chara.sfx.hit.volume)
                    clearInterval(interval1);

                }
            }, 1);

            //stay idle while waiting to be able to attack again
            var interval2 = setInterval(() => {
                if (instance.sprite.cellIndex == instance.chara.atkanim.end && instance.hp > 0) {
                    this.sprite.playAnimation(this.chara.idle.start, this.chara.idle.end, true, 30 * this.gamespeed * this.chara.idle.duration);
                    this.attacking = false;
                    clearInterval(interval2);
                }
            }, 1);
            return true;
        }
        return false;
    }

    //receive damage, attackingplayer can be a hazard
    receiveDamage(attackingplayer, hazard = false) {
        var dmg;
        var dmgtype;

        if (!hazard) {
            let ef = attackingplayer.buffs.applyeffects
            var keys = Object.keys(ef)
            for (let i = 0; i < keys.length; i++) {
                if (ef[keys[i]].apply == "hit") {
                    this.buffs.effects[keys[i]] = ef[keys[i]].duration
                    this.buffs.buffs[keys[i]] = { "name": keys[i], "modifiers": ef[keys[i]].modifiers }
                }
            }
            var dmgmodifier = 1;

            //if attackingplayer can activate a on trigger dmg up skill, activate it 
            if (attackingplayer.playerSkill.chargetype == "attack" && attackingplayer.playerSkill.triggertype == "auto" && attackingplayer.playerSkill.currentsp >= attackingplayer.playerSkill.totalsp) {

                dmgmodifier *= attackingplayer.playerSkill.activateDmgUpSkill();
                attackingplayer.playerSkill.applyHitEffects(this.buffs)
            }

            dmgmodifier *= attackingplayer.buffs.getCritModifier();

            var dmgpen = 0;

            //if attackingplayer is of lord subclass that is blocking, and has the trait dmg pen active, decrease the damage
            if (attackingplayer.chara.subclass = "lord" && attackingplayer.buffs.getDmgPen() && attackingplayer.blocking == 0)
                dmgpen = 0.2;

            dmg = attackingplayer.buffs.getFinalAtk(attackingplayer.chara.atk - (attackingplayer.chara.atk * dmgpen)) * dmgmodifier
            dmgtype = attackingplayer.buffs.getDmgType()
            if (dmgtype == "" || dmgtype == "heal")
                dmgtype = attackingplayer.chara.dmgtype
        }

        //if hazard, then dmg is true
        else {
            dmg = attackingplayer.dmg
            dmgtype = "true"
        }

        var dmgreceived;

        switch (dmgtype) {
            case "physical":
                dmgreceived = Math.max(dmg * 0.05, dmg - this.buffs.getFinalDef(this.chara.def))
                break;
            case "arts":
                dmgreceived = Math.max(dmg * 0.10, dmg * ((100 - this.buffs.getFinalRes(this.chara.res)) / 100))
                break;
            case "true":
                dmgreceived = dmg;
                break;
        }
        this.hp -= dmgreceived

        //update hp bar after receiving damage
        this.updateHpBar();

        //if enemy has a on hit skill, activate it
        if (this.chara.hasskill && !this.enemySkill.active) {
            if (this.enemySkill.triggertype == "on_hit") {
                this.activateSkillAnims()
                if (this.enemySkill.targettype == "all")
                    this.enemySkill.activateSkill(this.lvlcontroller.enemies)
                else this.enemySkill.activateSkill([this])
            }
        }

        //if dead
        if (this.hp <= 0) {
            //add dp to the lvl dp counter if possible
            if (!hazard) {
                this.lvlcontroller.currentdp += attackingplayer.buffs.getDpOnKill();
                this.lvlcontroller.gui.updatePlayerWheelUI(this.lvlcontroller.currentdp, this.lvlcontroller.squadlimit)
            }

            //remove the elements on the scene
            if (this.aura != undefined)
                this.aura.dispose()

            if (this.chara.revive != true) {
                this.mesh.dispose(true, true)
                this.shadow.dispose()

                this.healthBar.dispose()
                if (this.skillBar != undefined)
                    this.skillBar.dispose();
                this.sprite.stopAnimation();
                this.sprite.playAnimation(this.chara.death.start, this.chara.death.end, false, 30 * this.gamespeed * (this.chara.death.duration));
                var instance = this
                var timer = this.chara.death.end - this.chara.death.start + 2
                var interval = setInterval(() => {
                    if (instance.sprite.cellIndex == instance.chara.death.end || timer <= 0) {
                        instance.sprite.dispose()
                        clearInterval(interval);
                    }
                    timer--;
                }, 1);
                this.hp = -999
            }
            //if enemy can revive, activate revival
            else {
                if (this.chara.revival1 != undefined) {
                    this.sprite.playAnimation(this.chara.revival1.start, this.chara.revival1.end, false, 30 * this.gamespeed * (this.chara.revival1.duration));
                    this.lvlcontroller.playSound(this.chara.name + "-revival", this.chara.sfx.revival.volume)
                    var instance = this
                    //execute first revival animation
                    var timer = this.chara.revival1.end - this.chara.revival1.start + 2
                    var interval = setInterval(() => {
                        if (instance.sprite.cellIndex == instance.chara.revival1.end || timer <= 0) {
                            //execute revival loop after first revival animation is over
                            instance.sprite.playAnimation(this.chara.revival2.start, this.chara.revival2.end, true, 30 * this.gamespeed * (this.chara.revival2.duration));
                            clearInterval(interval);
                        }
                        timer--;
                    }, 1);
                }
            }

            //if was blocked, remove itself from block count of blocking player
            if (this.blockingplayer != undefined) {

                this.blockingplayer.blocking = Math.max(this.blockingplayer.blocking - this.chara.blockcount, 0);
                this.blockingplayer.removeBlocked(this.id)


            }
        }
    }

    //activate special skills if any
    activateSpSkill(playerz) {
        var targets = []
        for (let i = 0; i < playerz.length; i++)
            targets.push(playerz[i])
        //sort by highest atk
        targets.sort(function (x, y) {
            if (x.buffs.getFinalAtk(x.chara.atk) < y.buffs.getFinalAtk(y.chara.atk)) {
                return -1;
            }
            if (x.buffs.getFinalAtk(x.chara.atk) > y.buffs.getFinalAtk(y.chara.atk)) {
                return 1;
            }
            return 0;
        });
        var players = this.getFirstPlayerInRange(targets, this.chara.spattack.range, this.chara.targets + this.buffs.getTargets())
        for (let i = 0; i < players.length; i++) {
            if (players[i].buffs.effects[this.chara.spattack.name] != undefined) {
                players.splice(i, 1)
                i--
            }
        }
        if (players.length > 0) {
            //turn towards the player to hit
            if (players[0].mesh.position.z <= this.mesh.position.z)
                this.sprite.invertU = 1
            else this.sprite.invertU = 0;
            this.running = false;
            this.attacking = true;
            this.sprite.playAnimation(this.chara.spatk.start, this.chara.spatk.end, false, 30 * this.gamespeed * (this.chara.spatk.duration));
            var instance = this;
            var interval = setInterval(() => {
                if (instance.sprite.cellIndex == instance.chara.spatk.end) {
                    instance.sprite.playAnimation(instance.chara.idle.start, instance.chara.idle.end, true, 30 * this.gamespeed * instance.chara.idle.duration);
                    instance.attacking = false;
                    instance.spattacktimer = 0;
                    clearInterval(interval);
                }
            }, 1);
            players[0].buffs.buffs[this.chara.spattack.name] = { "name": this.name, "modifiers": this.chara.spattack.applyeffects.modifiers }
            players[0].buffs.effects[this.chara.spattack.name] = this.chara.spattack.applyeffects.duration
            if (players[0].buffs.effectSprite[this.chara.spattack.name] == undefined)
                players[0].createDebuffAura(this.chara.spattack.name, this.chara.spattack.applyeffects.effecticon)

        }
    }

    //if enemy has skill animations
    activateSkillAnims() {
        //activate skill activation animation, enemy can't act or move during the animation
        if (this.chara.skill.begin != undefined) {
            this.skillproc = true;
            this.sprite.playAnimation(this.chara.skill.begin.start, this.chara.skill.begin.end, false, 30 * this.gamespeed * (this.chara.skill.begin.duration));
            if (this.chara.sfx.skillact != undefined)
                this.lvlcontroller.playSound(this.chara.name + "-skillact", this.chara.sfx.skillact.volume)
            var instance = this;
            var timer = this.chara.skill.begin.end - this.chara.skill.begin.start + 2
            var interval = setInterval(() => {
                if (instance.sprite.cellIndex == instance.chara.skill.begin.end || timer <= 0) {
                    instance.skillproc = false;
                    instance.running = false;
                    clearInterval(interval);
                }
                timer--;
            }, 1);
        }

        //if on skill activation, animations change, then modify them
        if (this.chara.skill.idle != undefined)
            this.chara.idle = this.chara.skill.idle
        if (this.chara.skill.atkanim != undefined)
            this.chara.atkanim = this.chara.skill.atkanim
        if (this.chara.skill.move != undefined) {
            this.chara.move = this.chara.skill.move
            this.running = false;
        }
        if (this.chara.skill.death != undefined)
            this.chara.death = this.chara.skill.death

    }

    //create hp bar
    addHPBar(gui) {
        this.healthBar = gui.addHPBar(this.mesh, "red", 10, "3%");
        this.healthBar.isVisible = false;
        if (this.spattacktimer != undefined) {
            this.skillBar = gui.addHPBar(this.mesh, "yellow", 15, "3%");
            this.skillBar.value = this.spattacktimer / this.chara.spattack.sp * 100;
        }
    }

    //unblock from the player
    unblock() {
        this.blocked = false;
        this.blockingplayer = undefined
    }

    //if enemy could revive, finish the revival stance
    finishRevival() {
        //create new enemy, corresponding to the next form
        var enemy = new EnemyController(this.lvlcontroller.enemylist[this.chara.name + "2"], this.scene, this.x, this.y, this.lvlcontroller, this.id);
        //enemy.createRevivedEnemy()
        enemy.pattern = this.pattern;
        enemy.checkpoints = this.checkpoints;
        enemy.currentpoint = this.currentpoint;
        enemy.mesh = this.mesh;
        enemy.shadow = this.shadow;
        //enemy.aura = this.aura;
        enemy.healthBar = this.healthBar;
        enemy.waittimer = this.waittimer;
        if (this.skillBar != undefined)
            enemy.skillBar = this.skillBar

        var player0 = new BABYLON.Sprite(this.id, this.lvlcontroller.spriteManagers[this.lvlcontroller.enemylist[this.chara.name + "2"].spritesheet]);
        player0.position = this.sprite.position;
        player0.size = 65 * this.chara.size;
        player0.width = 90 * this.chara.size;
        enemy.sprite = player0;
        enemy.sprite.invertU = this.sprite.invertU
        enemy.startingTalents()
        this.sprite.dispose()
        enemy.updateHpBar();

        this.lvlcontroller.enemies.push(enemy)

    }

    //distance from player, player prioritizes closer enemies
    getDistanceFromPlayer(player) {
        //√ |x2 – x1|² + |y2 – y1|²
        return Math.sqrt(Math.abs((this.mesh.position.x / 30) - player.x) + Math.abs((this.mesh.position.z / 30) - player.y))
    }

    //move logic, do actions depending on state
    move(tiles, players) {
        //if the enemy is spawning (doing start animation), don't move
        if (!this.spawning) {
            this.atktimer += 1 / this.gamespeed;
            if (this.spattacktimer != undefined)
                this.spattacktimer = Math.min(this.chara.spattack.sp, this.spattacktimer + (1 / 30) / this.gamespeed);

            var currenttile = tiles[Math.round(this.mesh.position.x / 30)][Math.round(this.mesh.position.z / 30)];
            //verify if blocking player can still block the enemy
            if (currenttile.player != undefined) {
                if (currenttile.player.buffs.getFinalBlock(currenttile.player.chara.blockcount) - currenttile.player.blocking >= this.chara.blockcount && !this.blocked) {
                    this.blockingplayer = currenttile.player;
                    currenttile.player.blockedenemies.push(this)
                    this.blockingplayer.blocking += this.chara.blockcount;
                    this.blocked = true;
                }

            }
            //if not possible (example: skill increasing block count is over, unblock)
            else {
                this.unblock()
            }
            if (!this.skillproc) {
                //conditions to see if enemy can attack
                if (this.spattacktimer != undefined) {
                    if (this.spattacktimer == this.chara.spattack.sp && !this.attacking)
                        this.activateSpSkill(players)
                }
                //if enemy has no atk, can't attack

                var enter = false;
                if (this.chara.atk > 0)
                    var enter = true;
                //if enemy is standby, can't attack
                if (this.chara.enemytype == "standby" && this.buffs.getStandby())
                    enter = false;
                //if no not attack condition met, attack if atk timer is over
                if (enter) {
                    if (this.atktimer >= this.buffs.getFinalAtkInterval(this.chara.atkinterval) * 25 && !this.attacking) {
                        this.atktimer = 0;
                        this.attacking = this.attack(players);
                    }
                }

                //if not attacking, waiting or being blocked, then move
                if (!this.blocked && !this.attacking && !this.wait)
                    this.patrol();
                else {
                    //if wait, then idle
                    if (this.running) {
                        this.sprite.playAnimation(this.chara.idle.start, this.chara.idle.end, true, 30 * this.gamespeed * (this.chara.idle.duration));
                        this.running = false;
                    }
                }
            }

            this.updateHpBar()

            //if waiting, increase wait timer and when the timer reaches the specified amount, get the new checkpoint to reach
            if (this.wait) {
                this.waittimer += 1 / this.gamespeed;
                if (this.waittimer >= this.checkpoints.pause * 30) {
                    if (this.pattern.length > 0) {
                        this.checkpoints = this.pattern.shift()
                        this.waittimer = 0;
                        this.wait = false;
                    }
                    else {
                        //if final checkpoint reached, remove the enemy
                        this.finish = true;
                        this.mesh.dispose(true, true);
                        this.sprite.dispose();
                        this.shadow.dispose();
                        this.healthBar.dispose();
                        if (this.skillBar != undefined)
                            this.skillBar.dispose();
                        if (this.aura != undefined)
                            this.aura.dispose()
                        if (this.invincibleaura != undefined)
                            this.invincibleaura.dispose()
                    }
                }
            }

        }
    }

}