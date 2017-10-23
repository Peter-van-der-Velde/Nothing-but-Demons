// list of all items in the 3d gameworld
var itemsInGame  = [];
var enemies = [];

scene = new THREE.Scene();

var MATERIALS = {
  PHONG: 0,
  LAMBERT: 1,
  UNLIT: 2
};

window.EQUIPMENT_TYPE = {
  HELMET: 0,
  BODY: 1,
  LEGS: 2,
  HANDS: 3,
  FEET: 4,
  BACK: 5,
  SHOULDERS: 6,
  L_HAND: 7,
  R_HAND: 8
};
