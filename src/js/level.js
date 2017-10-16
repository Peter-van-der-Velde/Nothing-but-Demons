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
    this.mainCamera.lookAt(new THREE.Vector3(0, 0, 0));

    // this.controls = new THREE.OrbitControls(this.mainCamera, render.domElement);
    // this.controls.userPanSpeed = 0.1;

    let gridSize = 100;
    let gridDivisions = 100;

    let gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
    this.scene.add( gridHelper );

    //Texture loader
    this.loader = new THREE.TextureLoader();
    this.floorTexture = this.loader.load("img/floorTexture.png");

    //Create plane
    this.geometry = new THREE.PlaneGeometry( 20, 20, 1 );
    this.material = new THREE.MeshBasicMaterial( {map: this.floorTexture} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.rotation.x = -1.5708;
    this.scene.add( this.plane );

		//this.cube = new cubeMovement (0,0, this.plane);
		//this.scene.add(this.cube);

    //var perso = new Perso(this.scene, this.plane);
    //perso.create({x: 0, z: 0});

		// var trigger_move= false;
		// document.addEventListener( 'mousemove', function(e) { if(trigger_move) { console.log('here'); perso.moveToEvent(e); } }, false );
		// addEventListener( 'mouseup', function(e) { console.log('up');trigger_move=false; e.stopPropagation(); return false; }, false);
		// document.addEventListener( 'mousedown', function(e) { console.log('down'); trigger_move=true;e.stopPropagation(); perso.moveToEvent(e);  return false; }, false);


    // console.log(this.scene);
    let b = new GameObject({scene: this.scene, model: 'models/test.json'});
  }

  add (mesh) {
    this.scene.add(mesh);
  }

}
