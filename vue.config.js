
// eslint-disable-next-line
const openInEditor = require('launch-editor-middleware')
module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  devServer: {
    before(app) {
      /* 编辑器类型 webstorm code */
      app.use('/__open-in-editor', openInEditor('code', process.cwd(), (fileName, errorMsg) => {
        // log error if any
        console.log('>>>>>')
        console.log(fileName)
        console.log(errorMsg)
      }))
    },
    proxy: {
      '/': {
        target: 'http://122.51.211.208:3000/mock/18/zheye'
      }
    }
  }
}
