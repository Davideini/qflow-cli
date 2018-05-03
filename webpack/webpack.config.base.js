const merge = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const dev = require('./webpack.config.dev.run');

/*
Webpack for test bundle size and structure
*/
module.exports = merge(dev, {
  plugins: [new BundleAnalyzerPlugin()]
});
