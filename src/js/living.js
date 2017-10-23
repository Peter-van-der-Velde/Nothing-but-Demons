"use strict"

/**
 * a basic class for all living things
 * @class
 * @param {string} name
 * @param {number} hp
 * @param {number} mp
 * @param {number} baseStrength
 * @param {number} baseDefense
 * @param {number} baseSpeed
 * @param {number} baseIntelligence
 * @param {number} level
 * @param {number} experiencePoints
 */
class Living {

    constructor (name, hp, mp, baseStrength, baseDefense, baseSpeed, baseIntelligence, level, experiencePoints, items, weapons) {
        this.name = name;

        this.hpMax = hp;
        this.hp = hp;
        this.hpRegen = 1;
        this.mpMax = mp;
        this.mp = mp;
        this.mpRegen = 2;

        this.baseDefense = baseDefense;
        this.defense = baseDefense;

        this.baseStrength = baseStrength;
        this.strength = baseStrength;

        this.baseSpeed = baseSpeed;
        this.speed = baseSpeed;

        this.baseIntelligence = baseIntelligence;
        this.intelligence = baseIntelligence;

        this.equipment = [];

        this.level = level;
        this.experiencePoints = experiencePoints;
        this.items = items;
        this.weapons = weapons;
        this.weapon = weapons[0];
        this.shield = weapons[2];

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
        this.totalAttack = (this.weapon) ? this.strength : this.strength + this.weapon.power;
        this.totalDefense = (this.shield) ? this.defense :  this.defense + this.shield.defense;
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
