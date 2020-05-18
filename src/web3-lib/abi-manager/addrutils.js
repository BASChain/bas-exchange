/**
 * LOCAL_CID : dev.env.js define
 * @param {*} contractName
 * @param {*} networks
 */
import AddressHolder from './address-holder.js'
import { ContractAddresses } from './contracts/addresses'

export function assembleAddresses(contractName, networks) {
  const localChainId = process.env.LOCAL_CID || 1337;

  let addresses = ContractAddresses[contractName] ||{};

  if (networks && networks[localChainId]) {
    addresses[localChainId] = networks[localChainId].address || "";
  } else {
    addresses[localChainId] = "";
  }

  return Object.assign({}, addresses);
}


export default {
  assembleAddresses,
};
