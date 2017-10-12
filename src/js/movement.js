
var person = function (scene, plane) {

	this.scene = scene;
	this.plane = plane;
	this.movementSpeed = 0.4;
	this.isMoving = false;


	this.create = function () {
		console.log('creating material');
		var material = new THREE.MeshLambertMaterial({color: 0xffffff});
		var geometry = new THREE.CubeGeometry(5,5,5);
		//material.skinning = true;
		//material.morphTargets = true;

		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);

		//this.cube.castShadow = true;
		//this.cube.receiveShadow = true;

		this.cube.position.x = 0;
		this.cube.position.y = 0;
		this.cube.position.z = 0;

	};

	this.getRayPos = function (event) {

		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();
		mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
		mouse.y = -(event.clientX / renderer.domElement.width) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		var intersects = raycaster.intersectObjects([plane], false);

		if (intersects.length > 0) {
			return intersects[0].point;
		}
		return null;
	};


	this.lookAt = function (pos) {

		if (this.cube) {
			this.cube.lookAt(pos);
		}
	};

	this.moveToEvent = function (event) {

		var pos = this.getRayPos(event);
		if (pos) {
			this.lookAt(pos);
			this.moveTo(pos);
		}
	};

	this.moveTo = function (pos) {

		var currentPos = this.cube.position;

		if (currentPos.equals(pos)) {
			return;
		}
		this.isMoving = true;

		var distance_ab = Math.abs(currentPos.x - pos.x);
		var distance_ac = Math.abs(currentPos.z - pos.z);
		var total = distance_ab + distance_ac;

		var ratio_x = (total - distance_ac) / total;
		var ratio_z = (total - distance_ab) / total;
		var move_step_x = this.movementSpeed * ratio_x;
		var move_step_z = this.movementSpeed * ratio_z;

		this.move_step_vector = new THREE.Vector2();
		this.move_step_vector.x = currentPos.x > pos.x ? (-move_step_x) : move_step_x;
		this.move_step_vector.z = currentPos.z > pos.z ? (-move_step_z) : move_step_z;

		this.move_destination = pos;

		this.move_idx = 0;
	};

	this.move_step = function () {

		if (this.isMoving) {

			this.move_idx++;
			var moving = 0;

			if (Math.abs(this.cube.position.x - this.move_destination.x) > this.movementSpeed || Math.abs(this.cube.position.z - this.move_destination.z) > this.move_speed) {

				moving++;
				this.cube.position.add(this.move_step_vector);
			}
			else {

				this.cube.position.setX(this.move_destination.x);
				this.cube.position.setZ(this.move_destination.z);
			}
			if (!moving) {

				this.isMoving = false;
				this.move_destination = null;
			}
		}
	};


	this.update = function (delta) {

		//this.mixer.update(delta);
		this.move_step();
	}
};




