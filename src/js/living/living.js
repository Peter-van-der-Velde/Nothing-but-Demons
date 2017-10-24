"use strict"

/**
 * a basic class for all living things
 * @class
 * @param {string} name
 * @param {number} hp
 * @param {number} mp
 * @param {number} strength
 * @param {number} defense
 * @param {number} intelligence
 * @param {number} speed
 * @param {number} level
 * @param {number} exp
 * @param {array} items
 * @param {array} weapons
 */
class Living {

    constructor (name, hp, mp, strength, defense, intelligence, speed, level, exp, items, weapons) {
        this.name = name;
        this.inventorySize = 20;
        this.hpRegen = 0;
        this.mpRegen = 2;

        this.hpMax = hp;
        this.hp = hp;

        this.mpMax = mp;
        this.mp = mp;

        this.defense = defense;
        this.strength = strength;
        this.speed = speed;
        this.intelligence = intelligence;

        this.effects = [];

        this.skills = [];
        this.skills.length = SKILL_SLOTS;
        for (let e of this.skills) {
            e = null;
        }

        this.equipment = [];
        this.equipment.length = EQUIPMENT_SLOTS;
        for (let e of this.equipment) {
            e = null;
        }

        this.equipment[EQUIPMENT_TYPE.WEAPON] = weapons[0];
        this.equipment[EQUIPMENT_TYPE.OFFHAND] = weapons[2];
        console.log(this.equipment);

        // OLD STUFF
        this.level = level;
        this.experiencePoints = exp;
        this.items = items;

        this.totalAttack;
        this.totalDefense
        this.luck = 0;

        this.mesh;

        this.calcDerivedStats();
    }

    update(delta) {
      this.regenStats(delta);
    }


    /**
     * calculates the derived stats
     * derived stats are for example: totalAttack;
     * magic attacks will be calculated with some algorithm
     */
    calcDerivedStats() {
        this.totalAttack = (this.equipment[EQUIPMENT_TYPE.WEAPON]) ? this.strength : this.strength + this.equipment[EQUIPMENT_TYPE.WEAPON].power;
        this.totalDefense = (this.equipment[EQUIPMENT_TYPE.OFFHAND]) ? this.defense :  this.defense + this.equipment[EQUIPMENT_TYPE.OFFHAND].defense;
        this.totalDefense = Math.floor(-30 + 2 * Math.sqrt(this.totalDefense * 25 + 220));
    }

    regenStats(delta) {
      this.mp = (this.mp < this.mpMax) ? this.mp + this.mpRegen * delta : this.mpMax;
      this.hp = (this.hp < this.hpMax) ? this.hp + this.hpRegen * delta : this.hpMax;
    }

    dealDamage(damage) {
      this.hp -= damage;
      if (this.hp <= 0) {
        this.hp = 0;
        this.die();
      }
      console.log("Enemy HP: " + this.hp);
    }

    die() {
        console.log(this.name + 'is dead');
        this.replaceWithCorpse();
    }

    replaceWithCorpse() {
        console.log('this is a corpse');
    }


    move () {

    }
}
