const path = require('path');
const shell = require('shelljs');
const assert = require('assert');
const _ = require('lodash');

const { green, white, red } = require('chalk');
const { tabs, tabsText, logger: { log } } = require('../log-utility');
const { analyze, lstat, exists, clearSrcPath } = require('../fs-utility');

const { ls } = require('./ls');
const { mkdir } = require('./mkdir');

const analizePaths = (path, recursively = false) => {
  const isFile = lstat(path).isFile();

  if (!exists(path)) throw 'Path not exists';
  if (!isFile && !lstat(path).isDirectory()) throw 'Unsuported Path';

  if (isFile) return [path];

  let files = ls(path);

  if (recursively) {
    files = _.uniq([
      ...files,
      ...files
        .map(file => analizePaths(file, true))
        .reduce((a, b) => [...a, ...b], [])
    ]);
  }

  return files;
};

const copy = (src, dest, tabs = 0) => {
  log(
    'Copy',
    `${white('cp')} -rf\t\t${red(src)}${tabsText(tabs, src)}\t=>\t${green(
      dest
    )}`
  );

  shell.cp('-Rf', src, dest);

  return dest;
};

const copyFiles = files => {
  let arr = null;
  if (files instanceof Array) arr = files;
  if (arr === null) arr = [files];

  const maxTabs = tabs(arr.map(file => file.old));

  return arr
    .filter(file => !exists(file.new))
    .map(file => copy(file.old, file.new, maxTabs));
};

const cp = (src, dest, ...exclude) => {
  let arr = null;
  if (src instanceof Array) arr = src;
  if (arr === null) arr = [src];

  let obj = analyze(
    arr.map(a => analizePaths(a, true)).reduce((a, b) => [...a, ...b]),
    exclude
  );

  obj = {
    ...obj,
    destFiles: _.uniqBy(
      arr
        .map(srcPath =>
          obj.files
            .map(file => clearSrcPath(srcPath, file))
            .filter(val => !!val)
        )
        .reduce((a, b) => [...a, ...b])

        .map(p => ({
          ...p,
          new: path.join(dest, p.new)
        })),
      'new'
    ),
    destDirectories: _.uniqBy(
      arr
        .map(srcPath =>
          obj.directories
            .map(file => clearSrcPath(srcPath, file))
            .filter(val => !!val)
        )
        .reduce((a, b) => [...a, ...b])
        .map(p => ({
          ...p,
          new: path.join(dest, p.new)
        })),
      'new'
    )
  };

  assert(obj.files !== obj.destFiles, 'Somthing wrong');
  assert(obj.directories !== obj.destDirectories, 'Somthing wrong');

  return {
    newDirectories: mkdir(obj.destDirectories.map(dir => dir.new)),
    newFiles: copyFiles(obj.destFiles)
  };
};

module.exports = {
  cp,
  analizePaths
};
