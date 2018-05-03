const webpack = require('webpack');
const tryRequire = require('try-require');

const modules = [
  '@angular/animations',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'zone.js'
];

const plugins = context => [
  new webpack.ContextReplacementPlugin(
    /[@]angular\b.*\b(bundles|linker)/,
    context
  ), // Workaround for https://github.com/angular/angular/issues/11580
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    context
  ) // Workaround for https://github.com/angular/angular/issues/14898
];

const vendor = context =>
  new webpack.DllReferencePlugin({
    context,
    manifest: tryRequire('../../manifest/angular-manifest.json'),
    sourceType: 'umd'
  });

module.exports = {
  angularVendor: { modules, plugins, vendor }
};
