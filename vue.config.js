// vue.config.js
module.exports = {
  transpileDependencies: ['vuetify'],
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
