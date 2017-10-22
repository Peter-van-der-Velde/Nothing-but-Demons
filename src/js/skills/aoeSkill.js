class AoeSkill extends DmgSkill {
  constructor(name, description, manaCost, castTime, cooldown,
    damage, range, aoeRange) {
    super(name, description, manaCost, castTime, cooldown,
      damage, range);
    this.aoeRange = aoeRange;
  }

  doSkill(player, target) {
    let targets = [];
    let targetPos = target.mesh.position;

    if (player.bodyMesh.position.distanceTo(targetPos) < this.range) {
      console.log("target out of range!");
      console.log(player.mesh.position.distanceTo(targetPos));
      console.log(Math.round(this.range));
    }
    else {
      console.log("test");
      target.mesh.material = new THREE.MeshBasicMaterial({color: 0xFF00FF})

      for (let e of enemies) {
        if (e.mesh.position.distanceTo(targetPos) <= this.aoeRange) {
          targets.push(e);
        }
      }

      for (let e of targets) {
        e.dealDamage(this.damage);
      }
    }


  }
}
