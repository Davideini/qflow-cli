const { joinCWD } = require('../core/path-utility');

const webpackConfig = require('./dist/webpack.config.dev');

const { defaultSourcePath } = require('../settings/settings.development.json');

module.exports = webpackConfig(
  'app-test',
  'main.test',
  joinCWD(defaultSourcePath),
  'http://localhost/QFlow59SP4_Moh_Midur/System/FileStore/QfCliPro//Test',
  'C:\\inetpub\\wwwroot\\QFlow59SP4_Moh_Midur\\System\\FileStore\\QfCliPro\\Test'
);
