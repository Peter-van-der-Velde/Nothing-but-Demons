"use strict"
class Model {
  constructor(scene, jsonPath, texturePath) {
    var loader = new THREE.JSONLoader();
    loader.load(jsonPath, handleLoad);

    function handleLoad(geometry, materials) {
      var texloader = new THREE.TextureLoader();
      materials[0].map = texloader.load(texturePath);

      var mesh = new THREE.Mesh(geometry, materials[0]);
      scene.add(mesh);
    }
  }

  animate() {

  }
}
