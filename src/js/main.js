var WIDTH, HEIGHT, testLevel, aspect, controls, delta, fps, frameCount, timer, input;
var mixer;

init();
animate();

function init(){
	timer = new THREE.Clock();
  frameCount = 20;

	
  render = new Render(true, window.innerWidth, window.innerHeight);
  testLevel = new Dungeon("dungeon", render);

	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener('resize', function() {
		WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
		render.setSize(WIDTH, HEIGHT);
		testLevel.mainCamera.aspect = WIDTH / HEIGHT;
		testLevel.mainCamera.updateProjectionMatrix();

	});
	
	this.player =  new Player (name = "Sparhawk", hp = 35, mp = 20, strength = 16, defense = 4, speed = 4, intelligence = 35, level = 5, experiencePoints = 12, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield], playerClass = "Black Mage", camera = testLevel.mainCamera, scene = testLevel.scene);
	//this.enemy =  new Enemy (name = "Fred der Goblin", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield]);
	this.blockEnemey = new CubeEnemy();
	this.blockEnemey2 = new CubeEnemy();
	this.blockEnemey2.mesh.position.set(4, 1, -4);
	
	enemies.forEach(function(enemy) {
		testLevel.add(enemy.mesh);
	}, this);
	testLevel.add(player.mesh);

	initAnim();
}

function initAnim() {
	var loader = new THREE.JSONLoader();
	loader.load( "models/chest_01/chest_02.json", function( geometry, materials ) {
		var material = materials[ 0 ];
		material.emissive.set( 0x101010 );
		material.skinning = true;
		material.morphTargets = true;
		var mesh = new THREE.SkinnedMesh( geometry, material );
		mesh.position.y = -30;
		mesh.scale.multiplyScalar( 5 );
		mixer = new THREE.AnimationMixer( mesh );
		for ( var i = 0; i < mesh.geometry.animations.length; i ++ ) {
			var action = mixer.clipAction( mesh.geometry.animations[ i ] );
			if ( i === 1 ) action.timeScale = 0.25;
			action.play();
		}
		testLevel.scene.add( mesh );
		mesh.position.y = 10;
	} );
}

var anijm = true;
function animate() {
	requestAnimationFrame( animate );

	// Calculate the delta and fps
	delta = timer.getDelta();
	fps = Math.trunc(1.0 / delta);

	if (mixer)
		mixer.update( delta / 2.0 );

	// Render the scene.
	render.render(testLevel.scene, testLevel.mainCamera);
	this.player.update(delta);
	testLevel.update();
	//testLevel.controls.update();

	enemies.forEach(function(enemy) {
		enemy.update(delta);
	}, this);
}
