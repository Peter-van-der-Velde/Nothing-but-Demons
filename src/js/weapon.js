/**
 * the weapons class
 * @class
 * @extends Item
 * @param {string} name name of said weapon 
 * @param {number} value the monetary value of this weapon
 * @param {number} power the attack power of this weapon
 * @param {number} defense the defensive power  of this weapon
 * @param {number} attackRange the range of this weapon
 * @param {number} attackSpeed the attack speed of this weapon per 2 seconds
 */
class Weapon extends Item {

    constructor(name, value, power, defense, attackRange, attackSpeed) {
        super(name, value);
        
        this.power = power;
        this.defense = defense;
        this.attackRange = attackRange;
        this.attackSpeed = attackSpeed;
    }

}