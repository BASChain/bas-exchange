'use strict'

const baseWebpackConfig   = require('./webpack.base.conf'),
  config                  = require('../config'),
  CopyWebpackPlugin       = require('copy-webpack-plugin'),
  HtmlWebpackPlugin       = require('html-webpack-plugin'),
  merge                   = require('webpack-merge'),
  MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
  OptimizeCSSPlugin       = require('optimize-css-assets-webpack-plugin'),
  path                    = require('path'),
  TerserPlugin            = require('terser-webpack-plugin'),
  UglifyJsPlugin          = require('uglifyjs-webpack-plugin'),
  utils                   = require('./utils'),
  VueLoaderPlugin         = require('vue-loader/lib/plugin'),
  webpack                 = require('webpack')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode:'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJsUnexpected token: keyword «const» [./node_modules/scryptsy/lib/index.js:1,0 so use terser instead
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       //warnings: false
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),*/
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),*/
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),*/

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin({
        cache:true,
        parallel:true,
        sourceMap:false,
        chunkFilter:(chunk) => {
          if(chunk.name === 'vendor'){
            return false
          }
          return true;
        }
      })
    ]
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

webpackConfig.plugins.push(
  new VueLoaderPlugin()
)

webpackConfig.optimization = Object.assign({},(webpackConfig.optimization)?{}:webpackConfig.optimization, {
  splitChunks: {

    cacheGroups: {
      app: {
        name: 'app',
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 0
      },
      manifest: {
        name: 'manifest',
        minChunks: Infinity
      },
      "vue-vendor": {
        name: 'vue-vendor',
        test: /[\\/]node_modules[\\/]vue/,
        chunks: 'initial', //initial ,all, async
        priority: -7,
        enforce:true
      },
      "vue-eleui": {
        name: 'vue-eleui',
        test: /[\\/]node_modules[\\/]element-ui/,
        chunks: 'initial', //initial ,all, async
        priority: -8,
        enforce:true
      },
      "web3-js": {
        name: 'web3-js',
        test: /[\\/]node_modules[\\/]web3/,
        chunks: 'initial', //initial ,all, async
        priority: -9,
        enforce:true
      },
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/, //// <- window | mac -> /node_modules/vue/
        chunks: 'initial', //initial ,all, async
        priority: -10,
        enforce:true
      }
    }
  }
})


module.exports = webpackConfig

//update
// add  namedChunks: true,
