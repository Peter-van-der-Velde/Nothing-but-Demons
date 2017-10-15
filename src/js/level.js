/**
* A basic level class
* @param {string} name name of the level.
* @param {Render} render Link to the renderer.
*/
class Level {
  // TODO: Allow this class to load a saved level from a file.
  constructor(levelName, render) {
    this.scene = new THREE.Scene();
    this.levelName = levelName;

    this.mainCamera = new THREE.PerspectiveCamera( 75, render.aspect, 0.1, 1000 );
    this.mainCamera.position.set(20, 20, 20);

    this.controls = new THREE.OrbitControls(this.mainCamera, render.domElement);
    this.controls.userPanSpeed = 0.1;

    let gridSize = 100;
    let gridDivisions = 100;

    let gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
    this.scene.add( gridHelper );

    //Texture loader
    this.loader = new THREE.TextureLoader();
    this.floorTexture = this.loader.load("img/floorTexture.png");

    //Create plane
    this.geometry = new THREE.PlaneGeometry( 50, 50, 1 );
    this.material = new THREE.MeshBasicMaterial( {map: this.floorTexture} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.rotation.x = -1.5708;
    this.scene.add( this.plane );

    // //Create testcube
    // this.cubeGeometry =new THREE.CubeGeometry(5, 5, 5);
    // this.cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    // this.testCube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
    // this.testCube.translateY(2.5)
    // this.add(this.testCube)

    let b = new GameObject({scene: this.scene, materialType: 1, color: 0xFF00FF, model: 'models/test.json'});

  }
}
