class cubeMovement extends THREE.Mesh
{
  constructor (x, z, plane) {

    let geometry = new THREE.CubeGeometry(3, 3, 3);
    let material = new THREE.MeshLambertMaterial({color: 0xffffff});
    super(geometry, material);

    this.movementSpeed = 1;
    this.isMoving = false;
    this.position.x = x;
    this.position.y = 1.5;
    this.position.z = z;

  }
  getRayPos(event){

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / render.domElement.width) * 2 - 1;
    mouse.y = -(event.clientX / render.domElement.width) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects([plane], false);

    if (intersects.length > 0) {
      return intersects[0].point;
    }
    return null;
  }

  lookAtEvent(event){

    var pos = this.getRayPos(event);
    if(pos)
    {
      this.lookAt(pos);
    }
  }

  lookAt(pos){

    if (this)
    {
      this.lookAt(pos);
    }
  }

  moveToEvent(event){

    var pos = this.getRayPos(event);
    if(pos){
      this.lookAt(pos);
      this.moveTo(pos);
    }
  }

  moveTo(pos){

    var currentPos = this.position;
    console.log(currentPos);

    if (currentPos === pos) {
      return;
    }
    this.isMoving = true;

    var distance_ab = Math.abs(currentPos.x - pos.x);
    var distance_ac = Math.abs(currentPos.z - pos.z);
    var total = distance_ab + distance_ac;

    console.log(distance_ab, distance_ac);

    var ratio_x = (total - distance_ac) / total;
    var ratio_z = (total - distance_ab) / total;
    var move_step_x = this.movementSpeed * ratio_x;
    var move_step_z = this.movementSpeed * ratio_z;

    this.move_step_vector = new THREE.Vector2();
    this.move_step_vector.x = currentPos.x > pos.x ? (-move_step_x) : move_step_x;
    this.move_step_vector.z = currentPos.z > pos.z ? (-move_step_z) : move_step_z;

    this.move_destination = pos;

    this.move_idx = 0;
  }

  move_step(){
    if (this.isMoving) {

      this.move_idx++;
      var moving = 0;

      if (Math.abs(this.position.x - this.move_destination.x) > this.movementSpeed || Math.abs(this.position.z - this.move_destination.z) > this.movementSpeed) {

        moving++;
        this.position.add(this.move_step_vector);
        console.log(moving);
      }
      else {

        this.position.setX(this.move_destination.x);
        this.position.setZ(this.move_destination.z);
      }
      if (!moving) {

        this.isMoving = false;
        this.move_destination = null;
      }
    }
  }

  update(){
    this.move_step();
  }

}