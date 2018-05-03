const inHtml = require('./in-html');
const inTs = require('./in-ts');
const combine = require('./combine');
const match = require('./match');
const analize = require('./analize');
const textTypes = require('./text-types');
const toMatrix = require('./to-matrix');

module.exports = {
  ...inHtml,
  ...inTs,
  ...combine,
  ...match,
  ...analize,
  ...toMatrix,
  textTypes
};
