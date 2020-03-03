import {
  checkMetaMask,
  getBasTokenInstance,
  initConnectMetamask
  } from '@/bizlib/web3'
import * as types from './mutation-types'

import { refreshAccount } from '@/bizlib/web3/token-api'


/**
 * check is Metamask inJected
 * @param {*} param0
 */
export const check = ({ commit }) => {
  checkMetaMask.then(result=>{
    commit(types.CHECK_INJECTED,result)
  }).catch(err=>{
    console.log('ERROR',err)
    commit(types.CHECK_INJECTED,{isInjected:false,error:err})
  })
}

export const initLogin = ({commit}) =>{
  initConnectMetamask().then(ret=>{
    console.log(ret)
    commit(types.ENABLE_METAMASK,ret)
    return ret
  }).then(ret =>{
    if(ret && ret.wallet ){
      let opts = {
        from:ret.walllet,
        gasPrice:ret.gasPrice
      }

    }
  })
  .catch(ex=>{
    commit(types.SET_ERROR,ex)
  })
}

export const refreshAccountBase = async({commit})=>{
  refreshAccount().then(data=>{
    console.log(data)
    commit(types.REFRESH_ACC_BASE,data)
  }).catch(ex=>{
    console.log(ex)
  })
}

export const basTokenUpdate= async ({commit},{chainId,option={}})=> {
  console.log(chainId,'<<<>>>',option)
  try{
    let payload = {}
    let token = getBasTokenInstance(chainId,option)
    payload.symbol = await token.methods.symbol().call()
    payload.decimals = await token.methods.decimals().call()
    let address = option.from;
    if(address){
      payload.basBal = await token.methods.balanceOf(address).call()
    }
    //console.log(payload)
    commit(types.UPDATE_TOKEN,payload)
  }catch(ex){
    console.log('GetBasBalance Error:',ex)
    return
  }
}



export default {
  check,
  initLogin,
  basTokenUpdate,
  refreshAccountBase,
}
