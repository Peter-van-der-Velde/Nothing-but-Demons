class SaveLoad{

  save() {
    localStorage.setItem('name', JSON.stringify(player.name));
    localStorage.setItem('hp', JSON.stringify(player.hp));
    localStorage.setItem('mp', JSON.stringify(player.mp));
    localStorage.setItem('strength', JSON.stringify(player.strength));
    localStorage.setItem('defense', JSON.stringify(player.defense));
    localStorage.setItem('speed', JSON.stringify(player.speed));
    localStorage.setItem('intelligence', JSON.stringify(player.intelligence));
    localStorage.setItem('level', JSON.stringify(player.level));
    localStorage.setItem('experiencePoints', JSON.stringify(player.experiencePoints));
    localStorage.setItem('items', JSON.stringify(player.items));
    localStorage.setItem('weapons', JSON.stringify(player.weapons));
    localStorage.setItem('playerClass', JSON.stringify(player.playerClass));
  }

  load() {
    player.name = JSON.parse(localStorage.getItem('name'));
    player.hp = JSON.parse(localStorage.getItem('hp'));
    player.mp = JSON.parse(localStorage.getItem('mp'));
    player.strength = JSON.parse(localStorage.getItem('strength'));
    player.defense = JSON.parse(localStorage.getItem('defense'));
    player.speed = JSON.parse(localStorage.getItem('speed'));
    player.intelligence = JSON.parse(localStorage.getItem('intelligence'));
    player.level = JSON.parse(localStorage.getItem('level'));
    player.experiencePoints = JSON.parse(localStorage.getItem('experiencePoints'));
    player.items = JSON.parse(localStorage.getItem('items'));
    player.weapons = JSON.parse(localStorage.getItem('weapons'));
    player.playerClass = JSON.parse(localStorage.getItem('playerClass'));
  }

  clickSave(){

  }

  clickLoad(){

  }

}
