import {MAINNET, ROPSTEN, RINKEBY, GOERILI, KOVAN, LOCAL} from './network-types.js'

export const Networks = [
  {chainId:1,name:MAINNET,state:true},
  {chainId:3,name:ROPSTEN,state:true},
  {chainId:4,name:RINKEBY,state:false},
  {chainId:5,name:GOERILI,state:false},
  {chainId:42,name:KOVAN,state:false},
  {chainId:1337,name:LOCAL,state:true},
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
  if(chainId==undefined)return false;
  return !!(Networks.find(n => parseInt(chainId) === n.chainId && n.state==true))
}

export function getSupportNetworkNames(){
  const spnws = Networks.map( item => {
    if(item.state)return item.name
  })
  .filter(n => n !== undefined)

  console.log("support Networks >>>",spnws)
  if(spnws.length>0){
    return spnws.join(' or ')
  }else{
    return ''
  }
}

/**
 * 全局控制默认network
 */
export const DefaultNetWork = ()=>{
  return getNetwork(1)
}

export default {
  Networks,
  getNetwork,
  getNetworkName,
  getSupportNetworks,
  checkSupport,
  getSupportNetworkNames,
}
