const { joinCWD } = require('../../core/path-utility');

const webpackConfig = require('./dist/webpack.config.prod');

const { defaultSourcePath } = require('../settings/settings.development.json');

module.exports = webpackConfig(
  'app',
  'main',
  joinCWD(defaultSourcePath),
  '/',
  joinCWD('dist')
);
