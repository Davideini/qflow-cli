#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');
const commander = require('commander');
const { rm } = require('./core/shell-utility');

const package = require('./package.json');

commander
  .version(package.version)
  .command('new', 'create angular project')
  // .command('create', 'create sub project files')
  // .command('exe', 'run .exe console aplication')
  .command('run', 'run angular project')
  // .command('resource', 'find plain text and create resource files')
  // .command('build', 'build angular project for production')
  .command('config', 'config q-flow project')
  // .command('clean-npm', 'remove node_modules')
  // .option('--vendor', 'Compile vendors')
  // .option('--clear-vendor', 'Clear vendors')
  .parse(process.argv);

let webpackFile;

if (commander.vendor)
  webpackFile = path.join(__dirname, './webpack/webpack.config.vendor.js');

if (commander.clearVendor) rm('./dist/*.vendor.js', './manifest');
if (commander.vendor) shell.exec(`webpack --config ${webpackFile}`);
