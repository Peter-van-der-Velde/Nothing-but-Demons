var WIDTH, HEIGHT, testLevel, aspect, controls, delta, fps, frameCount, timer, input;
var mixer;

init();
animate();

function init() {
	timer = new THREE.Clock();
	frameCount = 20;


	render = new Render(true, window.innerWidth, window.innerHeight);
	testLevel = new Dungeon("dungeon", render);

	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener('resize', function () {
		WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;
		render.setSize(WIDTH, HEIGHT);
		testLevel.mainCamera.aspect = WIDTH / HEIGHT;
		testLevel.mainCamera.updateProjectionMatrix();

	});


	this.player = new Player(name = "Sparhawk", hp = 35, mp = 20, strength = 16, defense = 4, speed = 4, intelligence = 35, level = 5, experiencePoints = 12, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield], playerClass = "Black Mage", camera = testLevel.mainCamera, scene = window.scene);
	this.blockEnemy = new CubeEnemy(scene = window.scene);
	this.blockEnemy2 = new CubeEnemy(scene = window.scene);
	this.blockEnemy2.mesh.position.set(4, 1, -4);
	this.blockEnemy3 = new CubeEnemy(scene = window.scene);
	this.blockEnemy3.mesh.position.set(-4, 1, -4);


	enemies.forEach(function (enemy) {
		testLevel.add(enemy.mesh);
	}, this);
	testLevel.add(player.mesh);



	initAnim();
}

function initAnim() {
	var loader = new THREE.JSONLoader();
	loader.load("models/chest_01/chest_02.json", function (geometry, materials) {
		var material = materials[0];
		material.emissive.set(0x101010);
		material.skinning = true;
		material.morphTargets = true;
		var mesh = new THREE.SkinnedMesh(geometry, material);
		mesh.position.y = -30;
		mesh.scale.multiplyScalar(5);
		mixer = new THREE.AnimationMixer(mesh);
		for (var i = 0; i < mesh.geometry.animations.length; i++) {
			var action = mixer.clipAction(mesh.geometry.animations[i]);
			if (i === 1) action.timeScale = 0.25;
			action.play();
		}
		window.scene.add(mesh);
		mesh.position.set(-20, 0, -3);
	});
}

function animate() {
	requestAnimationFrame(animate);

	// Calculate the delta and fps
	delta = timer.getDelta();
	fps = Math.trunc(1.0 / delta);

	if (mixer)
		mixer.update(delta / 2.0);

	this.player.update(delta);
	enemies.forEach(function (enemy) {
		enemy.update(delta, window.scene);
	}, this);

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update(delta, window.scene);
	}

	// Render the scene.
	render.render(window.scene, testLevel.mainCamera);
}
