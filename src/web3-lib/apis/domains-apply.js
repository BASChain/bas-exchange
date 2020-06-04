import { winWeb3 } from "../index";

import {
  basViewInstance,
  basTokenInstance,
} from "./index";

import {
  MinGasWei, compareWei2Wei, prehandleDomain,
  isRare,assertNullAddress,
} from "../utils";

import * as ApiErrors from '../api-errors.js'

import { checkSupport } from "../networks";



export async function preCheck4Root({
  domaintext,
  isCustomed,
  customWei,
  years,
  chainId,
  wallet,
}) {
  if (domaintext === undefined
    || !years || !wallet) throw ApiErrors.PARAM_ILLEGAL

  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3();

  const name = prehandleDomain(domaintext)
  const hash = Web3.utils.keccak256(name)

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })

  //MAX_YEAR,AROOT_GAS,BROOT_GAS,SUB_GAS,CUSTOM_PRICE_GAS
  const domainCfg = await view.methods.getOANNParams().call()

  const ethwei = await web3js.eth.getBalance(wallet);
  if (compareWei2Wei(ethwei, MinGasWei) <= 0) throw ApiErrors.LACK_OF_ETH

  const exist = await view.methods.queryDomainInfo(hash).call()

  if (exist.name || !assertNullAddress(exist.owner)) {
    throw ApiErrors.DOMAIN_HAS_TAKEN
  }
  if (parseInt(years) < 0 || parseInt(years) > domainCfg.MAX_YEAR) throw ApiErrors.PARAM_ILLEGAL

  const unitwei = isRare(name) ? domainCfg.AROOT_GAS : domainCfg.BROOT_GAS

  let costweiBN = new Web3.utils.BN(unitwei).mul(new Web3.utils.BN(years + ''))
  if(isCustomed){
    costweiBN = costweiBN.add(new Web3.utils.BN(domainCfg.CUSTOM_PRICE_GAS))
  }

  const costwei = costweiBN.toString()
  const baswei = await token.methods.balanceOf(wallet).call()

  if (compareWei2Wei(baswei, costwei) < 0) throw ApiErrors.LACK_OF_TOKEN

  return {
    costwei,
    hash,
  }

}
/**
 *
 * @param {*} roottext
 * @param {*} subtext
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function preCheck4Sub(
  roottext,
  subtext,
  years,
  chainId,
  wallet
) {
  if (roottext === undefined || subtext === undefined
    || !years  || !wallet) throw ApiErrors.PARAM_ILLEGAL

  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3();

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })

  //MAX_YEAR,AROOT_GAS,BROOT_GAS,SUB_GAS,CUSTOM_PRICE_GAS
  const domainCfg = await view.methods.getOANNParams().call()
  let unitGas = domainCfg.SUB_GAS

  const rootname = prehandleDomain(roottext);
  const subname = prehandleDomain(subtext);

  const roothash = Web3.utils.keccak256(rootname)
  const rootRet = await view.methods.queryDomainInfo(roothash).call()

  if (rootRet.name){
    if (!rootRet.rIsOpen) throw ApiErrors.ROOT_REGIST_CLOSE

    if(rootRet.rIsCustom && rootRet.rCusPrice){
      unitGas = rootRet.rCusPrice
    }
  }

  if (parseInt(years) < 0 || parseInt(years) > domainCfg.MAX_YEAR)throw ApiErrors.PARAM_ILLEGAL

  //bas
  const costwei = (new Web3.utils.BN(unitGas).mul(new Web3.utils.BN(years))).toString()
  const baswei = await token.methods.balanceOf(wallet).call()

  if (compareWei2Wei(baswei,costwei) <0)throw ApiErrors.LACK_OF_TOKEN

  const hash = Web3.utils.keccak256(`${subname}.${rootname}`)
  const exist = await view.methods.queryDomainInfo(hash).call()
  console.log(exist)
  if (exist.name || !assertNullAddress(exist.owner)){
    throw ApiErrors.DOMAIN_HAS_TAKEN
  }

  return {
    hash,
    roothash,
    costwei
  }

}


export default {
  preCheck4Sub
}
