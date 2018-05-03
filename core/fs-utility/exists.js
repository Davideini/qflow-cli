const { existsSync } = require('fs');
const { green, red } = require('chalk');

const { log } = require('../log-utility/logger');
const { lstat } = require('./lstat');

const title = 'exists';

const type = (path, exists) =>
  (exists && (lstat(path).isFile() && 'file\t')) ||
  (exists && 'directory') ||
  'file or directory';

module.exports = {
  exists: path => {
    const exists = existsSync(path);
    const typeString = type(path, exists);

    !exists && log(title, `${typeString}\tdosen't exists\t${red(path)}`);
    exists && log(title, `${typeString}\texists\t\t${green(path)}`);

    return exists;
  }
};
