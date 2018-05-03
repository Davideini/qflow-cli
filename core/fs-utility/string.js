module.exports = {
  baseFileStoragePath: start => `${start}\\System\\FileStore\\`,
  currentDirectoryName: (path = '') => path.split('\\').reverse()[0],
  currentDirectoryName2: (path = '') =>{
    const a = path.split('\\');
    return a[a.length -1];
  }
};
