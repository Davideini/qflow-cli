const { operations } = require('./pages/run');

const allExists = operations.TestAllExists();

operations.run(allExists);
