const fs          = require('fs'),
  path            = require('path'),
  sh              = require('shelljs')

const relDir = path.resolve(path.join(__dirname,'..'),'build/Release')

console.log(relDir.toString())
checkDir(relDir)

function checkDir(dir){
  if(!fs.existsSync(dir)){
    sh.mkdir('-p',dir)
  }
}
