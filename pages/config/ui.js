const { red, white, green } = require('chalk');
const _ = require('lodash');

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

const configNewTopLog = () =>
  messagesFrame([
    {
      subject: 'Create Project',
      message: white(`Wizard for ${green(values.projectSettingsFileName)}`)
    }
  ]);

const configNewSubTopLog = () =>
  messagesFrame([
    {
      subject: 'Create sub project',
      message: white(`Wizard for ${red('New sub project')}`)
    }
  ]);

const configReviewLog = project =>
  messagesFrame([
    {
      subject: 'Review project',
      message: red(project.projectName || project.name)
    },
    ..._.keys(project).map(key => ({
      message: `${green(key)}:\t${project[key]}`
    }))
  ]);

module.exports = {
  topLog,
  configNewTopLog,
  configReviewLog,
  configNewSubTopLog
};
