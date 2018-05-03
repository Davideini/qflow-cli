const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugin: () =>
    new CopyWebpackPlugin(
      [
        {
          context: 'src',
          to: '',
          from: {
            glob: 'assets\\**\\*',
            dot: true
          }
        },
        {
          context: 'src',
          to: '',
          from: {
            glob: 'favicon.ico',
            dot: true
          }
        }
      ],
      {
        ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
        debug: 'warning'
      }
    )
};
