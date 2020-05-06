/**
 * LOCAL_CID : dev.env.js define
 * @param {*} addresses
 * @param {*} networks
 */
export function assembleAddresses(addresses,networks) {
  const localChainId = process.env.LOCAL_CID || 1337;
  //console.log("assembleAddresses>>>", localChainId);

  let localAddress = ''
  if(!addresses || typeof addresses !== 'object') {
    addresses[localChainId] = ''
  }
  if(networks && networks[localChainId]) {
    addresses[localChainId] = networks[localChainId].address||'';
  }else {
    addresses[localChainId] = '';
  }

  // const keys = Object.keys(networks);

  // if(keys.length === 1 && networks[keys[0]].address) {
  //   addresses[localChainId] = networks[keys[0]].address;
  // }else {
  //   const maxkey = Math.max(...keys);
  //   addresses[localChainId] = networks[maxkey].address || "";
  // }

  return Object.assign({},addresses)
}



export default {
  assembleAddresses,
};
