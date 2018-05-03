const webpack = require('webpack');
const tryRequire = require('try-require');

const modules = ['rxjs/Rx'];

const vendor = context =>
  new webpack.DllReferencePlugin({
    context,
    manifest: tryRequire('../../manifest/rxjs-manifest.json'),
    sourceType: 'umd'
  });

module.exports = {
  rxjsVendor: { modules, vendor }
};
