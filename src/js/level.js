/**
* A basic level class
* @param {string} name name of the level.
* @param {Render} render Link to the renderer.
*/
class Level {
  // TODO: Allow this class to load a saved level from a file.
  constructor(levelName, render) {
    this.levelName = levelName;

    this.mainCamera = new THREE.PerspectiveCamera( 75, render.aspect, 0.1, 1000 );
    this.mainCamera.position.set(20, 20, 20);
    this.mainCamera.lookAt(new THREE.Vector3(0, 0, 0));
    render.setClearColor(0xCCCCFF, 1);
    let gridSize = 200;
    let gridDivisions = 200;

    //Texture loader
    this.loader = new THREE.TextureLoader();
    this.floorTexture = this.loader.load("img/floorTexture1.png");
    this.floorTexture.wrapS = THREE.RepeatWrapping;
    this.floorTexture.wrapT = THREE.RepeatWrapping;
    this.floorTexture.repeat.set( 20, 20);

    //Create plane
    this.geometry = new THREE.PlaneGeometry( 200, 200, 1 );
    this.material = new THREE.MeshBasicMaterial( {map: this.floorTexture} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.rotation.x = -1.5708;
    window.scene.add( this.plane );

    var lamp = new THREE.DirectionalLight(0xffffff, 1, 50, 0);
    var aLight = new THREE.AmbientLight(0x404040);
    window.scene.add(lamp, aLight);

    this.chest = new Model("chest_01", true);
    this.chest.load(window.scene);
  }

  update(dt) {
    this.chest.animate(dt)
  }

  add (mesh) {
    window.scene.add(mesh);
  }

}
