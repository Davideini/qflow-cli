module.exports = {
  combine: (...regex) => new RegExp(regex.reduce((a, b) => `${a}|${b}`), 'gi')
};
