/**
 * This API must after login metamask
 */
import store from '@/store'
import ContractManager from '../abi-manager/index'
import { diffDays ,diffYears } from '@/utils'
import { checkSupport } from '../networks';

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

export async function registSubDomain(chainId,topDomain,subDomain,year) {
  if(!checkSupport(chainId))throw '3001:unsupport network';
  let opts = store.getters['web3/transOptions']
  let inst = getBasOANNInstance(chainId,window.web3,opts)
  let toHex = window.web3.utils.toHex
  let sName = toHex(subDomain);
  let rName = toHex(topDomain)
  console.log(rName,'<top<=>sub>',sName,'>',year)
  let resp = await inst.methods.registerSub(rName,sName,year).send(opts)
  return resp;
}

/**
 * @Depared use  findDomainByName
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
 * @param {*} text
 * return {
 * nameHash,expire,isRoot,
 * openApplied
 * customedPrice
 * owner--wallet
 * }
 */
export async function findDomainByName(text) {
  let Params = initContractParams()
  let utils = Params.utils
  let inst = getBasAssetInstance(Params.chainId,Params.web3js,Params.options)
  let hash = utils.keccak256(text)

  let searchback = await inst.methods.AssetDetailsByHash(hash).call()
  console.log(">>>>",searchback)
  return transFindDomainResp(text,searchback)
}

/**
 * name[bytes],expire[uint],isRoot[boolean],
 * r_openToPublic
 * r_isCustomed
 * r_isPureA
 * r_customedPrice:
 * s_rootHash:
 * @param {*} sb
 */
function transFindDomainResp(domain,sb) {
  if(!sb.name || !sb.expire) {
    return {
      data:{domain},
      state:0,
    }
  }
  let customedPrice = sb.r_customPrice ? sb.r_customPrice/(10**18) : 4;
  let resp = {
    state:1,
    data:{
      domain,
      expire:sb.expire*1000,
      owner:sb.owner,
      isRoot:sb.isRoot,
      openApplied:sb.r_openToPublic,
      isCustomed:sb.r_isCustomed,
      isPure:sb.r_isPureA,
      customedPrice
    }
  }
  return resp;
}

/**
 *
 * @param {*} year
 * @param {*} domain
 */
export async function calcSubCost(year,domain,parentDomain) {
  let Params = initContractParams()

  let hexDomain = Params.utils.toHex(domain)
  let hexTopDomain = Params.utils.toHex(parentDomain)
  let inst =await getBasOANNInstance(Params.chainId,Params.web3js,Params.options)
  let ret = await inst.methods.evalueSubPrice(hexTopDomain,hexDomain,year).call()

  return ret;
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
  findDomainByName,
}
