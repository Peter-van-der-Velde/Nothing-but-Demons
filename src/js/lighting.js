//var Light = new THREE.DirectionalLight( 0xdddddd, 0.8 );
//Light.position.set( -8, 8, 8 );
//light.castShadow = true;

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(0, 20, 8);
pointLight.castShadow = true;

var LightA = new THREE.AmbientLight(0x000);