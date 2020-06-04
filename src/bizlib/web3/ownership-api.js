import { basOwnerShipInstance } from './instances'
import { getWeb3 } from './index'


/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export function ownerShipInstance(chainId,wallet) {
  let web3js = getWeb3()
  const inst = basOwnerShipInstance(web3js, chainId, { from : wallet})
  return inst;
}

/**
 *
 * @param {*} to
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export function transferDomainEmitter(to,hash,chainId,wallet) {
  let web3js = getWeb3()
  const inst = basOwnerShipInstance(web3js, chainId, { from: wallet })
  return inst.methods.transfer(hash,to).send({ from: wallet })
}



export default {
  ownerShipInstance,
  transferDomainEmitter,
}
