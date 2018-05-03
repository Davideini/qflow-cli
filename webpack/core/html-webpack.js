const HtmlWebpackPlugin = require('html-webpack-plugin');
const { joinCWD } = require('../../core/path-utility');
const tryRequire = require('try-require');

const projectSettings = tryRequire(joinCWD('project.settings.json'));

const entryPoints = [
  'inline',
  'polyfills',
  'sw-register',
  'styles',
  'scripts',
  'vendor',
  'main'
].concat(projectSettings.workPages.map(val => val.entry));

const chunksSortMode = (left, right) => {
  const leftIndex = entryPoints.indexOf(left.names[0]);
  const rightindex = entryPoints.indexOf(right.names[0]);
  return leftIndex > rightindex ? 1 : leftIndex < rightindex ? -1 : 0;
};
module.exports = {
  plugin: () =>
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'Webpack App',
      xhtml: true,
      chunksSortMode
    })
};
