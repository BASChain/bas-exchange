import { winWeb3 } from "../index";


import * as ApiErrors from '../api-errors.js'

import ContractJsons from '../abi-manager'
import {
  prehandleDomain, domain2Ascii, compareWei2Wei,
  canMaxRechargeYears, splitSubDomain, notNullHash,
  isOwner,
} from "../utils";

import {
  basTokenInstance,
  basRootDomainInstance,
  basOANNInstance,
  basViewInstance,
} from "./index";
import { checkSupport } from "../networks";


/**
 * Approve OANN token
 * @param {*} costwei
 * @param {*} chainId
 * @param {*} wallet
 */
export function approveToken4OannEmitter(costwei,chainId,wallet){
  if(!costwei || !chainId || !wallet)throw 'Parameter illegal.'

  const web3js = winWeb3()

  const approveAddress = ContractJsons.BasOANN(chainId).address

  if (!approveAddress)throw "approve Address is null"

  const token = basTokenInstance(web3js,chainId,{from:wallet})

  return token.methods.approve(approveAddress,costwei).send({from:wallet})
}

/**
 *
 * @param {*} param0
 */
export function registRootEmitter({
  domainText,
  openApplied,
  isCustomed,
  customPriceWei,
  years,
  chainId,
  wallet
}) {
  const web3js = winWeb3()
  const name = prehandleDomain(domainText);

  const namebytes = domain2Ascii(name)
  console.log('domain>namebytes>>',name, namebytes)
  const oann = basOANNInstance(web3js,chainId,{from:wallet})

  return oann.methods.registerRoot(
    namebytes,
    openApplied,
    isCustomed,
    customPriceWei,
    years
  ).send({from:wallet})
}

/**
 * Regist Sub Domain
 * @param {*} param0
 */
export function registSubEmitter({
  topText,
  subText,
  years = 1,
  chainId,
  wallet
}) {
  const web3js = winWeb3()

  const topname = prehandleDomain(topText);
  const subname = prehandleDomain(subText);

  const topbytes = domain2Ascii(topname)
  const subbytes = domain2Ascii(subname)
  console.log('domain>>>', subbytes)

  const oann = basOANNInstance(web3js, chainId, { from: wallet })

  return oann.methods.registerSub(topbytes, subbytes, years).send({ from: wallet})
}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export async function closeRootDomainPublic(hash,chainId,wallet){
  if(!hash || !wallet)throw ApiErrors.PARAM_ILLEGAL
  if(!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const opts = {from :wallet}

  //const token = basTokenInstance(web3js,chainId,Object.assign({},opts))
  const rootInst = basRootDomainInstance(web3js,chainId,Object.assign({},opts))

  const rootbase = await rootInst.methods.Root(hash).call()
  if (!rootbase.rootName) throw ApiErrors.DOMAIN_NOT_EXIST
  if(rootbase.openToPublic === false) throw ApiErrors.ROOT_REGIST_CLOSE

  const receipt = await rootInst.methods.setPublic(hash,false).send(Object.assign({},opts))
  const rootRet = await rootInst.methods.Root(hash).call()

  return {
    name: rootRet.rootName,
    hash: hash,
    openApplied: Boolean(rootRet.openToPublic),
    isCustomed: Boolean(rootRet.isCustom),
    customPrice: rootRet.customPrice
  }
}

export async function openRootDomainPublic(hash, chainId, wallet) {
  if (!hash || !wallet) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const opts = { from: wallet }

  //const token = basTokenInstance(web3js,chainId,Object.assign({},opts))
  const rootInst = basRootDomainInstance(web3js, chainId, Object.assign({}, opts))


  const rootbase = await rootInst.methods.Root(hash).call()
  if (!rootbase.rootName) throw ApiErrors.DOMAIN_NOT_EXIST
  //if (rootbase.openToPublic === false) throw ApiErrors.ROOT_REGIST_CLOSE
  const receipt = await rootInst.methods.setPublic(hash, true).send(Object.assign({}, opts))
  const rootRet = await rootInst.methods.Root(hash).call()

  return {
    name: rootRet.rootName,
    hash:hash,
    openApplied:Boolean(rootRet.openToPublic),
    isCustomed:Boolean(rootRet.isCustom),
    customPrice:rootRet.customPrice
  }
}

/**
 *
 * @param {*} hash
 * @param {*} customPrice
 * @param {*} chainId
 * @param {*} wallet
 */
export async function setCustomPrice(hash, customPrice, costwei,chainId,wallet) {
  if (!hash || !wallet || !customPrice || !costwei) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()

  const approveAddress = ContractJsons.BasOANN(chainId).address

  if (!approveAddress) throw "approve Address is null"

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const oann = basOANNInstance(web3js, chainId, { from: wallet })

  const basBal = await token.methods.balanceOf(wallet).call()
  console.log(basBal, costwei)

  if (compareWei2Wei(basBal, costwei)<0){
    throw ApiErrors.LACK_OF_TOKEN
  }
  try{
    await token.methods.approve(approveAddress, costwei).send({ from: wallet })
  }catch(ex){
    throw ApiErrors.TOKEN_APPROVE_FAIL
  }

  const receipt = await oann.methods.openCustomPrice(hash, customPrice).send({ from: wallet })
  return receipt

}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export async function closeCustomPrice(hash,chainId,wallet) {
  if (!hash || !wallet ) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const rootInst = basRootDomainInstance(web3js, chainId, { from: wallet })


  const rootbase = await rootInst.methods.Root(hash).call()
  if (!rootbase.rootName) throw ApiErrors.DOMAIN_NOT_EXIST

  const receipt = await rootInst.methods.closeCustomPrice(hash)
}

/**
 *
 * @param {*} domainhash
 * @param {*} year
 * @param {*} chainId
 * @param {*} wallet
 */
export async function validRecharge4Domain(domainhash,year,chainId,wallet) {

  //console.log("closeCustomPrice",domainhash,year)
  if (!domainhash || !year || !Web3.utils.isAddress(wallet) )throw apiErrors.PARAM_ILLEGAL

  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const spender = ContractJsons.BasOANN(chainId).address
  if (!Web3.utils.isAddress(spender)) throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()

  //const ethbal = await web3.eth.getBalance(wallet)

  const view = basViewInstance(web3js,chainId, { from : wallet })
  const token = basTokenInstance(web3js,chainId, { from : wallet })
  /** MAX_YEAR,AROOT_GAS,BROOT_GAS,SUB_GAS */
  const configRet = await view.methods.getOANNParams().call()
  const MAX_YEAR = configRet.MAX_YEAR

  const self = await view.methods.queryDomainInfo(domainhash).call()

  //console.log(self.name)
  if(!self.name) throw apiErrors.DOMAIN_NOT_EXIST
  const owner = self.owner
  const expiration = self.expiration
  const isRoot = self.isRoot
  const roothash = self.sRootHash

  const canMaxYear = canMaxRechargeYears(expiration, MAX_YEAR)

  if (parseInt(year) > canMaxYear )throw apiErrors.RECHARGE_YEAR_RANGE
  if(!isOwner(owner,wallet))throw apiErrors.PARAM_ILLEGAL

  let unitwei = configRet.SUB_GAS

  if (isRoot){
    unitwei = self.rIsRare ? configRet.AROOT_GAS : configRet.BROOT_GAS
  }else{
    if (notNullHash(roothash)){
      const rootRet = await view.methods.queryDomainInfo(roothash).call()

      if (rootRet.rIsCustom){
        if (!rootRet.rCusPrice) throw 'data error root domain:' + roothash
        unitwei = rootRet.rCusPrice
      }
    }
  }

  const costwei = (new Web3.utils.BN(year + '').mul(new Web3.utils.BN(unitwei)) ).toString()

  const baswei = await token.methods.balanceOf(wallet).call()

  if (compareWei2Wei(baswei,costwei) < 0)throw apiErrors.LACK_OF_TOKEN

  return {
    costwei,
    spender,
    year,
    owner,
    domainhash,
    isRoot
  }
}

/**
 *
 * @param {*} rBytes
 * @param {*} sBytes
 * @param {*} year
 * @param {*} chainId
 * @param {*} wallet
 */
export async function rechargeSubDomain(domaintext,year,chainId,wallet) {
  if (!domaintext || !year || !Web3.utils.isAddress(wallet)) throw apiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  const domainStruct = splitSubDomain(domaintext)
  const rName = domainStruct.topBytes
  const sName = domainStruct.subBytes

  const web3js = winWeb3()
  const oann = basOANNInstance(web3js, chainId, { from: wallet })
  return await oann.methods.rechargeSub(rName, sName,year).send( { from : wallet })
}

/**
 *
 * @param {*} domainhash
 * @param {*} year
 * @param {*} chainId
 * @param {*} wallet
 */
export async function rechargeRootDomain(domainhash,year,chainId,wallet){
  if(!domainhash || year <=0 || !wallet)throw apiErrors.PARAM_ILLEGAL
  if(!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const oann = basOANNInstance(web3js, chainId, { from: wallet })
  return await oann.methods.rechargeRoot(domainhash, year).send({ from: wallet })
}


export default {
  approveToken4OannEmitter,
  registRootEmitter,
  registSubEmitter,
  closeRootDomainPublic,
  setCustomPrice,
  closeCustomPrice,
  rechargeSubDomain,
}
