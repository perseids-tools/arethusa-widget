# Arethusa Widget

This library provides an embedded version of the [Arethusa Annotation Environment](https://arethusa.perseids.org/app/#/).
For more information, see the [Arethusa GitHub repository](https://github.com/alpheios-project/arethusa),

## Demo

[https://perseids-tools.github.io/arethusa-widget/](https://perseids-tools.github.io/arethusa-widget/)

## Installation

`yarn add arethusa-widget`

or

`npm install arethusa-widget`

## How to use

### Setup

### Usage

## Development

### Requirements

* Node 13.9.0
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

### Updating libraries

```
git submodule update --remote
```

### Updating GitHub Pages 

```
yarn deploy
```

### Publishing

```
yarn build
npm publish
```

(Make sure to update the `version` in `package.json` before publishing a new release.)
