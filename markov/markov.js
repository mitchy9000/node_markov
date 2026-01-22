/** Textual markov chain generator */

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(w => w !== "");
    this.makeChains();
  }

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!this.chains[word]) {
        this.chains[word] = [];
      }

      this.chains[word].push(nextWord);
    }
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let word = choice(keys);
    let output = [];

    while (output.length < numWords && word !== null) {
      output.push(word);
      word = choice(this.chains[word]);
    }

    return output.join(" ");
  }
}

module.exports = MarkovMachine;
