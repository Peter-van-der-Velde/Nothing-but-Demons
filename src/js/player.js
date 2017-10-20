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
        
        this.baseAttackSpeed = 2;
        this.input = new Input(); 

        // Create player mesh
        var group = new THREE.Group();
        var bodyGeometry = new THREE.BoxGeometry( 0.5, 2, 0.5 );
        var bodyMaterial = new THREE.MeshNormalMaterial();
        this.bodyMesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
        this.bodyMesh.position.set(0,1,0);
        var hatGeometry = new THREE.CylinderGeometry( 0, 0.4, 0.8, 12 );
        var hatMaterial = new THREE.MeshBasicMaterial( {color: 0x008000} );
        this.hatMesh = new THREE.Mesh( hatGeometry, hatMaterial );
        this.hatMesh.position.set(0, 2.4 ,0);
        group.add(this.hatMesh);        
        group.add(this.bodyMesh);
        this.mesh = group;
        this.mesh.position.set(0, 0, 0);


        this.playerClass = playerClass;
        this.calcDerivedStats();

        // Movement stats
        this.scene = scene;
        this.destination = null;
        this.direction = new THREE.Vector3(0, 0, 0);
        this.playerMovementSpeed = 10;

        // the target of the player
        this.target = null;
        console.log(this);

        this.attackClock = new THREE.Clock();

        let health = document.getElementById("health");
        health.value = 20;
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
     * Player attacks target <br>
     * damage reduction is calculated with the formula: <br>
     * y = -30 + 2 * \sqrt{x*25 +220 } <br>
     * where y is this.totalAttack and x is target.totalDefense <br>
     * @param {Enemy} target  
     */
    attack(target) {
        var time = this.attackClock.getElapsedTime();

        if ((this.baseAttackSpeed / this.weapon.attackSpeed) > time)
            return;

        if(Math.abs(this.mesh.position.x - this.target.mesh.position.x) > (this.weapon.attackRange + this.target.radius + 0.1) || Math.abs(this.mesh.position.z - this.target.mesh.position.z) > (this.weapon.attackRange + this.target.radius + 0.1)) {
            return;
        }

        // reset attack clock
        this.attackClock.start();
        this.calcDerivedStats();
        
        console.log('hit: ' + target.id);
        if(this.totalAttack - target.totalDefense > 0)
            target.hp = target.hp - (this.totalAttack - target.totalDefense);
    }

    /**
     * update loop of the player
     * @param {number} dt delta time
     */
    update(dt) {
        if (hp <= 0)
            this.die();

        this.input.update();
        this.move(dt);
        
        if (this.destination != null) {
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].mesh.position.distanceTo(player.destination)  < 2)
                this.target = enemies[i];
            }
        }
        
        if (this.target == null)
            return;

        if (this.target.hp <= 0) {
            this.target = null;
            return;
        }

        this.attack(this.target);
    }

    /**
     * when player dies use this function
     */
    die() {
        alert("Game Over, you died.");
        // reset to last shrine/bonfire/savespot
    }

    /**
     * moves the playes
     * @param {number} dt delta time
     */
    move(dt) {
        if(this.input.click) {
            this.destination = this.getRayPos(this.scene);
            this.mesh.lookAt(new THREE.Vector3(this.destination.x, this.mesh.position.y, this.destination.z));
        }
        
        if (this.destination != null) {
                        
            if (Math.abs(this.destination.x - this.mesh.position.x) < 0.1 && Math.abs(this.destination.z - this.mesh.position.z) < 0.1 ) {
                console.log('umm 0.1')
                this.destination = null;
                return;
            }

            if (this.target != null) {
                if(Math.abs(this.mesh.position.x - this.target.mesh.position.x) < (this.weapon.attackRange + this.target.radius) && Math.abs(this.mesh.position.z - this.target.mesh.position.z) < (this.weapon.attackRange + this.target.radius)) {
                    console.log('umm pos')
                    this.destination = null;
                    return;
                }
            }


            if (this.destination == null)
                return;

            dt = dt * this.playerMovementSpeed;
            this.direction.set(this.destination.x - this.mesh.position.x, 0, this.destination.z - this.mesh.position.z).normalize();
            this.mesh.position.set(this.mesh.position.x + this.direction.x * dt, this.mesh.position.y, this.mesh.position.z + this.direction.z * dt);
            
            return;
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