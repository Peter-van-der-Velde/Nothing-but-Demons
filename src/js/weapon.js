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

    constructor(name, value, power, defense, attackRange, attackSpeed, mesh) {
        super(name, value, mesh);

        this.power = power;
        this.defense = defense;
        this.attackRange = attackRange;
        this.attackSpeed = attackSpeed;

        this.attackSkill = new DamageSkill(
          "Attack",           // Name
          "Weapon attack",    // Description
          0,                  // Mana cost
          0,                  // Cast time
          this.attackSpeed,                  // Cooldown
          this.attackRange,   // Range
          this.power,         // Attack power
          null
        );
    }

}
