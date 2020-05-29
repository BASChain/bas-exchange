import { toWei, isAddress, hexToString, keccak256} from 'web3-utils'

import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'
import { isOwner, assertExpired, parseHexDomain } from "../utils";

import ContractJson from '../abi-manager'

import {
  basViewInstance,
  basMarketInstance,
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

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getEWalletOrders(chainId,wallet){
  if(!isAddress(wallet)){
    throw apiErrors.PARAM_ILLEGAL
  }
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const market = basMarketInstance(web3js,chainId,{ from : wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })

  const total = await market.methods.ordersCountsOf().call()
  const hashes = await market.methods.ordersOf(0, total).call()

  let mailPromise = await (async ()=>{
    let hs = await market.methods.ordersOf(0, total).call()
    return hs.map(h =>{
      return view.methods.queryOrderInfo(wallet,h).call()
    })
  })()

  let mails = await Promise.all(mailPromise)

  mails = mails.map( m => {
    const hash = keccak256(hexToString(m.name))
    return {
      hash,
      name: hexToString(m.name),
      domaintext:parseHexDomain(m.name),
      invalid:Boolean(m.isValid),
      price:m.price
    }
  })
  console.log(hashes, mails)
  return hashes
}

export default {
  validAdd2Market,
  addHashToMarket,
  getEWalletOrders
}
