import { getInfuraWeb3 } from '../infura'

import apiErrors, * as ApiErrors from '../api-errors.js'
import { checkSupport } from "../networks";

import {
  basRootDomainInstance,
  basSubDomainInstance,
} from "./index";

export async function getLatestRootDomains(chainId){
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const web3js = getInfuraWeb3(chainId)
  const rootInst = basRootDomainInstance(web3js,chainId)

  let rootPromise = await (async () => {
    let roots = await rootInst;
  })();



}

export default {

}
