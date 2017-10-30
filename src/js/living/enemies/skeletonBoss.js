class SkeletonBoss extends Enemy {
  constructor() {
    // super(name = "Boss", hp = 50, mp = 100, strength = 29, defense = 15, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = [new ironShield()], weapons = [new ironSword(), new ironShield(), new ironShield(), new ironShield()]);
    super("Boss", 50, 100, 29, 15, 3, 250, 3, 9, [new ironShield()], [new ironSword(), new ironShield(), new ironShield(), new ironShield()]);

    this.radius = 0.5;
    this.movementSpeed = 1;
    this.model = new Model("skeleton_boss");

    enemies.push(this);
    console.log(this);
  }

  replaceWithCorpse() {
    this.model.mesh.material.color.setHex( 0xff0000 );
  }
}
