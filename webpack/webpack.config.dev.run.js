const { joinCWD } = require('../core/path-utility');

const webpackConfig = require('./dist/webpack.config.dev');

const { defaultSourcePath } = require('../settings/settings.development.json');

module.exports = webpackConfig(
  '[app name]',
  '[app main entry]',
  joinCWD(defaultSourcePath),
  '[public path]',
  '[dist path]'
);
