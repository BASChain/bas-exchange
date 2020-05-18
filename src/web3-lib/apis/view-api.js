import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'
import { keccak256,fromAscii } from "web3-utils";

import {
  basTokenInstance,
  basMailManagerInstance,
  basViewInstance,
} from "./index";

import { MinGasWei, compareWei2Wei, prehandleDomain } from "../utils";

import * as ApiErrors from '../api-errors.js'
import SolCodes from './sol-codes'

/**
 * return {
 *  costWei,
 *  hash
 * }
 * @param {*} domaintext
 * @param {*} isCustomed
 * @param {*} customWei
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function preCheck4Root({
  domaintext,
  isCustomed,
  customWei,
  years,
  chainId,
  wallet,
}, costwei) {
  if (domaintext === undefined
    || !years || !chainId || !wallet) throw ApiErrors.PARAM_ILLEGAL

  const name = prehandleDomain(domaintext)
  const hash = keccak256(name)

  const web3js = winWeb3();
  let options = { from: wallet }

  const ethwei = await web3js.eth.getBalance(wallet);
  if (compareWei2Wei(ethwei, MinGasWei) <= 0) throw ApiErrors.LACK_OF_ETH

  //TODO

  return {
    costwei,
    hash,
  }

}

/**
 * 返回 合法的
 * {
 *  hash:fullhash,
 *  costwei:
 * }
 * @param {*} roottext
 * @param {*} subtext
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function preCheck4Sub(
  roottext,
  subtext,
  years,
  chainId,
  wallet
) {
  if (roottext === undefined || subtext === undefined
    || !years || !chainId || !wallet) throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3();
  let options = {from:wallet}

  const ethwei = await web3js.eth.getBalance(wallet);
  if (compareWei2Wei(ethwei, MinGasWei) <= 0) throw ApiErrors.LACK_OF_ETH

  const view = basViewInstance(web3js,chainId,Object.assign({},options))

  const rootname = prehandleDomain(roottext);
  const subname = prehandleDomain(subtext);

  const hash = keccak256(`${subname}.${rootname}`)

  const rootbytes = fromAscii(rootname)
  const subbytes = fromAscii(subname)

  const checkResp = await view.methods.checkSubRegistry(rootbytes, subbytes, years).call()

  if (!checkResp ) throw ApiErrors.RPC_SERVER_ERROR

  switch (checkResp[0]) {
    case SolCodes.InvalidString:
      throw ApiErrors.DOMAIN_FORMAT_ILLEGAL;
    case SolCodes.DomainIsTaken:
      throw ApiErrors.DOMAIN_HAS_TAKEN;
    case SolCodes.InvalidExpiration:
      throw ApiErrors.DOMAIN_TOP_EXPIRED;
    case SolCodes.CustomedPriceBelowDefault:
      throw ApiErrors.LACK_OF_TOKEN
    default:
      break;
  }

  const costwei = checkResp[1]

  return {
    costwei,
    hash
  }
}

/**
 *
 * @param {*} chainId
 */
export async function publicMailDomains(chainId){
  const web3js = getInfuraWeb3(chainId);

  const viewInst = basViewInstance(web3js, chainId)
  const mailManager = basMailManagerInstance(web3js, chainId)

  let namesPromise = await (async () => {
    let openList = await mailManager.getPastEvents('MailServerOpen', {
      fromBlock: 0, toBlock: "latest"
    })
    console.log(openList)
    return openList.map(d => {
      return viewInst.methods.queryDomainEmailInfo(d.returnValues.nameHash)
    })
  })();

  let namesResult = await Promise.all(namesPromise)

  // let ko = {}
  // let showNames = namesResult.reduce((cur, next) => {
  //   ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
  //   return cur
  // }, []).map((x) => {
  //   //console.log(x)
  //   return {
  //     domaintext: parseHexDomain(x[0].returnValues.rootName),
  //     name: hexToString(x[0].returnValues.rootName),
  //     openApplied: Boolean(x[0].returnValues.openToPublic),
  //     isCustomed: Boolean(x[0].returnValues.isCustom),
  //     hash: x[0].returnValues.nameHash,
  //     customPrice: x[0].returnValues.customPrice
  //   }
  //   //return [parseHexDomain(x[0].returnValues.rootName), x[0].returnValues.openToPublic]
  // })
  // return showNames.filter(r => r.openApplied && isRare(r.domaintext))
}


export default {
  preCheck4Root,
  preCheck4Sub,
  publicMailDomains,
}
