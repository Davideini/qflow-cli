const tryRequire = require('try-require');
const { joinCWD } = require('../../core/path-utility');

const {
  HotModuleReplacementPlugin,
  SourceMapDevToolPlugin
} = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const { uglifyJs, entry } = require('../core');

const common = require('./webpack.config.common');
const config = require('./webpack.config');

const projectSettings = tryRequire(joinCWD('project.settings.json'));
const settingsWebpack = require('../../settings/settings.webpack.json');
const settingsDevelopment = require('../../settings/settings.development.json');

const iisServer = projectSettings.qflowIISHost;

const configObject = (app, entryName) => ({
  entry: {
    ...entry.main([entryName]),
    ...entry.polyfills(),
    ...entry.styles(['styles', app])
  },
  plugins: [uglifyJs.plugin()]
});

module.exports = (app, entryName, context, publicPath, outputPath) =>
  merge(
    common(app, outputPath, publicPath),
    config(context, false),
    configObject(app, entryName)
  );
