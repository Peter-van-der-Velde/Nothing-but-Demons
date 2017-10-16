var WIDTH, HEIGHT, testLevel, aspect, controls, delta, fps, frameCount, timer, input;

init();
animate();

function init(){
	timer = new THREE.Clock();
  frameCount = 20;

	//player
	var ironShield = new Weapon({name: "iron shield", value: "1", power: "0", defense: "3", attackRange: 0, attackSpeed: 0});
	var ironSword = new Weapon({name: "iron sword", value: 1, power: 4, defense: 0.5, attackReange: 2, attackSpeed: 1});
	// var player =  new Player ({name: "Sparhawk", hp: 35, mp: 20, strength: 7, defense: 4, speed: 4, intelligence: 35, level: 5, experiencePoints: 12, items: undefined, weapons: [ironSword, ironShield, ironShield, ironShield], playerClass: "Black Mage"});
	// var enemy =  new Enemy ({name: "Fred der Goblin", hp: 25, mp: 10, strength: 9, defense: 5, speed: 3, intelligence: 250, level: 3, experiencePoints: 9, items: undefined, weapons: [ironSword, ironShield, ironShield, ironShield]});
	input = new Input();

  render = new Render(true, window.innerWidth, window.innerHeight);
	testLevel = new Level("testLevel", render);


	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener('resize', function() {
		WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
		render.setSize(WIDTH, HEIGHT);
		testLevel.mainCamera.aspect = WIDTH / HEIGHT;
		testLevel.mainCamera.updateProjectionMatrix();
	});



	// MODEL
	// var loader = new THREE.JSONLoader();
	// loader.load('models/test.json', handle_load());
	//
	// function handle_load(geometry, materials) {
	// 	var mesh = new THREE.Mesh(geometry, materials);
	// 	testLevel.add(mesh);
	// }

}

function animate() {
	requestAnimationFrame( animate );

	// Calculate the delta and fps
	delta = timer.getDelta();
	fps = Math.trunc(1.0 / delta);

	if (frameCount < 20) {frameCount++;}
	else {
		document.getElementById("fps-display").textContent="FPS: " + fps;
		frameCount = 0;
	}

	setTimeout(function(){
		//changeOpacity();
		//console.log("hia");
	}, 1000);

	input.update();

	// Render the scene.
	render.render(testLevel.scene, testLevel.mainCamera);
	//testLevel.controls.update();
}
