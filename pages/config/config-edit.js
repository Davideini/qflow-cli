const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const path = require('path');
const { Observable } = require('rxjs/Rx');

const { titleCase } = require('../../core/change-case-utility');
const {
  save$,
  currentDirectoryName,
  baseFileStoragePath
} = require('../../core/fs-utility');
const { saveAnswers, gatAnswers } = require('../../core/inquirer-utility');
const { Questions1, Questions2 } = require('./questions');
const tryRequire = require('try-require');

const values = require('../values.json');
const projectSettings = () =>
  tryRequire(path.join(process.cwd(), values.projectSettingsFileName)) || {};
module.exports = Observable.of(true)
  .switchMap(() =>
    Observable.fromPromise(prompt(Questions1(projectSettings())))
  )
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
    Observable.fromPromise(
      prompt(Questions2(qflowIISHost, qflowIISPath)(projectSettings()))
    )
  )
  .map(answers => ({
    ...answers,
    storagePath: `${baseFileStoragePath(gatAnswers().qflowIISPath)}${
      answers.storagePath.indexOf('C:') === 0
        ? titleCase(gatAnswers().projectName)
        : titleCase(answers.storagePath)
    }\\`
  }))
  .map(saveAnswers)
  .switchMap(answers =>
    save$(
      path.join(process.cwd(), values.projectSettingsFileName),
      JSON.stringify(answers, null, 2)
    )
  );
