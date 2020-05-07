import { winWeb3 } from "../index";

//import { keccak256, hexToString, BN } from "web3-utils";

import * as ApiErrors from '../api-errors.js'

import ContractJsons from '../abi-manager'
import { prehandleDomain, domain2Ascii } from "../utils";

import {
  basTokenInstance,
  basOANNInstance,
} from "./index";

/**
 * Approve OANN token
 * @param {*} costwei
 * @param {*} chainId
 * @param {*} wallet
 */
export function approveToken4OannEmitter(costwei,chainId,wallet){
  if(!costwei || !chainId || !wallet)throw 'Parameter illegal.'

  const web3js = winWeb3()

  const approveAddress = ContractJsons.BasOANN(chainId).address

  if (!approveAddress)throw "approve Address is null"

  const token = basTokenInstance(web3js,chainId,{from:wallet})

  return token.methods.approve(approveAddress,costwei).send({from:wallet})
}

/**
 *
 * @param {*} param0
 */
export function registRootEmitter({
  domainText,
  openApplied,
  isCustomed,
  customPriceWei,
  years,
  chainId,
  wallet
}) {
  const web3js = winWeb3()
  const name = prehandleDomain(domainText);

  const namebytes = domain2Ascii(name)

  const oann = basOANNInstance(web3js,chainId,{from:wallet})

  return oann.methods.registerRoot(
    namebytes,
    openApplied,
    isCustomed,
    customPriceWei,
    years
  ).send({from:wallet})
}

/**
 * Regist Sub Domain
 * @param {*} param0
 */
export function registSubEmitter({
  topText,
  subText,
  years = 1,
  chainId,
  wallet
}) {
  const web3js = winWeb3()

  const topname = prehandleDomain(topText);
  const subname = prehandleDomain(subText);

  const topbytes = domain2Ascii(topname)
  const subbytes = domain2Ascii(subname)

  const oann = basOANNInstance(web3js, chainId, { from: wallet })

  return oann.methods.registerSub(topbytes, subbytes, years).send({ from: wallet})
}

export default {
  approveToken4OannEmitter,
  registRootEmitter,
  registSubEmitter
}
