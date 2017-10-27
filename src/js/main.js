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


	window.player  =  new Player (
		name = "Sparhawk",
		hp = 35,
		mp = 20,
		strength = 16,
		defense = 4,
		speed = 4,
		intelligence = 35,
		level = 5,
		experiencePoints = 12,
		items = [],
		weapons = [new ironSword(), new ironShield(), new ironShield(), new ironShield()],
		playerClass = "Black Mage",
		camera = testLevel.mainCamera,
		scene = window.scene,
		model = new Model("player", false, false)
	);
	// window.player.model.mesh.position.set(-6, player.mesh.position.y, 6);
	this.blockEnemy = new CubeEnemy(scene = window.scene);
	this.blockEnemy2 = new CubeEnemy(scene = window.scene);
	this.blockEnemy3 = new CubeEnemy(scene = window.scene);

	enemies.forEach(function(enemy) {
		testLevel.add(enemy.mesh);
	}, this);
	testLevel.add(player.mesh);
}

function animate() {
	requestAnimationFrame( animate );

	// Calculate the delta
	delta = timer.getDelta();

	testLevel.update(delta);

	window.player.update(delta);

	for (let e of enemies) {
		e.update(delta);
	}

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update(delta, window.scene);
	}

	window.player.model.update(delta);

	this.blockEnemy2.model.mesh.position.set(4, 0, -4);
	this.blockEnemy3.model.mesh.position.set(-4, 0, -4);

	// Render the scene.
	render.render(window.scene, testLevel.mainCamera);
	testLevel.mainCamera.position.x = player.model.mesh.position.x + 4;
	testLevel.mainCamera.position.z = player.model.mesh.position.z + 4;
  	testLevel.mainCamera.lookAt(player.model.mesh.position);
}
