import { checkMetaMask,getBasTokenInstance } from '@/bizlib/web3'
import * as types from './mutation-types'


export const enableMetamask = ({commit}) =>{

}

export const check = ({ commit }) => {
  checkMetaMask.then(result=>{
    commit(types.CHECK_INJECTED,result)
  }).catch(err=>{
    console.log('ERROR',err)
    commit(types.CHECK_INJECTED,{isInjected:false,error:err})
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

/**
 *
 * @param {*} param0
 */
export const startupEthEvent = async ({commit},wallet) =>{
  if(!wallet)return ;
  //console.log('eth event >>>>>>>',wallet)
  let eth = window.ethereum;
  let web3js = new Web3(window.web3.currentProvider)
}



export default {
  check,
  startupEthEvent,
  basTokenUpdate,
}
