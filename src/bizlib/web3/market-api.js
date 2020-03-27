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


export default {
  marketInstance,
}
