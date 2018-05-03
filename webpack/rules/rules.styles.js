const stylesScss = require('./rules-styles/rules.styles.scss');
const stylesLess = require('./rules-styles/rules.styles.less');
const stylesCss = require('./rules-styles/rules.styles.css');
const stylesStyl = require('./rules-styles/rules.styles.styl');

module.exports = {
  excludes: [
    stylesCss.excludes,
    stylesScss.excludes,
    stylesLess.excludes,
    stylesStyl.excludes
  ],
  includes: [
    stylesCss.includes,
    stylesScss.includes,
    stylesLess.includes,
    stylesStyl.includes
  ],
  extract: [
    ...stylesCss.extract,
    ...stylesScss.extract,
    ...stylesLess.extract,
    ...stylesStyl.extract
  ]
};
