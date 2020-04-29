import ContractManager from '../abi-manager/index'

export function basTokenInstance(web3js,chainId,options={}) {
  let ctx = ContractManager.BasToken(chainId)
  return new web3js.eth.Contract(ctx.abi,ctx.address,options)
}

export function basOANNInstance(web3js,chainId,options={}) {
  let ctx = ContractManager.BasOANN(chainId);
  return new web3js.eth.Contract(ctx.abi, ctx.address, options);
}


export default {
  basTokenInstance,
  basOANNInstance,
};
