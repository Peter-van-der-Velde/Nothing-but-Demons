class DamageSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, mesh);
    this.damage = damage;
  }

  update(delta) {
    super.update(delta);
  }

  doSkill(player, target) {
    super.doSkill(player, target);
  }
}
