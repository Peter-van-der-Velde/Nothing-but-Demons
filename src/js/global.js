
// list of all items in the 3d gameworld
var itemsInGame = [];

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

var OBJECT_TYPE = {
  LIVING: 0,
  ENEMY: 1,
  PLAYER: 2,
  ITEM: 3,
  WEAPON: 4,
  HEALING_ITEM: 5
};

/**
 * Calculates the distance between 2 x and z (x,z) points. <br>
 * Based on the Pythagoras formula c^2 = a^2 + b^2
 * @param {THREE.Vector3} vector0 
 * @param {THREE.Vector3} vector1 
 */
function calcDistanceXZ(vector0, vector1) {
  let a = vector0.x - vector1.x;
  let b = vector0.z - vector1.z;

  let a2 = Math.pow(a, 2);
  let b2 = Math.pow(b, 2);
  
  let c2 = a2 + b2;
  let c = Math.sqrt(c2);
  
  return c;
}
