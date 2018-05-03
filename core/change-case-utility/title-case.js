const { titleCase } = require('change-case');

module.exports = {
  titleCase: text =>
    text
      .split(/[\\]+/)
      .map(txt => titleCase(txt).replace(/\s/g, ''))
      .join('\\\\')
};
