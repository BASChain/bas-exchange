import { winWeb3 } from "../index";

//import { keccak256, hexToString, BN } from "web3-utils";

import * as ApiErrors from '../api-errors.js'

import ContractJsons from '../abi-manager'
import { prehandleDomain, domain2Ascii } from "../utils";

import {
  basTokenInstance,
  basRootDomainInstance,
  basOANNInstance,
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


export default {
  approveToken4OannEmitter,
  registRootEmitter,
  registSubEmitter,
  closeRootDomainPublic
}
