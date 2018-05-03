const path = require('path');
const shell = require('shelljs');
const { white, green } = require('chalk');

const { lstat, exists } = require('../fs-utility');
const {
  logger: { log }
} = require('../log-utility');

const ls = fullPath => {
  const truePath =
    (exists(path.join(fullPath)) && path.join(fullPath)) ||
    (exists(path.join(fullPath, '..')) && path.join(fullPath, '..'));

  const rest = fullPath.replace(truePath, '');

  if (rest) return [fullPath];

  if (!truePath) return [];

  const isFile = lstat(truePath).isFile();

  if (isFile) return [fullPath];

  log('List of Files or Directories', white(`ls ${green(truePath)}`));

  return shell.ls('-A', truePath).map(res => path.join(truePath, res));
};

const dir = path => ls(path).filter(path => lstat(path).isDirectory());

module.exports = {
  ls,
  dir
};
