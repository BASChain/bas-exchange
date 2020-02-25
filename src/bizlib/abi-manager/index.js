import { BasToken,BasAsset,BasMarket,BasOANN,BasMiner,BasDns} from './abi-names'
import { BasTokenAddresses, BasTokenABI } from './bas-token'
import { BasAssetAddresses, BasAssetABI } from './bas-asset'
import { BasMarketAddresses, BasMarketABI } from './bas-market'
import { BasOANNAddresses, BasOANNABI } from './bas-oann'
import { BasMinerAddresses, BasMinerABI } from './bas-miner'
import { BasDnsAddresses, BasDnsABI } from './bas-dns'




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
      address:BasDnsAddresses
    }
  }
}
