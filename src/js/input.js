"use strict";
class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;

    this.one = false;
    this.two = false;
    this.three = false;
    this.four = false;
    this.five = false;

    this.mouseDown = false;
    this.click = false;
    this.mouseLocation = new THREE.Vector2(0, 0);
    this.clickedOnce = false;
  }

  update() {
    this.click = false;

    if (this.clickedOnce) {
      this.clickedOnce = false;
      this.click = true;
    }

    document.onmousemove = (e) => {
      this.mouseLocation.set(e.clientX, e.clientY);
    }

   document.onmousedown = (e) => {
      e = e || window.event;

      if (e.buttons === 1) {
        this.mouseDown = true;

      }
    }

    document.onmouseup = (e) => {
      e = e || window.event;

      this.click = true;
      this.mouseDown = false;
      this.clickedOnce = true;
    }

    document.onkeydown = (e) => {
      e = e || window.event;
	  keypressTest(e.keyCode);
      if (e.keyCode === 27) {
      }
      if (e.keyCode === 37) {
        this.left = true;
        var timerC = Date.now() * 0.0005;
        testLevel.mainCamera.position.x = Math.cos(timerC) * 10;
        testLevel.mainCamera.position.z = Math.sin(timerC) * 10;
        testLevel.mainCamera.lookAt(window.player.mesh.position);
      }
      if (e.keyCode === 39) {
        this.right = true;
        testLevel.mainCamera.position.x = Math.sin(timerC) * 10;
        testLevel.mainCamera.position.z = Math.cos(timerC) * 10;
        testLevel.mainCamera.lookAt(window.player.mesh.position);
      }
      if (e.keyCode === 38) {
        this.up = true;
      }
      if (e.keyCode === 40) {
        this.down = true;
      }
      if (e.keyCode === 32) {
        this.space = true;
      }

      if (e.keyCode === 49) {
        this.one = true;
      }
      if (e.keyCode === 50) {
        this.two = true;
      }
      if (e.keyCode === 51) {
        this.three = true;
      }
      if (e.keyCode === 51) {
        this.four = true;
      }
      if (e.keyCode === 53) {
        this.five = true;
      }
    }

    document.onkeyup = (e) => {
      e = e || window.event;

      if (e.keyCode === 37) {
        this.left = false;
      }
      if (e.keyCode === 39) {
        this.right = false;
      }
      if (e.keyCode === 38) {
        this.up = false;
      }
      if (e.keyCode === 40) {
        this.down = false;
      }
      if (e.keyCode === 32) {
        this.space = false;
      }

      if (e.keyCode === 49) {
        this.one = false;
      }
      if (e.keyCode === 50) {
        this.two = false;
      }
      if (e.keyCode === 51) {
        this.three = false;
      }
      if (e.keyCode === 51) {
        this.four = false;
      }
      if (e.keyCode === 53) {
        this.five = false;
      }
    }

  }
}
