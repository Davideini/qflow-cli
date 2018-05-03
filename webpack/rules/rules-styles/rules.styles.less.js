const helper = require('../../helpers/rules-helper.styles');

const test = /\.less$/;

const more = [
  {
    loader: 'less-loader',
    options: {
      sourceMap: true
    }
  }
];

module.exports = {
  excludes: helper.excludeStyle(test, more),
  includes: helper.includeStyle(test, more),
  extract: helper.extractStyle(test, more)
};
