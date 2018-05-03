const helper = require('../../helpers/rules-helper.styles');

const test = /\.scss$|\.sass$/;

const more = [
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      precision: 8,
      includePaths: []
    }
  }
];

module.exports = {
  excludes: helper.excludeStyle(test, more),
  includes: helper.includeStyle(test, more),
  extract: helper.extractStyle(test, more)
};
