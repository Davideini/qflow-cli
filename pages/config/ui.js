const { white, green } = require('chalk');

const { messagesFrame } = require('../../core/ui-utility');
const values = require('../values.json');

const topLog = () => {
  messagesFrame([
    {
      subject: 'Config Projects',
      message: white(
        `Create/View/Edit ${green(values.projectSettingsFileName)} projects`
      )
    }
  ]);
};

module.exports = {
  topLog
};
