var WIDTH, HEIGHT, aspect, controls, delta, fps, frameCount, timer;

init();
animate();

function init(){
	timer = new THREE.Clock();
	frameCount = 20;

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

	// Render the scene.
	render.render(testLevel, testLevel.mainCamera);
	testLevel.controls.update();
}
