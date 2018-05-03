const path = require('path');
const tryRequire = require('try-require');
const { green } = require('chalk');
const { joinCWD } = require('./core/path-utility');

const { exists } = require('./core/fs-utility');
const {
  logger: { log },
  clear
} = require('./core/log-utility');

const { runMenu$ } = require('./pages/run');

const values = require('./pages/values.json');

const projectSettingsPath = path.join(
  process.cwd(),
  values.projectSettingsFileName
);

const packagePath = path.join(process.cwd(), values.package);

const packageJson = tryRequire(packagePath);
const projectSettings = tryRequire(projectSettingsPath);

clear();

console.log();
exists(joinCWD('package.json'));
exists(projectSettingsPath);
console.log();

if (!packageJson) {
  log('Require', `Please run ${green('qf new')}`);
  process.exit();
}

if (!projectSettings) {
  log('Require', `Please run ${green('qf config')}`);
  process.exit();
}

if (!projectSettings.workPages || !projectSettings.workPages.length) {
  log(
    'Require',
    `Please config at least one project, run ${green(
      'qf config --sub-project'
    )}`
  );
  process.exit();
}

projectSettings && runMenu$(projectSettings).subscribe();
