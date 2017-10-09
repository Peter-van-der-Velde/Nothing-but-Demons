/**
 * a basic class for all living things
 * @class
 * @param {string} name
 * @param {number} hp 
 * @param {number} mp 
 * @param {number} strength 
 * @param {number} speed 
 * @param {number} intelligence 
 * @param {number} level 
 * @param {number} experiencePoints 
 */
class Living {

    constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints) {
        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.strength = strength;
        this.speed = speed;
        this.intelligence = intelligence;

        this.level = level;
        this.exp = experiencePoints;
        this.totalAttackPower;
        this.totalDefensePower
        this.totalMagicPower;
        this.totalMagicDefense;
        this.luck = 0;

    }

    move () {

    }
}