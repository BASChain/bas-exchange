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
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}



export default {
  basTokenInstance,
  basOANNInstance,
  basViewInstance,
};
