const { lstat } = require('./lstat');

const clearSrcPath = (srcPath, path) =>
  path.indexOf(srcPath) < 0
    ? null
    : { old: path, new: path.replace(srcPath, '') };

const analyze = (paths, exclude) => {
  const excluded = exclude.slice();
  const files = paths.filter(path => lstat(path).isFile());
  const directories = paths.filter(path => lstat(path).isDirectory());

  return {
    files,
    directories,
    excluded,
    destFiles: null,
    destDirectories: null
  };
};

module.exports = {
  clearSrcPath,
  analyze
};
