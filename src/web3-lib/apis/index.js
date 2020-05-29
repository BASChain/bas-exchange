import ContractManager from '../abi-manager/index'

/**
 * Token Instance
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basTokenInstance(web3js,chainId,options={}) {
  let ctx = ContractManager.BasToken(chainId)
  return new web3js.eth.Contract(ctx.abi,ctx.address,options)
}

/**
 * Get rootDomain instance
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basRootDomainInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasRootDomain(chainId)
  return new web3js.eth.Contract(ctx.abi,ctx.address,options)
}

/**
 * Sub domain instance
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basSubDomainInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasSubDomain(chainId);
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basDomainConfInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasDomainConf(chainId);
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}

/**
 * oann Instance
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basOANNInstance(web3js,chainId,options={}) {
  let ctx = ContractManager.BasOANN(chainId);
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}

/**
 * View Instance
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basViewInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasView(chainId);
  //console.log(ctx)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options : from :account required
 */
export function basTraOwnershipInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasTradableOwnership(chainId)
  return new web3js.eth.Contract(ctx.abi,ctx.address,options)
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basMailInstance(web3js,chainId,options={}){
  let ctx = ContractManager.BasMail(chainId)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options)
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basMailManagerInstance(web3js, chainId, options = {}) {
  let ctx = ContractManager.BasMailManager(chainId)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options)
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basExpireOwnershipInstance(web3js, chainId, options = {}) {
  let ctx = ContractManager.BasExpiredOwnership(chainId)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options)
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function basMarketInstance(web3js, chainId, options = {}) {
  let ctx = ContractManager.BasMarket(chainId)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options)
}

/**
 *
 * @param {*} web3js
 * @param {*} chainId
 * @param {*} options
 */
export function sendFreeBasInstance(web3js, chainId, options = {}) {
  let ctx = ContractManager.SendFreeBas(chainId)
  console.log(ctx)
  return new web3js.eth.Contract(ctx.abi, ctx.address, options)
}

export default {
  basTokenInstance,
  basRootDomainInstance,
  basSubDomainInstance,
  basDomainConfInstance,
  basOANNInstance,
  basViewInstance,
  basTraOwnershipInstance,
  basMailInstance,
  basMailManagerInstance,
  basExpireOwnershipInstance,
  basMarketInstance,
  sendFreeBasInstance,
};
