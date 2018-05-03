const {
  SourceMapDevToolPlugin
} = require('webpack');

const {
  sourceMapFormat
} = require('../../settings/settings.webpack.json');

module.exports = {
  plagin: () =>
    new SourceMapDevToolPlugin({
      filename: sourceMapFormat,
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
  devtool: {
    devtool: 'source-map'
  }
};
