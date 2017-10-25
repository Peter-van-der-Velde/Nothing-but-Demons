// a javascript file with all the different weapons.

//var ironSword = new Weapon(name = "iron sword", value = 1, power = 5, defense = 0.5, attackRange = 2, attackSpeed = 1.35);

/**
 * simple iron sword
 */
class ironSword extends Weapon {
  
    constructor() {
      var basicSwordGeom = new THREE.BoxGeometry(0.05, 2, 0.05);
      var basicSwordMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
      var basicSwordMesh = new THREE.Mesh(basicSwordGeom, basicSwordMaterial);
      super("iron sword", 1, 5, 0.5, 2, 1.35, basicSwordMesh);
    }
  
  }