const fs = require('fs');

module.exports = {
  lstat: path => fs.lstatSync(path)
};
