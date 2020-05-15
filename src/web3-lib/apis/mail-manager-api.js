import { winWeb3 } from "../index";
import { checkSupport } from "../networks";
import ContractJsons from '../abi-manager'

import apiErrors, * as ApiErrors from '../api-errors.js'
import {
  compareWei2Wei,
} from '../utils'


import {
  basTokenInstance,
  basRootDomainInstance,
  basMailInstance,
  basMailManagerInstance,
  basViewInstance,
} from "./index";


/**
 * this function only activation root domain mail service,
 * if hash is subdomain will throw PARAM_ILLEGAL 999999
 * @param {*} hash require
 * @param {*} isPublic default false
 * @param {*} chainId
 * @param {*} wallet
 */
export async function activationRootMailService(hash,isPublic = false,chainId,wallet){
  if(!hash||!wallet)throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const spender = ContractJsons.BasMailManager(chainId).address
  if(!spender)throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const tsnow = parseInt((new Date()).getTime()/1000)

  const token = basTokenInstance(web3js,chainId,{from:wallet})
  const view = basViewInstance(web3js,chainId,{from:wallet})
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })


  const domainInfo = await view.methods.queryDomainInfo(hash).call()

  if (!domainInfo.name)throw ApiErrors.DOMAIN_NOT_EXIST
  if(!domainInfo.isRoot)throw ApiErrors.PARAM_ILLEGAL
  if(domainInfo.owner.toLowerCase() !== wallet.toLowerCase())throw ApiErrors.ACCOUNT_NOT_MATCHED

  const isRare = Boolean(domainInfo.rIsRare)
  if (isPublic && !isRare) throw ApiErrors.MAILSERVICE_ONLY_RARE_OPEN;
  if((tsnow - domainInfo.expiration) > 0) throw ApiErrors.DOMAIN_TOP_EXPIRED

  const baswei = await token.methods.balanceOf(wallet).call()
  const costwei = await mailManager.methods.OPEN_ACTION_GAS().call()

  if (compareWei2Wei(baswei,costwei) < 0)throw ApiErrors.LACK_OF_TOKEN

  const mailState = await mailManager.methods.mailConfigs(hash).call()
  if(mailState.active)throw ApiErrors.MAILSERVICE_HAS_ACTIVED

  await token.methods.approve(spender, costwei).send({from:wallet})

  const receipt = await mailManager.methods.openMailService(hash,isPublic).send({from:wallet})

  return {
    state: 1,
    hash,
    isPublic:isPublic
  }
}


export default {
  activationRootMailService
}
