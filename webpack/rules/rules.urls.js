module.exports = {
  test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
  loader: 'url-loader',
  options: {
    name: '[name].[hash:20].[ext]',
    limit: 10000
  }
};
