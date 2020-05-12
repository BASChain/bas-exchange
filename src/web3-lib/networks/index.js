import NWTypes from './network-types'

const DEF_CHAINID = 3

export const Networks = [
  { chainId: 1, name: NWTypes.MAINNET, state: true },
  { chainId: 3, name: NWTypes.ROPSTEN, state: true },
  { chainId: 4, name: NWTypes.RINKEBY, state: false },
  { chainId: 5, name: NWTypes.GOERILI, state: false },
  { chainId: 42, name: NWTypes.KOVAN, state: false }
]

export function getDefaultNetwork(){
  return Networks.find(network => network.chainId === 3)
}

/**
 * Unfound or unsupport return default
 * @param {*} chainId
 */
export function getNetwork(chainId) {
  if (!checkSupport(chainId))return getDefaultNetwork();
  return Networks.find(nw => nw.chainId === parseInt(chainId))
}

/**
 *
 * @param {*} chainId
 */
export function checkSupport(chainId){
  if(chainId === undefined)throw 'ChainId Illegal'
  const nw = Networks.find(nw => nw.chainId === parseInt(chainId))

  return nw && nw.state
}

export default {
  getNetwork,
  getDefaultNetwork,
  checkSupport
}
