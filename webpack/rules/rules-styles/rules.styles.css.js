const helper = require('../../helpers/rules-helper.styles');

const test = /\.css$/;

module.exports = {
  excludes: helper.excludeStyle(test),
  includes: helper.includeStyle(test),
  extract: helper.extractStyle(test)
};
