class CloudWorld {

  constructor() {
    this.mousePos = null;
    this.clouds = [];

    // do i need a canvas for every sketch?
    this.canvas = null;
    this.cnvCtx = null;

    // sound file
    this.soundElm = document.getElementById("cloudWorldMusic");
    this.soundVolume = 1.0; // 0.0 for inactive!
    this.soundElm.volume = this.soundVolume;

    this.sceneIsActive = true; // false; // THIS is the first scene!
  }


  ///////////////////////////////////////////////////
  init() {
    console.log("CloudWorld init was run");
    this.canvas = document.getElementById("cloudCanvas");
    this.cnvCtx = this.canvas.getContext("2d");
    this.mousePos = { x: this.canvas.width / 2, y: this.canvas.height / 2 }

    // setup clouds
    this.clouds = [
      {
        // src: "/assets/images/cloud-bg.png",
        src: "/images/cloud-bg.png",
        elm: null,
        xpos: -1200,
        ypos: 0,
        width: null,
        height: null,
        scale: 1,
        speed: 8, // 10,
        alpha: 0.5 // 1.0
      },
      {
        // src: "/assets/images/cloud-bg.png",
        src: "/images/cloud-bg.png",
        elm: null,
        xpos: 220,
        ypos: 300,
        width: null,
        height: null,
        scale: 0.7,
        speed: 5, // 6,
        alpha: 0.35 // 0.5
      },
      {
        // src: "/assets/images/cloud-bg.png",
        src: "/images/cloud-bg.png",
        elm: null,
        xpos: -500,
        ypos: -10,
        width: null,
        height: null,
        scale: 1.75, // 1.5,
        speed: 3,
        alpha: 0.0125
      },
      {
        src: "/images/cloud-bg.png",
        elm: null,
        xpos: -2500,
        ypos: -15,
        width: null,
        height: null,
        scale: 1.8, // 1.5,
        speed: 2, // 2.75,
        alpha: 0.01125
      }
    ]

    // setup images dynamically!
    let _this = this;
    for (let cloud of this.clouds) {
      cloud.elm = new Image();
      cloud.elm.addEventListener('load', function() {
        cloud.width = cloud.elm.naturalWidth;
        cloud.height = cloud.elm.naturalHeight;
        // _this.cnvCtx.drawImage(cloud.elm, 0, 0, cloud.width, cloud.height);
      }, false);
      cloud.elm.src = cloud.src;
    }
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
    this.cnvCtx.globalAlpha = 1.0;
    this.cnvCtx.fillStyle = "lightblue";
    this.cnvCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the clouds
    for (let c of this.clouds) {
      this.cnvCtx.drawImage(c.elm, c.xpos, c.ypos, (c.width * c.scale), (c.height * c.scale));
      this.cnvCtx.globalAlpha = c.alpha;
      c.xpos += c.speed * 0.1;
      c.ypos += c.speed * 0.0125;

      // check for out of bounds
      // if (c.xpos > 1100) {
      if (c.xpos > (c.width * c.scale)) {
        c.xpos = -1 * (c.width * c.scale);
        // console.log("c.xpos:", c.xpos);
        // c.ypos = Math.round((Math.random() * this.canvas.height) - (this.canvas.height / 3));
        c.ypos = Math.round((Math.random() * 250) - 50);
        // console.log("c.ypos:", c.ypos);
      }
    }

  }

}


export {
  CloudWorld
}