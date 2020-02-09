'use strict'

require('../ci/check-versions')()

process.env.NODE_ENV = 'production'

const chalk = require('chalk'),
  config = require('../config'),
  ora = require('ora'),
  path = require('path'),
  { promisify } = require('util'),
  rm = require('rimraf'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.prod.conf')

const rmPromise = promisify(rm)
const webpackPromise = promisify(webpack)

const spinner = ora('building for production...')
spinner.start()

rmPromise(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
).then(()=> webpackPromise(webpackConfig))
.then((stats) =>{
  spinner.stop()
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('Some Errors Occur!'))
  }

  console.log(chalk.cyan('Building Complete!'))

})
.catch(ex =>{
  throw ex
})

