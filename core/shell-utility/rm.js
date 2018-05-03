const shell = require('shelljs');
const { green, red } = require('chalk');
const { logger: { log } } = require('../log-utility');
const { ls } = require('./ls');
const rm = (...paths) => {
  const files = paths.map(p => ls(p)).reduce((a, b) => [...a, ...b]);

  files.forEach(file => {
    log('remove file', green(`rm -rf ${red(file)}`));

    shell.rm('-Rf', file);
  });

  return true;
};

module.exports = { rm };
