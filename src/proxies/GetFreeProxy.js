import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'

const VALID_STATE = "freeCoinState"
const TOKEN_SVR_BASEPATH = '/reth'

class GetFreeProxy extends BaseProxy {
  constructor(parameters = {}) {
    super(TOKEN_SVR_BASEPATH, parameters);
  }

  getFreeEth(wallet) {
    return this.submit(
      'get',
      `${this.endpoint}/${wpaths.GET_FREE_ETH}?account=${wallet}`,
      { wallet }
    )
  }

  // getFreeBas(wallet) {
  //   return this.submit(
  //     'post',
  //     `${this.endpoint}/${wpaths.GET_FREE_BAS}`,
  //     { wallet }
  //   )
  // }

  // validFreeState(wallet,type){
  //   return this.submit(
  //     'post',
  //     `${this.endpoint}/${VALID_STATE}`,
  //     {
  //       wallet,
  //       type
  //     }
  //   )
  // }

}

export default GetFreeProxy
