"use strict"
class Model {
  constructor(name = "", diffuse = false, glow = false) {
    this.name = name;
    this.mesh;
    this.mixer;
    this.diffuse = diffuse;
    this.glow = glow;

    this.path = "models/" + name + "/";
    this.texturePath = this.path + "textures/";
  }

  load(scene) {
    let self = this;

    var mesh = this.mesh;
    var name = this.name;
    var diffuse = this.diffuse;
    var glow = this.glow;

    var jsonPath = this.path + name + ".json";
    var texturePath = this.texturePath;

    var loader = new THREE.JSONLoader();
    loader.load('models/chest_01/chest_02.json', handleLoad);

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

      materials[0].emissive.set( 0x101010 );
  		materials[0].skinning = true;
  		materials[0].morphTargets = true;

      self.mesh = new THREE.SkinnedMesh(geometry, materials[0]);
      self.mesh.name = name;
      scene.add(self.mesh);

      self.mixer = new THREE.AnimationMixer( self.mesh );
      for ( var i = 0; i < self.mesh.geometry.animations.length; i ++ ) {
  			var action = self.mixer.clipAction( self.mesh.geometry.animations[ i ] );
  			if ( i === 1 ) action.timeScale = 0.25;
  			action.play();
  		}
      console.log(self);
    }
  }

  animate(dt) {
    if (this.mesh) {
      this.mesh.position.x += dt;
    }
    if (this.mixer) {
      this.mixer.update( dt / 2.0 );
    }
  }
}
