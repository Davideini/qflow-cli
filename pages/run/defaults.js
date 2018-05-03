const { titleCase } = require('../../core/change-case-utility');
const { gatAnswers } = require('../../core/inquirer-utility');
const { lsDirs } = require('../../core/shell-utility');
const {
  currentDirectoryName,
  baseFileStoragePath
} = require('../../core/fs-utility');
const chalk = require('chalk');

const qflowIISPaths = lsDirs('C:\\inetpub\\wwwroot\\');

const dirname = currentDirectoryName(process.cwd());

const defaultsFunctions = {
  qflowIISHost: iisFolder => iisFolder,
  storagePath: iisFolder =>
    `${baseFileStoragePath(iisFolder)}${titleCase(gatAnswers().projectName)}`
};

module.exports = {
  projectName: dirname,
  qflowIISPath: qflowIISPaths,
  ...defaultsFunctions,
  menu: [
    'Edit project.setings.json',
    'Create/Edit sub projects',
    chalk.red('** exit **')
  ]
};
