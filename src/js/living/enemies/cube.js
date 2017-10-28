"use strict"

class CubeEnemy extends Enemy {

  constructor() {
	var z = getRandomInt(0, 5);
	console.log("Z = " + z);
	if(z < 1){
		super(name = "BasicEnemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new diamondShield()], weapons = [ironSword, diamondShield, diamondShield, diamondShield]);
		console.log("Enemy spanwed with a diamond shield");
	}  
	else if(z >= 1){
		super(name = "BasicEnemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new ironShield()], weapons = [ironSword, ironShield, ironShield, ironShield]);
		console.log("Enemy spanwed with an iron shield");
	}

    var bodyGeometry = new THREE.BoxGeometry( 0.5, 1, 0.5 );
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
