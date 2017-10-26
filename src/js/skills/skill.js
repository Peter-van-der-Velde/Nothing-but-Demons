class Skill {
  constructor(name, description, manaCost, castTime, cooldown, range) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.castTime = castTime;
    this.cooldown = cooldown;
    this.range = range;
    this.target;


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
    if (!target) {
      // console.log("No target!");
      return;
    }
    if (player.mesh.position.distanceTo(target.mesh.position) > this.range) {
      // console.log("Target is out of range!");
      return;
    } else if (player.mp < this.manaCost) {
      // console.log("Not enough mana!");
      return;
    } else if (this.cooldownLeft != 0) {
      // console.log("Skill is on cooldown!");
      return;
    }
    var mana = document.getElementById("playerManaBar");
    mana.value = player.mp;
    player.mp -= this.manaCost;
    this.doSkill(player, target);
  }

  // Perform skill action.
  doSkill(player, target) {
    this.cooldownLeft = this.cooldown;
  }
}
