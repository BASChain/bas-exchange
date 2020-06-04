import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'



import { compareWei2Wei } from '../utils'


import {
  sendFreeBasInstance,
  basTokenInstance
} from './index'

const DEF_BAS_WEI = Web3.utils.toWei('5000','ether')
export const MIN_BAS = "500";

export const ETH_GOT_THRESHOLD = "0.01"
export const BAS_GOT_THRESHOLD = "1000"
export const VALID_SENDER_ETHBAL_MIN = "0.03"

export async function canGetEthValid(chainId,wallet){
  if (!checkSupport(chainId) || chainId !== 3) {
    throw apiErrors.UNSUPPORT_NETWORK
  }

  if (!isAddress(wallet)) throw apiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()
  const ethwei = await web3js.eth.getBalance(wallet)
  if (compareWei2Wei(ethwei, Web3.utils.toWei(ETH_GOT_THRESHOLD, 'ether')) >= 0)
    throw apiErrors.ENOUGH_BALANCE_OF_ETH

  const sendbal = await web3js.eth.getBalance('0x8237e06E6C4f93648c177B381c50E32bB6f59273')
  if (compareWei2Wei(sendbal, Web3.utils.toWei(VALID_SENDER_ETHBAL_MIN, 'ether')) <0)
    throw apiErrors.LACK_OF_ETH

  return true
}


/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function canGetTokenValid(chainId,wallet) {
  if (!checkSupport(chainId) || chainId !== 3) {
    throw apiErrors.UNSUPPORT_NETWORK
  }

  if (!Web3.utils.isAddress(wallet)) throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()

  const sender = sendFreeBasInstance(web3js, chainId, { from: wallet })

  const hasGet = await sender.methods.applyRecord(wallet).call()
  console.log("hasGetOnce>>>>>", hasGet, sender.options)
  if (Boolean(hasGet)) throw apiErrors.TOKEN_HAS_GET

  const ethwei = await web3js.eth.getBalance(wallet)

  if (!ethwei || ethwei === "0") throw apiErrors.LACK_OF_ETH

  const token = basTokenInstance(web3js, chainId, { from: wallet })

  const basbal = await token.methods.balanceOf(wallet).call()

  const minBasWei = Web3.utils.toWei(MIN_BAS, 'ether')
  if (compareWei2Wei(basbal, minBasWei) > 0) {
    throw apiErrors.MORE_THAN_MIN_TOKEN
  }
  const sendAddress = "0xa58721AAd2791d9edd4255cE170317539bFf3e92"
  const senderBal = await token.methods.balanceOf(sendAddress).call()
  if (compareWei2Wei(senderBal, DEF_BAS_WEI) < 0) throw apiErrors.LACK_OF_TOKEN

  return true
}

export async function getToken4Bas(chainId,wallet){
  if (!checkSupport(chainId) || chainId !== 3) {
    throw apiErrors.UNSUPPORT_NETWORK
  }

  if (!Web3.utils.isAddress(wallet)) throw apiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()

  const sender = sendFreeBasInstance(web3js, chainId, { from: wallet })

  return sender.methods.SendTokenByContract(wallet, DEF_BAS_WEI).send({ from: wallet })
}


export default {
  getToken4Bas,
  canGetTokenValid
}
