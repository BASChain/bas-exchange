import { keccak256, hexToString,BN } from "web3-utils";

import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'
import { checkSupport } from "../networks";
import ContractJsons from '../abi-manager'

import * as ApiErrors from '../api-errors.js'
import DomainConfTypes from './domain-conf-api'
import {
  compareWei2Wei, parseHexDomain, hex2confDataStr, prehandleDomain,
} from '../utils'

import {
  basTokenInstance,
  basMailInstance,
  basDomainConfInstance,
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

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export async function activationSubMailService(hash,chainId, wallet) {
  if (!hash || !wallet) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const spender = ContractJsons.BasMailManager(chainId).address
  if (!spender) throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const tsnow = parseInt((new Date()).getTime() / 1000)

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })


  const domainInfo = await view.methods.queryDomainInfo(hash).call()

  if (!domainInfo.name) throw ApiErrors.DOMAIN_NOT_EXIST
  if (domainInfo.isRoot) throw ApiErrors.PARAM_ILLEGAL
  if (domainInfo.owner.toLowerCase() !== wallet.toLowerCase()) throw ApiErrors.ACCOUNT_NOT_MATCHED

  if ((tsnow - domainInfo.expiration) > 0) throw ApiErrors.DOMAIN_EXPIRED

  const baswei = await token.methods.balanceOf(wallet).call()
  const costwei = await mailManager.methods.OPEN_ACTION_GAS().call()

  if (compareWei2Wei(baswei, costwei) < 0) throw ApiErrors.LACK_OF_TOKEN

  const mailState = await mailManager.methods.mailConfigs(hash).call()
  if (mailState.active) throw ApiErrors.MAILSERVICE_HAS_ACTIVED

  await token.methods.approve(spender, costwei).send({ from: wallet })

  const receipt = await mailManager.methods.openMailService(hash, false).send({ from: wallet })

  return {
    hash,
    mailActived:true,
    mailPublic: false
  }
}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export async function removeDomainService(hash,chainId,wallet){
  if (!hash || !wallet) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()

  const view = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })
  const domainInfo = await view.methods.queryDomainInfo(hash).call()

  if (!domainInfo.name) throw ApiErrors.DOMAIN_NOT_EXIST
  if (domainInfo.owner.toLowerCase() !== wallet.toLowerCase()) throw ApiErrors.ACCOUNT_NOT_MATCHED

  const receipt = await mailManager.methods.removeMailServer(hash).send({from:wallet})
  console.log(receipt)
  return {
    hash,
    mailActived:false,
    mailPublic:false
  }
}

/**
 *
 * @param {*} hash
 * @param {*} isPublic
 * @param {*} chainId
 * @param {*} wallet
 */
export async function toggleMailServicPublic(hash,isPublic,chainId,wallet){
  if(!hash||!wallet||typeof isPublic ==='undefined')throw ApiErrors.PARAM_ILLEGAL
  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const tsnow = parseInt((new Date()).getTime() / 1000)

  const view = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })

  const domainInfo = await view.methods.queryDomainInfo(hash).call()

  //when your chainId changed maybe unfoud by hash
  if (!domainInfo.name) throw ApiErrors.DOMAIN_EXPIRED

  if ((tsnow - domainInfo.expiration) > 0) throw ApiErrors.DOMAIN_TOP_EXPIRED
  const isRare = Boolean(domainInfo.rIsRare)
  if (isPublic && !isRare) throw ApiErrors.MAILSERVICE_ONLY_RARE_OPEN;



  const mailState = await mailManager.methods.mailConfigs(hash).call()
  if (!mailState.active) throw ApiErrors.MAILSERVICE_HAS_ACTIVED

  const originPublic = mailState.openToPublic

  if (domainInfo.owner.toLowerCase() !== wallet.toLowerCase()) throw ApiErrors.ACCOUNT_NOT_MATCHED

  const receipt = await mailManager.methods.setPublic(hash, isPublic).send({ from: wallet })
  console.log('>>>>>>',receipt)
  return {
    hash,
    mailActived:true,
    mailPublic: receipt.status ? isPublic : originPublic
  }

}


/**
 * this is infura query first
 * @param {*} domaintext
 * @param {*} chainId
 */
export async function getDomainMailDetail(domaintext, chainId) {
  if (!(domaintext+''))throw ApiErrors.PARAM_ILLEGAL

  const domainHash = keccak256(prehandleDomain(domaintext))

  const web3js = getInfuraWeb3(chainId)

  const view = basViewInstance(web3js,chainId)
  const confInst = basDomainConfInstance(web3js,chainId)

  const domainRet = await view.methods.queryDomainEmailInfo(domainHash).call()
  if (!domainRet.name){
    return {
      state: 0,
      data: `${domaintext} not found`
    }
  }

  //const domaintext = parseHexDomain(domainRet.name)
  const resp = {
    state:1,
    mailInfo:{
      domainHash,
      domaintext,
      namebytes: domainRet.name,
      owner: domainRet.owner,
      expire: domainRet.expiration,
      mailActived:Boolean(domainRet.isActive),
      mailPublic:Boolean(domainRet.openToPublic)
    },
    refdata:{}
  }

  if (domainRet.isActive){
    const MXBCATypName = "MXBCA"
    console.log(MXBCATypName)
    const mxbacBytes = await confInst.methods.query(domainHash,MXBCATypName).call()
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>",mxbacBytes)
    resp.refdata = {
      [MXBCATypName]: hex2confDataStr(mxbacBytes)
    }
  }

  return resp
}

/**
 *
 * @param {*} domainhash
 * @param {*} mailname xxx@bas
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function registMailAccount(domainhash, mailname, years, chainId, wallet) {
  if (!domainhash || mailname === undefined || !(mailname + '').length || years <= 0 || !wallet)
    throw ApiErrors.PARAM_ILLEGAL;

  const web3js = winWeb3()

  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const approveAddress = ContractJsons.BasMailManager(chainId).address
  if (!approveAddress)throw ApiErrors.PARAM_ILLEGAL

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })

  const mailDomainRet = await view.methods.queryDomainEmailInfo(domainhash).call()

  if (!mailDomainRet.name)throw ApiErrors.DOMAIN_NOT_EXIST
  if (!mailDomainRet.isActive) throw ApiErrors.MAILSERVICE_INACTIVED

  const owner = mailDomainRet.owner
  //valid isOwner when not public
  if (!mailDomainRet.openToPublic && wallet.toLowerCase() !== owner.toLowerCase()) throw ApiErrors.MAIL_REGIST_BY_OWNER



  const regMailGas = await mailManager.methods.REG_MAIL_GAS().call()
  const maxRegYears = await mailManager.methods.MAX_MAIL_YEAR().call()

  if (parseInt(maxRegYears) < parseInt(years)) ApiErrors.PARAM_ILLEGAL;

  const costwei = new BN('' + years).mul(new BN(regMailGas)).toString()

  const basbal = await token.methods.balanceOf(wallet).call()

  if (compareWei2Wei(basbal,costwei)<0)throw ApiErrors.LACK_OF_TOKEN

  const mailhash = keccak256(mailname.trim())

  const approveRet = await token.methods.approve(approveAddress,costwei).send({from:wallet})

  const receipt = await mailManager.methods.registerMail(domainhash, mailhash, years).send({ from: wallet})

  return {
    domainhash,
    mailhash,
    mailtext: mailname
  }

}

export default {
  activationRootMailService,
  removeDomainService,
  getDomainMailDetail,
  toggleMailServicPublic,

}
