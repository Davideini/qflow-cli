const shell = require('shelljs');
const path = require('path');

const _ = require('lodash');

// const webpackFile = path.join(__dirname, './webpack/webpack.config.base.js'); // Working
// const webpackFile = path.join(__dirname, './webpack/webpack.config.dev.js'); // Blueprint not work
// const webpackFile = path.join(__dirname, './webpack/webpack.config.prod.js'); // Exception
// const webpackFile = path.join(
//   __dirname,
//   './webpack/webpack.config.production.js'
// ); // Only css
// const webpackFile = path.join(__dirname, './webpack/webpack.config.server.js'); // Why i need this?
// const webpackFile = path.join(__dirname, './webpack/webpack.config.vendor.js'); // Working
const webpackFile = path.join(
  __dirname,
  './webpack/webpack.config.dev.run.1.js'
); // Working
// const webpackFile = path.join(
//   __dirname,
//   './webpack/dist/webpack.config.common.js'
// ); // Not work
// const webpackFile = path.join(
//   __dirname,
//   './webpack/dist/webpack.config.dev.js'
// );
// const webpackFile = path.join(__dirname, './webpack/dist/webpack.config.js');

console.log(`${__dirname}/node_modules/webpack`);

shell.exec(
  `${path.join(
    __dirname,
    './node_modules/webpack'
  )} --config ${webpackFile} --watch`
);
