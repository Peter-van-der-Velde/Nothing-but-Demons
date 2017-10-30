class DamageSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, damage, icon, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, icon, mesh);
    this.damage = damage;
  }

  update(delta) {
    super.update(delta);
  }

  doSkill(actor, target) {
    super.doSkill(actor, target);
    target.dealDamage(this.damage);
    actor.model.animationStop(ANIMATION_TYPE.ATTACK);
    actor.model.animationSwitch(ANIMATION_TYPE.ATTACK);
  }
}
