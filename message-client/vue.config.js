const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  //配置代理
  devServer: {
    // port: 8088,
    // proxy: {
    //   '/': {
    //     target: process.env.VUE_APP_API_BASE_URL,
    //     changeOrigin: true,
    //   }
    // }
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
