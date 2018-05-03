const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  plugin: () => new UglifyJsPlugin()
};
