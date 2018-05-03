const { red, white, green } = require('chalk');
const { messagesFrame } = require('../../core/ui-utility');
const runTopLog = () =>
  messagesFrame([
    {
      subject: 'Run Project',
      message: `compile project and run with ${green('browser-sync')}`
    }
  ]);

module.exports = {
  runTopLog
};
