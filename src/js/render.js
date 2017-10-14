/**
 * A basic level class
 * @param {bool} doAA Should the renderer use anti-aliasing?
 * @param {number} renderWidth Horizontal render resolution.
 * @param {number} renderHeight Vertical render resolution.
 */
class Render extends THREE.WebGLRenderer {
  constructor(doAA = false, renderWidth, renderHeight) {
    super( {antialias: doAA} );
    this.setClearColor(0x000000, 1);
    this.setSize(renderWidth, renderHeight);
    document.body.appendChild(this.domElement);
    this.aspect = window.innerWidth / window.innerHeight;
	
	//update();
  }
}
