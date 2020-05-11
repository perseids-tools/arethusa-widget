const removeToastContainer = ($) => {
  $('#toast-container').remove();
};

const wordsDiffer = (a, b) => {
  const aList = (a || []).sort().join(',');
  const bList = (b || []).sort().join(',');

  return aList !== bList;
};

class ArethusaWrapper {
  constructor({ elementId, remoteUrl, doc }) {
    this.elementId = elementId;
    this.remoteUrl = remoteUrl;
    this.doc = doc
    this.render = this.render.bind(this);
  }

  render({ chunk, config, words }) {
    const { Arethusa, $ } = window;

    if (this.widget) {
      if (this.chunk !== chunk || wordsDiffer(this.words, words)) {
        this.gotoSentence(chunk, words);
        removeToastContainer($);
      }
    } else {
      this.widget = new Arethusa();

      this.widget
        .on(this.elementId)
        .from(this.remoteUrl)
        .with(config)
        .start({ doc: this.doc, chunk, w: words });

      this.api = this.widget.api();
    }

    this.chunk = chunk;
    this.words = words;
  }

  gotoSentence({ chunk, words }) {
    return this.api.gotoSentence(chunk, words);
  }

  getSubdoc() {
    return this.api.getSubdoc();
  }

  getMorph({ chunk, words }) {
    return this.api.getMorph(chunk, wordId);
  }

  refreshView() {
    return this.api.refreshView();
  }

  findWord({ chunk, word, prefix, suffix }) {
    return this.api.findWord(chunk, word, prefix, suffix);
  }
}

export default ArethusaWrapper;
