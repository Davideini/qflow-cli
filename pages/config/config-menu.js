const path = require('path');
const inquirer = require('inquirer');
const { red } = require('chalk');
const prompt = inquirer.createPromptModule();
const { Observable } = require('rxjs/Rx');
const tryRequire = require('try-require');
const {
  logger: { log },
  clear
} = require('../../core/log-utility');

const configEdit$ = require('./config-edit');
const { configSubProjects$ } = require('./config-sub-projects');

const { menu } = require('./questions');
const { configReviewLog } = require('./ui');

const values = require('../values.json');

const projectSettings =
  tryRequire(path.join(process.cwd(), values.projectSettingsFileName)) || {};

const mapAnswers$ = answers => {
  switch (answers.menu) {
    // case 'Edit project.setings.json':
    //   return configEdit$;

    case 'Create/Edit sub projects':
      return configSubProjects$().take(1);

    case red('** exit **'):
      clear();
      log('EXIT', 'Good bye!');

    default:
      process.exit();
      return Observable.of(true);
  }
};

module.exports = () =>
  Observable.of(projectSettings)
    .do(configReviewLog)
    .switchMap(() => Observable.fromPromise(prompt(menu)))
    .switchMap(mapAnswers$)
    .take(1);
