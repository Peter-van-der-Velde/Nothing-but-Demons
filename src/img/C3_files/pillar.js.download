class Pillar extends THREE.Mesh{

  constructor(x, y, z){

    let textureLoader = new THREE.TextureLoader();
    let pillarTexture = textureLoader.load('img/pillarTexture.png');

    let geometry = new THREE.CylinderGeometry(1.5, 1.5,10, 32);
    let material = new THREE.MeshBasicMaterial({map: pillarTexture});
    super(geometry, material);

    this.position.set(x,y,z)

  }
}