const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const prompt = inquirer.createPromptModule();
const { Observable } = require('rxjs/Rx');
const { cp, rm } = require('../../core/shell-utility');
const { replaceInFile$ } = require('../../core/fs-utility');
const { removeHotUpdates } = require('../../core/hmr-utility');
const { clear } = require('../../core/log-utility');

const _ = require('lodash');

const webpackFile = path.join(
  __dirname,
  '../../webpack/webpack.config.dev.run.js'
);

rm(webpackFile);
cp(path.join(__dirname, '../../webpack/webpack.config.dev.js'), webpackFile);

const getStoragePath = settings => {
  // console.log(settings)
  return path.join(
    settings.qflowIISPath,
    settings.storagePath,
    settings.storage
  );
};

const getStorageUrl = settings =>
  `${settings.qflowIISHost}${settings.storagePath.replace(/\\/g, '/')}/${
    settings.storage
  }`;

const findReplace = projectSettings => [
  {
    from: '[dist path]',
    to: getStoragePath(projectSettings).replace(/\\/g, '\\\\')
  },
  {
    from: '[app name]',
    to: projectSettings.path
  },
  {
    from: '[app main entry]',
    to: projectSettings.entry
  },
  {
    from: '[public path]',
    to: getStorageUrl(projectSettings)
  }
];

module.exports = projectsSettings =>
  Observable.of(true)
    .switchMap(() =>
      Observable.fromPromise(
        prompt([
          {
            type: 'list',
            name: 'projectName',
            message: 'Which project you want to run?',
            choices: projectsSettings.workPages.map(project => project.name)
          }
        ])
      )
    )
    .map(answers =>
      projectsSettings.workPages.filter(
        project => project.name === answers.projectName
      )
    )
    .switchMap(projects => Observable.from(projects))
    .take(1)
    .map(projectSettings => ({
      ...projectSettings,
      ...projectsSettings
    }))
    .do(clear)
    .do(projectSettings =>
      removeHotUpdates(getStoragePath(projectSettings).replace(/\\/g, '\\\\'))
    )

    .switchMap(projectSettings =>
      replaceInFile$(webpackFile, findReplace(projectSettings)).do(
        filePath => filePath,
        err =>
          console.log(chalk.red(`[ERROR] in file: ${webpackFile} => ${err}`)),
        () => shell.exec(`webpack --config ${webpackFile} --watch`)
      )
    );

// shell.exec(`webpack --config ${webpackFile} --watch`);
