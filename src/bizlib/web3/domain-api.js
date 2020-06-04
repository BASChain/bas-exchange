/**
 * This API must after login metamask
 */
import store from '@/store'
import ContractManager from '../abi-manager/index'
import { checkSupport } from '../networks';
import { currentChainId, currentWallet } from './index'
import { toASCII } from '@/utils'



function getBasTokenInstance(chainId,web3js){
  const BasTokenContract = ContractManager.BasToken(chainId)
  let abi = BasTokenContract.abi;
  return new web3js.eth.Contract(abi,BasTokenContract.address)
}
/**
 *
 * @param {*} chainId
 * @param {*} web3js
 * @param {*} option
 */
export function getBasAssetInstance(chainId,web3js,option) {
  const BasAssetContract = ContractManager.BasAsset(chainId)
  let abi = BasAssetContract.abi;
  return new web3js.eth.Contract(abi,BasAssetContract.address)
}

/**
 * Find domain all info
 * @throw 3001
 * @param {*} domain
 */
export function getDomainDetailAssetCI(domain){
  let chainId = currentChainId();
  if(!checkSupport(chainId))throw '3001:network unsupport or no walllet.';
  let domainHash = web3.utils.keccak256(domain)
  let inst = getBasAssetInstance(chainId,web3)

  return getDnsAndAssetByHash(inst,domainHash)
}

export async function getDnsAndAssetByHash(inst,domainHash){
  let Params = initContractParams()
  const resp = {
    data:{
      signedDomain:domainHash
    },
    state:''
  }
  let asset = await inst.methods.AssetDetailsByHash(domainHash).call();
  if(!asset.name){
    return resp;
  }

  resp.state = 1

  resp.data.nameHash = asset.name
  resp.data.rootHash = asset.s_rootHash
  resp.data.owner = asset.owner
  resp.data.expire = asset.expire
  resp.data.isRoot = asset.isRoot
  resp.data.openApplied = asset.r_openToPublic
  resp.data.isCustomed = asset.r_isCustomed;
  resp.data.isPureA = asset.r_isPureA
  resp.data.customPrice = asset.r_customPrice

  let dns = await inst.methods.DnsDetailsByHash(domainHash).call();

  resp.data.ipv4 = dns.ipv4
  resp.data.ipv6 = dns.ipv6
  resp.data.wallet = dns.bcAddr
  resp.data.alias = dns.aName
  resp.data.extension = dns.opData

  return resp
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
  let wallet = currentWallet()
  if(wallet){
    return new web3js.eth.Contract(abi,BasOANNContact.address,{from:wallet})
  }else{
    return new web3js.eth.Contract(abi,BasOANNContact.address)
  }
}

export async function registSubDomain(chainId,topDomain,subDomain,year) {
  if(!checkSupport(chainId))throw '3001:unsupport network';
  let opts = store.getters['web3/transOptions']
  let inst = getBasOANNInstance(chainId,window.web3)
  let sName = toASCII(punycode.toASCII(subDomain));
  let rName = toASCII(punycode.toASCII(topDomain))

  let resp = await inst.methods.registerSub(rName,sName,year).send(opts)
  return resp;
}

/**
 *
 * @param {*} chainId
 * @param {*} topDomain
 * @param {*} subDomain
 * @param {*} year
 */
export function registSubDomainEmitter(
  chainId,topHex,subHex,year) {
  let Params = initContractParams()
  let web3js = Params.web3js;
  let options = Params.options
  let inst = getBasOANNInstance(chainId,web3js)
  return inst.methods.registerSub(topHex,subHex,year).send(options)
}

/**
 *
 * @param {*} domain
 * @param {*} openApplied
 * @param {*} isCustomed
 * @param {*} customPrice
 * @param {*} year
 */
export function registerTopDomainEmitter(
  domain,openApplied,isCustomed,customPrice,year
){
  let Params = initContractParams()
  let chainId = Params.chainId;
  let web3js = Params.web3js;
  let options = Params.options


  let domainHex = toASCII(punycode.toASCII(domain))
  let inst = getBasOANNInstance(chainId,web3js)

  return inst.methods.registerRoot(
    domainHex,openApplied,isCustomed,
    customPrice+'',year).send(options)
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
  let inst = getBasAssetInstance(Params.chainId,Params.web3js)
  let hash = utils.keccak256(name)

  let ret = await inst.methods.DnsDetailsByHash(hash).call()

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
  let inst = getBasAssetInstance(Params.chainId,Params.web3js)
  let hash = utils.keccak256(text)

  let searchback = await inst.methods.AssetDetailsByHash(hash).call()

  return transFindDomainResp(text,searchback)
}

/**
 * name[bytes],expire[uint],isRoot[boolean],
 * r_openToPublic
 * r_isCustomed
 * r_isPureA
 * r_customedPrice:
 * s_rootHash:
 * @param {*}
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
  let hexDomain = toASCII(punycode.toASCII(domain))
  let hexTopDomain = toASCII(punycode.toASCII(parentDomain))
  let inst =await getBasOANNInstance(Params.chainId,Params.web3js)
  let ret = await inst.methods.evalueSubPrice(hexTopDomain,hexDomain,year).call()
  console.log(ret)

  return ret;
}

/**
 * 预估金额
 * @param {*} domain
 * @param {*} isCustomed
 * @param {*} year
 */
export async function calcTopCost(
  domain,
  isCustomed,
  year,
  wallet
  ){
  let Params = initContractParams()
  let chainId = Params.chainId

  let hexDomain = toASCII(punycode.toASCII(domain))
  let token = getBasTokenInstance(chainId,Params.web3js)
  let basBalance = await token.methods.balanceOf(wallet).call()
  let inst =await getBasOANNInstance(chainId,Params.web3js)
  console.log('Top>evalue>>',hexDomain, isCustomed, year)
  //isValid,isARoot,cost
  let ret = await inst.methods.evalueRootPrice(hexDomain,isCustomed,year).call()
  console.log(ret)

  ret.basBalance = basBalance
  return ret;
}

/**
 * todo change Infura Provider
 *
 */
export async function validExistDomain(text){
  let Params = initContractParams()
  let inst = getBasAssetInstance(Params.chainId,Params.web3js)
  let hash = Params.utils.keccak256(text)
  let searchback = await inst.methods.AssetDetailsByHash(hash).call()

  return {
    isRoot:searchback.isRoot,
    exist:(searchback.name ? true : false),
    expire:searchback.expire,
    owner:searchback.owner||'',
    isCustomed:searchback.r_isCustomed,
    openApplied:searchback.r_openToPublic
  }
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
  registSubDomainEmitter,
}
