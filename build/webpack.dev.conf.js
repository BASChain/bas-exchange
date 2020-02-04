/**
 *     ____  ___   _____
 *    / __ )/   | / ___/
 *   / __  / /| | \__ \
 *  / /_/ / ___ |___/ /
 * /_____/_/  |_/____/
 *
 * Copyright (c) 2020 BAS,orchid2ev
 * E-mail :bas-team@gmail.com
 * git@bas:BASChain/bas-exchange.git
 *
 */
'use strict'

const baseWebpackConfig = require('./webpack.base.conf'),
  config                = require('../config'),
  CopyWebpackPlugin     = require('copy-webpack-plugin'),
  FriendlyErrorsPlugin  = require('friendly-errors-webpack-plugin'),
  HtmlWebpackPlugin     = require('html-webpack-plugin'),
  merge                 = require('webpack-merge'),
  path                  = require('path'),
  portfinder            = require('portfinder'),
  utils                 = require('./utils'),
  VueLoaderPlugin       = require('vue-loader/lib/plugin'),
  webpack               = require('webpack')

const HOST              = process.env.HOST,
  PORT                  = process.env.PORT && Number(process.env.PORT)

const webpackConfig     = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new VueLoaderPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port

  portfinder.getPort((err,port) => {
    if(err){
      reject(err)
    } else {
      //publish the new Port, necessary for e2e tests
      process.env.PORT = port

      webpackConfig.devServer.port = port

      webpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {

        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(webpackConfig)
    }
  })
})
