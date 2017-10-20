// a javascript file with all the different shields.

// a simple 'shield'
var basicShieldGeom = new THREE.BoxGeometry( 0.2, 0.1, 0.2 );
var basicShieldMaterial = new THREE.MeshBasicMaterial({color: 0x800080});
var basicShieldMesh = new THREE.Mesh( basicShieldGeom, basicShieldGeom );

var  ironShield = new Weapon(name = "iron shield", value = "1", power = "0", defense = "3", attackRange = 0, attackSpeed = 0, mesh = basicShieldMesh);