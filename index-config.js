const { ui, operations } = require('./pages/config');

const allExists = operations.TestAllExists();

allExists && ui.topLog();

operations.RunConfig(allExists);
