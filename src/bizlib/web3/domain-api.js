/**
 * This API must after login metamask
 */
import store from '@/store'
import ContractManager from '../abi-manager/index'
import { diffDays ,diffYears } from '@/utils'


/**
 *
 * @param {*} chainId
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

export function initContractParams(){
  let web3js = store.getters["web3/getWeb3"]()
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
  initContractParams,
}
