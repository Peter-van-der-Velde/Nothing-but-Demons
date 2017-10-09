/**
 * A basic level class
 * @param {string} name name of the level.
 * @param {Render} render Link to the renderer.
 */
class Level extends THREE.Scene {
  // TODO: Allow this class to load a saved level from a file.
  constructor(levelName, render) {
    super();
    this.levelName = levelName;

    this.mainCamera = new THREE.PerspectiveCamera( 75, render.aspect, 0.1, 1000 );
    this.mainCamera.position.set(10, -30, 10);

    this.controls = new THREE.OrbitControls(this.mainCamera, render.domElement);
  	this.controls.userPanSpeed = 0.1;

    //Texture loader
    this.loader = new THREE.TextureLoader();
    this.floorTexture = this.loader.load("img/floorTexture.png");

    //Create plane
    this.geometry = new THREE.PlaneGeometry( 32, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( {map: this.floorTexture} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.add( this.plane );
  }
}
