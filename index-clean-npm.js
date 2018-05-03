const { red, white } = require('chalk');
const { logger: { log }, clear } = require('./core/log-utility');
const { rm } = require('./core/shell-utility');
const { joinCWD } = require('./core/path-utility');

clear();

log(
  'Clean NPM',
  white(`Remove ${red('node_modules')} & ${red('package-lock.json')}`)
);

rm(joinCWD('package-lock.json'));

rm(joinCWD('node_modules'));
