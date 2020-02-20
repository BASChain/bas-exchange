import {MAINNET, ROPSTEN, RINKEBY, GOERILI, KOVAN, LOCAL} from './network-types.js'

export const Networks = [
  {chainId:1,name:MAINNET,state:true},
  {chainId:3,name:ROPSTEN,state:true},
  {chainId:4,name:RINKEBY,state:false},
  {chainId:5,name:GOERILI,state:false},
  {chainId:42,name:KOVAN,state:false},
  {chainId:9527,name:LOCAL,state:true},
]

export function getNetwork(chainId){
  return Networks.find( n => parseInt(chainId) === n.chainId )
}

export function getSupportNetworks(){
  return Networks.filter(n => n.state === true )
}

export default {
  Networks,
  getNetwork,
  getSupportNetworks
}
