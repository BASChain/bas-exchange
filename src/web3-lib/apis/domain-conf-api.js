import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'

import {
  basDomainConfInstance,
} from "./index";

import { confDatas2hex } from '../utils/index'

/**
 *
 */
export const DomainConfTypes = {
  ipv4: "A",
  ipv6: "AAAA",
  mailExchange: "MX",
  blockChain: "BlockChain",
  iota: "IOTA",
  canonicalName: "CName",
  mxbca: "MXBCA",
  extrainfo: "Optional"
}

export function findTypName(type){
  return Object.values(DomainConfTypes).find(t => t===type)
}

/**
 *
 * @param {*} type
 *  (ipv4,ipv6,mailExchange,blockChain,iota,canonicalName,mxbca,extrainfo)
 * @param {*} hash
 * @param {*} chainId
 */
export async function cleanConfData(type,hash,chainId,wallet){
  console.log(chainId)
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK
  if (!type||!hash || !wallet || !Web3.utils.isAddress(wallet))throw apiErrors.PARAM_ILLEGAL
  if (!findTypName(type)) throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const opts = {from:wallet}

  const inst = basDomainConfInstance(web3js,chainId,Object.assign({},opts))
  const typName = findTypName(type)
  const receipt = await inst.methods.updateByOwner(hash, typName, '0x').send(opts)

  return receipt
}

/**
 *
 * @param {*} type required A ,AAAA
 * @param {*} hash required
 * @param {*} datas required [] or [...string]
 * @param {*} chainId required
 * @param {*} wallet required
 */
export function updateConfData(type,hash,datas,chainId,wallet){

  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  if (!type || !hash || !wallet || !Web3.utils.isAddress(wallet) || !datas) throw apiErrors.PARAM_ILLEGAL
  if (!findTypName(type)) throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const opts = { from: wallet }

  const inst = basDomainConfInstance(web3js, chainId, Object.assign({}, opts))
  const typName = findTypName(type)

  const hexData = confDatas2hex(datas)

  return inst.methods.updateByOwner(hash, typName, hexData).send(opts)
}




export default {
  DomainConfTypes
}
