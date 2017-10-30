"use strict"

class Chest {
    constructor(startPos = new THREE.Vector2(0, 0), startRot = -0.785398) {
        this.model = new Model("chest_01", true, false, 1, startPos, startRot);
    }

    update(dt){
        if (this.model.mesh) {
            if (this.model.mesh.position.distanceTo(window.player.model.mesh.position) < 1.8) {
                this.model.animationSwitch(ANIMATION_TYPE.OPEN);
            }
            this.model.update(dt);
        }
    }
}