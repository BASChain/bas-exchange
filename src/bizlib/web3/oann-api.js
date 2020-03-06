import { basTokenInstance,basOANNInstance } from './instances'
import { getWeb3, currentChainId, currentWallet } from './index'
import { toHex, hexToString } from 'web3-utils'

/**
 *
 * @param {*} year
 * @param {*} domain
 * @param {*} parentDomain
 */
export async function calcSubCost(year, domain, parentDomain,wallet) {
  let web3js = getWeb3()
  let chainId = currentChainId()
  if(!wallet)wallet = currentWallet()

  let token = basTokenInstance(web3js, chainId, { from: wallet })
  let inst = basOANNInstance(web3js,chainId,{from:wallet})
  let hexDomain = toHex(domain)
  let hexTopDomain = toHex(parentDomain)

  let balance = await token.methods.balanceOf(wallet).call()

  let ret = await inst.methods.evalueSubPrice(hexTopDomain, hexDomain, year).call()
  ret.currentBalance = balance

  console.log(ret)
  return ret;
}

export async function getOANNInstance(wallet) {
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();

  let inst = basOANNInstance(web3js,chainId,wallet)
  return inst
}



export default {

}
