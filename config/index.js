'use strict'
const path = require('path')

const PORT = 9527

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/reth':{
        target: 'http://104.238.165.23:8082/',
        changeOrigin: true,
        pathRewrite: {
          '^/reth': ''
        }
      },
      '/v3/1362a998079949baaea80eb017fe1f0f':{
        target:'https://:4fed2035cab14c39ae7602bc54e7f297@ropsten.infura.io/v3/1362a998079949baaea80eb017fe1f0f',
        changeOrigin:true
      },
      '/api1':{
        target: 'http://47.113.87.58/api',
        changeOrigin: true,
        pathRewrite:{
          '^/api1':''
        }
      },
      '/api3': {
        target: 'http://39.99.198.143/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api3': ''
        }
      },
      '/api1337': {
        target: 'http://39.99.198.143/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api1337': ''
        }
      },
      '/apps': {
        target: 'http://47.113.87.58/apps',
        changeOrigin: true,
        pathRewrite: {
          '^/apps': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9527, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Eslint
     */
    useEslint:false,
    showEslintErrorsInOverlay:true,
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     * true /false
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
