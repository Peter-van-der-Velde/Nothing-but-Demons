var ironShield = new Weapon(name = "iron shield", value = "1", power = "0", defense = "3", attackRange = 0, attackSpeed = 0);
var ironSword = new Weapon("iron sword", 1, 4, 0.5, 2, 1);

console.log(ironSword);
console.log(ironShield);

var player =  new Player (name = "Sparhawk", hp = 35, mp = 20, strength = 7, defense = 4, speed = 4, intelligence = 35, level = 5, experiencePoints = 12, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield]);
var enemy =  new Enemy ("Fred der Goblin", hp = 25, mp = 10, strength = 9, defense = 5, speed = 3, intelligence = 250, level = 3, experiencePoints = 9, items = undefined, weapons = [ironSword, ironShield, ironShield, ironShield]);
console.log(player);
console.log(enemy);

var button = document.getElementById("attack");

button.onclick = function () {
  console.log('clicked');
  player.attack(enemy);
  enemy.attack(player);
  updateUI();
}

function nextRound() {

}

function updateUI() {
  let playerStats = document.getElementById('pstats');

  playerStats.innerHTML = player.toString();
  console.log(player);

  let enemyStats = document.getElementById('estats');

  enemyStats,innerHTML = enemy.toString();
  console.log(enemy);
}

