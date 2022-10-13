class Buffs {
    constructor() {
        this.modifiers = {};
        this.buffs = {};

        //temporary effects received by third parties
        this.effects = {};

        //effects to apply depending on condition
        this.applyeffects = {};
    }

    initModifiers() {
        this.modifiers = {
            aspd: 0,
            atkinterval: 0,
            atk: 0,
            def: 0,
            flatdef: 0,
            inspireatk: 0,
            range: 0,
            flatres: 0,
            res: 0,
            dmg: 1,
            critdmg: 0,
            critchance: 0,
            dponkill: 0,
            block: 0,
            targets: 0,
            splash: false,
            splashradius: 0,
            dmgtype: "",
            doublehitchance: 0,
            dmgpen: true,
            taunt:1,
            maxhp:1

        }
    }

    sumBuffs() {
        var keys = Object.keys(this.buffs);
        for (let i = 0; i < keys.length; i++) {
            var keysmodifiers = Object.keys(this.buffs[keys[i]].modifiers);
            for (let j = 0; j < keysmodifiers.length; j++) {
                if (typeof this.modifiers[keysmodifiers[j]] == "boolean")
                    this.modifiers[keysmodifiers[j]] = this.buffs[keys[i]].modifiers[keysmodifiers[j]]
                else {
                    if(keysmodifiers[j]=="speedpercent"){
                        this.modifiers[keysmodifiers[j]] =Math.max(0.1,this.modifiers[keysmodifiers[j]]+this.buffs[keys[i]].modifiers[keysmodifiers[j]])
                    }
                    else
                        this.modifiers[keysmodifiers[j]] += this.buffs[keys[i]].modifiers[keysmodifiers[j]]
                }
            }

        }
    }

    getFinalAtk(atk) {
        this.initModifiers();
        this.sumBuffs();
        return Math.max(0,Math.round((atk * (1 + this.modifiers.atk))));
    }

    getFinalAtkInterval(atkinterval) {
        this.initModifiers();
        this.sumBuffs();
        return 100 / ((100 + this.modifiers.aspd) / (atkinterval + this.modifiers.atkinterval));
    }

    getFinalDef(def) {
        this.initModifiers();
        this.sumBuffs();
        return Math.max(0,Math.round(((def+this.modifiers.flatdef) * (1 + this.modifiers.def))));
    }

    getFinalRes(res) {
        this.initModifiers();
        this.sumBuffs();
        return Math.max(0,Math.round(((res+this.modifiers.flatres) * (1 + this.modifiers.res))));
    }

    getDpOnKill() {
        this.initModifiers();
        this.sumBuffs();
        return this.modifiers.dponkill;
    }

    getSplash() {
        this.initModifiers();
        this.sumBuffs();
        return { "splash": this.modifiers.splash, "radius": this.modifiers.splashradius }
    }

    getTargets() {
        this.initModifiers();
        this.sumBuffs();
        return this.modifiers.targets;
    }

    getDmgType() {
        this.initModifiers();
        this.sumBuffs();
        return this.modifiers.dmgtype;
    }

    getDmgPen() {
        this.initModifiers();
        this.sumBuffs();
        return this.modifiers.dmgpen;
    }

    getTauntLevel() {
        this.initModifiers();
        this.sumBuffs();
        return this.modifiers.taunt;
    }

    getCritModifier() {
        this.initModifiers();
        this.sumBuffs();
        if (Math.random() <= this.modifiers.critchance && this.modifiers.critchance > 0)
            return this.modifiers.critdmg;
        else return 1;
    }

    getDoubleHitChance() {
        this.initModifiers();
        this.sumBuffs();
        if (Math.random() <= this.modifiers.doublehitchance && this.modifiers.doublehitchance > 0)
            return true
        return false;
    }

    getCurrentHpRatio(hp,maxhp,charahp){
        this.initModifiers();
        this.sumBuffs();
        var newmaxhp = Math.round(charahp*this.modifiers.maxhp)
        if(newmaxhp==maxhp)
            return {"hp":hp,"maxhp":maxhp}
        var currentratio  = hp/maxhp
        return {"hp":Math.round(newmaxhp*currentratio),"maxhp":newmaxhp}
    }
}