"use strict"

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

  constructor(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons, playerClass, camera, scene) {

    super(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons);

    this.baseAttackSpeed = 2;
    this.input = new Input();

    // Create player mesh
    var group = new THREE.Group();
    var bodyGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    var bodyMaterial = new THREE.MeshNormalMaterial();
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.bodyMesh.position.set(0, 1, 0);
    var hatGeometry = new THREE.CylinderGeometry(0, 0.4, 0.8, 12);
    var hatMaterial = new THREE.MeshBasicMaterial({ color: 0x008000 });
    this.hatMesh = new THREE.Mesh(hatGeometry, hatMaterial);
    this.hatMesh.position.set(0, 2.4, 0);
    group.add(this.hatMesh);
    group.add(this.bodyMesh);
    this.mesh = group;
    this.mesh.position.set(0, 0, 0);


    this.type = OBJECT_TYPE.PLAYER;
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
    this.skill = new DamageSkill("foo", "bar", 0, 10, 1, 5, 12);

  }

  /**
  * levels up player <br>
  * based upon the output of: ((6d4 - 3) / 3) - 2
  */
  levelUp() {
    let dice = new Dice("6d4");

    this.hpMax += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
    this.mpMax += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
    this.strength += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
    this.defense += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
    this.intelligence += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
    this.luck += Math.abs(Math.floor((dice.roll() - 3) / 3) - 3);
  }

  /**
  * Calculates the needed amount of experience points for that level
  * @param {number} level
  */
  nextLevel(level) {
    let exponent = 1.5
    let baseXP = 1000
    return math.floor(baseXP * (level ^ exponent))
  }

  /**
  * Adds item to the inventory of the player
  * @param {Item} item
  */
  addItem(item) {
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
    var health = document.getElementById("health");
    var time = this.attackClock.getElapsedTime();

    health.style.display = "block";

    this.equipment[EQUIPMENT_TYPE.WEAPON].attackSkill.activate(this, this.target);

    health.value = target.hp;
    if (target.hp <= 0) {
      health.style.display = "none";
    }
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
      //Checks wether or not you want to pick up an item or attack an enemy, the preference is to attack enemies.
      for (let i = 0; i < itemsInGame.length; i++) {
        if (calcDistanceXZ(itemsInGame[i].mesh.position, this.destination) < 2)
          this.target = itemsInGame[i];
      }

      for (let i = 0; i < enemies.length; i++) {
        if (calcDistanceXZ(enemies[i].mesh.position, this.destination) < 2)
          this.target = enemies[i];
      }
    }

    if (this.target == null)
      return;

    if (this.target.type == OBJECT_TYPE.ITEM || this.target.type == OBJECT_TYPE.WEAPON) {
      if (calcDistanceXZ(this.mesh.position, this.target.mesh.position) > 0.5)
        return;

      this.pickUpItem(this.target);

      return;
    }

    if (this.target.hp <= 0) {
      this.target = null;
      return;
    }

    this.attack(this.target);

    this.skill.update(dt);
    if (this.input.one) {
      this.skill.activate(this, this.target);
    }

    this.attack(this.target);
    this.equipment[EQUIPMENT_TYPE.WEAPON].attackSkill.update(dt);
  }

  /**
  * Picks up item. <br>
  * Also removes item from the itemsInGame array.
  * @param {Item} item
  */
  pickUpItem(item) {
    if (this.items.length >= 20) {
      console.log("No more space available.")
      return;
    }

    window.scene.remove(item.mesh);
    this.items.push(item);

    // if (this.target == null)
      // return;

    // removes item from itemsInGame arrray
    for (let i = 0; i < itemsInGame.length; i++) {
      if (itemsInGame[i].id == item.id) {
        console.log('found: ' + item.id);
        itemsInGame.splice(i, 1);
        break;
      }
    }
    console.log(this.items);
    console.log(itemsInGame);

    this.target = null;
  }

  /**
  * when player dies use this function
  */
  die() {
    let playerHealthBar = document.getElementById("playerHealthBar");
    alert("Game Over, you died.");
    playerHealthBar.value = this.hp;
    // reset to last shrine/bonfire/savespot
  }

  /**
  * moves the playes
  * @param {number} dt delta time
  */
  move(dt) {
    if (this.input.click) {
      this.destination = this.getRayPos(this.scene);
      this.mesh.lookAt(new THREE.Vector3(this.destination.x, this.mesh.position.y, this.destination.z));
    }

    if (this.destination != null) {

      if (calcDistanceXZ(this.destination, this.mesh.position) < 0.1) {
        console.log('umm 0.1')
        this.destination = null;
        return;
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

    var vector = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      return intersects[0].point;
    }
    return null;
  }
}
