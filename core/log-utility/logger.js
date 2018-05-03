const { yellow } = require('chalk');

const log = console.log;

const dash =
  '-----------------------------------------------------------------';

const logger = (subject, message, type) => {
  log(yellow(`[${subject}]:\t`), `${message}`);
};

module.exports = { log: logger, dash };
