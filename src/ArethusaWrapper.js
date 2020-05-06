const removeToastContainer = ($) => {
  $('#toast-container').remove();
};

const wordsDiffer = (a, b) => {
  const aList = (a || []).sort().join(',');
  const bList = (b || []).sort().join(',');

  return aList !== bList;
};

class ArethusaWrapper {
  constructor() {
    this.render = this.render.bind(this);
  }

  render({ doc, chunk, remoteUrl, elementId, config, w }) {
    const { Arethusa, $ } = window;

    if (this.widget) {
      if (this.doc === doc && (this.chunk !== chunk || wordsDiffer(this.w, w))) {
        this.gotoSentence(chunk, w);
        removeToastContainer($);
      }
    } else {
      this.widget = new Arethusa();

      this.widget
        .on(elementId)
        .from(remoteUrl)
        .with(config)
        .start({ doc, chunk, w });

      this.api = this.widget.api();
    }

    this.doc = doc;
    this.chunk = chunk;
    this.w = w;
  }

  gotoSentence(chunk, words) {
    return this.api.gotoSentence(chunk, words);
  }

  getSubdoc() {
    return this.api.getSubdoc();
  }

  getMorph(sentenceId, wordId) {
    return this.api.getMorph(sentenceId, wordId);
  }

  refreshView() {
    return this.api.refreshView();
  }

  findWord(sentenceId, word, prefix, suffix) {
    return this.api.findWord(sentenceId, word, prefix, suffix);
  }
}

export default ArethusaWrapper;
