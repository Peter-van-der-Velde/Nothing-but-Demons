// list of all items in the 3d gameworld
var itemsInGame  = [];
var enemies = [];

scene = new THREE.Scene();

var MATERIALS = {
  PHONG: 0,
  LAMBERT: 1,
  UNLIT: 2
};

var EQUIPMENT_TYPE = {
  HEAD: 0,
  TORSO: 1,
  LEGS: 2,
  HANDS: 3,
  FEET: 4,
  BACK: 5,
  SHOULDERS: 6,
  WEAPON: 7,
  OFFHAND: 8
};

var EQUIPMENT_SLOTS = 9;
var SKILL_SLOTS = 5;
