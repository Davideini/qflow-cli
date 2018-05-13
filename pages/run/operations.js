const path = require('path');
const tryRequire = require('try-require');
const {
  green
} = require('chalk');

const {
  exists,
  existsAll$
} = require('../../core/fs-utility');
const {
  joinCWD
} = require('../../core/path-utility');
const runMenu$ = require('./run-menu');

const values = require('../values.json');

const {
  logger: {
    log
  },clear
} = require('../../core/log-utility');

const packagePath = path.join(process.cwd(), values.package);

const projectSettingsPath = path.join(
  process.cwd(),
  values.projectSettingsFileName
);

const projectSettings = tryRequire(projectSettingsPath);

const TestAllExists = () => {
  const packageJsonExists = exists(packagePath);
  const projectSettingsExists = exists(projectSettingsPath);

  if (!packageJsonExists) {
    clear();
    log('Require', `Please run ${green('qf new')}`);
    process.exit();
  }

  if (!projectSettingsExists) {
    clear();
    log('Require', `Please run ${green('qf config')}`);
    process.exit();
  }

  if (!projectSettings.workPages || !projectSettings.workPages.length) {
    clear();
    log(
      'Require',
      `Please config at least one project, run ${green(
        'qf config'
      )}`
    );
    process.exit();
  }

  return true;
};

const run = allExists => allExists && runMenu$(projectSettings)
  .subscribe();

module.exports = {
  TestAllExists,
  run
};
