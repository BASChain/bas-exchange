import { basMarketInstance } from './instances'
import { getWeb3 } from './index'
import * as ErrCodes from './error-codes'

/**
 * 不检查chainId support
 * @param {*} chainId
 * @param {*} wallet
 */
export function marketInstance(chainId,wallet) {
  let web3js = getWeb3()
  const inst = basMarketInstance(web3js, chainId, { from: wallet })
  return inst;
}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export function removeSellOrderEmitter(hash,chainId,wallet) {
  let web3js = getWeb3()
  const inst = basMarketInstance(web3js, chainId, { from: wallet })
  return inst.methods.RemoveSellOrder(hash).send({from:wallet})
}

export function buyFromSellEmitter(hash,owner, chainId, wallet) {
  let web3js = getWeb3()
  const inst = basMarketInstance(web3js, chainId, { from: wallet })

  return inst.methods.BuyFromSells(hash, owner).send({ from: wallet })
}

/**
 * 改价
 * @param {*} hash
 * @param {*} strWei
 * @param {*} chainId
 * @param {*} wallet
 */
export function changeOnSellPriceEmitter(hash,strWei,chainId,wallet){
  let web3js = getWeb3()
  const inst = basMarketInstance(web3js, chainId, { from: wallet })
  return inst.methods.ChangeSellPrice(hash, strWei).send({ from: wallet })
}

export default {
  marketInstance,
  removeSellOrderEmitter,
}
