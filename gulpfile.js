const pkgJson = require('./package.json')

const DateFormat = require('fast-date-format'),
  dotenv = require('dotenv'),
  gulp = require('gulp'),
  jsoneditor = require('gulp-json-editor'),
  path = require('path'),
  rename = require('gulp-rename')

const envArgs = dotenv.config({
  path:path.resolve(process.cwd(),'./config/.env'),
  encoding:'utf8'
})
if(envArgs.error){
  throw envArgs.error
}else {
  console.log('Build Project At:',isDevelopmentMode()?'development':'production')
}

const dateFormat = isDevelopmentMode() ? new DateFormat('MMDDDD_HHmm') : new DateFormat('YYDDDD')

const ProPaths = {
  SRC:"src",
  ASSETS:"public",
  BUILD:"build",
  DEST:"dist",
  CI:"ci"
}
const DAppInfoFile = `${ProPaths.CI}/version-info.json`

gulp.task('edit:dappinfo',function(){
  return gulp.src(DAppInfoFile)
    .pipe(jsoneditor((json) => {
      //console.log(JSON.stringify(json,null,2))
      return writeDAppInfo(json)
    }))
    .pipe(rename('info.json'))
    .pipe(gulp.dest(`${ProPaths.SRC}/bascore/`,{overwrite:true}))
})

function writeDAppInfo(json) {
  if(!json)json = {}
  let _ver = process.env.DAPP_VER || pkgJson.version
  let _ts = dateFormat.format(new Date())

  json.version = _ver
  json.name = process.env.DAPP_NAME || pkgJson.name ||'BasDApp'
  json.author = pkgJson.author || process.env.DAPP_AUTHOR||''
  json.buildTag = `${_ver}_${_ts}`

  //console.log(JSON.stringify(json,null,2))

  return json
}

gulp.task('default',gulp.series('edit:dappinfo'))

function isDevelopmentMode(){
  return !(process.env.NODE_ENV == 'production')
}
