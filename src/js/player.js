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
    
    constructor (name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons, playerClass,  camera, scene) {

        super(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons);
        
        this.input = new Input(); 
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.set(0, 1, 0);
        this.playerClass = playerClass;

        this.calcDerivedStats();
        //
        this.scene = scene;
        this.destination = undefined;
        this.direction = new THREE.Vector3(0, 0, 0);
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
        
        this.input.update();

        this.move(dt);
    }

    /**
     * when player dies use this function
     */
    die() {
        alert("Game Over, you died.");
        // reset to last shrine/bonfire/savespot
    }

    move(dt) {
        if(this.input.click) {
            this.destination = this.getRayPos(this.scene);
        }

        
        if (this.destination) {
            console.log('m: ')
            console.log(this.mesh.position);
            console.log('d: ');
            console.log(this.destination);

            if (this.destination === this.mesh.position) {
                this.destination = null;
                return;
            }
            this.direction.set(this.destination.x - this.mesh.position.x, 0, this.destination.z - this.mesh.position.z).normalize();
            this.mesh.position.set(this.mesh.position.x + this.direction.x * dt, this.mesh.position.y, this.mesh.position.z + this.direction.z * dt);
        }
    }


    /**
     * get's the position of the 2d click in the 3d world
     * @param {THREE.Scene} scene 
     */
    getRayPos(scene) {
        var mouse = new THREE.Vector2();
        mouse.x = (this.input.mouseLocation.x / window.innerWidth) * 2 - 1;
        mouse.y = -(this.input.mouseLocation.y / window.innerHeight) * 2 + 1;

        var raycaster = new THREE.Raycaster();
        
        var vector = new THREE.Vector3( mouse.x, mouse.y, 1).unproject( camera );
        raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
        var intersects = raycaster.intersectObjects( scene.children );
        
        if (intersects.length > 0) {
            return intersects[0].point;
        }
        return null;
    }

}