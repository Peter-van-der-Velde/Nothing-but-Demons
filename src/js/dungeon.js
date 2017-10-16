class Dungeon extends Level {

  constructor(dungeon, render){
    super(dungeon, render );

    var textureLoader = new THREE.TextureLoader();
    let wallTexture = textureLoader.load("img/wallTexture.png");

    let outerWallGeometry = new THREE.CubeGeometry(1, 10,100);
    let wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture});

    let outerWall1 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall1.position.x = 49.5;
    outerWall1.position.y = 5;

    let outerWall2 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall2.position.x = -49.5;
    outerWall2.position.y= 5;

    let outerWall3 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall3.position.z = 49.5;
    outerWall3.position.y = 5;
    outerWall3.rotateY( Math.PI / 2 );

    let outerWall4 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall4.position.z = -49.5;
    outerWall4.position.y = 5;
    outerWall4.rotateY( Math.PI / 2 );

    let dungeonWalls = [
      new Wall(5, 5, 30)
    ]


    this.scene.add(outerWall1, outerWall2, outerWall3, outerWall4, dungeonWalls[0]);



  }




}