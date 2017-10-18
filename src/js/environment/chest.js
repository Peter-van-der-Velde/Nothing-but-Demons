class Chest extends THREE.Mesh{

  constructor(x, y, z){

    let objectLoader = new THREE.ObjectLoader();

    // load a resource
		objectLoader.load(
			// resource URL
			'obj/chest.obj',
			// Function when resource is loaded
			function ( object ) {
				scene.add( object );
			}
		);

    let pillarTexture = textureLoader.load('img/pillarTexture.png');

    let geometry = new THREE.CylinderGeometry(1.5, 1.5,10, 32);
    let material = new THREE.MeshBasicMaterial({map: pillarTexture});
    super(geometry, material);

    this.position.set(x,y,z)

  }
}
