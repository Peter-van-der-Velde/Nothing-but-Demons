var ironShield = new Weapon(name = "iron shield", value = "1", power = "0", defense = "3", attackRange = 0, attackSpeed = 0);
var ironSword = new Weapon("iron sword", 1, 4, 0.5, 2, 1);
console.log(ironSword);
console.log(ironShield);

var player =  new Player (name = "Sparhawk", hp = 35, mp = 20, strength = 7, speed = 4, intelligence = 35, level = 5, experiencePoints = 12, items = [ironSword], weapons = [ironSword, ironShield, ironShield, ironShield]);
var enemy =  new Enemy (name = "Fred ze Goblin", hp = 25, mp = 20, strength = 7, speed = 3, intelligence = 35, level = 5, experiencePoints = 12, items = [ironSword] , weapons = new Array(ironSword, undefined, ironShield, undefined));
console.log(player);
console.log(enemy);


document.getElementById("attack").onclick = function () {
  console.log('hey');
  player.attack(enemy);
  enemy.attack(player);
  updateUI();
}

function nextRound() {

}

function updateUI() {
  let playerStats = document.getElementById('pstats');

  playerStats.innerHTML = player;
  console.log(player);

  let enemyStats = document.getElementById('estats');

  enemyStats,innerHTML = enemy;
  console.log(enemy);
}

