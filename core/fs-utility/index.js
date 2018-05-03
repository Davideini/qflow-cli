const exists = require('./exists');
const replaceInFile = require('./replace-in-file');
const findInFile = require('./find-in-file');
const open = require('./open');
const save = require('./save');
const string = require('./string');
const createCsv = require('./create-csv');
const csvToJson = require('./csv-to-json');
const lstat = require('./lstat');
const analyze = require('./analyze');

module.exports = {
  ...exists,
  ...analyze,
  ...replaceInFile,
  ...findInFile,
  ...open,
  ...save,
  ...string,
  ...createCsv,
  ...csvToJson,
  ...lstat
};
