const { save$ } = require('./save');

module.exports = {
  createCsv$: (filePath, matrix) =>
    save$(filePath, matrix.reduce((state, text) => `${state}${text}`).trim())
};
