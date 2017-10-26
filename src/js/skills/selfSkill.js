class SelfSkill extends Skill {
  constructor(target, name, description, manaCost, castTime, cooldown, range, icon, mesh) {
    super(name, description, manaCost, castTime, cooldown, range, icon, mesh);
    this.target = target;
  }

  activate() {
    else if (this.cooldownLeft != 0) {
      // console.log("Skill is on cooldown!");
      return;
    } else if (player.mp < this.manaCost) {
      // console.log("Not enough mana!");
      return;
    }

    player.mp -= this.manaCost;
    this.doSkill();
  }

  doSkill() {
    this.cooldownLeft = this.cooldown;
    this.target.hp += 10;
  }
}
