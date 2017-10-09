/**
 * the player class derived from the 'Living' class
 * @class
 * @param {string} name
 * @param {number} hp 
 * @param {number} mp 
 * @param {number} strength 
 * @param {number} speed 
 * @param {number} intelligence 
 * @param {number} level 
 * @param {number} experiencePoints
 * @param {WarriorClass} warriorClass
 * @param {Item[]} items
 */
class player extends living {
    
    constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints, warriorClass, items) {
        super(name, hp, mp, strength, speed, intelligence, level, experiencePoints);

        this.warriorClass = warriorClass;
        this.items = items;
    }

    levelUp() {

    }

    addItem (item) {
        if (this.items.length <= 20)
            this.items.push(item);
        else
            console.log("No more space available.")
    }

}