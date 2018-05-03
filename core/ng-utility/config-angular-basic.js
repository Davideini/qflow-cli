const path = require('path');
const chalk = require('chalk');

const { existsSync } = require('../fs-utility');
const { cp } = require('../shell-utility');

const developmentSettings = require('../../settings/settings.development.json');

const configAngularBasic = () => {
  const angularProjectSourcePath = path.join(
    __dirname,
    '../..',
    developmentSettings.defaultSourcePath
  );

  const angularBluprintSourcePath = path.join(
    __dirname,
    '../..',
    developmentSettings.defaultBlueprintsPath,
    developmentSettings.angularCopyPath,
    'src'
  );

  developmentSettings.basicAngularFilesDirs.forEach(fileOrDir => {
    !existsSync(path.join(angularProjectSourcePath, fileOrDir)) &&
      cp(
        path.join(angularBluprintSourcePath, fileOrDir),
        path.join(angularProjectSourcePath, fileOrDir)
      );
  });
};

module.exports = configAngularBasic;
