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

const config  = require('../config'),
  utils       = require('./utils')

const IsProd  = !!(process.env.NODE_ENV === 'production')

const sourceMapEnabled = IsProd
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: IsProd
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
