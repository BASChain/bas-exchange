const chalk = require("chalk"),
  DateFormat = require("fast-date-format"),
  fs = require("fs"),
  path = require("path"),
  sh = require("shelljs");


const r = (...p) => path.resolve(__dirname,'../',...p)
const ADDR_FILE_NAME = "contract_addresses.js"
const TARGET_ADDR_NAME = "addresses.js"


const env_path = path.resolve(path.join(process.cwd(), "config"), ".env");
const dotEnv = require("dotenv").config({
  path: env_path,
  encoding: "utf8"
});

if (dotEnv.error) {
  console.log(chalk.red("Load env Error:"), dotEnv.error);
  process.exit(1);
}

const PREV_HOURS = new DateFormat("DDHH").format(new Date());
const envArgs = dotEnv.parsed;
cpABIS();
//getABIFullPath();


function getABIFullPath(){
  const projectPath = envArgs.TRUFFLE_CONTACT_PROJECT

  if(!projectPath){
    console.log(chalk.red("No Truffle Project defined."));
    process.exit(1);
  }

  const fullPath = path.isAbsolute(projectPath) ? path.resolve(projectPath) : r('..',projectPath)

  if(!sh.find(fullPath).length){
    console.log(chalk.red("Truffle Project Contracts ABI Unfoud. Please Make sure your compile it."));
    process.exit(1);
  }else{
    console.log(fullPath, sh.find(fullPath));
  }
  return fullPath;
}


function getAddressesFilePath() {
  const fPath = envArgs.SMART_ADDRESSES_PATH

  if (!fPath) {
    console.log(chalk.red("No Truffle Project defined."));
    process.exit(1);
  }

  const fullPath = path.isAbsolute(fPath) ? path.resolve(fPath, ADDR_FILE_NAME) : r('..', fPath, ADDR_FILE_NAME)

  if (!sh.find(fullPath).length) {
    console.log(chalk.red("Truffle Project Address File Unfoud. Please Make sure your compile it."));
    process.exit(1);
  } else {
    console.log(fullPath, sh.find(fullPath));
  }
  return fullPath;
}


function cpABIS(){
  const src = getABIFullPath();

  if (!envArgs.TARGET_ABIS_HOME) {
    console.log(chalk.red("Configuration Local evn TARGET_ABIS_HOME first."));
    process.exit(1);
  }

  const target = r(envArgs.TARGET_ABIS_HOME);
  console.log(chalk.blueBright("Target ABIs"), target,src);

  sh.rm("-Rf", `${target}/**`);
  if (!fs.existsSync(target)) {
    sh.mkdir("-p", target);
  }

  sh.cp("-f", `${src}/**`, target);


  const srcAddrFile = getAddressesFilePath()
  const targetFile = path.resolve(target,TARGET_ADDR_NAME)
  sh.cp('-f', srcAddrFile, targetFile)

}




