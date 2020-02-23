import { checkMetaMask } from '@/bizlib/web3'
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

/**
 *
 * @param {*} param0
 */
export const startupEthEvent = async ({commit},wallet) =>{
  if(!wallet)return ;

  console.log('eth event >>>>>>>',wallet)
  let eth = window.ethereum;
  let web3js = new Web3(window.web3.currentProvider)


}



export default {
  check,
  startupEthEvent,
}
