const path = require('path');
const { green } = require('chalk');
const { rm } = require('../shell-utility');
const { logger: { log, dash } } = require('../../core/log-utility');

const removeHotUpdates = dir => {
  log('>', dash);
  log('Clean', green('hot updates'));

  rm(path.join(dir, '*hot-update*'));

  log('>', dash);
};

module.exports = removeHotUpdates;
