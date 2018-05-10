const { joinCWD } = require('../core/path-utility');

const webpackConfig = require('./dist/webpack.config.dev');

const { defaultSourcePath } = require('../settings/settings.development.json');

module.exports = webpackConfig(
  'app-avatar-project',
  'main.avatar-project',
  joinCWD(defaultSourcePath),
  'http:/localhost/QFlow59SP4_Moh_Midur/System/FileStore/QflowProject/AvatarProject',
  'C:\\inetpub\\wwwroot\\QFlow59SP4_Moh_Midur\\System\\FileStore\\QflowProject\\AvatarProject'
);
