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
        this.movementSpeed = 1;
        this.direction = new THREE.Vector3(0, 0, 0);

        // needed for very basic collision
        this.radius = 0;

        // AI
        this.destination = null;
        // this.path = []
        this.q = [];

        // pathRecursive
        this.destination2 = null;
        this.q2 = [];
        this.path = []
        this.checked = [];
        this.currentNode;
        this.found = false;

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
        // setTimeout(function(){ window.location.href = "../src/gameOver.html"; }, 10000);
        // $("html").fadeOut(speed = 10000);
        //fadein 

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
            // not so easy test
            // var index = Math.floor(Math.random() * ROUTE_POINTS.length);
            // this.destination = ROUTE_POINTS[index];
            // this.findShortestPath(this.mesh.position, ROUTE_POINTS[index]);

            // easy test
            this.destination = new THREE.Vector3(12, 0, 20);
            this.findPathRec(new Node(this.mesh.position, null));
            // this.findShortestPath(this.mesh.position, new THREE.Vector3(0, 0, 0));
        }
        // console.log(this.path)
        this.move(dt);
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

        dt = dt * this.movementSpeed;
        this.direction.set(this.destination.x - this.mesh.position.x, 0, this.destination.z - this.mesh.position.z).normalize();
        this.mesh.position.set(this.mesh.position.x + this.direction.x * dt, this.mesh.position.y, this.mesh.position.z + this.direction.z * dt);


    }

    findShortestPath(startCoordinates, destination) {

        this.q = [new Node(startCoordinates, null)];
        let nodes = [];
        let foundDestination = false;

        let ray = new THREE.Raycaster(currentNode, new THREE.Vector3(0, 0, 0).normalize(), 0.4, 2);
        let intersects;
        let checked = []


        while (this.q.length != 0) {
            var currentNode = this.q.shift();
            nodes.push(currentNode);



            if (calcDistanceXZ(currentNode.position, destination) < 5) {
                foundDestination = true;
                break;
            }

            let directions = this.wichWay(currentNode.position, this.destination)
            for (var i = 0; i < directions.length; i++) {
                if (this.castRay(currentNode, directions[i]) == 0) {
                    var newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(4, 0, 0)), currentNode);
                    // if the location of the newNode Has not been checked already add it to the que and the position to the checked array
                    if (checked.indexOf(newNode.position) == -1) {
                        checked.push(newNode.position);
                        this.q.push(newNode);
                    }
                }

            }

            // // north
            // if (this.castRay(currentNode, 'n') == 0) {
            //     var newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(4, 0, 0)), currentNode);
            //     // if the location of the newNode Has not been checked already add it to the que and the position to the checked array
            //     if (checked.indexOf(newNode.position) == -1) {
            //         checked.push(newNode.position);
            //         this.q.push(newNode);
            //     }
            // }

            // // east
            // if (this.castRay(currentNode, 'e') == 0) {
            //     var newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(0, 0, 4)), currentNode);
            //     if (checked.indexOf(newNode.position) == -1) {
            //         checked.push(newNode.position);
            //         this.q.push(newNode);
            //     }
            // }
            // // south
            // if (this.castRay(currentNode, 's') == 0) {
            //     var newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(-4, 0, 0)), currentNode);
            //     if (checked.indexOf(newNode.position) == -1) {
            //         checked.push(newNode.position);
            //         this.q.push(newNode);
            //     }
            // }
            // // west
            // if (this.castRay(currentNode, 'w') == 0) {
            //     var newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(0, 0, -4)), currentNode);
            //     if (checked.indexOf(newNode.position) == -1) {
            //         checked.push(newNode.position);
            //         this.q.push(newNode);
            //     }
            // }

            console.log('hey')
        }

        if (foundDestination) {
            var node = nodes[nodes.length - 1];
            while (node != null) {
                this.path.push(node.position);
                node = node.previous;
            }
            // because you start with the end point and move yourself to the startpoint you have to reverse the path.
            this.path.reverse();

            this.destination = this.path.shift();
            this.q = [];
            // console.log("que: ");
            // console.log(this.q);
            // console.log(nodes);
            console.log('path: ')
            console.log(this.path);

            return;
        }

        this.path = [];
    }

    findPathRec(currentNode) {
        let directions = this.wichWay(currentNode.position, this.destination)

        for (var i = 0; i < directions.length; i++) {
            if (this.found == true)
                return;

            if(calcDistanceXZ(currentNode.position, this.destination) < 2) {
                this.found = true;
                var node = currentNode;
                while (node != null) {
                    this.path.push(node.position);
                    node = node.previous;
                }
                this.path.reverse();
                this.destination = this.path.shift();
                return;
            }

            if (this.castRay(currentNode.position, directions[i]) == 0) {
                var newNode;
                if (directions[i] == 'n') newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(2, 0, 0)), currentNode);
                if (directions[i] == 'e') newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(0, 0, 2)), currentNode);
                if (directions[i] == 's') newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(-2, 0, 0)), currentNode);
                if (directions[i] == 'w') newNode = new Node(new THREE.Vector3().addVectors(currentNode.position, new THREE.Vector3(0, 0, -2)), currentNode);


                // if the location of the newNode Has not been checked already add it to the que and the position to the checked array
                if (this.checked.indexOf(newNode.position) == -1) {
                    this.checked.push(newNode.position);
                    this.findPathRec(newNode);
                }
            }
        }
    }

    /**
     * this function calculates the order of checking the locations
     * @param {THREE.Vector3} position 
     * @param {THREE.Vector3} destination2 
     */
    wichWay(position, destination2) {
        let dx = position.x - destination2.x
        let dz = position.z - destination2.z
        let directions = '';

        if (Math.abs(dx) > Math.abs(dz)) {
            if (dx >= 0) {
                if (dz >= 0) {
                    return 'swen';
                }
                return 'senw';
            }
            if (dz >= 0)
                return 'nwse';

            return 'nesw'
        } else {
            if (dz >= 0) {
                if (dx >= 0) {
                    return 'wsen';
                }
                return 'wnes';
            }
            if (dx >= 0)
                return 'eswn';

            return 'enws'
        }
    }

    castRay(position, direction) {
        let intersects;

        switch (direction) {
            case 'n':
                // north;
                var ray = new THREE.Raycaster(position, new THREE.Vector3(1, 0, 0).normalize(), 0.4, 2);
                intersects = ray.intersectObjects(window.scene.children);
                break;
            case 'e':
                // east
                var ray = new THREE.Raycaster(position, new THREE.Vector3(0, 0, 1).normalize(), 0.4, 2);
                intersects = ray.intersectObjects(window.scene.children);
                break;
            case 's':
                // south
                var ray = new THREE.Raycaster(position, new THREE.Vector3(-1, 0, 0).normalize(), 0.4, 2);
                intersects = ray.intersectObjects(window.scene.children);
                break;
            case 'w':
                // west
                var ray = new THREE.Raycaster(position, new THREE.Vector3(0, 0, -1).normalize(), 0.4, 2);
                intersects = ray.intersectObjects(window.scene.children);
                break;
            default:
                console.error(direction + ' is not a legit direction')
        }

        return intersects.length;
    }

}