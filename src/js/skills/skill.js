class Skill {
  constructor(name, description, manaCost, castTime, cooldown) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.castTime = castTime;
    this.cooldown = cooldown;
    this.target;

    this.cooldownLeft = 0;
  }

  activate(player, target) {
    if (this.cooldownLeft === 0) {
      this.doSkill(player, target);
      return;
    }
    console.log("Skill is on cooldown!");
  }

  doSkill() {

  }
}
