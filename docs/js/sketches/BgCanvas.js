// import { handleMouseMove } from '../functions.js';

class BgCanvas {

  constructor() {
    this.bg = null;
    this.mousePos = { x: 0, y: 0 };

    // do i need a canvas for every sketch?
    this.canvas = null;
    this.cnvCtx = null;

    this.sceneIsActive = true;
  }


  ///////////////////////////////////////////////////
  init() {
    console.log("BgCanvas init was run");
    this.canvas = document.getElementById("bgCanvas");
    this.cnvCtx = this.canvas.getContext("2d");
    this.radius = this.canvas.width / 3;
    this.mousePos = { x: this.canvas.width / 2, y: this.canvas.height / 2 }
  }

  ///////////////////////////////////////////////////
  // this function makes the scene draw to screen
  makeSceneActive() {
    this.sceneIsActive = true;
    this.canvas.classList.remove("hidden");
  }

  ///////////////////////////////////////////////////
  // this function stops the scene from drawing to screen
  makeSceneInactive() {
    this.sceneIsActive = false;
    this.canvas.classList.add("hidden");
  }  


  ///////////////////////////////////////////////////
  // put mousepos from index.js in here
  updateMousePos(pos) {
    this.mousePos = pos;
  }


  ///////////////////////////////////////////////////
  // draw the canvas to screen
  draw(playOK) {

    // draw bg
    this.cnvCtx.fillStyle = "tomato";
    this.cnvCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

}


export {
  BgCanvas
}