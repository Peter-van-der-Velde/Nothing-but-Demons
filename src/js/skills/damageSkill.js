class DamageSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage) {
    super(name, description, manaCost, castTime, cooldown, range);
    this.damage = damage;
  }

  doSkill(player, target) {
    super.doSkill(player, target);
    target.dealDamage(this.damage);

    if (target.hp > 0) {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      var cube = new THREE.Mesh( geometry, material );
      window.scene.add( cube );
      cube.position.set(target.mesh.position.x, target.mesh.position.y + 1, target.mesh.position.z);
    }
  }
}
