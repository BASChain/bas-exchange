const VTag = 'v3'
export const ProjectId = '1362a998079949baaea80eb017fe1f0f'
const InSec = '4fed2035cab14c39ae7602bc54e7f297'
const infuraDomain = 'infura.io'
//infura manager project BAS

import { checkSupport,getNetwork } from '../networks'
import * as ProviderTypes from './infura-provider-types'

export const HttpInfuraProviderURL = (chainId = 3) =>{
  return getProviderURL(chainId,ProviderTypes.HTTPS)
}

export const WssInfuraProviderURL = (chainId = 3) =>{
  if(!checkSupport(chainId))throw 3001
  return getProviderURL(chainId,ProviderTypes.WSS)
}

/**
 * https://:${insec}@${network}.infura.io/v3/${projectId}
 * @param {*} chainId
 * @param {*} providerType
 */
export function getProviderURL(chainId,providerType) {
  let network = getNetwork(chainId)

  let host = `${network.name}.${infuraDomain}`
  //host= 'localhost:9527'
  switch(providerType){
    case ProviderTypes.HTTP :
      return `${ProviderTypes.HTTP }://${host}/${VTag}/${ProjectId}`
    case ProviderTypes.HTTPS :
      return `${ProviderTypes.HTTPS }://${host}/${VTag}/${ProjectId}`
    case ProviderTypes.HTTPSEC :
      return `${ProviderTypes.HTTPS }://:${InSec}@${host}/${VTag}/${ProjectId}`
    case ProviderTypes.WSS :
      return `${ProviderTypes.WSS }://${host}/${VTag}/${ProjectId}`
    default:
      throw `3001:unsupport type:${providerType}`
  }

}


export default {
  ProjectId,
  VTag,
}
