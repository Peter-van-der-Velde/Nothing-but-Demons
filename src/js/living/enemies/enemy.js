"use strict"

// an array in wich all the enemies will  be pushed.
var enemies = [];

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

    constructor(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons) {
        super(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons);

        let health = document.getElementById("health");
        health.max = this.hp;
        this.id = name + enemies.length.toString();
        this.baseAttackSpeed = 2;
        this.time = 0;
        this.type = OBJECT_TYPE.ENEMY;
        this.movementSpeed = 20;
        this.direction = new THREE.Vector3(0, 0, 0);

        // needed for very basic collision
        this.radius = 0;

        // AI
        this.destination = null;
        this.path = []
    }

    /**
     * enemy attacks player <br>
     * damage reduction is calculated with the formula: <br>
     * y = -30 + 2 * \sqrt{x*25 +220 } <br>
     * where y is this.totalAttack and x is target.totalDefense <br>
     * @param {Living} target
     */
    attack(target) {
        var playerHealth = document.getElementById("playerHealthBar");
        playerHealth.value = target.hp;
        target.hp = target.hp - (this.totalAttack - (-30 + 2 * Math.sqrt(target.totalDefense * 25 + 220)));
        console.log('targetHp: ' + target.hp);
    }

    /**
     * kills the enemy
     */
    die() {
        console.log(this.name + ' is dead');
        health.value = 100;
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].id == this.id) {
                enemies.splice(i, 1);
                break;
            }
        }
        this.dropItems();
        this.replaceWithCorpse();
    }


    /**
     * update loop of enemy
     * @param {number} dt delta time
     */
    update(dt) {
        super.update(dt);



        if (this.hp <= 0) {
            this.die();
        }


        if (this.hp > this.hpMax)
            this.hp = this.hpMax;

        if (this.path.length == 0) {

            // this.destination = new THREE.Vector3(12, 0, 20);
            // this.findPathRec(new Node(this.mesh.position, null));
            // this.findShortestPath(this.mesh.position, new THREE.Vector3(0, 0, 0));
        }

        if (calcDistanceXZ(window.player.mesh.position, this.mesh.position) < 5) {
            // var direction = new THREE.Vector3().addVectors(window.player.mesh.position, this.mesh.position.multiplyScalar(-1));
            // var ray = THREE.Raycaster(this.mesh.position, direction, this.radius, 10);
            // var intersects = ray.intersectObjects(window.scene.children);
            // if (intersects.length != 0) {
            // console.log('wham')
            this.destination = window.player.mesh.position;
        } else {
            this.destination = null;
        }

        this.move(dt);
        console.log(calcDistanceXZ(this.mesh.position, window.player.mesh.position) + ' < ' + this.equipment[EQUIPMENT_TYPE.WEAPON].attackRange)
        if (calcDistanceXZ(this.mesh.position, window.player.mesh.position) < this.equipment[EQUIPMENT_TYPE.WEAPON].attackRange)
            this.attack(window.player);
    }
    /**
     * replaces the enemy with a corpse
     */
    replaceWithCorpse() {
        console.log('this is a corpse');
    }


    /**
     * drop the items of the enemy
     */
    dropItems() {

        for (let item of this.items) {
            let x = this.mesh.position.x + Math.floor(Math.random() * 5) / 10;
            let y = 0.5;
            let z = this.mesh.position.z + Math.floor(Math.random() * 5) / 10;
            item.mesh.position.set(x, y, z);

            item.id = item.name + itemsInGame.length;
            item.mesh.name = item.name + itemsInGame.length;
            itemsInGame.push(item);
            window.scene.add(item.mesh);

            console.log(item);
        }

        for (var item of itemsInGame)
            console.log(item);

        console.log(window.scene);
        console.log(itemsInGame);
    }

    move(dt) {
        if (this.destination == null)
            return;

        if (calcDistanceXZ(this.mesh.position, this.destination) < 0.02) {
            if (this.path.length == 0)
                return;

            this.destination = this.path.shift();
        }

        // if (this.destination == window.player.mesh.position)

        dt = dt * this.movementSpeed;
        this.direction.set(this.destination.x - this.mesh.position.x, 0, this.destination.z - this.mesh.position.z).normalize();
        this.mesh.position.set(this.mesh.position.x + this.direction.x * dt, this.mesh.position.y, this.mesh.position.z + this.direction.z * dt);
    }
}