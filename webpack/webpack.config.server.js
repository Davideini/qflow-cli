const path = require('path');
const merge = require('webpack-merge');

const common = require('./dist/webpack.config.common');
const config = require('./dist/webpack.config');

const settingsDevelopment = require('../settings/settings.development.json');

const webpackConfig = (app, entryName, context, publicPath, outputPath) =>
  merge(common(app, outputPath, publicPath), config(context, false), {
    context,
    entry: {
      [entryName]: `./${entryName}.ts`
    }
  });

const dist = path.join(process.cwd(), 'dist');
const context = path.join(process.cwd(), settingsDevelopment.defaultSourcePath);
module.exports = webpackConfig('app', 'main', context, '/', dist);
