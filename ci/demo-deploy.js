const pkgJson   = require('../package.json'),
  chalk         = require('chalk'),
  DateFormat    = require('fast-date-format'),
  fs            = require('fs'),
  path          = require('path'),
  sh            = require('shelljs'),
  zip           = require('bestzip')


const r = p => path.resolve(__dir,'../',p)

const env_path  = path.resolve(path.join(process.cwd(),'config'),'.env')
const dotEnv = require('dotenv').config({
  path:env_path,
  encoding:'utf8'
})

if(dotEnv.error) {
  console.log(chalk.red('Load env Error:'),dotEnv.error)
  process.exit(1)
}
const PREV_HOURS = (new DateFormat('DDHH')).format(new Date())
const envArgs = dotEnv.parsed

if(!sh.which('ssh')){
  console.log(chalk.red('your enviroment need ssh support'))
  process.exit(1)
}


const IsDev = !!(process.env.NODE_ENV === 'development')
const suffixFormat = IsDev ? new DateFormat('MMDDHHmm') : new DateFormat('YYDDDD')
const stdDateFormat = new DateFormat('YYYY-MM-DD HH:mm:ss');
const now = new Date();

const APP_NAME = envArgs.APP_NAME || pkgJson.name || 'demo'
const APP_VERSION = envArgs.APP_VERSION || pkgJson.version || '1.0.0'

let IENV = {
  RELEASE:"build/Release",
  DIST:"dist",
  TS_TEXT: stdDateFormat.format(now),
  TS_SUFFIX: suffixFormat.format(now),
  BUILD_MD:comboBuildMarkdown(APP_NAME,APP_VERSION)
}

const CheckProps = {
  "REMOTE_HOST":"主机IP",
  "SSH_KEY":"授权秘钥",
  "REMOTE_DIST":"上传目录",
  "REMOTE_WWW":"部署目录"
}

//1. check enviroments
prevCheck()
//2. merge env
IENV = handleEnv(IENV,envArgs)
console.log(chalk.green('current enviroment:'))
console.log(chalk.yellowBright(JSON.stringify(IENV,null,2)))
//3. build app maunal

//4. write build Info
const infoName = comboBuildMarkdown(APP_NAME,APP_VERSION,IENV.TS_SUFFIX);
const infoText = `${APP_NAME} : ${APP_VERSION} \n ` +
  `Build at ${IENV.TS_TEXT}`
writeAppInfo(infoName,infoText);


//5 zip
const zipfile = comboZipName(APP_NAME,APP_VERSION);
const ZipOpts = {
  source:"*",
  destination:getReleaseFilePath(IENV.RELEASE,zipfile)
}
console.log('ZipOpts',JSON.stringify(ZipOpts,null,2))

const secondIP = IENV.SECOND_HOST;
execZipFile(ZipOpts).then(res =>{
  console.log('ZipOut:',res)
  pushZip2Remote(ZipOpts.destination)

  if(secondIP){
    pushZip2SeconRemot(ZipOpts.destination, secondIP)
  }
}).catch(err=>{
  console.log('ZipOut:',err)
})


async function execZipFile(opts) {
  const _base = path.resolve(path.join(__dirname,'..'))
  sh.cd(IENV.DIST);
  return new Promise((resolve,reject) =>{
    zip(opts).then(()=>{
      let zipDest = opts.destination
      const info = `zip ${zipDest} completed.`
      sh.cd(_base)
      resolve(info)
    }).catch(err=>{
      console.log(err)
      sh.cd(_base)
      reject(err)
    })
  })
}

function pushZip2SeconRemot(zipFilePath,secondIP) {
  let sshKeyFile = getSSHKeyFile(envArgs["SSH_KEY"])
  const port = IENV.REMOTE_PORT;
  const remoteDist = IENV.REMOTE_DIST
  const zipPathObjet = path.parse(zipFilePath)
  const user = IENV.REMOTE_USER
  const sshstr = concatSSH(user, secondIP);
  const pushFile = getReleasePushFile(zipPathObjet.base)
  const command = concatCMD(sshKeyFile, pushFile, sshstr, remoteDist);
  console.log(command);

  console.log(
    chalk.yellow('start push second file [') +
    chalk.blueBright(zipFilePath) +
    chalk.yellow('] to remote:') +
    chalk.blueBright(`${sshstr}`)
  )

  const PushExec = sh.exec(command, { async: false, silent: false }, function (code, stdout, stderr) {
    if (stderr) {
      console.log(chalk.red(stderr))
    }
    if (stdout) {
      console.output(stdout)
    }
    if (code) {
      console.log('>>>>>', code)
    }
  })
  return PushExec;

  function concatCMD(sshkey, file, ssh, dist) {
    let cmd = `SCP -i ${sshkey} -P ${port} ${file} ${ssh}:${dist}`
    return cmd;
  }

  function getReleasePushFile(file) {
    let fp = path.join(IENV.RELEASE, file);
    fp = fp.replace(/\\/g, '\/')
    return fp;
  }
}

function pushZip2Remote(zipFilePath){
  let sshKeyFile = getSSHKeyFile(envArgs["SSH_KEY"])
  const port = IENV.REMOTE_PORT;
  const ip = IENV.REMOTE_HOST;
  const remoteDist = IENV.REMOTE_DIST
  const user = IENV.REMOTE_USER
  const www = IENV.REMOTE_WWW

  const zipPathObjet = path.parse(zipFilePath)
  const sshstr = concatSSH(user,ip);
  const pushFile = getReleasePushFile(zipPathObjet.base)
  const command = concatCMD(sshKeyFile,pushFile,sshstr,remoteDist);

  console.log(command);

  console.log(
    chalk.yellow('start push file [')+
    chalk.blueBright(zipFilePath) +
    chalk.yellow('] to remote:') +
    chalk.blueBright(`${sshstr}`)
  )

  const PushExec = sh.exec(command,{async:false,silent: false},function(code,stdout,stderr){
    if(stderr){
      console.log(chalk.red(stderr))
    }
    if(stdout){
      console.output(stdout)
    }
    if(code){
      console.log('>>>>>',code)
    }
  })

  return PushExec;

  function concatCMD(sshkey,file,ssh, dist){
    let cmd = `SCP -i ${sshkey} -P ${port} ${file} ${ssh}:${dist}`
    return cmd;
  }

  function getReleasePushFile(file){
    let fp = path.join(IENV.RELEASE,file);
    fp = fp.replace(/\\/g,'\/')
    return fp;
  }
}

function concatSSH(user,host) {
  return `${user}@${host}`
}

function prevCheck(){
  const warnings = [];
  const keys = Object.keys(CheckProps);
  for(let i =0;i<keys.length ;i++){
    const _key = keys[i]
    if(!envArgs[_key]){
      let _name = CheckProps[_key]
      warnings.push(
        chalk.blueBright(`[${_name}]:`) +
        chalk.red(`${_key} should be set in your .env file.`)
      )
    }
  }

  if(!warnings.length){
    let sshKeyFile = getSSHKeyFile(envArgs["SSH_KEY"])
    console.log(chalk.greenBright(`check ssh_key:${sshKeyFile} exists...`))
    if(sh.find(sshKeyFile).length <= 0 ){
      warnings.push(
        chalk.yellow(`${CheckProps.SSH_KEY} : `) +
        chalk.red(`[${sshKeyFile}] not fund.`)
      )
    }else{
      IENV.SSHKEY_FILE = sshKeyFile
    }
  }

  if(warnings.length){
    console.log('')
    console.log(chalk.redBright('You must check your local enviroment config,'+
      'at [' +`${env_path}`+']:'
    ))
    console.log('')
    for(let j=0;j<warnings.length;j++){
      const warning = warnings[j]
      console.log('   '+warning)
    }

    console.log()
    process.exit(1)
  }else{
    console.log(chalk.blue('checked passing...'))
  }

}

function handleEnv(ienv,extEnv){
  const user = extEnv.REMOTE_USER ||ienv.REMOTE_USER ||'root'
  let port = extEnv.REMOTE_PORT || ienv.REMOTE_PORT || 22
  if(typeof port === 'string'){
    port = (parseInt(port) == 0) ?  22 : parseInt(port)
  }

  return Object.assign(ienv,extEnv,{
    REMOTE_USER:user,
    REMOTE_PORT:port
  })
}

function getSSHKeyFile(sshKey){
  let ssh_home = process.env['HOME'] || process.env['USERPROFILE'];

  let sshkeyFile = path.resolve(path.join(ssh_home,'.ssh'),sshKey)

  return sshkeyFile;
}


function comboZipName(appName,version,suffix) {
  let name = `${appName}_${version}`
  if(suffix && suffix.trim()){
    name = name +suffix.trim()
  }
  if(envArgs.IS_PREV_HOURS){
    name = `${PREV_HOURS}_${name}`
  }
  return `${name}.zip`
}

function comboBuildMarkdown(name,version) {
  return `${name}_${version}.md`
}

function writeAppInfo(fileName,content){
  sh.rm('-rf',`dist/${APP_NAME}_*.md`)
  let file =path.resolve(path.join(__dirname,'..'),IENV.DIST,fileName)
  fs.writeFileSync(file,content,'utf8');
}

function getReleaseFilePath(release,file){

  let relDir =  path.resolve(path.join(__dirname,'..'),release)
  checkDir(relDir)

  return  path.resolve(path.join(__dirname,'..'),release,file)
}



function checkDir(dir){
  if(!fs.existsSync(dir)){
    sh.mkdir('-p',dir)
  }
}


