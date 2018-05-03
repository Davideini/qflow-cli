const merge = require('webpack-merge');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { rulesStyles } = require('./rules');

const settingsWebpack = require('../settings/settings.webpack.json');

const webpackConfig = (outputPath, stylesPaths) =>
  merge({
    entry: {
      styles: stylesPaths.slice()
    },
    output: {
      path: path.join(outputPath, settingsWebpack.defaultStylesCssPath),
      filename: settingsWebpack.bundleFormat
    },
    module: {
      rules: [...rulesStyles.extract]
    },
    plugins: [new ExtractTextPlugin(settingsWebpack.defaultStylesCssFileName)]
  });

const dist = path.join(process.cwd(), 'dist');
module.exports = webpackConfig(dist, ['./src\\styles\\styles.scss']);
