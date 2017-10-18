class CubeEnemy extends Enemy {
  
  constructor() {
    super(name = "Basic Blue Block Enemy", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield]);
    
    var bodyGeometry = new THREE.BoxGeometry( 2, 4, 2 );
    var bodyMaterial = new THREE.MeshBasicMaterial({color: 0x008000});
    this.mesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
    this.mesh.position.set(4, 4, 0);
  }

}