import Web3 from 'web3'

import ErrorCodes from './error-codes'

/**
 * call this need after thereum.enable().
 * get window web3
 */
export function winWeb3(){
  if(!window.ethereum || !window.web3) throw ErrorCodes.NO_METAMASK
  return window.web3
}

export default {
  winWeb3,
};
