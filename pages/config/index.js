const configNew$ = require('./config-new');
const configEdit$ = require('./config-edit');
const configMenu$ = require('./config-menu');
const configSubProjects$ = require('./config-sub-projects');
const ui = require('./ui');
const operations = require('./operations');

module.exports = {
  configNew$,
  configEdit$,
  configSubProjects$,
  configMenu$,
  ui,
  operations
};
