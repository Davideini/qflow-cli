const titleCase = require('./title-case');
const paramCase = require('./param-case');

module.exports = {
  ...titleCase,
  ...paramCase
};
