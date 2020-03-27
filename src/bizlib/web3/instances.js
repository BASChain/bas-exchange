import ContractManager from '../abi-manager/index'

export function basTokenInstance(web3js,chainId, options) {
  let Contract = ContractManager.BasToken(chainId)
  if(!options)options={}
  return new web3js.eth.Contract(Contract.abi, Contract.address,options)
}

export function basAssetInstance(web3js, chainId, options) {
  let Contract = ContractManager.BasAsset(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export function basOANNInstance(web3js, chainId, options) {
  let Contract = ContractManager.BasOANN(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export function basGetFreeInstance(web3js,chainId,options) {
  let Contract = ContractManager.BasGetFree(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export function basSendFreeInstance(web3js, chainId, options) {
  let Contract = ContractManager.BasSendFree(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export function basMarketInstance(web3js, chainId, options) {
  let Contract = ContractManager.BasMarket(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export function basOwnerShipInstance(web3js,chainId,options){
  let Contract = ContractManager.BasOwnerShip(chainId)
  if (!options) options = {}
  return new web3js.eth.Contract(Contract.abi, Contract.address, options)
}

export default {
  basTokenInstance,
  basAssetInstance,
  basOANNInstance,
  basGetFreeInstance,
  basSendFreeInstance,
  basMarketInstance,
  basOwnerShipInstance,
}
