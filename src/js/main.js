
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // to antialias the shadow
var renderCanv = document.getElementById("renderCanvasDiv").appendChild( renderer.domElement );
renderCanv.id = "renderCanvas";
console.log(renderer);
var clock = new THREE.Clock();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);


//TextureLoader
var loader = new THREE.TextureLoader();
var floorTexture = loader.load("img/floorTexture.png");
var dungeonFloor = new textureBox(0, 1, 0, floorTexture,5 , 0.1, 5);


//Lighting
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set (0, 20, 8);
pointLight.castShadow = true;

var LightA = new THREE.AmbientLight( 0x000 );



scene.add(dungeonFloor);

// add lights to scene
pointLight.lookAt( dungeonFloor );
scene.add(pointLight);
scene.add(LightA);





















//Render function
var render = function () {
	var delta = clock.getDelta();
	
	renderer.render( scene, camera );
	requestAnimationFrame( render );
};

render();