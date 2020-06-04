import ApiErrors from '../api-errors'
import { winWeb3 } from "../index";
import {
  assertNullAddress
} from '../utils'

import {
  basTraOwnershipInstance
} from './index'

import { checkSupport } from '../networks'


/**
 *
 * @param {*} domainhash
 * @param {*} spender
 * @param {*} chainId
 * @param {*} wallet
 */
export async function validTransOwnership(domainhash,spender,chainId,wallet){
  if (!domainhash || !Web3.utils.isAddress(spender) || !Web3.utils.isAddress(wallet)) throw ApiErrors.PARAM_ILLEGAL

  if ((!checkSupport(chainId))) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()

  const owsInst = basTraOwnershipInstance(web3js,chainId,{from:wallet})

  const ret = await owsInst.methods.ownerOfWithExpire(domainhash).call()

  if (assertNullAddress(ret[0])||!ret[1])throw ApiErrors.DOMAIN_NOT_EXIST

  const nowts = parseInt((new Date().getTime())/1000)
  if(nowts - parseInt(ret[1]) > 0)throw ApiErrors.DOMAIN_EXPIRED

  if((ret[0]+'').toLowerCase() !== wallet.toLowerCase())throw ApiErrors.ACCOUNT_NOT_MATCHED

  return true
}


/**
 *
 * @param {*} domainhash
 * @param {*} spender
 * @param {*} chainId
 * @param {*} wallet
 */
export function approveTraOspEmitter(domainhash, spender, chainId, wallet) {
  const web3js = winWeb3()

  const owsInst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  return owsInst.methods.approve(domainhash,spender).send({from:wallet})
}

/**
 *
 * @param {*} domainhash
 * @param {*} to
 * @param {*} chainId
 * @param {*} wallet
 */
export async function transferOwnershipEmitter(domainhash,to,chainId,wallet){
  if (!domainhash || !Web3.utils.isAddress(to) || !Web3.utils.isAddress(wallet)) throw ApiErrors.PARAM_ILLEGAL

  if ((!checkSupport(chainId))) throw ApiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()

  const owsInst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  return owsInst.methods.transfer(domainhash, to).send({ from: wallet })
}

export async function transoutOwnershipCi(domainhash, spender, chainId, wallet){
  if (!domainhash || !Web3.utils.isAddress(spender) || !Web3.utils.isAddress(wallet)) throw ApiErrors.PARAM_ILLEGAL

  if ((!checkSupport(chainId))) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()

  const owsInst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  const ret = await owsInst.methods.ownerOfWithExpire(domainhash).call()

  if (assertNullAddress(ret[0]) || !ret[1]) throw ApiErrors.DOMAIN_NOT_EXIST

  const nowts = parseInt((new Date().getTime()) / 1000)
  if (nowts - parseInt(ret[1]) > 0) throw ApiErrors.DOMAIN_EXPIRED

  if ((ret[0] + '').toLowerCase() !== wallet.toLowerCase()) throw ApiErrors.ACCOUNT_NOT_MATCHED

  try{
    //await owsInst.methods.approve(domainhash, spender).send({ from: wallet }).catch(ex => { throw ex })
    await owsInst.methods.transfer(domainhash, spender).send({ from: wallet }).catch(ex=>{throw ex})

    return domainhash
  }catch(ex){
    throw ex
  }
}

export default {
  validTransOwnership,
  approveTraOspEmitter,
  transferOwnershipEmitter,
}
