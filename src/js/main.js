var scene, aspect, camera, WIDTH, HEIGHT, controls, renderer, geometry, material, plane;
var loader, floorTexture;

init();
animate();

function init(){

	//Setup the scene
	scene = new THREE.Scene();
	aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
	camera.position.set(10, -30, 30);

	//Create renderer
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0xCCCCFF, 1);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);

	//create orbit controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.userPanSpeed = 0;

	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener('resize', function() {
		  WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	//Texture loader
	loader = new THREE.TextureLoader();
	floorTexture = loader.load("img/floorTexture.png");

	//Create plane
	geometry = new THREE.PlaneGeometry( 32, 32, 32 );
	material = new THREE.MeshBasicMaterial( {map: floorTexture} );
	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );

}

function animate() {
	requestAnimationFrame( animate );

	// Render the scene.
	renderer.render(scene, camera);
	controls.update();
}


/*var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // to antialias the shadow
var renderCanv = document.getElementById("renderCanvasDiv").appendChild( renderer.domElement );
renderCanv.id = "renderCanvas";
console.log(renderer);
var clock = new THREE.Clock();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

//Lighting
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set (0, 20, 8);
pointLight.castShadow = true;

var LightA = new THREE.AmbientLight( 0x000 );



scene.add(dungeonFloor);

// add lights to scene
pointLight.lookAt( dungeonFloor );
scene.add(pointLight);
scene.add(LightA);*/






















//Render function
var render = function () {
	var delta = clock.getDelta();
	
	renderer.render( scene, camera );
	requestAnimationFrame( render );
};

render();