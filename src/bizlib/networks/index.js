import {MAINNET, ROPSTEN, RINKEBY, GOERILI, KOVAN, LOCAL} from './network-types.js'

export const Networks = [
  {chainId:1,name:MAINNET,state:false},
  {chainId:3,name:ROPSTEN,state:true},
  {chainId:4,name:RINKEBY,state:false},
  {chainId:5,name:GOERILI,state:false},
  {chainId:42,name:KOVAN,state:false},
  {chainId:9527,name:LOCAL,state:true},
]

export function getNetwork(chainId){
  return Networks.find( n => parseInt(chainId) === n.chainId )
}

export function getNetworkName(chainId){
  let nw = Networks.find( n => parseInt(chainId) === n.chainId );
  return nw ? nw.name :''
}

export function getSupportNetworks(){
  return Networks.filter(n => n.state === true )
}

export function checkSupport(chainId) {
  return !!(Networks.find(n => parseInt(chainId) === n.chainId && n.state==true))
}

export function getSupportNetworkNames(){
  const spnws = Networks.filter(n => {
    if(n.state === true && n.name !== LOCAL){
      return n.name
    }
  })

  if(spnws.length>1){
    return spnws.join(',')
  }else{
    return ''
  }
}

export default {
  Networks,
  getNetwork,
  getNetworkName,
  getSupportNetworks,
  checkSupport,
  getSupportNetworkNames,
}
