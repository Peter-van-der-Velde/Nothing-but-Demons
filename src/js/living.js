/**
 * a basic class for all living things
 * @class
 * @param {string} name
 * @param {number} hp 
 * @param {number} mp 
 * @param {number} strength
 * @param {number} defense
 * @param {number} speed 
 * @param {number} intelligence 
 * @param {number} level 
 * @param {number} experiencePoints 
 */
class Living {

    constructor (name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons) {
        this.name = name;
        this.hpMax = hp;
        this.hp = hp;
        this.mpMax = mp;
        this.mp = mp;
        this.strength = strength;
        this.defense = defense;
        this.speed = speed;
        this.intelligence = intelligence;

        this.level = level;
        this.exp = experiencePoints;
        this.items = items;
        this.weapons = weapons;
        this.weapon = weapons;
        this.shield = weapons;

        this.totalAttackPower;
        this.totalDefensePower
        this.luck = 0;

        //calcDerivedStats();

    }

    /**
     * calculates the derived stats
     * derived stats are for example: totalAttackPower;
     * magic attacks will be calculated with some algorithm
     */
    calcDerivedStats() {
        this.totalAttackPower = (this.weapon) ? this.strength : this.strength + this.weapon.power;
        this.totalDefensePower = (this.shield) ? this.defense :  this.defense + this.shield.defense
    }
        

    move () {

    }
}