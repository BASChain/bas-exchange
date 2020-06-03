//import Web3 from 'web3'
import store from '@/store'
import apiTypes from '@/store/modules/web3/mutation-types'
import ContractManager from '../abi-manager/index'
import { checkSupport } from '../networks'

import { basTokenInstance, basOANNInstance, basMinerInstance} from './instances'

import * as ErrCodes from './error-codes'


/**
 * 加载时check Metamask
 */
export const checkMetaMaskInject = ()=>{
  return window.web3 && window.ethereum && window.ethereum.isMetaMask;
}
/**
 * 加载时check Metamask
 */
export const checkMetaMask = new Promise((resolve,reject)=>{
  if(window.web3 === undefined){
    reject(new Error('Metamask unfound in your browser'))
  }
  window.ethereum.autoRefreshOnNetworkChange = false;
  let flag = !!(window.web3 && window.ethereum && window.ethereum.isMetaMask)
  let web3js = window.web3;
  var web3 = new Web3(web3js.currentProvider)
  //gloal
  window.web3 = web3
  resolve({
    isInjected:flag,
  })
})

/**
 * mounted proid used
 */
export function getDappChainAndWallet(){
  return {
    chainId:currentChainId()||3,
    wallet:currentWallet()||''
  }
}

export async function connectMetamask(){
  let ethereum = window.ethereum
  let accounts = await ethereum.enable()
  let wallet = accounts[0];
  let web3js = window.web3
  //new Web3(window.web3.currentProvider)
  let chainId = await web3js.eth.getChainId()

  return {
    chainId,
    wallet,
  }
}

/**
 * load初始化
 * @param {*} isInjected
 */
export async function reloadChainAndWallet(ethereum) {
  let unlocked = await ethereum._metamask.isUnlocked()
  if (unlocked) {
    let web3js = window.web3;
    let chainId = await web3js.eth.getChainId();
    let accounts = await web3js.eth.getAccounts();

    chainId = chainId ? parseInt(chainId) :''

    let wallet = accounts.length > 0 ? accounts[0] :''

    return Promise.resolve({chainId,wallet})
  } else {
    return Promise.reject('MetaMask never login')
  }
}

/**
 * login MetaMask
 */
export async function loginMetaMask(){
  let ethereum = window.ethereum
  if(!window.web3)throw new Error('no metamask')
  let web3js = window.web3
  let accounts = await ethereum.enable()
  let wallet = accounts.length ? accounts[0]:''
  let chainId = await web3js.eth.getChainId()

  return {
    wallet,
    chainId,
  }
}

/**
 *
 */
export function currentChainId() {
  if(!ethereum || !ethereum.chainId)return 3
  return parseInt(ethereum.chainId)
}

export function currentWallet() {
  if(!ethereum || !ethereum.selectedAddress)return ''
  return ethereum.selectedAddress
}

/**
 * 可以指定web3,可以null
 * @param {web3} web3js
 */
export async function getCurrentWallet(web3js){
  if(!web3js)web3js = window.web3
  if(!web3js) '';
  let wallets = await web3js.eth.getAccounts()
  return wallets.length ? wallets[0] : '';
}

export function getBasTokenInstance(chainId){
  const BasTokenContract = ContractManager.BasToken(chainId)
  let abi = BasTokenContract.abi;
  let web3js = window.web3
  //new Web3(window.web3.currentProvider)
  return new web3js.eth.Contract(abi,BasTokenContract.address)
}

export async function approveBasToken(chainId,wallet,costWei){
  if(!checkSupport(chainId))throw '3001:unsupport network';
  let opts = store.getters['web3/transOptions']
  let approveAddress = ContractManager.BasOANN(chainId).address;

  let inst = getBasTokenInstance(chainId);
  let basBal = await inst.methods.balanceOf(wallet).call()
  store.commit('web3/updateBASBalance',basBal)

  let diff = basBal/(10**18) - costWei/(10**18)
  console.log(basBal,costWei,diff,approveAddress)

  if(parseInt(diff)<0)throw '3002: Insufficient balance'

  let approveResp = await inst.methods.approve(approveAddress,costWei).send(opts)
  console.log('>>>',approveResp)
  return approveResp
}

/**
 * Event emitter
 *
 * @param {*} chainId
 * @param {*} wallet
 * @param {*} costWei
 */
export function approveBasTokenEmitter(chainId,costWei){
  if(!currentWallet())throw 4001
  let options = {
    from : currentWallet()
  }
  let approveAddress = ContractManager.BasOANN(chainId).address;
  let inst = getBasTokenInstance(chainId);
  return inst.methods.approve(approveAddress,costWei).send(options)
}




export async function initAppEth(web3js,wallet){
  if(!web3js)return;
  let chainId = await web3js.eth.getChainId()
  let gasPrice = await web3js.eth.getGasPrice()
  var bal = await web3js.eth.getBalance(wallet);

  return {
    wallet,
    chainId,
    gasPrice,
    bal
  }
}

/**
 * refresh Page
 * TODO
 */
export async function initConnectMetamask(){
  let eth = window.ethereum
  if(!window.ethereum || !window.ethereum.selectedAddress ||!ethereum.chainId){
    console.log('does not init Page login...')
    return;
  }
  console.log('does auto init Page login...')
  let wallet = window.ethereum.selectedAddress
  let web3js = window.web3;
  let ret = await initAppEth(web3js,wallet)
  return ret;
}

/**
 *
 * @param {*} wallet
 */
export function listenerNetwork(wallet){
  let ethereum = window.ethereum
  let web3js = getWeb3()

  if(!ethereum.eventNames().find(n=>n === 'accountsChanged')){
    console.log('load listenerNetwork')
    ethereum.on('accountsChanged',async function(accounts){
      let chainId = await web3js.eth.getChainId()
      if(accounts.length){
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`,accounts[0])
        web3js.eth.getBalance(accounts[0]).then(bal =>{
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
        })
        //BAS
        if(chainId && checkSupport(chainId)){
          let option = { from: accounts[0]}

          store.commit(`${apiTypes.UPDATE_BASBAL}`, '')
          store.commit(`${apiTypes.UPDATE_DRAWWEI}`, '')
        }else{
          store.commit(`${apiTypes.UPDATE_DRAWWEI}`,'')
          store.commit(`${apiTypes.UPDATE_BASBAL}`, '')
        }
      }else{
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`,'')
        store.commit(`web3/${apiTypes.UPDATE_BASBAL}`,'')
      }
    })
  }


}

/**
 * 初始化OANN 参数
 * @param {*} chainId
 */
export async function initOANNConfigs(chainId,options ={}) {
  let web3js = window.web3
  if(!checkSupport(chainId) || !web3js){
    //
    return false
  }
  try{
    let inst = basOANNInstance(web3js, chainId,options)
    let rareGas = await inst.methods.AROOT_GAS().call()
    let topGas = await inst.methods.BROOT_GAS().call()
    let subGas = await inst.methods.SUB_GAS().call()
    let customedPriceGas = await inst.methods.CUSTOMED_PRICE_GAS().call()
    let maxYearReg = await inst.methods.MAX_YEAR_REG().call()

    let payload = {rareGas,topGas,subGas,customedPriceGas,maxYearReg}
    console.log(payload)
    store.commit('web3/updateOANNData',payload)
  }catch(ex){
    console.error(ex)
  }
}


export function getWeb3(){
  if(!window.ethereum)throw ErrCodes.E9998
  if(!window.web3)throw errorCodes.E9997
  return window.web3
}

/**
 *
 * @param {*} wallet
 */
export async function getEthBalance(wallet){
  let web3js = getWeb3();
  if (!web3js) return Promise.reject(errorCodes.E9998)
  let ethBal = await web3.eth.getBalance(wallet)
  ethBal = ethBal / 10 ** 18
  return ethBal;
}

/**
 * 用于提交Transaction
 */
export async function checkoutMetaMaskBase(){
  let web3js = getWeb3()
  let chainId = currentChainId()
  let  wallet = currentWallet() || ''

  if(!web3 || !chainId || !wallet){
    return Promise.reject(false)
  }
  //todo version
  return {
    web3js,
    chainId,
    wallet,
  }
}

/**
 * 加载DappState ,login and listener
 * @param {*} chainId
 * @param {*} wallet
 */
export async function loadDappState(chainId,wallet){
  let state = {
    symbol: 'BAS',
    decimals: 18,
    gasPrice: 2000000000,
    rareGas: 500 * (10 ** 18),
    topGas: 20 * (10 ** 18),
    subGas: 4 * (10 ** 18),
    customedPriceGas: 100 * (10 ** 18),
    maxYearReg: 5,
    maxDaysReg: 157680000,
    aliasLen: 256,
    extensionLen: 512,
  }

  let web3js = getWeb3()
  if(!chainId)chainId = await web3js.eth.getChainId();
  let opts = {}
  if (wallet) {
    opts.from = wallet
  }
  let token = basTokenInstance(web3js, chainId, opts)
  state.symbol = await token.methods.symbol().call()
  state.decimals = await token.methods.decimals().call()
  return state;
}




/**
 *
 * @param {*} web3js
 */
export async function DappMetaMaskListener(web3js){
  if (!ethereum) {
    return Promise.reject('no web3,listener stop.');
  }
  if (!web3js) web3js = getWeb3()
  //
  if(!ethereum.eventNames().find(n => n === 'accountsChanged')){
    ethereum.on('accountsChanged', async function (accounts) {
      let chainId = await web3js.eth.getChainId()
      if (accounts.length) {
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`, accounts[0])
        web3js.eth.getBalance(accounts[0]).then(bal => {
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`, bal)
        })
        //BAS
        if (chainId && checkSupport(chainId)) {
          let token = basTokenInstance(web3js, chainId, { from: accounts[0]})
          let basBal = await token.methods.balanceOf(accounts[0]).call()
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, basBal)

          //updateDrawWei
          const miner = basMinerInstance(web3js, chainId, { from: accounts[0] })
          let drawWei = await miner.methods.balanceOf(accounts[0]).call()
          store.commit(`web3/${apiTypes.UPDATE_DRAWWEI}`, drawWei)
          //let
        } else {
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
          store.commit(`web3/${apiTypes.UPDATE_DRAWWEI}`, '')
        }
      } else {
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`, '')
        store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
        store.commit(`web3/${apiTypes.UPDATE_DRAWWEI}`, '')
      }
    })
  }

/**
 * MetaMask team so shit ,Introduction of their official API,
 * the new API is tells
 * networkChanged now feature will chainChanged
 */
  if(!ethereum.eventNames().find(n=>n === 'networkChanged')){
    ethereum.on('networkChanged',async function(chainId){
      console.log('Chain change',chainId)
      let accounts = await web3js.eth.getAccounts();
      store.commit(`web3/${apiTypes.UPDATE_CHAINID}`,chainId)
      if(accounts.length){
        let wallet = accounts[0]
        web3js.eth.getBalance(wallet).then(bal => {
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`, bal)
        })

        if (checkSupport(chainId)) {
          let token = basTokenInstance(web3js, chainId, { from: accounts[0] })
          let basBal =await token.methods.balanceOf(accounts[0]).call()
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, basBal)

          //updateDrawWei
          const miner = basMinerInstance(web3js, chainId, { from: accounts[0] })
          let drawWei = await miner.methods.balanceOf(accounts[0]).call()
          store.commit(`web3/${apiTypes.UPDATE_DRAWWEI}`, drawWei)
        } else {
          store.commit(`web3/${apiTypes.UPDATE_WALLET}`, wallet)
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
          store.commit(`web3/${apiTypes.UPDATE_DRAWWEI}`, '')
        }
      }
    })
  }
}

/**
 * Service API Prefix
 */
export function networkAPIEndpoint(){
  const chainId = (window.ethereum && window.ethereum.chainId) ? parseInt(window.ethereum.chainId) : 3
  if(!checkSupport(chainId)) return 3
  return chainId
}

export function checkSupport4Search(){
  if(window.web3){
    let chainId = currentChainId()
    return checkSupport(chainId);
  }else{
    return true;
  }
}

/**
 * Maybe depared
 */
export function getCurrentState(){
  if(window.ethereum){
    return {
      chainId: ethereum.chainId,
      wallet: ethereum.selectedAddress||''
    }
  }else{
    return {
      chainId:'',
      wallet:''
    }
  }
}

/**
 * 执行合约前检查
 */
export function checkFetchDappState(){
  if(!window.ethereum || !window.web3)
    throw ErrCodes.E1001
  let chainId = currentChainId()
  let wallet = currentWallet()

  if(!chainId || !wallet)
    throw ErrCodes.E1001;
  if(!checkSupport(chainId)){
    throw ErrCodes.E3001
  }

  return {
    chainId,
    wallet
  }
}

/**
 * Injected 后用
 */
export function getWeb3State(){
  return {
    chainId:currentChainId(),
    wallet:currentWallet()
  }
}

export default {
  checkMetaMask,
  connectMetamask,
  initConnectMetamask,
  listenerNetwork,
  networkAPIEndpoint,
}

