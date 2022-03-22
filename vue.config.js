const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: './',
      win: {
        icon: "./doge.ico"
      },
      builderOptions: {
        "productName": "Todo List",
        "nsis": {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "installerIcon": "./public/favicon.ico",// 安装图标
          "uninstallerIcon": "./public/favicon.ico",//卸载图标
          "installerHeaderIcon": "./public/favicon.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 创建桌面图标
          "shortcutName": "Todo List", // 图标名称
        },
      }
    }
  }
})
