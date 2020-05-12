import {MAINNET, ROPSTEN, RINKEBY, GOERILI, KOVAN, LOCAL} from './network-types.js'

export const Networks = [
  { chainId: 1, name: MAINNET, state: true },
  { chainId: 3, name: ROPSTEN, state: true },
  { chainId: 4, name: RINKEBY, state: false },
  { chainId: 5, name: GOERILI, state: false },
  { chainId: 42, name: KOVAN, state: false }
  // {chainId:1337,name:LOCAL,state:true},
];

/**
 *
 * @param {*} networks
 */
function addLocalNetworks() {
  if(process.env.LOCAL_CID){
    const idx = Networks.findIndex(n => n.chainId === process.env.LOCAL_CID);

    if(idx>=0){
      Networks.splice(idx, 1, {
        chainId: process.env.LOCAL_CID,
        name: LOCAL,
        state: Boolean(process.env.NODE_ENV === "development")
      });
    }else{
      Networks.push({
        chainId: process.env.LOCAL_CID,
        name: LOCAL,
        state: Boolean(process.env.NODE_ENV === "development")
      });
    }
  }
}

addLocalNetworks();

export function getNetwork(chainId){
  addLocalNetworks();
  return Networks.find( n => parseInt(chainId) === n.chainId )
}

export function getNetworkName(chainId){
  addLocalNetworks();
  let nw = Networks.find( n => parseInt(chainId) === n.chainId );
  return nw ? nw.name :''
}

export function getSupportNetworks(){
  addLocalNetworks();
  return Networks.filter(n => n.state === true )
}

export function checkSupport(chainId) {
  if(chainId==undefined)return false;
  addLocalNetworks();
  return !!(Networks.find(n => parseInt(chainId) === n.chainId && n.state==true))
}

export function getSupportNetworkNames(){
  addLocalNetworks();
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
  addLocalNetworks();
  return getNetwork(3)
}

export default {
  Networks,
  getNetwork,
  getNetworkName,
  getSupportNetworks,
  checkSupport,
  getSupportNetworkNames,
}
