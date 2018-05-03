const { open$ } = require('./open');
const { match } = require('../regex-utility');
module.exports = {
  findInFile$: (filePath, regex) =>
    open$(filePath)
      .map(file => match(regex, file))
      .map(matches =>
        matches.map(match => ({ match: match.text, tag: match.tag, filePath }))
      )
};
