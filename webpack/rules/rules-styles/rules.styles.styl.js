const helper = require('../../helpers/rules-helper.styles');

const test = /\.styl$/;

const more = [
  {
    loader: 'stylus-loader',
    options: {
      sourceMap: true,
      paths: []
    }
  }
];

module.exports = {
  excludes: helper.excludeStyle(test, more),
  includes: helper.includeStyle(test, more),
  extract: helper.extractStyle(test, more)
};
