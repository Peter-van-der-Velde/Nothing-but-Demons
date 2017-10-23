// a javascript file with all the different shields.



/**
 * simple iron shield
 */
class ironShield extends Weapon {

  constructor() {
    var basicShieldGeom = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    var basicShieldMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
    var basicShieldMesh = new THREE.Mesh(basicShieldGeom, basicShieldMaterial);
    super("iron shield", "1", "0", "3", 1, 0, basicShieldMesh);
  }

}