var Perso = function(scene, plane)
{
  var self=this;
  self.scene = scene;
  self.plane = plane;

  self.move_speed= 0.4;

  self.is_moving=false;

  this.create =function(options)
  {
    let geometry = new THREE.CubeGeometry(3, 3, 3);
    let material = new THREE.MeshLambertMaterial({color: 0xffffff});

    this.mesh = new THREE.SkinnedMesh( geometry, material);
    this.scene.add(this.mesh);

    this.mesh.castShadow=true;
    this.mesh.receiveShadow=true;

    this.mesh.position.x = options.x;
    this.mesh.position.y = 0;
    this.mesh.position.z = options.z;

    console.log('perso ',this.mesh);
  };

  this.getRayPos= function(event)
  {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / render.domElement.width ) * 2 - 1;
    mouse.y = - ( event.clientY / render.domElement.height ) * 2 + 1;

    raycaster.setFromCamera( mouse, testLevel.mainCamera );

    var intersects = raycaster.intersectObjects( [plane], false );

    if ( intersects.length > 0 ) {
      return intersects[0].point;
    }
    return null;
  }

  this.lookAtEvent= function(event)
  {
    var pos = this.getRayPos(event);
    if(pos)
    {
      this.lookAt(pos);
    }
  }

  this.lookAt= function(pos)
  {
    if(this.mesh)
    {
      this.mesh.lookAt(pos);
    }
  }

  this.moveToEvent= function(event)
  {
    var pos = this.getRayPos(event);
    if(pos)
    {
      this.lookAt(pos);
      this.moveTo(pos);
    }
  }

  this.moveTo= function(pos)
  {
    var current_pos = this.mesh.position;
    // Last part of moving
    if(current_pos === pos)
    {
      return;
    }
    this.is_moving=true;

    // A: bottom right rectangle
    // B: start
    // C: destination
    var distance_ab = Math.abs(current_pos.x - pos.x);
    var distance_ac = Math.abs(current_pos.z - pos.z);
    var total = distance_ab + distance_ac;


    var ratio_x = (total-distance_ac) / total;
    var ratio_z = (total-distance_ab) / total;
    var move_step_x = this.move_speed * ratio_x;
    var move_step_z = this.move_speed * ratio_z;

    this.move_step_vector = new THREE.Vector2();
    this.move_step_vector.x = current_pos.x>pos.x ?  (- move_step_x) : move_step_x;
    this.move_step_vector.z = current_pos.z>pos.z ?  (- move_step_z) : move_step_z;

    console.log('tests ',current_pos.x>pos.x,  current_pos.y>pos.y);
    console.log('FROM ',current_pos);
    console.log('move steps vector ',this.move_step_vector);
    console.log('TO ',pos);

    // Actually moving...
    this.move_destination = pos;
    this.move_idx=0;
  };

  this.move_step= function()
  {
    if(this.is_moving)
    {
      this.move_idx++;
      var moving=0;
      if(Math.abs(this.mesh.position.x - this.move_destination.x) > this.move_speed || Math.abs(this.mesh.position.z - this.move_destination.z) > this.move_speed)
      {
        moving++;
        this.mesh.position.add(this.move_step_vector);
        console.log('koekoek'+ moving)
      }
      else
      {
        this.mesh.position.setX(this.move_destination.x);
        this.mesh.position.setZ(this.move_destination.z);
      }
      if(!moving)
      {
        this.is_moving=false;
        this.move_destination=null;
      }
    }
  };


};
