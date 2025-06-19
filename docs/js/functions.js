/*
 * These are helper functions for my app
 * - general functions that are not bound to App class or prototype
 */


///////////////////////////////////////////////////
// resize the canvas
const resize = () => {

  console.log("resize was run");
  const totalWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  
  const totalHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  

    // const cnvs = document.querySelectorAll(".animationCanvas");

  // RESIZE COVER CANVAS!
  let cnvs = document.querySelectorAll("canvas.cover");
  if (typeof cnvs == 'undefined' || cnvs == null) return;
  // console.log("cnvs:", cnvs);

  // loop through canvases
  for (let cnv of cnvs) {
    // start by measuring aspect ratios
    const cnvRatio = cnv.width / cnv.height;
    // console.log("cnvRatio:", cnvRatio);
    const scrRatio = totalWidth / totalHeight;
    // console.log("scrRatio:", scrRatio);

    if (cnvRatio > scrRatio) {
      // then screen is wider than canvas -> fit canvas to screen height!
      // console.log("fit to scr height!")
      cnv.style.height = totalHeight + "px";
      const w = totalHeight * cnvRatio; // getting width from ratio!
      cnv.style.width = (w + 1) + "px";
      cnv.style.left = ((totalWidth - w) / 2) + "px";
      cnv.style.top = "0px";
    }
    else {
      // screen is NOT wider than canvas -> fit canvas to screen width
      // console.log("fit to scr width!")
      cnv.style.width = (totalWidth + 1) + "px";
      const h = totalWidth / cnvRatio;
      cnv.style.height = h + "px"; // "auto";
      cnv.style.left = "0px";
      cnv.style.top = ((totalHeight - h) / 2) + "px";
    }
  }

  // RESIZE CONTAIN CANVAS!
  cnvs = document.querySelectorAll("canvas.contain");
  if (typeof cnvs == 'undefined' || cnvs == null) return;
  // console.log("cnvs:", cnvs);

  // loop through canvases
  for (let cnv of cnvs) {
    // start by measuring aspect ratios
    const cnvRatio = cnv.width / cnv.height;
    // console.log("cnvRatio:", cnvRatio);
    const scrRatio = totalWidth / totalHeight;
    // console.log("scrRatio:", scrRatio);

    if (cnvRatio < scrRatio) {
      // then screen is wider than canvas -> fit canvas to screen height!
      // console.log("fit to scr height!")
      cnv.style.height = totalHeight + "px";
      const w = totalHeight * cnvRatio; // getting width from ratio!
      cnv.style.width = w + "px";
      cnv.style.left = ((totalWidth - w) / 2) + "px";
      cnv.style.top = "0px";
    }
    else {
      // screen is NOT wider than canvas -> fit canvas to screen width
      // console.log("fit to scr width!")
      cnv.style.width = totalWidth + "px";
      const h = totalWidth / cnvRatio;
      cnv.style.height = h + "px"; // "auto";
      cnv.style.left = "0px";
      cnv.style.top = ((totalHeight - h) / 2) + "px";
    }
  }

}


///////////////////////////////////////////////////
// mute or unmute the entire app
const handleMuting = (isMuted) => {

  if (isMuted) {
    // unmute all
    document.getElementById("bballWorldMusic").muted = false;
    document.getElementById("terminalWorldMusic").muted = false;
    document.getElementById("terminalTyping").muted = false;
    document.getElementById("terminalRhodes").muted = false;
    document.getElementById("cloudWorldMusic").muted = false;
    // document.getElementById("lineWorldMusic").muted = false;
    // handle button icon
    document.getElementById("mutedIcon").classList.add("hidden");
    document.getElementById("unMutedIcon").classList.remove("hidden");
  }
  else {
    // MUTE all
    document.getElementById("bballWorldMusic").muted = true;
    document.getElementById("terminalWorldMusic").muted = true;
    document.getElementById("terminalTyping").muted = true;
    document.getElementById("terminalRhodes").muted = true;    
    document.getElementById("cloudWorldMusic").muted = true;
    // document.getElementById("lineWorldMusic").muted = true;
    // handle button icon
    document.getElementById("mutedIcon").classList.remove("hidden");
    document.getElementById("unMutedIcon").classList.add("hidden");    
  }

  return;
}


///////////////////////////////////////////////////
// handle the mouse move
const handleMouseMove = (event) => {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    event.pageY = event.clientY +
      (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
      (doc && doc.clientTop  || body && body.clientTop  || 0 );
  }

  // Use event.pageX / event.pageY here
  return { x: event.pageX, y: event.pageY }
}


/////////////////////////////////////////////////////////////
// Hide all overlay pages
const hideAllOverlayPages = () => {
  document.getElementById("omSide").classList.add("hidden");
  document.getElementById("lidtOmMigSide").classList.add("hidden");
  document.getElementById("somaticSide").classList.add("hidden");
  document.getElementById("musikterapiSide").classList.add("hidden");
  document.getElementById("intensiveInteractionSide").classList.add("hidden");
  document.getElementById("minMissionSide").classList.add("hidden");
  document.getElementById("saadanSide").classList.add("hidden");
  document.getElementById("dinTryghedSide").classList.add("hidden");

  // scroll to top
  document.getElementById("overlayWrapper").scrollTo(0, 0);
}


/////////////////////////////////////////////////////////////
// show diff pages in Overlay
const showOverlayPage = (mode) => {

  // somatic, musikterapi, etik, galleri
  switch(mode) {

    case "om":
      hideAllOverlayPages();
      document.getElementById("omSide").classList.remove("hidden");
      break;

    case "lidtOmMig":
      hideAllOverlayPages();
      document.getElementById("lidtOmMigSide").classList.remove("hidden");
      break;

    case "somatic":
      hideAllOverlayPages();
      document.getElementById("somaticSide").classList.remove("hidden");
      break;

    case "musikterapi":
      hideAllOverlayPages();
      document.getElementById("musikterapiSide").classList.remove("hidden");
      break;

    case "intensiveInteraction":
      hideAllOverlayPages();
      document.getElementById("intensiveInteractionSide").classList.remove("hidden");
      break;      

    case "minMission":
      hideAllOverlayPages();
      document.getElementById("minMissionSide").classList.remove("hidden");
      break;

    case "saadan":
      hideAllOverlayPages();
      document.getElementById("saadanSide").classList.remove("hidden");
      break;

    case "dinTryghed":
      hideAllOverlayPages();
      document.getElementById("dinTryghedSide").classList.remove("hidden");
      break;      

    default:
      hideAllOverlayPages();
      document.getElementById("omSide").classList.remove("hidden");
  }
}


/////////////////////////////////////////////////////////////
// setup Overlay clicks!
const setupBtns = () => {

  // setup logoButton
  const logoBtn = document.getElementById("logoBtn");
  logoBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log("logoButton was clicked!"); // testing
  })

  

  // setup overlay button
  const ovlBtn = document.getElementById("overlayBtn");
  ovlBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const ovl = document.getElementById("overlayWrapper");
    ovl.classList.toggle("shown");

    // toggle btns also!
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");
    if (menuIcon.classList.contains("hidden")) {
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
    else {
      menuIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  })

  
  // setup overlay buttons
  const lidtOmMigBtn = document.getElementById("lidtOmMigBtn");
  lidtOmMigBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("lidtOmMig");
  })
  const somaticBtn = document.getElementById("somaticBtn");
  somaticBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("somatic");
  })
  const musikterapiBtn = document.getElementById("musikterapiBtn");
  musikterapiBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("musikterapi");
  })
  const intensiveInteractionBtn = document.getElementById("intensiveInteractionBtn");
  intensiveInteractionBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("intensiveInteraction");
  })
  const minMissionBtn = document.getElementById("minMissionBtn");
  minMissionBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("minMission");
  })
  const saadanBtn = document.getElementById("saadanBtn");
  saadanBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("saadan");
  })
  const dinTryghedBtn = document.getElementById("dinTryghedBtn");
  dinTryghedBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("dinTryghed");
  })

  /*
  const etikBtn = document.getElementById("etikBtn");
  etikBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("etik");
  })
  const galleriBtn = document.getElementById("galleriBtn");
  galleriBtn.addEventListener("click", e => {
    e.preventDefault(); showOverlayPage("galleri");
  })
  */
  const backBtns = document.querySelectorAll(".backBtn");
  console.log("backBtns:", backBtns);
  for (let btn of backBtns) {
    btn.addEventListener("click", e => {
      e.preventDefault(); showOverlayPage("om");
    })
  }
}


/////////////////////////////////////////////////////////////
export {
  resize,
  handleMuting,
  handleMouseMove,
  showOverlayPage,
  setupBtns
}