const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin")
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
  //Gzip配置
  configureWebpack: config => {//打包时对js/css文件进行压缩
    if (process.env.NODE_ENV === 'production') {//生产环境
      config.plugins.push(
        new CompressionPlugin({
          /* [file]被替换为原始资产文件名。
             [path]替换为原始资产的路径。
             [dir]替换为原始资产的目录。
             [name]被替换为原始资产的文件名。
             [ext]替换为原始资产的扩展名。
             [query]被查询替换。*/
          filename: '[path][base].gz',
          //压缩算法
          algorithm: 'gzip',
          //匹配文件
          test: /\.js$|\.css$|\.html$/,
          //压缩超过此大小的文件,以字节为单位
          threshold: 10240,
          minRatio: 0.8,
          //删除原始文件只保留压缩后的文件
          deleteOriginalAssets: false
        })
      )
    }
  }
})
