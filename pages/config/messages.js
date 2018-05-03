const { red, green, yellow } = require('chalk');
const { baseFileStoragePath } = require('../../core/fs-utility');

const messagesFunctions = {
  storagePath: iisFolder =>
    red('Enter name of storage folder inside: ') +
    green(baseFileStoragePath(iisFolder))
};

module.exports = {
  projectName: red('Enter project name'),
  qflowIISPath: red('Select QFlow IIS wwwroot folder'),
  qflowIISHost: red('Enter IIS host'),
  menu: yellow('Choose one of config options'),
  ...messagesFunctions
};
