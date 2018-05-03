const path = require('path');
const inquirer = require('inquirer');
const { red, white, green } = require('chalk');
const prompt = inquirer.createPromptModule();
const { Observable } = require('rxjs/Rx');
const tryRequire = require('try-require');
const { logger: { log, dash }, clear } = require('../../core/log-utility');

const _ = require('lodash');

const configEdit$ = require('./config-edit');
const { configSubProjects$ } = require('./config-sub-projects');

const { menu } = require('./questions');

const values = require('../values.json');

const projectSettings =
  tryRequire(path.join(process.cwd(), values.projectSettingsFileName)) || {};

module.exports = Observable.of(true)
  .do(() => {
    clear();
    log('>', dash);

    log('Review:', red(values.projectSettingsFileName));

    _.keys(projectSettings).forEach(key =>
      log('>', `${green(key)}:\t${projectSettings[key]}`)
    );

    log('>', dash);
    console.log();
  })
  .switchMap(() => Observable.fromPromise(prompt(menu)))
  .switchMap(answers => {
    switch (answers.menu) {
      case 'Edit project.setings.json':
        return configEdit$;
      case 'Create/Edit sub projects':
        return configSubProjects$().take(1);
      case red('** exit **'):
        clear();
        log('EXIT', 'Good bye!');
      default:
        process.exit();
        return Observable.of(true);
    }
  })
  .take(1);
