const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const { innerDistPath, contextPath } = require('../core/path-utility');

const common = require('./dist/webpack.config.common');

const settingsWebpack = require('../settings/settings.webpack.json');
const settingsDevelopment = require('../settings/settings.development.json');

const { angularVendor, bootstrapVendor, rxjsVendor } = require('./vendors');

const webpackConfig = (app, context, publicPath, outputPath) =>
  merge(common(app, outputPath, publicPath), {
    entry: {
      angular: angularVendor.modules,
      bootstrap: bootstrapVendor.modules,
      rxjs: rxjsVendor.modules
    },
    output: {
      path: outputPath,
      filename: settingsWebpack.vendorFormat,
      library: settingsWebpack.libraryFormat
    },
    plugins: [
      ...angularVendor.plugins(context),
      ...bootstrapVendor.plugins,
      new webpack.DllPlugin({
        path: path.join(
          context,
          '..',
          'manifest',
          settingsWebpack.manifestFormat
        ),
        name: settingsWebpack.libraryFormat
      })
    ]
  });

module.exports = webpackConfig(
  'app',
  contextPath(settingsDevelopment.defaultSourcePath),
  '/',
  innerDistPath
);
