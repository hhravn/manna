import { Sentence } from './terminalClasses/Sentence.js';
import { WordData } from './terminalClasses/WordData.js';


/////////////////////////////////////////////////////////
// poesimaskine!
class Terminal {

  constructor() {

    this.temper = "kantet"; // "kantet", "rund", "mellem";
    this.getNewTemper();
    this.state = "wordPicking"; // "writeALetterNow", "waitForTick"
    this.wordData = WordData;

    // sentences ...
    this.sentences = []; // the sentences to write
    this.sentenceIndex = 0; // the current sntnc to write
    this.buildSentences();
    console.log("this.sentences:", this.sentences);

    this.temperElm = null; // elm to wrap temper sentences in ... used for spacer, marginbottom ...

    // timer vars
    this.timeOut = null;

    // no canvas, just html div here
    this.terminal = document.getElementById("terminal");

    // sound file
    // this.soundElm = document.getElementById("terminalWorldMusic");
    this.soundElms = [];
    this.soundElms.push({
      elm: document.getElementById("terminalWorldMusic"),
      vol: 0.0
    });
    this.soundElms.push({
      elm: document.getElementById("terminalTyping"),
      vol: 0.0
    });
    this.soundElms.push({
      elm: document.getElementById("terminalRhodes"),
      vol: 0.0
    });
    this.soundIndex = 0;

    this.sceneIsActive = false;

    // start the thing
    
  }


  ///////////////////////////////////////////////////
  init() {
    console.log("Terminal init was run");

    // THIS is not a canvas, but an HTML page with overflow!
    if (this.state == "wordPicking") {
      this.pickWords(this.temper); // method to pick words with
      this.state = "writing"; // start writing
      this.setNewTimeOut();
    }
  }


  ///////////////////////////////////////////////////
  // clear the old timeout and give me a new time interval
  setNewTimeOut() {
    let _this = this;
    this.timeOut = setTimeout(function() {
      // console.log("TICK!");
      clearTimeout(_this.timeOut);
      _this.state = "writeALetterNow";
      _this.setNewTimeOut();
  }, this.sentences[this.sentenceIndex].tickInterval);
  }


  ///////////////////////////////////////////////////
  // removes the older elements that cannot be seen on screen anymore
  removeOldElmsFromScreen() {
    const elms = document.querySelectorAll("#terminal .temperWrapper");
    if (typeof elms == 'undefined') return;
    if (elms.length > 12) {
      elms[0].remove();
    }
  }


  ///////////////////////////////////////////////////
  // it's time to fill up sentences array with new words
  buildSentences() {

    // remove old sentence elms first
    this.removeOldElmsFromScreen();

    this.sentences = []; // resetting sentences array
    const sentenceAmount = 5; // 2; // Math.round(Math.random() * 3) + 2;
    for (let i = 0; i < sentenceAmount; i++) {
      const words = this.pickWords(this.temper);
      console.log("words:", words);

      // compile full sentence from word array ...
      let fullSentence = "";
      for (let i = 0; i < words.length; i++) {
        fullSentence += words[i];
        const ending = ( i < (words.length - 1) ) ? ", " : ". " ;
        fullSentence += ending;
      }

      // random tick interval
      const rndInterval = Math.round(Math.random() * 50) + 50;
      this.sentences.push(new Sentence(words, fullSentence, rndInterval));
    }
  }


  ///////////////////////////////////////////////////
  // function to fill up sentences array
  pickWords(temper) {

    let returnWords = [];

    const amount = Math.round((Math.random() * 3) + 2); // amount of words
    for (let i = 0; i < amount; i++) {

      let words = this.wordData.filter(w => (w.category == temper && w.wasShown == false));
      console.log("pickWords -> words:", words);

      // do we need to reset the temper words, coz they've all been shown?
      if (words.length == 0) {
        const resetWords = this.wordData.filter( w => w.category == temper);
        for (let w of resetWords) { w.wasShown = false; }
        words = resetWords;
      }
      // pick random word, set it to shown
      const pickIndex = Math.round(Math.random() * (words.length - 1));
      const pick = words[pickIndex].word;
      words[pickIndex].wasShown = true;
      returnWords.push(pick); // push to return array
    }

    return returnWords;
  }


  ///////////////////////////////////////////////////
  // change to next temper
  getNewTemper() {

    const bgElm = document.getElementById("terminal");

    switch(this.temper) {
      case "rund":
        this.temper = "kantet";
        this.soundIndex = 1; // 0;
        bgElm.classList.remove("bgRund");
        bgElm.classList.add("bgKantet");
        bgElm.classList.remove("bgMellem");
        break;
      case "mellem":
        this.temper = "rund";
        this.soundIndex = 2; // 1;
        bgElm.classList.add("bgRund");
        bgElm.classList.remove("bgKantet");
        bgElm.classList.remove("bgMellem");        
        break;
      case "kantet":
        this.temper = "mellem";
        this.soundIndex = 0; // 2;
        bgElm.classList.remove("bgRund");
        bgElm.classList.remove("bgKantet");
        bgElm.classList.add("bgMellem");           
        break;
    }
  }


  ///////////////////////////////////////////////////
  // draw the canvas to screen
  draw(playOK) {

    this.handleVolume();
    if (this.sceneIsActive == false) return; // DON'T draw if scene is not active!

    if (playOK) this.playSound();

    // check state!
    if (this.state == "writeALetterNow") {

      const sent = this.sentences[this.sentenceIndex];
      const bit = sent.fullSentence.substring(sent.cursorPos, sent.cursorPos + 1);

      // If we're starting a new mood, make temperWrapper
      if (this.sentenceIndex == 0 && sent.cursorPos == 0) {
        this.temperElm = document.createElement("div");
        this.temperElm.classList.add("temperWrapper");
        this.terminal.appendChild(this.temperElm);
      }

      // if we're starting a new sentence, put a mood span there
      if (sent.cursorPos == 0) {
        this.sentences[this.sentenceIndex].sentElm = document.createElement("div");
        this.sentences[this.sentenceIndex].sentElm.classList.add("temper_" + this.temper);
        // this.terminal.appendChild(this.sentences[this.sentenceIndex].sentElm);
        this.temperElm.appendChild(this.sentences[this.sentenceIndex].sentElm);
      }

      // check cursorPos
      if (sent.cursorPos < sent.fullSentence.length) {
        this.sentences[this.sentenceIndex].sentElm.innerHTML += bit;
        this.state = "waitForTick";
        this.sentences[this.sentenceIndex].cursorPos++; // cursorPos++;
      }
      else {
        // Cursor is at the end of sentence now!
        this.sentenceIndex++;
        if (this.sentenceIndex > this.sentences.length-1) {

          // WAIT FOR A MOMENT HERE! - WE'RE CHANGING THE MOOD!
          this.sentenceIndex = 0;
          this.state = "waiting";
          let _this = this;
          clearInterval(this.timeOut);
          this.timeOut = setTimeout(function() {

            _this.getNewTemper();
            // console.log("TEMPER:", _this.temper);
            _this.buildSentences();

            _this.setNewTimeOut();
          }, 2500); // 1500); // makes a pause AFTER ALL sentences!
          
        } else {

          // MAKE A PAUSE BETWEEN SENTENCES!
          this.state = "waiting";
          let _this = this;
          clearInterval(this.timeOut);
          this.timeOut = setTimeout(function() {
            _this.setNewTimeOut();
          }, 1000); // 500);
        }
      }
    }
  }


  ///////////////////////////////////////////////////
  // turn volume up and down
  handleVolume() {

    for (let i = 0; i < this.soundElms.length; i++) {

      if (this.sceneIsActive) {
        if (this.soundIndex == i) {
          this.soundElms[i].vol += 0.02;
          if (this.soundElms[i].vol > 1.0) this.soundElms[i].vol = 1.0;
        } else {
          this.soundElms[i].vol -= 0.02;
          if (this.soundElms[i].vol < 0.0) this.soundElms[i].vol = 0;
        }
      }

      this.soundElms[i].elm.volume = this.soundElms[i].vol;
    }
  }


  ///////////////////////////////////////////////////
  // play the scene sound
  playSound() {
    this.soundElms[this.soundIndex].elm.play();
  }  


  ///////////////////////////////////////////////////
  // this function makes the scene draw to screen
  makeSceneActive() {
    this.sceneIsActive = true;
    this.terminal.classList.remove("hidden");
  }

  ///////////////////////////////////////////////////
  // this function stops the scene from drawing to screen
  makeSceneInactive() {
    this.sceneIsActive = false;
    this.terminal.classList.add("hidden");
    for (let s of this.soundElms) {
      s.elm.pause();
      s.vol = 0.0;
    }
  }  

}


export {
  Terminal
}