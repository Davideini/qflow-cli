const { cp } = require('../../core/shell-utility');
const { joinCWD, joinThis } = require('../../core/path-utility');

const fromPaths = [
  joinThis('blueprints', 'ng-cli-blueprint'),
  joinThis('blueprints', 'dev-files')
];

const AngularProject = ignore => cp(fromPaths, joinCWD(), ...ignore);

module.exports = {
  AngularProject
};
