class DmgSkill extends Skill {
  constructor(name, description, manaCost, castTime, cooldown, damage, range) {
    super(name, description, manaCost, castTime, cooldown);
    this.damage = damage;
    this.range = range;
  }
}
