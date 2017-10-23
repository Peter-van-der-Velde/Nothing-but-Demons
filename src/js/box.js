//Constructor of a box
export class box {
	constructor(x, y, z, constructorColor, height, width, depth) {
		var boxMaterial = new THREE.MeshPhongMaterial({
			color: constructorColor
		});

		var boxSize = new THREE.BoxGeometry(height, width, depth);
		var box = new THREE.Mesh(boxSize, boxMaterial);
		box.castShadow = true;
		box.receiveShadow = true;
		box.position.set(x, y, z);
		return box;
	}
}