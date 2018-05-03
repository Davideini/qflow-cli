const { red, white, green } = require('chalk');
const { cp } = require('./core/shell-utility');
const { joinCWD, joinThis } = require('./core/path-utility');
const { logger: { log, dash }, clear } = require('./core/log-utility');

const ignore = ['.git'];

clear();
console.log();
log('>', dash);

log(
  'New Project',
  white(`Copy files from ${red('ng-cli-blueprint')} & ${red('dev-files')}`)
);

log('>', dash);

const result = cp(
  [
    joinThis('blueprints', 'ng-cli-blueprint'),
    joinThis('blueprints', 'dev-files')
  ],
  joinCWD(),
  ...ignore
);

clear();

log('>', dash);
log('>', red('Angular project is ready'));
result.newDirectories.length && console.log();
result.newDirectories.length && log('>', 'Add Directories');
result.newDirectories.forEach(directory => log('NEW', green(directory)));
result.newFiles.length && console.log();
result.newFiles.length && log('>', 'Add Files');
result.newFiles.forEach(file => log('NEW', green(file)));
log('>', dash);
