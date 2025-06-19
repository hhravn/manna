import { resize, handleMouseMove, setupBtns, handleMuting } from './functions.js';
import { BgCanvas } from './sketches/BgCanvas.js';
import { BreathBall } from './sketches/BreathBall.js';
// import { SoundEngine } from './SoundEngine_BACKUP.js';
import { Terminal } from './sketches/Terminal.js';
import { CloudWorld } from './sketches/CloudWorld.js';
import { LineWorld } from './sketches/LineWorld.js';


document.addEventListener("DOMContentLoaded", (e) => {

  const BBall = new BreathBall(); BBall.init();
  const Term = new Terminal(); Term.init();
  const bgCanvas = new BgCanvas(); bgCanvas.init();
  const Cloud = new CloudWorld(); Cloud.init();
  // const Lines = new LineWorld(); Lines.init();

  // setup overlay BUTTONS
  setupBtns();

  // setup enterBtn
  let playOK = false;
  const enterBtn = document.getElementById("enterBtn");
  enterBtn.addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("enterBtnWrapper").style.display = "none";
    playOK = true;
  });
  // setup mute button
  let isMuted = false;
  const muteBtn = document.getElementById("muteBtn");
  muteBtn.addEventListener("click", function(e) {
    e.preventDefault();
    handleMuting(isMuted);
    isMuted = !isMuted;
  })

  // turn off all scenes
  const makeAllScenesInactive = () => {
    BBall.makeSceneInactive();
    Term.makeSceneInactive();
    Cloud.makeSceneInactive();
    // Lines.makeSceneInactive();
  }


  // setup world buttons ******************************************
  // breathball
  const bballBtn = document.getElementById("bballWorldBtn");
  bballBtn.addEventListener("click", e => {
    e.preventDefault();
    // CHECK IF THUS IS ALREADY ACTIVE!
    if (BBall.sceneIsActive) return;
    makeAllScenesInactive();
    BBall.makeSceneActive();
  })
  // terminal btn
  const terminalBtn = document.getElementById("terminalWorldBtn");
  terminalBtn.addEventListener("click", e => {
    e.preventDefault();
    if (Term.sceneIsActive) return;
    makeAllScenesInactive();
    Term.makeSceneActive();
  })
  // cloudBtn
  const cloudWorldBtn = document.getElementById("cloudWorldBtn");
  cloudWorldBtn.addEventListener("click", e => {
    e.preventDefault();
    if (Cloud.sceneIsActive) return;
    makeAllScenesInactive();
    Cloud.makeSceneActive();
  })
  /*
  // line world
  const lineWorldBtn = document.getElementById("lineWorldBtn");
  lineWorldBtn.addEventListener("click", e => {
    e.preventDefault();
    if (Lines.sceneIsActive) return;
    makeAllScenesInactive();
    Lines.makeSceneActive();
  })
  */


  // draw loop
  const draw = () => {
    requestAnimationFrame(draw);
    bgCanvas.draw(playOK);
    BBall.draw(playOK);
    Term.draw(playOK);
    Cloud.draw(playOK);
    // Lines.draw(playOK);
  }

  // get the mouse movement
  document.onmousemove = function(e) {
    // const pos = handleMouseMove(e); console.log("pos:", pos);
    BBall.updateMousePos(handleMouseMove(e));
  }

  window.onresize = function() { 
    requestAnimationFrame(resize)
    BBall.updateResize();
  }
  resize();

  // Start the draw loop
  draw();
});
