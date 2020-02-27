/**
 * This API must after login metamask
 */
import store from '@/store'
import ContractManager from '../abi-manager/index'
import { diffDays ,diffYears } from '@/utils'

/**
 *
 * @param {*} chainId
 * @param {*} web3js
 * @param {*} option
 */
export function getBasAssetInstance(chainId,web3js,option) {
  const BasAssetContract = ContractManager.BasAsset(chainId)
  let abi = BasAssetContract.abi;
  if(BasAssetContract.address){
    return new web3js.eth.Contract(abi,BasAssetContract.address,option)
  }else{
    return new web3js.eth.Contract(abi,option)
  }
}

/**
 *
 * Get OANN instance
 * @param {*} chainId
 * @param {*} web3js
 * @param {from,gasPrice,data} option
 */
export function getBasOANNInstance(chainId,web3js,option) {
  const BasOANNContact = ContractManager.BasOANN(chainId)
  let abi = BasOANNContact.abi
  if(BasOANNContact.address){
    return new web3js.eth.Contract(abi,BasOANNContact.address,option)
  }else{
    return new web3js.eth.Contract(abi,option)
  }
}

/**
 * Update New Contract
 * @param {*} name
 */
export async function queryDomainByName (name) {
  if(!name)throw ('illegal')
  let Params = initContractParams()
  let utils = Params.utils
  let inst = getBasAssetInstance(Params.chainId,Params.web3js,Params.options)
  let hash = utils.keccak256(name)

  let ret = await inst.methods.DnsDetailsByHash(hash).call()
  console.log(ret)
  if(ret.name && ret.expire){
    return {
      data:ret,
      state:'1'
    }
  }else{
    return {
      data:{
        data:{},
        state:''
      }
    }
  }
}

/**
 *
 * @param {*} year
 * @param {*} domain
 */
export async function calcSubGas(year,domain,parentDomain) {
  let Params = initContractParams()

  let hexDomain = Params.utils.asciiToHex(domain)
  let hexTopDomain = Params.utils.asciiToHex(parentDomain)
  let inst = getBasAssetInstance(Params.chainId,Params.web3js,Params.options)
  let ret = await inst.methods.evalueSubPrice(hexTopDomain,hexDomain,year)

}

export function initContractParams(){
  let web3js = window.web3
  let options = store.getters["web3/transOptions"]
  return {
    web3js,
    utils:web3js.utils,
    chainId:parseInt(web3js.currentProvider.chainId),
    options
  }
}



export default {
  getBasAssetInstance,
  getBasOANNInstance,
  initContractParams,
}
