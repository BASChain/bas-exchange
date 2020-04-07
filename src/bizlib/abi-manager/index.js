import { BasToken, BasAsset, BasMarket,
  BasOANN, BasMiner, BasDns, BasGetFree,
  BasSendFree, BasOwnerShip, BasTransCheck}
from './abi-names'

import { BasTokenAddresses, BasTokenABI } from './bas-token'
import { BasAssetAddresses, BasAssetABI } from './bas-asset'
import { BasMarketAddresses, BasMarketABI } from './bas-market'
import { BasOANNAddresses, BasOANNABI } from './bas-oann'
import { BasMinerAddresses, BasMinerABI } from './bas-miner'
import { BasDnsAddresses, BasDnsABI } from './bas-dns'
import { BasOwnerShipAddresses,BasOwnerShipABI } from './bas-ownership'
import { BasGetFreeAddresses, BasGetFreeABI } from './bas-getfree'
import { BasSendFreeAddresses, BasSendFreeABI} from './bas-sendfree'
import { BasTransCheckAddresses, BasTransCheckABI} from './bas-transcheck'



export default {
  [BasToken](chainId){
    return {
      abi:BasTokenABI,
      address:BasTokenAddresses[chainId] ||''
    }
  },
  [BasAsset](chainId){
    return {
      abi:BasAssetABI,
      address:BasAssetAddresses[chainId] ||''
    }
  },
  [BasMarket](chainId) {
    return {
      abi:BasMarketABI,
      address:BasMarketAddresses[chainId] ||''
    }
  },
  [BasOANN](chainId) {
    return {
      abi:BasOANNABI,
      address:BasOANNAddresses[chainId] ||''
    }
  },
  [BasMiner](chainId) {
    return {
      abi:BasMinerABI,
      address:BasMinerAddresses[chainId] ||''
    }
  },
  [BasDns](chainId) {
    return {
      abi:BasDnsABI,
      address: BasDnsAddresses[chainId]||''
    }
  },
  [BasGetFree](chainId) {
    return {
      abi: BasGetFreeABI,
      address: BasGetFreeAddresses[chainId] || ''
    }
  },
  [BasSendFree](chainId){
    return {
      abi: BasSendFreeABI,
      address: BasSendFreeAddresses[chainId] || ''
    }
  },
  [BasOwnerShip](chainId) {
    return {
      abi:BasOwnerShipABI,
      address:BasOwnerShipAddresses[chainId]
    }
  },
  [BasTransCheck](chainId){
    return {
      abi: BasTransCheckABI,
      address: BasTransCheckAddresses[chainId]
    }
  }
}
