const { red, white, green } = require('chalk');
const { joinCWD } = require('../../core/path-utility');
const { toJson } = require('../../core/json-utility');

const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const { logger: { log, dash } } = require('../../core/log-utility');
const _ = require('lodash');

const { Observable } = require('rxjs/Rx');

const { titleCase } = require('../../core/change-case-utility');
const {
  save$,
  open$,
  replaceInFile$,
  currentDirectoryName,
  baseFileStoragePath
} = require('../../core/fs-utility');
const { saveAnswers, gatAnswers } = require('../../core/inquirer-utility');
const { Questions1, Questions2 } = require('./questions');

const values = require('../values.json');

module.exports = Observable.of(true)
  .do(() => {
    console.log();
    log('>', dash);
    log(
      'Create Project',
      white(`Wizard for ${green(values.projectSettingsFileName)}`)
    );
    log('>', dash);
    console.log();
  })
  .switchMap(() => Observable.fromPromise(prompt(Questions1())))
  .map(saveAnswers)
  .map(answers => ({
    iisFolder: currentDirectoryName(answers.qflowIISPath),
    ...answers
  }))
  .map(answers => ({
    qflowIISHost: `http://localhost/${answers.iisFolder}/`,
    ...answers
  }))
  .switchMap(({ qflowIISHost, qflowIISPath }) =>
    Observable.fromPromise(prompt(Questions2(qflowIISHost, qflowIISPath)()))
  )
  .map(answers => ({
    ...answers,
    storagePath: `${baseFileStoragePath(gatAnswers().qflowIISPath)}${
      answers.storagePath.indexOf('C:') === 0
        ? titleCase(gatAnswers().projectName)
        : titleCase(answers.storagePath)
    }\\`
      .replace(gatAnswers().qflowIISPath, '')
      .substr(1)
  }))
  .map(saveAnswers)
  .switchMap(answers =>
    save$(joinCWD(values.projectSettingsFileName), toJson(answers))
      .switchMap(open$)
      .map(JSON.parse)
  )
  .do(project =>
    open$(joinCWD('package.json'))
      .map(JSON.parse)
      .map(pkg => ({ ...pkg, name: project.projectName, version: '1.0.0' }))
      .take(1)
      .switchMap(pkg => save$(joinCWD('package.json'), toJson(pkg)))
      .subscribe()
  )
  .do(project => {
    console.log();
    log('>', dash);
    log('Review new project', red(project.projectName));
    _.keys(project).forEach(key => log('>', `${green(key)}:\t${project[key]}`));
    log('>', dash);
    console.log();
  })
  .delay(3000);
