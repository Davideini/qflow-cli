const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  plugin: iisServer =>
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: {
        target: iisServer,
        ws: true
      },
      snippetOptions: {
        rule: {
          match: /<\/head>/i,
          fn: (snippet, match) => snippet + match
        }
      }
    })
};
