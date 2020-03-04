import { basTokenInstance } from './instances'
import { getWeb3, currentChainId, currentWallet } from './index'
import * as ErrCodes from './error-codes'


export async function refreshAccount(){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();

  if(!accounts.length) throw ErrCodes.E4001
  let wallet = accounts[0]

  let token = basTokenInstance(web3js, chainId, { from: wallet })

  const resp = {
    chainId,
    wallet,
    ethBal:"",
    basBal:""
  }

  resp.ethBal = await web3js.eth.getBalance(wallet)
  resp.basBal = await token.methods.balanceOf(wallet).call()

  return resp
}


export default {
  refreshAccount
}
