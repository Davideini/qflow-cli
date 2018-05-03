const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  plagin: () => new HotModuleReplacementPlugin(),
  devServer: {
    hot: true
  }
};
