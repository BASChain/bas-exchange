'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '""'
})
//  VUE_APP_BASE_API: '""'
// VUE_APP_BASE_API: '"/api"'
//http://47.113.87.58
