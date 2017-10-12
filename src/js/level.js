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
    this.mainCamera.position.set(20, 20, 20);

    this.controls = new THREE.OrbitControls(this.mainCamera, render.domElement);
    this.controls.userPanSpeed = 0.1;

    let gridSize = 100;
    let gridDivisions = 100;

    let gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
    this.add( gridHelper );

    //Texture loader
    this.loader = new THREE.TextureLoader();
    this.floorTexture = this.loader.load("img/floorTexture.png");

    //Create plane
    this.geometry = new THREE.PlaneGeometry( 20, 20, 1 );
    this.material = new THREE.MeshBasicMaterial( {map: this.floorTexture} );
    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.rotation.x = -1.5708;
    this.add( this.plane );

    //create moving cube
    var cube = new cubeMovement(0,0);

		var trigger_move= false;
		document.addEventListener( 'mousemove', function(e) { if(trigger_move) { console.log('here'); Person.moveToEvent(e); } }, false );
		document.addEventListener( 'mouseup', function(e) { console.log('up');trigger_move=false; e.stopPropagation(); return false; }, false);
		document.addEventListener( 'mousedown', function(e) { console.log('down'); trigger_move=true;e.stopPropagation(); Person.moveToEvent(e);  return false; }, false);


  }
}
