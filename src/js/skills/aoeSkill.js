class AoeSkill extends DamageSkill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage, duration, icon, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, icon, mesh);
    this.duration = duration;
    this.durationLeft = 0;
    this.interval = 0;

    let loader = new THREE.TextureLoader();
    let map = loader.load('img/testskill.png');
    let alpha = loader.load('img/testskill_a.png');
    let material = new THREE.MeshLambertMaterial( {map: map, alphaMap: alpha } );
    let geometry = new THREE.PlaneGeometry( 3, 3, 1 )
    material.transparent = true;
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.rotation.x = -1.5708;

    this.icon = loader.load(icon);
  }

  update(delta) {
    super.update(delta);

    if (this.durationLeft > 0) {
      this.durationLeft -= delta;

      if (this.target) {
        for (let e of enemies) {
          if (e.model.mesh.position.distanceTo(this.target.model.mesh.position) < this.range && this.interval >= 1) {
            e.dealDamage(4);
          }
        }
      }

      if (this.interval >= 1) {
        this.interval = 0;
      }
      this.interval += delta;
    }
    else if (this.durationLeft <= 0){
      this.durationLeft = 0;
      window.scene.remove( this.mesh );
    }

    this.mesh.rotation.z -= delta * 5;

    if (this.target) {
      this.mesh.position.set(
        this.target.model.mesh.position.x, 
        this.target.model.mesh.position.y + 0.1, 
        this.target.model.mesh.position.z
      );
    }
  }

  doSkill(player, target) {
    this.interval = 1;
    super.doSkill(player, target);
    this.durationLeft = this.duration;
    window.scene.add( this.mesh );
    this.target = target;
  }
}
