import { WordData } from './WordData.js';

class Sentence {

  constructor(words, fullSentence, tickInterval) {
    this.words = words || [];
    this.fullSentence = fullSentence || "";
    // this.mood = mood; // "kantet", "rund", "mellem"
    this.sentElm = null;
    this.tickInterval = tickInterval; // ms
    this.cursorPos = 0;
  }


  /////////////////////////////////////////////
  // setup this sentence
  init() {

    // get the words ...
    // const words = wordData.filter( w => w.category == this.mood);
    // console.log("words:", words);
    // console.log("this.mood:", this.mood);

    /*
    // how many words does this sentence want to have?
    const amount = Math.round((Math.random() * 3) + 2);

    // only pick unique vals from array
    let pick = words[Math.round(Math.random() * (words.length - 1))].word;
    for (let i = 0; i < amount; i++) {
      while (this.pickedWords.includes(pick)) {
        pick = words[Math.round(Math.random() * (words.length - 1))].word;
      }
      this.pickedWords.push(pick);
    }
    console.log("this.pickedWords:", this.pickedWords);

    for (let i = 0; i < this.pickedWords.length; i++) {
      this.sentenceToPrint += this.pickedWords[i];
      const ending = ( i < (this.pickedWords.length - 1) ) ? ", " : ". " ;
      this.sentenceToPrint += ending;
    }
    console.log("sentenceToPrint:", this.sentenceToPrint);
    */

  }

  /////////////////////////////////////////////
  write() {
    // put this on screen
    // add one to cursor!
    // wait for next "tick"
  }
}


export {
  Sentence
}