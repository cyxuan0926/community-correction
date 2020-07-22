'use strict'
const path = require('path')

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)

const isProduction = () => process.env.NODE_ENV === 'production'

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/var.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'ru']
      })
    ]
  },
  chainWebpack(config) {
    config.when(isProduction(), config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          elementUI: {
            name: 'chunk-elementUI',
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
            priority: 60
          },
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 50,
            chunks: 'initial'
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            priority: 30,
            minChunks: 3,
            reuseExistingChunk: true
          }
        }
      })

      config.optimization.runtimeChunk('single')
    })
  }
}