const hotModuleReplacement = require('./hot-module-replacement');
const sourceMapDevTool = require('./source-map-dev-tool');
const browserSync = require('./browser-sync');
const entry = require('./entry');
const uglifyJs = require('./uglify-js');
const htmlWebpack = require('./html-webpack');
const copyWebpack = require('./copy-webpack');

module.exports = {
  hotModuleReplacement,
  sourceMapDevTool,
  browserSync,
  entry,
  uglifyJs,
  htmlWebpack,
  copyWebpack
};
