import { basGetFreeInstance, basSendFreeInstance} from './instances'
import { getWeb3 } from './index'
import { getNetwork, checkSupport } from '../networks'
import errCodes from './error-codes'

/**
 * 测试网络ID
 */
const TestTokenNetwork = getNetwork(3);

/**
 *
 * @param {*} wallet
 */
export function getFreeBas(chainId,wallet){
  let web3js = getWeb3()
  let inst = basGetFreeInstance(web3js,chainId,{from:wallet})

  return inst.methods.ApplyToken().send({from:wallet})
}

export async function checkApplyRecord(chainId,wallet) {
  let web3js = getWeb3()
  let inst = basGetFreeInstance(web3js, chainId, { from: wallet })

  let ret = await inst.methods.applyRecord(wallet).call()
  return ret;
}

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function checkSendBas(chainId, wallet) {
  let web3js = getWeb3()
  let inst = basSendFreeInstance(web3js, chainId, { from: wallet })

  let hasSend = await inst.methods.applyRecord(wallet).call();
  return hasSend;
}

/**
 * 检查当前是否 测试网络
 * @param {*} chainId
 */
export const checkGetFreeNetwork = (chainId) =>{
  return chainId === TestTokenNetwork.chainId
}

/**
 * 基于getFreeBas 合约
 * @param {*} wallet
 */
export async function getBasCheck(chainId,wallet){
  if(!wallet)return Promise.reject(errCodes.E1001)
  let web3js = getWeb3()
  if (!web3js || !chainId) return Promise.reject(errCodes.E1001)
  if (!checkSupport(chainId)) return Promise.reject(errCodes.E3001)

  let ethBal = await web3js.eth.getBalance(wallet)
  ethBal = ethBal / 10 ** 18
  if (parseFloat(ethBal) <= 0.0) return Promise.reject(errCodes.E1002)
  let inst = basGetFreeInstance(web3js, chainId, { from: wallet })
  let ret = await inst.methods.applyRecord(wallet).call()
  if(ret){
    return Promise.reject(errCodes.E1004)
  }else{
    return Promise.resolve(true)
  }
}

export default {
  getFreeBas,
  checkGetFreeNetwork
}
