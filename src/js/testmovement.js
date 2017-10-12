Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};



var scene = new THREE.Scene();
var clock  = new THREE.Clock();
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.fog = new THREE.Fog( 0xffffff, 2000, 10000 );
var renderer = new THREE.WebGLRenderer({ antialias:true});
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( scene.fog.color );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
renderer.domElement.style.position = "relative";
document.body.appendChild( renderer.domElement );

// Add floor
var planeGeometry = new THREE.PlaneGeometry(100,100);
var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow  = true;
plane.rotation.x=-0.5*Math.PI;
plane.position.x=0;
plane.position.y=0;
plane.position.z=0;
scene.add(plane);

var Person = new person(scene,plane);


var trigger_move= false;
document.addEventListener( 'mousemove', function(e) { if(trigger_move) { console.log('here'); Person.moveToEvent(e); } }, false );
document.addEventListener( 'mouseup', function(e) { console.log('up');trigger_move=false; e.stopPropagation(); return false; }, false);
document.addEventListener( 'mousedown', function(e) { console.log('down'); trigger_move=true;e.stopPropagation(); Person.moveToEvent(e);  return false; }, false);


// Update position
camera.position.x = 8;
camera.position.z = -5;
camera.position.y = 8;
camera.lookAt(new THREE.Vector3(0,0,0));


var target = new THREE.Object3D();
target.position = new THREE.Vector3(5, 0, 0);

var pointColor = "#ffffff";
scene.add( new THREE.HemisphereLight( 0x111111, 0x444444 ) );

var light = new THREE.DirectionalLight( 0xebf3ff, 1.5 );
light.position.set( 0, 140, 500 ).multiplyScalar( 1.1 );
scene.add( light );





var mouse = new THREE.Vector2();


x=0;
function render()
{
  requestAnimationFrame( render );

  renderer.render( scene, camera );
}



render();

