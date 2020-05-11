import {
  defaultConfig,
  ArethusaWrapper,
} from '..';

const wrapper = new ArethusaWrapper({
  elementId: 'treebank_container',
  remoteUrl: './arethusa',
  doc: '/treebank.xml',
});

wrapper.render({
  chunk: '1',
  config: defaultConfig,
  words: [1],
});
