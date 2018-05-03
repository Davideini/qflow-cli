const inquirer = require('inquirer');
const { joinCWD } = require('../../core/path-utility');
const { titleCase, paramCase } = require('../../core/change-case-utility');
const { save$, open$ } = require('../../core/fs-utility');
const { toJson } = require('../../core/json-utility');
const prompt = inquirer.createPromptModule();
const { Observable } = require('rxjs/Rx');
const _ = require('lodash');
const { analizePaths } = require('../../core/shell-utility');
const { configNewSubTopLog, configReviewLog } = require('./ui');

const values = require('../values.json');
let projectSettings;

const configSubProjects$ = () =>
  open$(joinCWD(values.projectSettingsFileName))
    .map(JSON.parse)
    .do(settings => (projectSettings = settings))
    .map(() =>
      analizePaths(projectSettings.qflowIISPath, true)
        .filter(path => /\.aspx$/.test(path))
        .sort()
        .map(path =>
          path
            .replace(projectSettings.qflowIISPath, '')
            .replace(/[\\]+/g, '/')
            .substr(1)
        )
    )
    .do(configNewSubTopLog)
    .switchMap(files =>
      Observable.fromPromise(
        prompt([
          {q
            type: 'list',
            message: 'Select page url',
            name: 'url',
            choices: files
          },
          {
            type: 'input',
            message: 'Project name',
            name: 'name'
          }
        ])
      )
    )
    .map(answers => ({
      ...answers,
      storage: titleCase(answers.name),
      path: `app-${paramCase(answers.name)}`,
      entry: `main.${paramCase(answers.name)}`,
      customPageName: answers.name
    }))
    .switchMap(project =>
      save$(
        joinCWD(values.projectSettingsFileName),
        toJson({
          ...projectSettings,
          workPages: [...(projectSettings.workPages || []), project]
        })
      )
        .switchMap(open$)
        .map(JSON.parse)
        .map(settings => settings.workPages)
        .map(workPages =>
          workPages.filter(workPage => workPage.name === project.name)
        )
    )
    .switchMap(workPages => Observable.from(workPages))
    .take(1)
    .do(configReviewLog);

module.exports = {
  configSubProjects$
};
