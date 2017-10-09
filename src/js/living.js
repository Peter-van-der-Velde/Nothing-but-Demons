/**
 * a basic class for all living things
 * @class
 * @param {number} hp 
 * @param {number} mp 
 * @param {number} strength 
 * @param {number} speed 
 * @param {number} intelligence 
 * @param {number} level 
 * @param {number} experiencePoints 
 */
class Living {

    constructor (hp, mp, strength, speed, intelligence, level, experiencePoints) {
        this.hp = hp;
        this.mp = mp;
        this.strength = strength;
        this.speed = speed;
        this.intelligence = intelligence;

        this.level = level;
        this.exp = experiencePoints;
    }

    move () {

    }
}