const { green } = require('chalk');

const { exists } = require('../../core/fs-utility');
const { joinCWD } = require('../../core/path-utility');
const {
  logger: { log }
} = require('../../core/log-utility');
const configNew$ = require('./config-new');
const configMenu$ = require('./config-menu');

const values = require('../values.json');

const projectSettingsPath = joinCWD(values.projectSettingsFileName);

const TestAllExists = () => {
  const existsPackage = exists(joinCWD(values.package));

  if (!existsPackage) {
    log('Require', `Please run ${green('qf new')}`);
    process.exit();
  }

  return exists(projectSettingsPath);
};

const RunConfig = allExists =>
  allExists
    ? configMenu$.subscribe()
    : configNew$.switchMap(() => configMenu$).subscribe();

module.exports = {
  TestAllExists,
  RunConfig
};
