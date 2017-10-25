class DamageSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, mesh);
    this.damage = damage;

    let loader = new THREE.TextureLoader();
    let map = loader.load('img/testskill.png');
    let alpha = loader.load('img/testskill_a.png');
    let material = new THREE.MeshLambertMaterial( {map: map, alphaMap: alpha } );
    let geometry = new THREE.PlaneGeometry( 3, 3, 1 )
    material.transparent = true;
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.rotation.x = -1.5708;
  }

  update(delta) {
    super.update(delta);
    this.mesh.rotation.z += delta * 3;
  }

  doSkill(player, target) {
    super.doSkill(player, target);
    target.dealDamage(this.damage);

    if (target.hp > 0) {
      this.mesh.position.set(target.mesh.position.x, target.mesh.position.y, target.mesh.position.z);
      window.scene.add( this.mesh );
    } else {
      window.scene.remove(this.mesh);
    }
  }
}
