const path = require('path');

const stylesPaths = ['./src\\scss\\styles.scss'];
const projectRoot = process.cwd();

const entryPoints = [
  'inline',
  'polyfills',
  'sw-register',
  'styles',
  'bootstrap.vendor',
  'angular.vendor',
  'main'
];

module.exports = {
  projectRoot,
  stylesPaths,
  stylesFullPaths: stylesPaths.slice().map(style => {
    console.log(projectRoot, style);
    // return path.join(projectRoot, style);
    return path.join(process.cwd(), 'src\\styles\\styles.scss');
  }),
  entryPoints
};
