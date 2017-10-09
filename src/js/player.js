/**
 * the player class derived from the 'Living' class
 * @class
 * @extends Living
 * @param {string} name
 * @param {number} hp 
 * @param {number} mp 
 * @param {number} strength 
 * @param {number} speed 
 * @param {number} intelligence 
 * @param {number} level 
 * @param {number} experiencePoints
 * @param {Item[]} items
 * @param {Weapon[]} weapons
 * @param {WarriorClass} warriorClass
 */
class player extends living {
    
    constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons, warriorClass) {
        super(name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons);

        this.warriorClass = warriorClass;
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

}