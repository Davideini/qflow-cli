const path = require('path');

const innerDistPath = path.join(process.cwd(), 'dist');

const contextPath = innerPath => path.join(process.cwd(), innerPath);

// const getFileName = (filePath)=>

const joinCWD = (...paths) => path.join(process.cwd(), ...(paths || ['./']));

const joinThis = (...paths) =>
  path.join(__dirname, '../../', ...(paths || ['./']));

module.exports = {
  innerDistPath,
  contextPath,
  joinCWD,
  joinThis
};
