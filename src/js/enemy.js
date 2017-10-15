/**
 * the enemy class derived from the 'Living' class
 * @class
 * @extends Living
 * @param {string} name name of enemy
 * @param {number} hp amount of healing points of the enemy
 * @param {number} mp amount of mana points of the enemy
 * @param {number} strength the strength of the enemy
 * @param {number} speed the speed of the enemy
 * @param {number} intelligence the intelligence of the enemy
 * @param {number} level the level of the enemy
 * @param {number} experiencePoints the amount of experience you get when you defeat the enemy
 * @param {Item[]} items the items the enemy has
 * @param {Weapon[]} weapons the weapons the enemy has.
 */
class Enemy extends Living {
    
    // constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons) {
    // super(name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons);
    // }
	
    attack(target) {
        if (target.totalDefense > this.totalAttack)
            console.log("blocked");
        else
           target.hp = target.hp - (this.totalAttack - target.totalDefense);
    }

    die() {
        
    }

}