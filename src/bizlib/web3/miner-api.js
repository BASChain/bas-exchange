import { basMinerInstance } from './instances'
import { getWeb3 } from './index'

export function minerInstance(chainId,wallet){
  let web3js = getWeb3()
  const inst = basMinerInstance(web3js, chainId, { from: wallet })
  return inst;
}

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function recoverBAS(chainId,wallet){
  let web3js = getWeb3()
  const inst = basMinerInstance(web3js, chainId, { from: wallet })
  return inst.methods.withdraw().send({from:wallet})
}

export default {
  minerInstance,
  recoverBAS
}
