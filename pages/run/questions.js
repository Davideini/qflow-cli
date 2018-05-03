const messages = require('./messages');
const defaults = require('./defaults');

const projectNameQuestion = projectName => ({
  type: 'input',
  name: 'projectName',
  message: messages.projectName,
  default: projectName || defaults.projectName
});

const qflowIISPathQuestion = qflowIISPath => ({
  type: 'list',
  name: 'qflowIISPath',
  message: messages.qflowIISPath,
  choices: qflowIISPath || defaults.qflowIISPath
});

const qflowIISHostQuestion = iisFolder => qflowIISHost => ({
  type: 'input',
  name: 'qflowIISHost',
  message: messages.qflowIISHost,
  default: qflowIISHost || defaults.qflowIISHost(iisFolder)
});

const storagePathQuestion = iisFolder => storagePath => ({
  type: 'input',
  name: 'storagePath',
  message: messages.storagePath(iisFolder),
  default: storagePath || defaults.storagePath(iisFolder)
});

const menuQuestion = {
  type: 'list',
  name: 'menu',
  message: messages.menu,
  choices: defaults.menu
};

const Questions1 = (projectSettings = {}) => [
  projectNameQuestion(projectSettings.projectName),
  qflowIISPathQuestion(projectSettings.qflowIISPath)
];

const Questions2 = (qflowIISHost, qflowIISPath) => (projectSettings = {}) => [
  qflowIISHostQuestion(qflowIISHost)(projectSettings.qflowIISHost),
  storagePathQuestion(qflowIISPath)(projectSettings.storagePath)
];

module.exports = {
  Questions1,
  Questions2,
  menu: [menuQuestion]
};
