// a javascript file with all the different shields.

class ironShield extends Weapon {
  constructor() {
    var basicShieldGeom = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    var basicShieldMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
    var basicShieldMesh = new THREE.Mesh(basicShieldGeom, basicShieldMaterial);
    super("iron shield", "1", "0", "3", 1, 0, basicShieldMesh);
  }

}

class diamondShield extends Weapon {
  constructor() {
    var basicShieldGeom = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    var basicShieldMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
    var basicShieldMesh = new THREE.Mesh(basicShieldGeom, basicShieldMaterial);
    super("diamond shield", "2", "0", "5", 1, 0, basicShieldMesh);
  }
}