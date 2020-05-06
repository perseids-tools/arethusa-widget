const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/demo/index.js',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'index.js',
  },
};
