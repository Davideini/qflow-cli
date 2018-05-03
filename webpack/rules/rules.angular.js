const path = require('path');

// const { AotPlugin, AngularCompilerPlugin } = require('@ngtools/webpack');
const { AotPlugin, AngularCompilerPlugin } = require(path.join(
  process.cwd(),
  './node_modules/@ngtools/webpack'
));

const ruleForAngular5 = {
  test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
  loader: path.join(process.cwd(), './node_modules/@ngtools/webpack')
};

const pluginForAngular5 = ({ tsConfigPath, entryModule, sourceMap }) =>
  new AngularCompilerPlugin({
    tsConfigPath,
    entryModule,
    sourceMap
  });

const ruleForAngular4 = {
  test: /\.ts$/,
  loader: path.join(process.cwd(), './node_modules/@ngtools/webpack')
  // loader: [
  //   'awesome-typescript-loader?silent=true',
  //   'angular2-template-loader',
  //   'angular2-router-loader'
  // ]
};

const pluginForAngular4 = ({ tsConfigPath, entryModule, sourceMap }) =>
  new AotPlugin({
    tsConfigPath,
    entryModule,
    sourceMap,
    replaceExport: false,
    skipCodeGeneration: true,
    compilerOptions: {}
  });

module.exports = {
  rulesAngular: {
    ruleForAngular5,
    ruleForAngular4
  },
  pluginAngular: {
    pluginForAngular5,
    pluginForAngular4
  }
};
