const postcssPlugins = require('../plugins/postcss.plugins');
const { stylesFullPaths, projectRoot } = require('../config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseLoaders = [
  {
    loader: 'raw-loader'
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'embedded',
      plugins: postcssPlugins(projectRoot),
      sourceMap: true
    }
  }
];

module.exports = {
  includeStyle: (test, useMore = []) => ({
    include: stylesFullPaths.slice(),
    test,
    use: ['style-loader', ...baseLoaders, ...useMore]
  }),
  excludeStyle: (test, useMore = []) => ({
    exclude: stylesFullPaths.slice(),
    test,
    use: [
      'exports-loader?module.exports.toString()',
      ...baseLoaders,
      ...useMore
    ]
  }),
  extractStyle: (test, useMore = []) => [
    {
      include: stylesFullPaths.slice(),
      test,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [...baseLoaders, ...useMore]
      })
    },
    {
      exclude: stylesFullPaths.slice(),
      test,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'exports-loader?module.exports.toString()',
          ...baseLoaders,
          ...useMore
        ]
      })
    }
  ]
};
