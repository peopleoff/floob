// vue.config.js
module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/my-project/' : '/',
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.${name}',
        productName: 'Floob',
        copyright: 'Copyright © 2019 ${author} '
      }
    }
  }
}
