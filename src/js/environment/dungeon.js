class Dungeon extends Level {

  constructor(dungeon, render){
    super(dungeon, render );

    let textureLoader = new THREE.TextureLoader();
    let wallTexture = textureLoader.load("img/wallTexture.png");

    let outerWallGeometry = new THREE.CubeGeometry(1, 10,200);
    let wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture});

    let outerWall1 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall1.position.x = 99.5;
    outerWall1.position.y = 5;

    let outerWall2 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall2.position.x = -99.5;
    outerWall2.position.y= 5;

    let outerWall3 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall3.position.z = 99.5;
    outerWall3.position.y = 5;
    outerWall3.rotateY( Math.PI / 2 );

    let outerWall4 = new THREE.Mesh(outerWallGeometry, wallMaterial);
    outerWall4.position.z = -99.5;
    outerWall4.position.y = 5;
    outerWall4.rotateY( Math.PI / 2 );

    let dungeonWalls = [
      new Wall(50, 5, -40, 20),
      new Wall(50 ,5, -20, 20),
      new Wall(70, 5, -20, 20),
      new Wall(70, 5, -40, 20),
      new Wall(50, 5, -60, 20),
      new Wall(70, 5, -70, 20),
      new Wall(50, 5, -70, 20),
      new Wall(70, 5, -60 , 20),
      new Wall(-10, 5, -60, 20),
      new Wall(-10, 5, -70, 20),
      new Wall(-10, 5, -40, 20),
      new Wall(-10, 5, -20, 20),
      new Wall(10, 5, -20, 20),
      new Wall(10, 5, -40, 20),
      new Wall(10, 5, -50, 20),
      new Wall(-30, 5, -20, 20),
      new Wall(-30, 5, -40, 20),
      new Wall(-30, 5, -60, 20),
      new Wall(-30, 5, -70, 20),
      new Wall(-80, 5, -40, 20),
      new Wall(-80, 5, -50, 20),
      //spiegelen
      new Wall(-50, 5, 40, 20),
      new Wall(-50 ,5, 20, 20),
      new Wall(-70, 5, 20, 20),
      new Wall(-70, 5, 40, 20),
      new Wall(-50, 5, 60, 20),
      new Wall(-70, 5, 70, 20),
      new Wall(-50, 5, 70, 20),
      new Wall(-70, 5, 60 , 20),
      new Wall(10, 5, 60, 20),
      new Wall(10, 5, 70, 20),
      new Wall(10, 5, 40, 20),
      new Wall(10, 5, 20, 20),
      new Wall(-10, 5, 20, 20),
      new Wall(-10, 5, 40, 20),
      new Wall(-10, 5, 50, 20),
      new Wall(30, 5, 20, 20),
      new Wall(30, 5, 40, 20),
      new Wall(30, 5, 60, 20),
      new Wall(30, 5, 70, 20),
      new Wall(80, 5, 40, 20),
      new Wall(80, 5, 50, 20)

    ];

    let rotatedDungeonWalls = [
      new Wall(20, 5, -10, 20),
      new Wall(20, 5, 10, 20),
      new Wall(40, 5, -10, 20),
      new Wall(40, 5, 10, 20),
      new Wall(80, 5, -10, 20),
      new Wall(90, 5, -10, 20),
      new Wall(75, 5, -80, 10),
      new Wall(40, 5, -80, 20),
      new Wall(20, 5, -80, 20),
      new Wall(0, 5, -80, 20),
      new Wall(20, 5, -60, 20),
      new Wall(-20, 5, -10, 20),
      new Wall(-40, 5, -10, 20),
      new Wall(-60, 5, -10, 20),
      new Wall(-70, 5, -10, 20),
      new Wall(-40, 5, -80, 20),
      new Wall(-60, 5, -80, 20),
      new Wall(-70, 5, -80, 20),
      new Wall(-70, 5, -30, 20),
      new Wall(-60, 5, -30, 20),
      new Wall(-70, 5, -60, 20),
      new Wall(-60, 5, -60, 20),
      //spiegelen
      new Wall(-20, 5, 10, 20),
      new Wall(-20, 5, -10, 20),
      new Wall(-40, 5, 10, 20),
      new Wall(-40, 5, -10, 20),
      new Wall(-80, 5, 10, 20),
      new Wall(-90, 5, 10, 20),
      new Wall(-75, 5, 80, 10),
      new Wall(-40, 5, 80, 20),
      new Wall(-20, 5, 80, 20),
      new Wall(0, 5, 80, 20),
      new Wall(-20, 5, 60, 20),
      new Wall(20, 5, 10, 20),
      new Wall(40, 5, 10, 20),
      new Wall(60, 5, 10, 20),
      new Wall(70, 5, 10, 20),
      new Wall(40, 5, 80, 20),
      new Wall(60, 5, 80, 20),
      new Wall(70, 5, 80, 20),
      new Wall(70, 5, 30, 20),
      new Wall(60, 5, 30, 20),
      new Wall(70, 5, 60, 20),
      new Wall(60, 5, 60, 20)

    ];




    let dungeonPillars =[
      new Pillar(10, 5, -10),
      new Pillar(-10, 5, 10),
      new Pillar(10, 5, 10),
      new Pillar(-10,5, -10),
      new Pillar(50, 5, -10),
      new Pillar(50, 5, 10),
      new Pillar(30, 5, 10),
      new Pillar(30, 5, -10),
      new Pillar(70, 5, -10),
      new Pillar(50, 5, -30),
      new Pillar(70, 5, -30),
      new Pillar(50, 5, -50),
      new Pillar(70, 5, -50),
      new Pillar(50, 5, -80),
      new Pillar(70, 5, -80),
      new Pillar(80, 5, -80),
      new Pillar(30, 5, -80),
      new Pillar(10, 5, -80),
      new Pillar(-10, 5, -80),
      new Pillar(-10, 5, -30),
      new Pillar(-10, 5, -50),
      new Pillar(-10, 5, -80),
      new Pillar(10, 5, -60),
      new Pillar(10, 5, -35),
      new Pillar(30, 5, -60),
      new Pillar(-30, 5, -10),
      new Pillar(-30, 5, -30),
      new Pillar(-30, 5, -50),
      new Pillar(-30, 5, -80),
      new Pillar(-50, 5, -10),
      new Pillar(-65, 5, -10),
      new Pillar(-80, 5, -10),
      new Pillar(-80, 5, -80),
      new Pillar(-80, 5, -60),
      new Pillar(-80, 5, -30),
      new Pillar(-65, 5, -80),
      new Pillar(-50, 5, -80),
      new Pillar(-50, 5, -30),
      new Pillar(-50, 5, -60),
      //spiegelen
      new Pillar(-10, 5, 10),
      new Pillar(10, 5, -10),
      new Pillar(-10, 5, -10),
      new Pillar(10,5, 10),
      new Pillar(-50, 5, 10),
      new Pillar(-50, 5, -10),
      new Pillar(-30, 5, -10),
      new Pillar(-30, 5, 10),
      new Pillar(-70, 5, 10),
      new Pillar(-50, 5, 30),
      new Pillar(-70, 5, 30),
      new Pillar(-50, 5, 50),
      new Pillar(-70, 5, 50),
      new Pillar(-50, 5, 80),
      new Pillar(-70, 5, 80),
      new Pillar(-80, 5, 80),
      new Pillar(-30, 5, 80),
      new Pillar(-10, 5, 80),
      new Pillar(10, 5, 80),
      new Pillar(10, 5, 30),
      new Pillar(10, 5, 50),
      new Pillar(10, 5, 80),
      new Pillar(-10, 5, 60),
      new Pillar(-10, 5, 35),
      new Pillar(-30, 5, 60),
      new Pillar(30, 5, 10),
      new Pillar(30, 5, 30),
      new Pillar(30, 5, 50),
      new Pillar(30, 5, 80),
      new Pillar(50, 5, 10),
      new Pillar(65, 5, 10),
      new Pillar(80, 5, 10),
      new Pillar(80, 5, 80),
      new Pillar(80, 5, 60),
      new Pillar(80, 5, 30),
      new Pillar(65, 5, 80),
      new Pillar(50, 5, 80),
      new Pillar(50, 5, 30),
      new Pillar(50, 5, 60)

    ];


    this.scene.add(outerWall1, outerWall2, outerWall3, outerWall4);

    for (let j = 0; j < dungeonPillars.length; j++){

      this.scene.add(dungeonPillars[j]);
    }

    for(let i = 0; i < dungeonWalls.length; i++){

      this.scene.add(dungeonWalls[i]);
    }

    for(let k = 0; k < rotatedDungeonWalls.length; k++){
      rotatedDungeonWalls[k].rotateY(Math.PI/ 2);
      this.scene.add(rotatedDungeonWalls[k]);
    }
  }
}