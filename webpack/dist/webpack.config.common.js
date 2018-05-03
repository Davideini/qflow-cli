'use strict';
const { NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const path = require('path');
const postcssPlugins = require('../plugins/postcss.plugins');
const {
  NamedLazyChunksWebpackPlugin
} = require('@angular/cli/plugins/webpack');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const settingsWebpack = require('../../settings/settings.webpack.json');

const developmentSettings = require('../../settings/settings.development.json');

const {
  rulesHtml,
  rulesFiles,
  rulesUrls,
  rulesStyles,
  rulesAngular
} = require('../rules');

const { pluginAngular } = require('../plugins');

const src = developmentSettings.defaultSourcePath;

const angularVersion = 5;

const angularPluginFunction =
  angularVersion === 5
    ? pluginAngular.pluginForAngular5
    : pluginAngular.pluginForAngular4;

const stylesArr = app => [
  'src\\styles\\styles.scss',
  `./src\\styles\\${app}.scss`
];

module.exports = (app, outputPath, publicPath) => ({
  resolve: {
    extensions: settingsWebpack.extensions,
    symlinks: true,
    modules: ['./src', './node_modules'],
    alias: rxPaths(),
    mainFields: ['browser', 'module', 'main']
  },
  resolveLoader: {
    modules: ['./node_modules'],
    alias: rxPaths()
  },
  output: {
    path: outputPath,
    filename: settingsWebpack.bundleFormat,
    chunkFilename: '[id].chunk.js',
    crossOriginLoading: false,
    libraryTarget: settingsWebpack.libraryTarget,
    publicPath: publicPath
  },
  module: {
    rules: [
      rulesHtml,
      rulesFiles,
      rulesUrls,

      // ...rulesStyles.excludes,
      // ...rulesStyles.includes,
      {
        exclude: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.css$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          }
        ]
      },
      {
        exclude: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.scss$|\.sass$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        exclude: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.less$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        exclude: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.styl$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: []
            }
          }
        ]
      },
      {
        include: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          }
        ]
      },
      {
        include: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.scss$|\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        include: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        include: stylesArr(app).map(style => path.join(process.cwd(), style)),
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins(process.cwd()),
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: []
            }
          }
        ]
      },
      angularVersion === 5
        ? rulesAngular.ruleForAngular5
        : rulesAngular.ruleForAngular4
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new NamedModulesPlugin(),
    new NamedLazyChunksWebpackPlugin(),
    angularPluginFunction({
      tsConfigPath: `./${src}/tsconfig.app.json`,
      entryModule: `./${src}/${app}/app.module#AppModule`,
      sourceMap: true
    })
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
