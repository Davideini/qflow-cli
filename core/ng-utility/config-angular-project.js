const path = require('path');
const chalk = require('chalk');

const { replaceInFileAsync, existsSync } = require('../fs-utility');
const { cp, mkdir } = require('../shell-utility');

const developmentSettings = require('../../settings/settings.development.json');

const configAngularProject = (settings, entryPath) => {
  if (existsSync(entryPath)) return;
  mkdir(path.join(entryPath, '..', settings.path));

  const angularEntryPath = path.join(
    entryPath,
    '../../',
    developmentSettings.defaultBlueprintsPath,
    developmentSettings.angularCopyPath,
    'src/main.ts'
  );

  const angularAppSourcePath = path.join(
    entryPath,
    '../../',
    developmentSettings.defaultBlueprintsPath,
    developmentSettings.angularCopyPath,
    'src/app'
  );

  cp(angularEntryPath, entryPath);

  replaceInFileAsync(entryPath, '[app path]', settings.path).subscribe();

  cp(
    angularAppSourcePath.concat('\\*'),
    path.join(entryPath, '..', settings.path)
  );
};

module.exports = configAngularProject;
