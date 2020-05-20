import { keccak256, hexToString, BN, utf8ToHex} from "web3-utils";

import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'
import { checkSupport } from "../networks";
import ContractJsons from '../abi-manager'

import * as ApiErrors from '../api-errors.js'
import DomainConfTypes from './domain-conf-api'
import {
  mailConcatChar, compareWei2Wei, hex2confDataStr,
  prehandleDomain,
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



/**
 *
 * @param {*} domainhash
 * @param {*} mailtext
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function validPrevRegistMail(domainhash,mailalias,years,chainId,wallet){
  console.log('>>>>', domainhash, mailalias,years)
  if (!domainhash || mailalias === undefined || !(mailalias + '').length || years <= 0 || !wallet)
    throw ApiErrors.PARAM_ILLEGAL;

  const web3js = winWeb3()
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const token = basTokenInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })

  //callback name[hex] owner,expiration,isActive,openToPublic
  const mailDomainRet = await view.methods.queryDomainEmailInfo(domainhash).call()

  if (!mailDomainRet.name) throw ApiErrors.DOMAIN_NOT_EXIST
  if (!mailDomainRet.isActive) throw ApiErrors.MAILSERVICE_INACTIVED

  const owner = mailDomainRet.owner
  //valid isOwner when not public
  console.log(mailDomainRet.openToPublic,wallet,owner)
  if (!mailDomainRet.openToPublic && wallet.toLowerCase() !== owner.toLowerCase()) throw ApiErrors.MAIL_REGIST_BY_OWNER


  const domaintext = hexToString(mailDomainRet.name)
  mailalias = mailalias.trim()
  const mailfulltext = `${mailalias}${mailConcatChar}${domaintext}`
  const mailhash = keccak256(mailfulltext)

  //vliad mailhash exist
  /**
   * owner, expiration,domainHash,isValid aliasName, bcAddress
   */
  const mailRet = await view.methods.queryEmailInfo(mailhash).call()
  if (mailRet.isValid) throw ApiErrors.MAIL_HASH_EXIST

  const regMailGas = await mailManager.methods.REG_MAIL_GAS().call()
  const maxRegYears = await mailManager.methods.MAX_MAIL_YEAR().call()

  if (parseInt(maxRegYears) < parseInt(years)) ApiErrors.MAIL_YEAR_OVER_MAX;

  const costwei = new BN('' + years).mul(new BN(regMailGas)).toString()

  const basbal = await token.methods.balanceOf(wallet).call()

  if (compareWei2Wei(basbal, costwei) < 0) throw ApiErrors.LACK_OF_TOKEN

  return {
    domaintext,
    mailalias,
    years,
    chainId,
    wallet,
    domainhash,
    mailhash,
    costwei,
    basbal,
  }
}

/**
 *
 * @param {*} costwei
 * @param {*} chainId
 * @param {*} wallet
 */
export function registMailApprovEmitter(costwei,chainId,wallet){
  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK
  if(!costwei || !wallet)throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const approveAddress = ContractJsons.BasMailManager(chainId).address
  if (!approveAddress) throw ApiErrors.PARAM_ILLEGAL

  const token = basTokenInstance(web3js, chainId, { from: wallet })

  return token.methods.approve(approveAddress, costwei).send({ from: wallet })
}

/**
 *
 * @param {*} years
 * @param {*} domaintext
 * @param {*} mailalias
 * @param {*} chainId
 * @param {*} wallet
 */
export function registMailConfirmEmitter(
  years,
  domaintext,
  mailalias,
  chainId,
  wallet,
  domainhash){
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK
  if (!domaintext || !wallet || !mailalias ||!years) throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  console.log(domainhash)

  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })

  const domainname = domaintext;// prehandleDomain(domaintext)
  const mailtext = mailalias;// prehandleDomain(mailalias)

  const fulltext = `${mailtext}@${domainname}`
  if (!domainhash) domainhash = keccak256(domainname)
  const mailhash = keccak256(fulltext)
  console.log("regist mail hash:",mailhash)

  const mailAliasBytes = utf8ToHex(mailtext)

  console.log(domainhash, mailhash, years, mailAliasBytes)

  return mailManager.methods.registerMail(
    domainhash,
    mailhash,
    years,
    mailAliasBytes
  ).send({from:wallet})
}

/**
 *
 * @param {*} hash
 * @param {*} bca
 * @param {*} chainId
 * @param {*} wallet
 */
export async function updateMailBCA(hash,bca='',chainId,wallet){
  if(!hash || !wallet )throw ApiErrors.PARAM_ILLEGAL
  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()

  const mailInst = basMailInstance(web3js,chainId,{from:wallet})
  const view = basViewInstance(web3js,chainId,{from:wallet})

  const origin = await view.methods.queryEmailInfo(hash).call()

  if(!origin.isValid)throw ApiErrors.MAIL_HASH_INVALID

  //TODO valid owner
  const owner = origin.owner
  if(owner.toLowerCase() !== wallet.toLowerCase())throw ApiErrors.ACCOUNT_NOT_MATCHED

  const nowts = (new Date().getTime())/1000
  if(parseInt(nowts) >= origin.expiration)throw ApiErrors.MAIL_HASH_EXPIRED

  const aliasBytes = origin.aliasName

  if(typeof bca === 'number')bca = bca+''

  const bcaBytes = utf8ToHex(bca)
  const receipt = await mailInst.methods.updateMail(hash, aliasBytes, bcaBytes).send({from:wallet})

  return {
    hash,
    bca
  }
}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 * @param {*} wallet
 */
export async function abandonedMail(hash,chainId,wallet){
  if (!hash || !wallet) throw ApiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()

  const mailInst = basMailInstance(web3js, chainId, { from: wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })

  const origin = await view.methods.queryEmailInfo(hash).call()

  if (!origin.isValid) throw ApiErrors.MAIL_HASH_INVALID

  //TODO valid owner
  const owner = origin.owner
  if (owner.toLowerCase() !== wallet.toLowerCase()) throw ApiErrors.ACCOUNT_NOT_MATCHED

  const receipt = await mailInst.methods.abandon(hash).send({from:wallet})

  return {
    hash,
    abandoned:true,
    invalid:true
  }
}

export default {
  activationRootMailService,
  removeDomainService,
  getDomainMailDetail,
  toggleMailServicPublic,
  validPrevRegistMail,
  registMailApprovEmitter,
  updateMailBCA,
  abandonedMail,
}
