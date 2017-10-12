var Perso = function(scene, plane)
{
    var self=this;
    self.scene = scene;
    self.plane = plane;

    self.move_speed= 0.4;

    self.is_moving=false;

    this.load= function()
    {
        var self=this;

        console.log('load!');
        return new Promise(function(ok, reject)
        {
            var loader = new THREE.JSONLoader();
            console.log('loading js/perso.json');
            loader.load( "blender/perso.json", function(geometry, mat)
            {
                console.log('received ',geometry, mat);
                self.perso_geo = geometry;
                self.perso_mat = mat;
                ok();
            });
        });
    };

    this.build = function(options)
    {
        var self=this;
        this.load().then(function()
        {
            self.create(options);
        });
    };

    this.create =function(options)
    {
        console.log('creating material');
        material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        material.skinning = true;
        material.morphTargets = true;

        this.mesh = new THREE.SkinnedMesh( self.perso_geo, material);
        this.scene.add(this.mesh);

        this.mesh.castShadow=true;
        this.mesh.receiveShadow=true;

        this.mesh.position.x = options.x;
        this.mesh.position.y = 0;
        this.mesh.position.z = options.z;

        console.log('perso ',this.mesh);
        this.mixer = new THREE.AnimationMixer( this.mesh );

        this.bounceClip = self.perso_geo.animations[0];

        this.move_action = this.mixer.clipAction(this.bounceClip, null ).setDuration(0.5);
    };

    this.getRayPos= function(event)
    {
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

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
        if(current_pos.equals(pos))
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
        move_step_x = this.move_speed * ratio_x;
        move_step_z = this.move_speed * ratio_z;

        this.move_step_vector = new THREE.Vector2();
        this.move_step_vector.x = current_pos.x>pos.x ?  (- move_step_x) : move_step_x;
        this.move_step_vector.z = current_pos.z>pos.z ?  (- move_step_z) : move_step_z;

        console.log('tests ',current_pos.x>pos.x,  current_pos.y>pos.y);
        console.log('FROM ',current_pos);
        console.log('move steps vector ',this.move_step_vector);
        console.log('TO ',pos);

        // Actually moving...
        this.move_destination = pos;
        this.move_action.play();
        this.move_weight_destination = 1;
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
            }
            else
            {
               this.mesh.position.setX(this.move_destination.x);
               this.mesh.position.setZ(this.move_destination.z);
            }
            if(!moving)
            {
                this.move_weight_destination = 0;
                //this.move_action.stop();
                this.is_moving=false;
                this.move_destination=null;
            }
        }
    };

    this.move_weight  = function()
    {
        if(this.move_weight_destination!==null)
        {
            var c = this.move_action.getEffectiveWeight();
            console.lo
            if(c>this.move_weight_destination)
            {
                this.move_action.setEffectiveWeight(c-0.1);
            }
            else if(c<this.move_weight_destination)
            {
                this.move_action.setEffectiveWeight(c+0.1);
            }
            else
            {
                this.move_weight_destination=null;
            }
        }
    };

    this.update= function(delta)
    {
        this.mixer.update(delta);

        this.move_step();
        this.move_weight();
    };

};
