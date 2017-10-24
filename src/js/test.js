d           var SCREEN_WIDTH = window.innerWidth;
            var SCREEN_HEIGHT = window.innerHeight;

            var container, stats;
            var camera, scene, renderer, cube;

            init();
            animate();

            function init() {

                container = document.createElement( 'div' );
                document.body.appendChild( container );

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera( 70, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000 );
                camera.position.set(0, -10, 10);
                //scene.add( camera ); // CHANGED

                renderer = new THREE.WebGLRenderer();
                renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
                container.appendChild( renderer.domElement );

                //

                var ambientLight, directionalLight;

                ambientLight = new THREE.AmbientLight( 0x101010 );
                scene.add( ambientLight );

                directionalLight = new THREE.DirectionalLight( 0xffffff );
                directionalLight.position.set( 0, -70, 100 ).normalize();
                scene.add( directionalLight );

                var groundGeometry, groundMaterial, ground, cubeGeometry, cubeMaterial;

                groundGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
                groundMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00FF00 });
                ground = new THREE.Mesh( groundGeometry, groundMaterial );
                scene.add( ground );

                cubeGeometry = new THREE.CubeGeometry( 1, 2, 1 );
                cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
                cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
                scene.add( cube );

                cube.add( camera ); // CHANGED

                //camera.lookAt( cube.position );

                //

                document.addEventListener( 'keydown', onKeyDown, false );

            }

            //

            function onKeyDown ( event ) {
                var rotateAngle = 0.05;

                switch( event.keyCode ) {

                    case 68: /*D*/

                        var rotation_matrix = new THREE.Matrix4().makeRotationZ(rotateAngle);
                        cube.matrix.multiplySelf(rotation_matrix);
                        cube.rotation.setEulerFromRotationMatrix(cube.matrix);


                        break;

                    case 65: /*A*/

                        var rotation_matrix = new THREE.Matrix4().makeRotationZ(-rotateAngle);
                        cube.matrix.multiplySelf(rotation_matrix);
                        cube.rotation.setEulerFromRotationMatrix(cube.matrix);

                        break;

                }

            };

            //

            function animate() {

                requestAnimationFrame( animate );

                render();

            }


            function render() {
                //var relativeCameraOffset = new THREE.Vector3(0,-10,10);
                //var cameraOffset = cube.matrixWorld.multiplyVector3( relativeCameraOffset );

                //camera.position.x = cameraOffset.x;
                //camera.position.y = cameraOffset.y;
                //camera.position.z = cameraOffset.z;
                camera.lookAt( cube.position );

                renderer.render( scene, camera );
            }
