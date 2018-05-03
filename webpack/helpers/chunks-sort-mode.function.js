const { entryPoints } = require('../config');

module.exports = (left, right) => {
  const leftIndex = entryPoints.indexOf(left.names[0]);
  const rightindex = entryPoints.indexOf(right.names[0]);

  return leftIndex > rightindex ? 1 : leftIndex < rightindex ? -1 : 0;
};
