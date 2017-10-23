//Auto resizer when window size changes
window.addEventListener('resize', onWindowResize, false);

/**
 * Auto resizer when window size changes
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
