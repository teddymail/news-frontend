const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false, // 如果需要移除 console.log 可以设置为 true
            },
            output: {
              comments: false, // 移除所有注释
            },
          },
        }),
      ],
    },
  },
})