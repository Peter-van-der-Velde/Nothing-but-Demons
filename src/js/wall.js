class Wall extends THREE.Mesh{

  constructor(x, z, y){
    let textureLoader = new THREE.TextureLoader();
    let map = textureLoader.load('img/wallTexture.png');

    let geometry = new THREE.CubeGeometry(1, 10, 20);
    let material = new THREE.MeshBasicMaterial({map: map});
    super (geometry, material);

    this.position.set(x,z,y);

  }
}