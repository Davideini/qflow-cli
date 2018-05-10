const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const prompt = inquirer.createPromptModule();
const {
  Observable
} = require('rxjs/Rx');
const {
  cp,
  rm,
  mv
} = require('../../core/shell-utility');
const {
  replaceInFile$
} = require('../../core/fs-utility');
const {
  removeHotUpdates
} = require('../../core/hmr-utility');
const {
  clear
} = require('../../core/log-utility');
const {
  runTopLog
} = require('./ui');
const _ = require('lodash');
const {
  existsAll$
} = require('../../core/fs-utility');
const {
  joinCWD,
  joinThis
} = require('../../core/path-utility');

const webpackFile = path.join(
  __dirname,
  '../../webpack/webpack.config.dev.run.js'
);

rm(webpackFile);
cp(path.join(__dirname, '../../webpack/webpack.config.dev.js'), webpackFile);

const getStoragePath = settings =>
  path.join(settings.qflowIISPath, settings.storagePath, settings.storage);

const getStorageUrl = settings =>
  `${settings.qflowIISHost}${settings.storagePath.replace(/\\+/g, '/')}/${
    settings.storage
  }`;

const findReplace = projectSettings => [{
    from: '[dist path]',
    to: getStoragePath(projectSettings)
      .replace(/\\/g, '\\\\')
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
  },
  {
    from: './app/app.module',
    to: `./${projectSettings.path}/app.module`
  },
  // {
  //   from: /\[IIS Host 3000\]/g,
  //   to: `${projectSettings.qflowIISHost.replace('localhost', 'localhost:3000')}`
  // },
  {
    from: /\[IIS Host 3000\]/g,
    to: `${projectSettings.qflowIISHost}`
  },
  {
    from: /\[IIS Storage\]/g,
    to: `../${projectSettings.storagePath.replace(/\\+/g, '/')}/${
      projectSettings.storage
    }`.replace(/\/+/g, '/')
  }
];


const configSubProject$ = projectSettings =>
  Observable.of(
    cp(joinThis('blueprints', 'ng-project-blueprint'), joinCWD('src'))
  )
  .switchMap(() =>
    mv([{
        from: joinCWD('src', 'app-blueprint'),
        to: joinCWD('src', projectSettings.path)
      },
      {
        from: joinCWD('src', 'main.app-blueprint.ts'),
        to: joinCWD('src', `${projectSettings.entry}.ts`)
      }, {
        from: joinCWD('src', 'app-blueprint.md'),
        to: joinCWD('src', `README.${projectSettings.entry}.md`)
      },
      {
        from: joinCWD('src', 'styles', 'app-blueprint.scss'),
        to: joinCWD('src', 'styles', `${projectSettings.path}.scss`)
      }
    ])
  )
  .switchMap(() => replaceInFile$(joinCWD('src', `${projectSettings.entry}.ts`), findReplace(projectSettings)))
  .switchMap(() => replaceInFile$(joinCWD('src', `README.${projectSettings.entry}.md`), findReplace(projectSettings)))
  .switchMap(() => replaceInFile$(joinCWD('src', `README.${projectSettings.entry}.md`), [{
    from: /([a-zA-Z])\/+ /,
    to: '$1/'
  }]));

const configIfNotExists = projectSettings =>
  existsAll$([
    joinCWD('src', projectSettings.path),
    joinCWD('src', `${projectSettings.entry}.ts`),
    joinCWD('src', 'styles', `${projectSettings.path}.scss`)
  ])
  .switchMap(
    exists =>
    (!exists && configSubProject$(projectSettings)) ||
    Observable.of(projectSettings)
  );

module.exports = projectsSettings =>
  Observable.of(true)
  .do(runTopLog)
  .switchMap(() =>
    Observable.fromPromise(
      prompt([{
        type: 'list',
        name: 'projectName',
        message: 'Which project you want to run?',
        choices: projectsSettings.workPages.map(project => project.name)
      }])
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
    removeHotUpdates(getStoragePath(projectSettings)
      .replace(/\\/g, '\\\\'))
  )
  .switchMap(projectSettings =>
    configIfNotExists(projectSettings)
    .switchMap(existsAll =>
      replaceInFile$(webpackFile, findReplace(projectSettings))
      .do(
        filePath => filePath,
        err =>
        console.log(chalk.red(`[ERROR] in file: ${webpackFile} => ${err}`)),
        () =>
        shell.exec(
          `${joinThis(
                './node_modules/.bin/webpack'
              )} --config ${webpackFile} --watch`
        )
      )
    )
  );

// shell.exec(`webpack --config ${webpackFile} --watch`);
