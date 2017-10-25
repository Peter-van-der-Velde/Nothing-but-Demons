class DamageSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage, icon, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, icon, mesh);
    this.damage = damage;
  }

  update(delta) {
    super.update(delta);
  }

  doSkill(player, target) {
    super.doSkill(player, target);
    target.dealDamage(this.damage);
  }
}
