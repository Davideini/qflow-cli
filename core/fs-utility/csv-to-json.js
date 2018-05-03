const { open$ } = require('./open');
const { save$ } = require('./save');
const { titleCase } = require('../change-case-utility');
const { toJson } = require('../json-utility');
module.exports = {
  csvToJson$: filePath =>
    open$(filePath)
      .map(text =>
        text
          .split('\n')
          .slice(1)
          .map(row => row.split(',')[0])
          .filter(txt => !!txt)
          .map(txt => titleCase(txt).replace(/[^a-z]/gi, ''))
          .map(txt => ({
            [txt]: txt
          }))
          .reduce((a, b) => ({ ...a, ...b }))
      )
      .switchMap(obj => save$(`${filePath}.json`, toJson(obj)))
};
