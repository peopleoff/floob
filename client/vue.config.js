// vue.config.js

module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          "icon": "public/favicon/icon.ico",
            "nsis": {
              "oneClick": false,
              "perMachine": true,
              "allowElevation": true,
              "allowToChangeInstallationDirectory": true,
              "deleteAppDataOnUninstall": true,
              "createDesktopShortcut": true,
              "installerIcon": "public/favicon/icon.ico",
              "uninstallerIcon": "public/favicon/icon.ico",
              "uninstallDisplayName": "Floob"
            }
        }
      }
    }
  }