import ApiErrors from './api-errors.js'

/**
 * call this need after thereum.enable().
 * get window web3
 */
export function winWeb3(){
  if (!window.ethereum || !window.web3) throw ApiErrors.NO_METAMASK
  return window.web3
}

/**
 * call this method,need check metamask injected
 */
export async function enableMetaMask() {
  try{
    const ethereum = window.ethereum;
    const accounts = await ethereum.enable();
    if (!accounts.length) throw ApiErrors.NO_ACCOUNT

    const wallet = accounts[0]
    const web3js = winWeb3();
    const chainId = await web3js.eth.getChainId();

    return {
      chainId,
      wallet
    }

  }catch(ex){
    console.log('MetaMask Enable Fail:',ex)
    if (ex.code === ApiErrors.USER_REJECTED_REQUEST){
      throw ApiErrors.USER_REJECTED_REQUEST
    } else if (ex.code === ApiErrors.RPC_TIMEOUT){
      throw ApiErrors.RPC_TIMEOUT;
    } else if (ex === ApiErrors.NO_ACCOUNT){
      throw ApiErrors.NO_ACCOUNT;
    }
  }
}


/**
 * Temp sultion
 * when refresh page load before Matemask login
 */
export async function globalWebState(){
  const web3 = window.web3
  if(!web3)return null;

  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  const web3State = {
    chainId,
    wallet: accounts.length ? accounts[0]:''
  }

  return web3State
}

export default {
  winWeb3,
};
