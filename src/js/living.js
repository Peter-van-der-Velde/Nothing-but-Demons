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
        this.weapon = weapons[0];
        this.shield = weapons[2];

        this.totalAttack;
        this.totalDefense
        this.luck = 0;

        //this.calcDerivedStats();
    }


    /**
     * calculates the derived stats
     * derived stats are for example: totalAttack;
     * magic attacks will be calculated with some algorithm
     */
    calcDerivedStats() {
        this.totalAttack = (this.weapon) ? this.strength : this.strength + this.weapon.power;
        this.totalDefense = (this.shield) ? this.defense :  this.defense + this.shield.defense

        console.log('p' + this.totalAttack);
        console.log('d' + this.totalDefense)
    }
        

    move () {

    }
}