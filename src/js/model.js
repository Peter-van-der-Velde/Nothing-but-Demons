"use strict"
class Model {
  constructor(name = "", diffuse = false, glow = false) {
    this.name = name;
    this.mesh;
    this.diffuse = diffuse;
    this.glow = glow;

    this.path = "models/" + name + "/";
    this.texturePath = this.path + "textures/";
  }

  load(scene) {
    var mesh = this.mesh;
    var name = this.name;
    var diffuse = this.diffuse;
    var glow = this.glow;

    var jsonPath = this.path + name + ".json";
    var texturePath = this.texturePath;

    var loader = new THREE.JSONLoader();
    loader.load(jsonPath, handleLoad);
    
    function handleLoad(geometry, materials) {
      var texloader = new THREE.TextureLoader();

      // Load in the proper textures
      if (diffuse) {
        materials[0].map = texloader.load(texturePath + name + "_diff.png");
      }
      if (glow) { // TODO: make the emissive map work like it should...
        materials[0].emissiveMap = texloader.load(texturePath + name + "_glow.png");
        materials[0].emissive = 0xffffff;
      }

      mesh = new THREE.Mesh(geometry, materials[0]);
      mesh.name = name;
      scene.add(mesh);
    }
  }

  animate() {

  }
}
