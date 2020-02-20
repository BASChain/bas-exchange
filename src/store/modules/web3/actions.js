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



export default {
  check,
}
