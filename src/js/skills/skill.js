class Skill {
  constructor(name, description, manaCost, castTime, cooldown, range, icon, mesh) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.castTime = castTime;
    this.cooldown = cooldown;
    this.range = range;
    this.icon = icon;
    this.mesh = mesh;
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
    } else if (this.cooldownLeft != 0) {
      // console.log("Skill is on cooldown!");
      return;
    } else if (player.mp < this.manaCost) {
      // console.log("Not enough mana!");
      return;
    } else if (player.model.mesh.position.distanceTo(target.model.mesh.position) > this.range) {
      // console.log("Target is out of range!");
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
