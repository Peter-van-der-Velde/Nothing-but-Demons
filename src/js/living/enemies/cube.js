"use strict"

class CubeEnemy extends Enemy {

  constructor() {
	var z = getRandomInt(0, 5);
	console.log("Z = " + z);
	if(z < 1){
		super(name = "BasicEnemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new diamondShield()], weapons = [new ironSword(), new diamondShield(), new diamondShield(), new diamondShield()]);
		console.log("Enemy spanwed with a diamond shield");
	}
	else if(z >= 1){
		super(name = "BasicEnemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new ironShield()], weapons = [new ironSword(), new ironShield(), new ironShield(), new ironShield()]);
		console.log("Enemy spanwed with an iron shield");
	}

    this.radius = 0.5;
    this.movementSpeed = 1;
    this.model = new Model("skeleton");

    // add enemies to the enemy array
    enemies.push(this);
    console.log(this);
  }

  replaceWithCorpse() {
    this.model.mesh.material.color.setHex( 0xff0000 );
  }
}
