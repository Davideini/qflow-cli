const shell = require('shelljs');
const { green, white, red } = require('chalk');
const { rm } = require('./rm');
const { analyze, lstat, exists, clearSrcPath } = require('../fs-utility');
const {
  tabs,
  tabsText,
  logger: { log }
} = require('../log-utility');

const move = (src, dest, tabs = 0) => {
  log(
    'Move',
    `${white('mv')}\t\t${red(src)}${tabsText(tabs, src)}\t=>\t${green(dest)}`
  );

  shell.mv(src, dest);

  return dest;
};

const mv = (src, dest) => {
  let arr = null;
  if (src instanceof Array) arr = src;
  if (arr === null) arr = [{ from: src, to: dest }];

  const maxTabs = tabs(arr.map(file => file.from));

  return arr
    .filter(file => exists(file.from))
    .filter(file => !exists(file.to))
    .map(file => move(file.from, file.to, maxTabs));
};

module.exports = {
  mv
};
