const webpack = require('webpack');
const tryRequire = require('try-require');

const modules = [
  'bootstrap',
  'bootstrap/dist/css/bootstrap.css',
  'bootstrap-rtl/dist/css/bootstrap-rtl.css',
  'es6-promise',
  'es6-shim',
  'event-source-polyfill',
  'jquery'
];

const plugins = [
  new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
  new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
];

const vendor = context =>
  new webpack.DllReferencePlugin({
    context,
    manifest: tryRequire('../../manifest/bootstrap-manifest.json'),
    sourceType: 'umd'
  });

module.exports = {
  bootstrapVendor: { modules, plugins, vendor }
};
