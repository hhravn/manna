import { handleMouseMove } from '../functions.js';

class BreathBall {

  constructor() {
    this.iter = 0; // used for sin
    this.mousePos = null;

    this.circles = [];


    // do i need a canvas for every sketch?
    this.bbElm = document.getElementById("bballElm");
    const size = this.bbElm.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
      const obj = {
        elm: document.createElement("div"),
        size: size.width / (i + 1)
      }
      obj.elm.classList.add("breathBall", "color_" + i);
      this.circles.push(obj);

      this.bbElm.appendChild(obj.elm);
    }

    // sound file
    this.soundElm = document.getElementById("bballWorldMusic");
    this.soundVolume = 0.0;
    this.soundElm.volume = this.soundVolume;

    this.sceneIsActive = false;
  }


  ///////////////////////////////////////////////////
  init() {
    console.log("BreathBall init was run");
    const size = this.bbElm.getBoundingClientRect();
    this.mousePos = { x: size.width / 2, y: size.height / 2 };
  }


  ///////////////////////////////////////////////////
  // this function makes the scene draw to screen
  makeSceneActive() {
    this.sceneIsActive = true;
    this.bbElm.classList.remove("hidden");
  }

  ///////////////////////////////////////////////////
  // this function stops the scene from drawing to screen
  makeSceneInactive() {
    this.sceneIsActive = false;
    this.bbElm.classList.add("hidden");
    // this.soundElm.stop();
    this.soundElm.pause();
    // this.soundElm.currentTime = 0;
    this.soundVolume = 0.0;
  }


  ///////////////////////////////////////////////////
  // put mousepos from index.js in here
  updateMousePos(pos) {
    this.mousePos = pos;
  }


  ///////////////////////////////////////////////////
  // run through all circles and reset their size relative to the screen
  updateResize() {
    console.log("BBall updateResize was run");
    const size = this.bbElm.getBoundingClientRect();
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].size = size.width / (i + 1);
    }
  }


  ///////////////////////////////////////////////////
  // turn volume up and down
  handleVolume() {
    // check volume on sound
    if (this.sceneIsActive && this.soundVolume < 1.0) this.soundVolume += 0.01;
    if (this.sceneIsActive && this.soundVolume > 1.0) this.soundVolume = 1.0; // MAX!
    if (this.sceneIsActive == false && this.soundVolume > 0.0) this.soundVolume -= 0.01;
    if (this.sceneIsActive == false && this.soundVolume < 0.0) this.soundVolume = 0.0; // MIN!
    this.soundElm.volume = this.soundVolume;
  }
  
  
  ///////////////////////////////////////////////////
  // play the scene sound
  playSound() {
    this.soundElm.play();
  }


  ///////////////////////////////////////////////////
  // draw the canvas to screen
  draw(playOK) {
    
    this.handleVolume();
    if (this.sceneIsActive == false) return; // DON'T draw if scene is not active!
    
    if (playOK) this.playSound();

    // let's resize circles
    this.iter += 0.0165; // 2; // 0.025;

    // draw ball
    const cnvSize = this.bbElm.getBoundingClientRect();
    // console.log("cnvSize:", cnvSize);
    const xDiff = (this.mousePos.x - (cnvSize.width / 2)) * 0.05;
    const yDiff = (this.mousePos.y - (cnvSize.height / 2)) * 0.05;
    const centerX = (cnvSize.width / 2) + xDiff;
    const centerY = (cnvSize.height / 2) + yDiff;

    // for (let c of this.circles) {
    for (let i = 0; i < this.circles.length; i++) {
      const c = this.circles[i];
      c.elm.style.width = c.size + (Math.sin(this.iter + (i * 0.375)) * 50) + "px";
      c.elm.style.height = c.size + (Math.sin(this.iter + (i * 0.375)) * 50) + "px";
      c.elm.style.left = centerX + "px";
      c.elm.style.top = centerY + "px";
    }
  }

}


export {
  BreathBall
}