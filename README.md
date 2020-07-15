# Arethusa Widget

This library provides an embedded version of the [Arethusa Annotation Environment](https://arethusa.perseids.org/app/#/).
For more information, see the [Arethusa GitHub repository](https://github.com/alpheios-project/arethusa),

## Demo

[https://perseids-tools.github.io/arethusa-widget/](https://perseids-tools.github.io/arethusa-widget/)

## Installation

`yarn add arethusa-widget`

or

`npm install arethusa-widget`

(See project on [npm](https://www.npmjs.com/package/arethusa-widget))

## How to use

### Setup

Running the Arethusa widget requires serving some static JavaScript and CSS files.
The easiest way to do this is to link the files from `node_modules` to a directory in your application
that serves static files:

```
cd path/to/static/files
ln -s path/to/node_modules/arethusa-widget/dist/arethusa ./arethusa
```

In the `<head>` of the HTML file on the page that will contain Arethusa
(or for a single page app, the public HTML page) add the following:

```html
<script type="text/javascript" src="/public/url/arethusa/arethusa.packages.min.js"></script>
<script type="text/javascript" src="/public/url/arethusa/arethusa.min.js"></script>
<script type="text/javascript" src="/public/url/arethusa/arethusa.widget.loader.js"></script>
<script type="text/javascript">
  window.i18npath = "/public/url/arethusa/i18n/";
  window.dagred3path = "vendor/dagre-d3/dagre-d3.min.js";
</script>

<link rel="stylesheet" type="text/css" href="/public/url/arethusa/css/arethusa.min.css">
<link rel="stylesheet" type="text/css" href="/public/url/arethusa/css/colorpicker.css">
<link rel="stylesheet" type="text/css" href="/public/url/arethusa/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="/public/url/arethusa/css/foundation-icons.css">
<link rel="stylesheet" type="text/css" href="/public/url/arethusa/css/widget.css">
```

The `/public/url` is the base path of the page.
For most applications you will probably want to change `/public/url` to `/`.
If embedding in a React app, change `/public/url` to `%PUBLIC_URL%`.

### Usage

In the JavaScript file where you would like to use Arethusa, import the `ArethusaWrapper`.
The `ArethusaWrapper` requires an `elementId`,
which is the `id` of the HTML element that will hold the treebank,
a `remoteUrl`, which is the equivalent of `/public/url/arethusa` mentioned above,
and a `doc` which is the URL of a treebank XML file.

Rendering Arethusa requires a configuration. Two ready-to-go configs are provided:
[defaultConfig](https://perseids-tools.github.io/arethusa-widget/)
and
[sidepanelConfig](https://perseids-tools.github.io/arethusa-widget/sidepanel).
You will also need to provide a sentence and (optionally)
a list of words to select.

```javascript
import { ArethusaWrapper, defaultConfig, sidepanelConfig } from 'arethusa-widget';

const wrapper = new ArethusaWrapper({
  elementId: 'treebank_container', // `id` of the HTML element containing the widget
  remoteUrl: `/arethusa`, // the `/public/url/arethusa`; for React it would be `process.env.PUBLIC_URL + '/arethusa'`
  doc: 'https://www.example.com/treebanks/some_treebank.xml', // URL of the treebank
});

wrapper.render({
  chunk: '1', // sentence of the treebank to display
  config: defaultConfig, // this can be `defaultConfig`, `sidepanelConfig`, or a custom configuration object
  words: [1], // (optional) words to highlight; `1` highlights the first word, `2` the second word, etc.
});
```

The HTML of the page should contain a `<div>` with class `__artsa` which should itself
contain a `<div>`. The `id` of this second `<div>` should match the `elementId` argument passed
to `new ArethusaWrapper()`.

```html
<div class="__artsa">
  <div id="treebank_container" />
</div>
```

The following functions can be used with the instantiated wrapper once it has been rendered: 

```javascript
// Go to another sentence and/or highlight other words
wrapper.gotoSentence({
  chunk: '2', // sentence of the treebank to display
  words: [2,3], // (optional) words to highlight; `1` highlights the first word, `2` the second word, etc.
});

// Return the subdoc (string) of the current sentence
wrapper.getSubdoc();

// Return the morphology (object) of a particular sentence and word
// See https://github.com/alpheios-project/arethusa/blob/widget/app/js/arethusa.core/services/api.js#L59
wrapper.getMorph({
  chunk: '4', // sentence of the treebank to display
  wordId, // a word to select; `1` highlights the first word, `2` the second word, etc.
});

// Refresh the Arethusa view
wrapper.refreshView();

// Given a chunk, word, prefix (optional), and suffix (optional), moves to the
// specified sentence and returns a list of matching words
// See https://github.com/alpheios-project/arethusa/blob/widget/app/js/arethusa.core/services/api.js#L121
wrapper.findWord({
  chunk: '2', // sentence of the treebank to display
  word: 'χαῖρε', // the word to find
  prefix: 'ἀλλὰ', // (optional) prefix the preceding word or words
  suffix: 'ὦ', // (optional) suffix the following word or words
});
```

(This package is designed to be used with ES6 modules and Webpack.
If you do not have that set up for your project you will need to replace the `import`s
with the equivalent `require`s.)

## Development

### Requirements

* Node 14.2.0
* Yarn
* Docker
* Docker Compose

### Setup

```
git clone --recurse-submodules git@github.com:perseids-tools/arethusa-widget.git
```

or if the repository is already initialized

```
git pull --recurse-submodules
```

then install development dependencies

```
yarn install
```

### Tests

```
yarn build
yarn test
```

### Linting the code

```
yarn lint
```

### Updating libraries

```
git submodule update --remote
```

### Updating GitHub Pages 

```
yarn build
yarn deploy
```

To run locally before publishing:

```
yarn demo
```

### Publishing

* Update the version in `package.json` according to [SemVer](https://semver.org/)
* Commit and push to GitHub
* Add a new release with `v` followed by the version number as the tag and a title of the version preceded by `Release`.
For example, if the `version` in `package.json` is `2.0.0`, then tag for the release should be `v2.0.0`
and the title should be `Release v2.0.0`. The description of the release should contain a
list of changes followed by the commit of the Arethusa and Arethusa Configs repositories.
* Run `yarn build` and then `npm publish`
