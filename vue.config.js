const openInEditor = require('launch-editor-middleware')
module.exports = {
  devServer: {
    port: 9000,
    before (app) {
      // app.use('/__open-in-editor', openInEditor('/usr/local/bin/code'))
      app.use('/__open-in-editor', openInEditor('code'))
    }
  }
}
