/**
 * the player class derived from the 'Living' class
 * @class
 * @extends Living
 * @param {string} name name of the player
 * @param {number} hp amount of healing points of the player
 * @param {number} mp amount of mana points of the player
 * @param {number} strength the strength of the player
 * @param {number} speed the speed of the player
 * @param {number} intelligence the intelligence of the player
 * @param {number} level the level of the player
 * @param {number} experiencePoints the amount of experience points the player has
 * @param {Item[]} items the items the player has
 * @param {Weapon[]} weapons the weapons the player has.
 */
class Player extends Living {
    
    constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons) {
        super(name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons);

        calcDerivedStats();
    }

    levelUp() {

    }

    /**
     * Calculates the needed amount for that level
     * @param {number} level 
     */
    nextLevel(level) {
        let  exponent = 1.5
        let baseXP = 1000
        return math.floor(baseXP * (level ^ exponent))
    }

    addItem (item) {
        if (this.items.length <= 20)
            this.items.push(item);
        else
            console.log("No more space available.")
    }

    attack(target) {
        if (target.defense  > totalstrength)
            console.log("blocked");
        else
           target.hp = hp - (totalstrength - defense);
    }

}