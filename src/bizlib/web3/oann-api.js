import { basTokenInstance,basOANNInstance } from './instances'
import { getWeb3, currentChainId, currentWallet } from './index'
import { toASCII } from '@/utils'
import punycode from 'punycode'

/**
 *
 * @param {*} year
 * @param {*} domain
 * @param {*} parentDomain
 */
export async function calcSubCost(year, domain, parentDomain,wallet) {
  let web3js = getWeb3()
  let chainId = currentChainId()
  if(!wallet)wallet = currentWallet()

  let token = basTokenInstance(web3js, chainId, { from: wallet })
  let inst = basOANNInstance(web3js,chainId,{from:wallet})
  let hexDomain = toASCII(punycode.toASCII(domain))
  let hexTopDomain = toASCII(punycode.toASCII(parentDomain))

  let balance = await token.methods.balanceOf(wallet).call()

  let ret = await inst.methods.evalueSubPrice(hexTopDomain, hexDomain, year).call({from:wallet})
  ret.currentBalance = balance

  console.log(ret)
  return ret;
}

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


export default {

}
