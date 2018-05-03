const { ui, operations } = require('./pages/new');

const ignore = ['.git'];

ui.topLog();

const results = operations.AngularProject(ignore);

ui.bottomLog(results);
