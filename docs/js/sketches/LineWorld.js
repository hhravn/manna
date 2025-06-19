class LineWorld {

  constructor() {
    this.mousePos = null;

    // do i need a canvas for every sketch?
    this.canvas = null;
    this.cnvCtx = null;

    // sound file
    this.soundElm = document.getElementById("lineWorldMusic");
    this.soundVolume = 0.0;
    this.soundElm.volume = this.soundVolume;

    this.sceneIsActive = false;
  }


  ///////////////////////////////////////////////////
  init() {
    console.log("LineWorld init was run");
    this.canvas = document.getElementById("lineCanvas");
    this.cnvCtx = this.canvas.getContext("2d");
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

    // draw bg
    this.cnvCtx.fillStyle = "pink";
    this.cnvCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  }

}


export {
  LineWorld
}