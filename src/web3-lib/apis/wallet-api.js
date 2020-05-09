import { winWeb3 } from "../index";

import ContractJsons from '../abi-manager'
import * as ApiErrors from '../api-errors.js'
import { hexToString } from "web3-utils";

import { basTraOwnershipInstance, basViewInstance } from './index'

async function getAssetHashPager(chainId, wallet){
  if (!wallet) throw ApiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()
  const inst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  const total = await inst.methods.assetsCountsOf().call()

  const pager = {
    total:0,
    hashes:[],
    assets:[]
  }
  if (total === 0) return pager
  pager.total = total;

  const hashes = await inst.methods.assetsOf(0,total-1).call()
  pager.hashes = hashes

  const viewInst = basViewInstance(web3js,chainId,{from:wallet})

  let assets = []
  for(let i = 0;i<hashes.length;i++){
    const hash = hashes[i]
    const ret = await viewInst.methods.queryDomainInfo(hash).call()
    if(!ret.name)continue;

  }



  function transAsset(ret){

  }
}

async function getAssetTotal(chainId,wallet){
  if(!wallet)throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const inst = basTraOwnershipInstance(web3js,chainId,{from:wallet})
  const total = await inst.methods.assetsCountsOf().call()

  return total;
}

export default {

}
