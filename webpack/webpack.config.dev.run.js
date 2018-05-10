const { joinCWD } = require('../core/path-utility');

const webpackConfig = require('./dist/webpack.config.dev');

const { defaultSourcePath } = require('../settings/settings.development.json');

module.exports = webpackConfig(
  'app-independent-operational-unit',
  'main.independent-operational-unit',
  joinCWD(defaultSourcePath),
  'http:/localhost/QFlow59SP4_Moh_Midur/System/FileStore/CustomPages/IndependentOperationalUnit/UnitsManager',
  'C:\\inetpub\\wwwroot\\QFlow59SP4_Moh_Midur\\System\\FileStore\\CustomPages\\IndependentOperationalUnit\\UnitsManager'
);
