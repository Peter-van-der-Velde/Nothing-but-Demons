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
 * @param {PlayerClass} playerClass the warrior class this player is
 */
class Player extends Living {
    
    constructor (name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons, playerClass) {
        super(name, hp, mp, strength, speed, intelligence, level, experiencePoints, items, weapons);
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh( geometry, material );
        this.playerClass = playerClass;
        calcDerivedStats();
    }

    /**
     * for calculating dice rolls
     * example: roll(2d3);
     * @param {string} rollText the roll information but in text format,'3d2' where 3 is the amount of rolls and 2 is the max number
     */
    roll(rollText) {
        let rollInfo = rollText.split("d");
        let amountOfRolls = rollInfo[0];
        let maxRollPoints = rollInfo[1];
        
        let total = 0;

        for (var roll = 0; roll < amountOfRolls; roll++) {
            total += (Math.random() * maxRollPoints) + 1; 
        }
        
        return total;
    }

    /**
     * levels up player
     * based upon output ((6d4 - 3) / 3) - 2
     */
    levelUp() {
        this.hpMax += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.mpMax += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.strength += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.defense += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.speed += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.intelligence += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
        this.luck += Math.abs(Math.floor((this.roll("6d4") - 3) / 3) - 3);
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

    /**
     * Adds item to the inventory of the player
     * @param {Item} item 
     */
    addItem (item) {
        if (this.items.length <= 20)
            this.items.push(item);
        else
            console.log("No more space available.")
    }

    /**
     * Player attacks target
     * @param {Enemy} target  
     */
    attack(target) {
        this.calcDerivedStats();

        if (target.totalDefense  > this.totalAttack)
            console.log("blocked");
        else
           target.hp = target.hp - (this.totalAttack - target.totalDefense);
    }

    /**
     * update loop player
     * @param {number} dt delta time  
     */
    update(dt) {
        if (hp <= 0)
            this.die();
    }

    /**
     * when player dies use this function
     */
    die() {
        alert("Game Over, you died.");
        // reset to last shrine/bonfire/savespot
    }

    move() {

    }

    getRayPos(event){
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / render.domElement.width) * 2 - 1;
        mouse.y = -(event.clientX / render.domElement.width) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        var intersects = raycaster.intersectObjects([plane], false);
        
        if (intersects.length > 0) {
            return intersects[0].point;
        }
        return null;
    }

}