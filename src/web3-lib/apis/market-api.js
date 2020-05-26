import {toWei, isAddress} from 'web3-utils'

import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'
import { isOwner, assertExpired } from "../utils";

import ContractJson from '../abi-manager'


import {
  basViewInstance,
  basMarketInstance,
  basTraOwnershipInstance,
} from "./index";


/**
 *
 * @param {*} domainhash
 * @param {*} unitbas
 * @param {*} chainId
 * @param {*} wallet
 */
export async function validAdd2Market(domainhash,salebas,chainId,wallet){
  if (!domainhash || !salebas || !wallet)throw apiErrors.PARAM_ILLEGAL

  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()

  const view = basViewInstance(web3js,chainId,{ from : wallet })

  /** name,expiration,owner */
  const domainRet = await view.methods.queryDomainInfo(domainhash).call();
  console.log(domainRet)
  if (!domainRet.name)throw apiErrors.DOMAIN_NOT_EXIST
  const owner = domainRet.owner

  if (!isOwner(wallet, owner))throw apiErrors.NO_UPDATE_PERMISSIONS
  if (assertExpired(domainRet.expiration)) throw apiErrors.DOMAIN_EXPIRED

  const spender = ContractJson.BasMarket(chainId).address
  if (!isAddress(spender))throw apiErrors.PARAM_ILLEGAL

  const salewei = toWei(salebas+'','ether')

  return {
    domainhash,
    salewei,
    spender,
    chainId,
    wallet,
  }
}



/**
 *
 * @param {*} domainhash
 * @param {*} unitwei
 * @param {*} chainId
 * @param {*} wallet
 */
export async function addHashToMarket(domainhash,unitwei,chainId,wallet){
  if (!domainhash || !unitwei || !wallet) throw apiErrors.PARAM_ILLEGAL

  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()

  const market = basMarketInstance(web3js, chainId, { from : wallet })
  console.log(domainhash, unitwei)
  return await market.methods.AddToSells(domainhash, unitwei).send({ from: wallet })
}

export default {
  validAdd2Market,
  addHashToMarket
}
