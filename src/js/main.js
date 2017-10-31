var WIDTH, HEIGHT, testLevel, aspect, controls, delta, fps, frameCount, timer, input;
var mixer;
this.input = new Input();

init();
animate();


function init() {
	timer = new THREE.Clock();
	frameCount = 20;

	render = new Render(true, window.innerWidth, window.innerHeight);
	// testLevel = new Dungeon("dungeon", render);
	testLevel = new Level("test", render);

	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener('resize', function () {
		WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;
		render.setSize(WIDTH, HEIGHT);
		testLevel.mainCamera.aspect = WIDTH / HEIGHT;
		testLevel.mainCamera.updateProjectionMatrix();
	});

	window.player = new Player(
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

	// enemies.forEach(function(enemy) {
	// 	testLevel.add(enemy.model.mesh);
	// }, this);
	// testLevel.add(window.player.model.mesh);
	waveDisplay();
	drawInventory();
}

function getValue(){
    var retVal = prompt("Enter your name : ", "your name here");
    player.name = retVal;
}


/**
 * Animates the scene
 */
function animate() {
	requestAnimationFrame(animate);

	// Calculate the delta
	delta = timer.getDelta();
	fps = Math.trunc(1.0 / delta);

	testLevel.update(delta);

	if (!playerIsDead) {
		window.player.update(delta);
	}
	for (let e of enemies) {
		e.update(delta);
	}
	for (let e of deadEnemies) {
		e.update(delta);
	}

    playerStats();

	// Render the scene.
	render.render(window.scene, testLevel.mainCamera);
	testLevel.mainCamera.position.x = player.model.mesh.position.x + 4;
	testLevel.mainCamera.position.z = player.model.mesh.position.z + 4;
	testLevel.mainCamera.lookAt(player.model.mesh.position);

	//testLevel.mainCamera.lookAt(player.mesh.position);
	//testLevel.mainCamera.position.z = player.mesh.position.z;
	this.updateUI();
}

function updateUI() {
	if (Math.floor(window.player.hp / window.player.hpMax * 100) > 0)
		document.getElementById("playerHealthBar").value = Math.abs(Math.floor(window.player.hp / window.player.hpMax * 100));
		if (Math.floor(window.player.mp / window.player.mpMax * 100) > 0)
			document.getElementById("playerManaBar").value = Math.abs(Math.floor(window.player.mp / window.player.mpMax * 100));
}
