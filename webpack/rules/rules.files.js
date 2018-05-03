module.exports = {
  test: /\.(eot|svg|cur)$/,
  loader: 'file-loader',
  options: { name: '[name].[hash:20].[ext]', limit: 10000 }
};
