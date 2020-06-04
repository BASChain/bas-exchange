import { basTokenInstance,basOANNInstance } from './instances'
import { getWeb3, } from './index'
//import punycode from 'punycode'
//1 to ascii
import ErrCodes from './error-codes'

const fromAscii = Web3.utils.fromAscii




export async function getOANNInstance(wallet) {
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let opts = {}
  if (wallet) {
    opts.from = wallet
  }
  let inst = basOANNInstance(web3js,chainId,opts)
  return inst
}

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export function oannInstance(chainId,wallet) {
  let web3js = getWeb3()
  return basOANNInstance(web3js, chainId, {from:wallet})
}



/**
 * 初始化DappState
 * @param {*} params
 */
export async function getDappState(wallet) {
  let state = {
    symbol: 'BAS',
    decimals: 18,
    gasPrice: 2000000000,
    rareGas: 500 * (10 ** 18),
    topGas: 20 * (10 ** 18),
    subGas: 4 * (10 ** 18),
    customedPriceGas: 100 * (10 ** 18),
    maxYearReg: 5,
    maxDaysReg: 157680000,
    aliasLen: 256,
    extensionLen: 512,
  }

  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let opts = {}
  if(wallet){
    opts.from = wallet
  }
  let token = basTokenInstance(web3js, chainId, opts)
  let oann = basOANNInstance(web3js, chainId, opts)

  state.symbol = await token.methods.symbol().call()
  state.decimals = await token.methods.decimals().call()

  let rareGas = await oann.methods.AROOT_GAS().call()
  state.rareGas = rareGas ||state.rareGas

  let topGas = await oann.methods.BROOT_GAS().call()
  state.topGas = topGas || state.topGas

  let subGas = await oann.methods.SUB_GAS().call()
  state.subGas = subGas || state.subGas

  let customedPriceGas = await oann.methods.CUSTOMED_PRICE_GAS().call()
  state.customedPriceGas = customedPriceGas || state.customedPriceGas

  let maxYearReg = await oann.methods.MAX_YEAR_REG().call()
  state.maxYearReg = maxYearReg || state.maxYearReg


  return state;
}

/**
 * @comment :newsol
 * @param {*} domainText
 */
export async function calcTopCost (
{
  domainText,
  isCustomed=false,
  years=1,
  chainId,
  wallet
}
) {

  let handleText = punycode.toASCII(domainText+'')
  let bytesStr = fromAscii(handleText)

  let web3js = getWeb3()
  const fromWei = web3js.utils.fromWei
  let inst = basOANNInstance(web3js,chainId,wallet);
  const token = basTokenInstance(web3js,chainId,wallet)

  const ret = {
    namehash:'',
    isValid:false,
    costWei:0,
    exist:false,
    ethBal:0,
    basBal:0
  }

  ret.ethBal = await web3js.eth.getBalance(wallet)
  ret.basBal = await token.methods.balanceOf(wallet).call()

  const result = await inst.methods.evalueRootPrice(
    bytesStr,isCustomed,years
  ).call()
  //console.log('====================>>>>>>', result)
  if (parseFloat(fromWei(ret.ethBal)) <= 0.0)
    throw ErrCodes.E1002

  if (parseFloat(fromWei(ret.basBal)) - parseFloat(fromWei(result.cost)) < 0) {
    throw ErrCodes.E1003
  }

  if (result.exist) throw ErrCodes.E6000;

  if (!result.isValid) throw ErrCodes.E7005

  ret.namehash = result.nameHash;
  ret.isValid = result.isValid
  ret.exist = result.exist
  ret.costWei = result.cost || 0
  return ret;
}


/**
 * @comment :newsol
 * @param {*} domainText
 */
export async function calcSubCost({
  subText,
  topText,
  years,
  chainId,
  wallet
}) {
  let bytesSub = fromAscii(punycode.toASCII(subText+''))
  let bytesTop = fromAscii(punycode.toASCII(topText+''))
  console.log(bytesSub,bytesTop)
  let web3js = getWeb3()
  const fromWei = web3js.utils.fromWei
  let inst = basOANNInstance(web3js, chainId, wallet);
  const token = basTokenInstance(web3js, chainId, wallet)

  const ret = {
    namehash: '',
    roothash:'',
    rootowner:'',
    isValid: false,
    costWei: 0,
    iscustomed:false,
    exist: false,
    ethBal: 0,
    basBal: 0
  }

  ret.ethBal = await web3js.eth.getBalance(wallet)
  ret.basBal = await token.methods.balanceOf(wallet).call()

  const result = await inst.methods.evalueSubPrice(
    bytesTop,bytesSub, years
  ).call()
  //console.log('====================>>>>>>',result)

  if (parseFloat(fromWei(ret.ethBal)) <= 0.0)
    throw ErrCodes.E1002

  if (parseFloat(fromWei(ret.basBal)) - parseFloat(fromWei(result.cost)) <0 ){
    throw ErrCodes.E1003
  }

  if (result.exist) throw ErrCodes.E6000;

  if (!result.isValid)throw ErrCodes.E7005


  ret.namehash = result.nameHash;
  ret.roothash = result.rootHash;
  ret.rootowner = result.rootOwner
  ret.iscustomed = result.isCustomed

  ret.isValid = result.isValid
  ret.exist = result.exist
  ret.costWei = result.cost
  return ret;
}

/**
 * Regist root
 * @param {*} param0
 */
export function registRootEmitter({
  domainText,
  openApplied=true,
  isCustomed=false,
  customPriceWei,
  years=1,
  chainId,
  wallet
}) {
  let web3js = getWeb3()
  let inst = basOANNInstance(web3js, chainId, wallet);
  let handleText = punycode.toASCII(domainText)
  let asciiName = fromAscii(handleText+'')

  return inst.methods.registerRoot(
    asciiName,
    openApplied,
    isCustomed,
    customPriceWei+'',
    years
  ).send({from:wallet})
}

/**
 * @Version: 0.2.0
 * @param {*} param0
 */
export function registSubEmitter({
  topText,
  subText,
  years = 1,
  chainId,
  wallet
}) {
  let web3js = getWeb3()
  let inst = basOANNInstance(web3js, chainId, wallet);

  let asciiTop = fromAscii(punycode.toASCII(topText+''))
  let asciiSub = fromAscii(punycode.toASCII(subText + ''))

  return inst.methods.registerSub(
    asciiTop,
    asciiSub,
    years
  ).send({ from: wallet })
}
/**
 *
 * @param {*} name
 * @param {*} year
 * @param {*} chainId
 * @param {*} wallet
 */
export function rechargeDomain(
  name,
  year,
  chainId,
  wallet
  ) {
  let web3js = getWeb3()
  let inst = basOANNInstance(web3js, chainId, wallet);

  const asciiName = fromAscii(punycode.toASCII(name + ''))
  console.log('>>>', asciiName, year,wallet,chainId)
  return inst.methods.recharge(asciiName, year).send({"from":wallet})
}

export default {

}
