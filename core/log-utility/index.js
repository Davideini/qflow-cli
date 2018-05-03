const tabs = require('./tabs');
const logger = require('./logger');
const clear = require('./clear');

module.exports = {
  ...tabs,
  logger,
  clear
};
