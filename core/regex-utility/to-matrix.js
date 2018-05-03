const _ = require('lodash');
const { titleCase } = require('../change-case-utility');

module.exports = {
  matchesToMatrix: matches =>
    [_.keys(matches[0]).reduce((a, b) => `${a},${b}\n`)].concat(
      matches
        .map(match =>
          match.filePaths.map(path => [
            `"${match.match}","${path}",${titleCase(match.match).replace(
              /[^a-z]/gi,
              ''
            )},"${match.match}"\n`
          ])
        )
        .reduce((a, b) => [...a, ...b])
    )
};
