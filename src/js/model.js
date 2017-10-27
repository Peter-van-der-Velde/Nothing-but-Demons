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

    this.timer = 0;

    this.load(window.scene);
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
    loader.load('models/player.json', handleLoad);

    function handleLoad(geometry, materials) {
      var texloader = new THREE.TextureLoader();

      // Load in the proper textures
      if (diffuse) {
        materials[0].map = texloader.load(texturePath + name + "_diff.png");
      }
      if (glow) { // TODO: make the emissive map work like it should...
        materials[0].emissiveMap = texloader.load(texturePath + name + "_glow.png");
        materials[0].emissive.set(0xffffff);
      }

      materials[0].skinning = true;
      materials[0].morphTargets = true;

      self.mesh = new THREE.SkinnedMesh(geometry, materials[0]);

      if (self.mesh.geometry.animations) {
        self.mesh = new THREE.SkinnedMesh(geometry, materials[0]);
        self.mixer = new THREE.AnimationMixer( self.mesh );
        self.clipActions = new Array();

        for (let e of self.mesh.geometry.animations) {
          self.clipActions[e.name] = self.mixer.clipAction(e);

          // Set animation looping
          switch (e.name) {
            case ANIMATION_TYPE.ATTACK:
              self.clipActions[e.name].setLoop(THREE.loopOnce, 0);
              break;
            case ANIMATION_TYPE.DIE:
              self.clipActions[e.name].setLoop(THREE.loopOnce, 0);
              break;
            case ANIMATION_TYPE.OPEN:
              self.clipActions[e.name].setLoop(THREE.loopOnce, 0);
              break;
            default:
              break;
          }
        }
      }

      self.mesh.name = name;
      scene.add(self.mesh);
    }
  }

  animationSwitch(animationType) {
    if (!this.clipActions) {
      console.log("ERROR: no animations loaded for this model!");
      return;
    }

    for (var key in this.clipActions) {
      this.clipActions[key].stop();
    }

    if (this.clipActions[animationType]) {
      this.clipActions[animationType].play();
      console.log(this.clipActions[animationType]);
    }
  }

  update(dt) {
    if (this.mixer) {
      this.mixer.update(dt);
    }
  }
}
