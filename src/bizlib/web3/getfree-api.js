import { basGetFreeInstance } from './instances'
import { getWeb3 } from './index'
import { getNetwork } from '../networks'

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
 * 检查当前是否 测试网络
 * @param {*} chainId
 */
export const checkGetFreeNetwork = (chainId) =>{
  return chainId === TestTokenNetwork.chainId
}

export default {
  getFreeBas,
  checkGetFreeNetwork
}
