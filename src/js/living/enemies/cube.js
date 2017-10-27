"use strict"

class CubeEnemy extends Enemy {

  constructor() {
    super(name = "BasicEnemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new ironShield()], weapons = [ironSword, ironShield, ironShield, ironShield]);

    var bodyGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var bodyMaterial = new THREE.MeshBasicMaterial({color: 0x008000});
    this.mesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
    this.mesh.position.set(4, 1, 0);
    this.radius = 0.5;
    this.movementSpeed = 3;

    // add enemies to the enemy array
    enemies.push(this);
    console.log(this);
  }

  replaceWithCorpse() {
    this.mesh.material.color.setHex( 0xff0000 );
    this.mesh.position.y = 0
  }
}
