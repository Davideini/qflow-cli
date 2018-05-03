const mkdir = require('./mkdir');
const cp = require('./cp');
const rm = require('./rm');
const ls = require('./ls');

module.exports = {
  ...mkdir,
  ...cp,
  ...rm,
  ...ls
};
