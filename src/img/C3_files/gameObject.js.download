/**
* an basic item class
* @param {THREE.Vector3} position The initial position of the object, default is (0, 0, 0).
* @param {MATERIALS} materialType The material type to use, default is 0 (Unlit material).
* @param {color} color The base color of the model, default is white.
* @param {string} colorMap Location to load this textue from, default is null.
* @param {string} specularMap Location to load this textue from, default is null.
* @param {string} aoMap Location to load this textue from, default is null.
* @param {string} alphaMap Location to load this textue from, default is null.
* @param {number} reflectivity Reflectifity of the material, range 0 to 1. default is 1.
* @param {string} model Location to load the model from, must be a JSON file.
* @param {THREE.Scene} scene The scene to place this object in.
*/
class GameObject {
  constructor(
    scene, position = new THREE.Vector3(0, 0, 0), materialType = MATERIALS.UNLIT,
    color = 0xFFFFFF, colorMap = null, specularMap = null, normalMap = null,
    aoMap = null, alphaMap = null, reflectivity = 1, model) {

      let jsonLoader = new THREE.JSONLoader();
      let texLoader = new THREE.TextureLoader();
      let material = null;

      colorMap = (colorMap != null) ? texLoader.load(colorMap) : null;
      specularMap = (specularMap != null) ? texLoader.load(specularMap) : null;
      normalMap = (normalMap != null) ? texLoader.load(normalMap) : null;
      aoMap = (aoMap != null) ? texLoader.load(aoMap) : null;
      alphaMap = (alphaMap != null) ? texLoader.load(alphaMap) : null;

      // Material Selection
      if (materialType === MATERIALS.PHONG) {
        material = new THREE.MeshPhongMaterial({
          color: color,
          map: colorMap,
          specularMap: specularMap,
          normalMap: normalMap,
          aoMap: aoMap,
          alphaMap: alphaMap,
          reflectivity: reflectivity
        });
      }
      else if (materialType === MATERIALS.LAMBERT) {
        material = new THREE.MeshLambertMaterial({
          color: color,
          map: colorMap,
          normalMap: normalMap,
          aoMap: aoMap,
          alphaMap: alphaMap
        });
      }
      else if (materialType === MATERIALS.UNLIT) {
        material = new THREE.MeshBasicMaterial({
          color: color,
          map: colorMap,
          alphaMap: alphaMap
        });

        // instantiate a loader
        var loader = new THREE.JSONLoader();
        var geom = new THREE.BoxGeometry( 1, 1, 1 );

        // load a resource
        loader.load(

          // resource URL
          'models/test.json',

          // Function when resource is loaded
          function ( geometry, materials ) {

            geom = geometry;

          }
        );

        // var ageometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var amaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        // var acube = new THREE.Mesh( ageometry, amaterial );
        // scene.scene.add( acube );

        this.mesh = new THREE.Mesh(geom, material);
        scene.scene.add(this.mesh);

        console.log(scene.scene);
      }
    }
  }
