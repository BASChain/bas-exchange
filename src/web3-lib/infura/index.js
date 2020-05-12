import InfuraCfg from './infura-cfg'
import { getNetwork } from '../networks'
import proTypes from './provider-types'
import Web3 from 'web3'


const InfuraProps = {
  ver: 'v3',
  projectId: InfuraCfg.INFURA_PROJECTID,
  secret: InfuraCfg.INFURA_SECRET,
  host: 'infura.io'
}


/**
 *
 * @param {*} chainId
 * @param {*} providerType
 */
export function getProviderURL(chainId,providerType) {
  const network = getNetwork(chainId)
  const nwPrefix = network.name.toLocaleLowerCase()
  switch (providerType) {
    case proTypes.HTTP:
      return `${proTypes.HTTP}://${nwPrefix}.${InfuraProps.host}/${InfuraProps.ver}/${InfuraProps.projectId}`;
    case proTypes.HTTPS:
      return `${proTypes.HTTPS}://${nwPrefix}.${InfuraProps.host}/${InfuraProps.ver}/${InfuraProps.projectId}`;
    case proTypes.WSS:
      return `${proTypes.WSS}://${nwPrefix}.${InfuraProps.host}/ws/${InfuraProps.ver}/${InfuraProps.projectId}`;
    default:
      return `${proTypes.HTTPS}://${nwPrefix}.${InfuraProps.host}/${InfuraProps.ver}/${InfuraProps.projectId}`;
  }
}

/**
 * chainId
 * @param {*} chainId
 */
export function getInfuraWeb3(chainId){
  if(chainId === undefined || chainId === 0){
    if(window.ethereum && window.ethereum.chainId){
      chainId = parseInt(window.ethereum.chainId)
    }else{
      chainId = 1
    }
  }
  const providerUrl = getProviderURL(chainId, proTypes.HTTPS)
  console.log('Local develop:', providerUrl)
  return new Web3(providerUrl)
}


export function BindInfura(){
  const _infura = function(){
    this.providerType = proTypes.HTTPS
  }

  _infura.prototype.getWeb3 = function(chainId){
    const LOCAL_CID = process.env.LOCAL_CID || ''
    if (LOCAL_CID === chainId && window.web3 && window.ethereum){
      console.log('Local develop:', LOCAL_CID)
      return window.web3
    }

    return getInfuraWeb3(chainId)
  }

  window.$infura = new _infura()
}

export default {
  BindInfura,
  getInfuraWeb3,
}
