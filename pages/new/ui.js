const { red, white, green } = require('chalk');
const { messagesFrame, messagesContainer } = require('../../core/ui-utility');
const {
  logger: { dash, newLine }
} = require('../../core/log-utility');

const topLog = () =>
  messagesFrame([
    {
      subject: 'New Project',
      message: white(
        `Copy files from ${red('ng-cli-blueprint')} & ${red('dev-files')}`
      )
    }
  ]);

const bottomLog = result =>
  messagesContainer([
    newLine(result.newDirectories.length),
    {
      message: 'Add Directories',
      show: result.newDirectories.length
    },
    ...result.newDirectories.map(directory => ({
      subject: 'NEW',
      message: green(directory)
    })),
    newLine(result.newFiles.length > 0),
    {
      message: 'Add Files',
      show: result.newFiles.length > 0
    },
    ...result.newFiles.map(file => ({
      subject: 'NEW',
      message: green(file)
    })),
    {
      message: dash,
      show: !!result.newDirectories.length || !!result.newFiles.length
    },
    {
      message: red('Angular project is ready')
    }
  ]);

module.exports = {
  topLog,
  bottomLog
};
