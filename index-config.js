const { red, white, green } = require('chalk');

const { joinCWD } = require('./core/path-utility');
const { exists } = require('./core/fs-utility');
const { logger: { log, dash }, clear } = require('./core/log-utility');

const { configNew$, configMenu$ } = require('./pages/config');
const values = require('./pages/values.json');
const projectSettingsPath = joinCWD(values.projectSettingsFileName);

clear();
console.log();

const existsPackage = exists(joinCWD('package.json'));
const projectSettingsExists = exists(projectSettingsPath);

if (!existsPackage) {
  log('Require', `Please run ${green('qf new')}`);

  process.exit();
}

if (projectSettingsExists) {
  log('>', dash);
  log(
    'Config Projects',
    white(`Create/View/Edit ${green(values.projectSettingsFileName)} projects`)
  );
  log('>', dash);

  configMenu$.subscribe();
} else {
  configNew$.switchMap(() => configMenu$).subscribe();
}
