const shell = require('shelljs');
const { green, white } = require('chalk');
const { logger: { log } } = require('../log-utility');
const { exists } = require('../fs-utility');

module.exports = {
  mkdir: path => {
    let arr = null;
    if (path instanceof Array) arr = path;
    if (arr === null) arr = [path];

    return arr.filter(dirPath => !exists(dirPath)).map(dirPath => {
      log('Create Directory', white(`mkdir -p\t${green(dirPath)}`));
      shell.mkdir('-p', dirPath);

      return dirPath;
    });
  }
};
