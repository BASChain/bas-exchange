import {toWei, isAddress, fromWei} from 'web3-utils'
import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'

import ContractJson from '../abi-manager'

import { compareWei2Wei } from '../utils'

const sendAddress = "0xa58721AAd2791d9edd4255cE170317539bFf3e92"
import {
  sendFreeBasInstance,
  basTokenInstance
} from './index'

const DEF_BAS_WEI = toWei('5000','ether')
export const MIN_BAS = "500";


export async function getToken4Bas(chainId,wallet){
  if(!checkSupport(chainId) || chainId !==3 ){
    throw apiErrors.UNSUPPORT_NETWORK
  }

  if(!isAddress(wallet))throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()

  const sender = sendFreeBasInstance(web3js, chainId, { from: wallet })

  const hasGet = await sender.methods.applyRecord(wallet).call()
  console.log("hasGetOnce>>>>>",hasGet,sender.options)
  if(Boolean(hasGet))throw apiErrors.TOKEN_HAS_GET

  const ethwei = await web3js.eth.getBalance(wallet)
  console.log(">>>>>>",ethwei)
  if (!ethwei || ethwei === "0")throw apiErrors.LACK_OF_ETH

  const token = basTokenInstance(web3js,chainId,{ from : wallet })

  const basbal = await token.methods.balanceOf(wallet).call()

  const minBasWei = toWei(MIN_BAS,'ether')

  if (compareWei2Wei(basbal,minBasWei) >0){
    throw apiErrors.MORE_THAN_MIN_TOKEN
  }

  const senderBal = await token.methods.balanceOf(sendAddress).call()


  if(compareWei2Wei(senderBal,DEF_BAS_WEI) < 0)throw apiErrors.LACK_OF_TOKEN



  const receipt = sender.methods.SendTokenByContract(wallet, DEF_BAS_WEI).send({ from: wallet})

  return fromWei(DEF_BAS_WEI,'ether')
}


export default {
  getToken4Bas
}
