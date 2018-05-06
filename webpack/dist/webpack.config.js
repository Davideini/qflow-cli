'use strict';
const path = require('path');
const tryRequire = require('try-require');
const { joinCWD } = require('../../core/path-utility');

const { CommonsChunkPlugin } = require('webpack').optimize;
const CircularDependencyPlugin = require('circular-dependency-plugin');

const { BaseHrefWebpackPlugin } = require(joinCWD(
  'node_modules',
  '@angular/cli/plugins/webpack'
));

const { htmlWebpack, copyWebpack } = require('../core');

const { angularVendor, bootstrapVendor, rxjsVendor } = require('../vendors');

const developmentSettings = tryRequire(
  '../../settings/settings.development.json'
);
const projectSettings = tryRequire(joinCWD('project.settings.json'));

const src = developmentSettings.defaultSourcePath;

const vendorsPlugins = context => [
  angularVendor.vendor(context),
  bootstrapVendor.vendor(context),
  rxjsVendor.vendor(context)
];

const vendors = (context, withVendors) =>
  !withVendors ? [] : vendorsPlugins(context);

const webpackConfig = (context, withVendors = true) => ({
  plugins: [
    ...vendors(context, withVendors),
    new CommonsChunkPlugin({
      name: ['inline'],
      minChunks: null
    }),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: process.cwd()
    }),
    copyWebpack.plugin(),
    htmlWebpack.plugin(),
    new BaseHrefWebpackPlugin({})
  ]
});

module.exports = webpackConfig;
