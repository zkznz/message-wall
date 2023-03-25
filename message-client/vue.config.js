const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //配置代理
  devServer: {

  },
  //CSS样式
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          globalVars: {
            hack: `true; @import '@/style/common.less';`
          }
        }
      }
    }
  },
})
