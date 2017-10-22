class Skill {
  constructor(name, description, manaCost, castTime, cooldown, range) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.castTime = castTime;
    this.cooldown = cooldown;
    this.range = range;

    this.cooldownLeft = 0;
  }

  // Handle cooldown.
  update(delta) {
    if (this.cooldownLeft > 0) {
      this.cooldownLeft -= delta;
    }
    else if (this.cooldownLeft < 0){
      this.cooldownLeft = 0;
    }
  }

  // Activate skill after passing checks.
  activate(player, target) {
    // Range check.
    if (player.mesh.position.distanceTo(target.mesh.position) < this.range) {

      // Mana check.
      if (player.mp >= this.manaCost) {
        // console.log("mana check passed!");
  
        // Cooldown check.
        if (this.cooldownLeft === 0) {
          player.mp -= this.manaCost;
          this.doSkill(player, target);
        }
        else {
          console.log("Skill is on cooldown!");
        }
  
      }
      else {
        console.log("Not enough mana!");
      }

    }
    else {
      console.log("Target is out of range!");
    }
  }

  // Perform skill action.
  doSkill(player, target) {
    this.cooldownLeft = this.cooldown;
    target.dealDamage(5);
  }
}
