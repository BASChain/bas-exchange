const info = require('./info.json')

import  {getSupportNetworks } from '../bizlib/networks'

export const DAppInfo = Object.assign({},info,{
  browserRequire:['chrome','firefox'],
  extensionRequire:['MetaMask'],
  supportChain:[...getSupportNetworks()]
})

export default {
  DAppInfo
}
