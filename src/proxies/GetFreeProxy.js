import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'

const VALID_STATE = "freeCoinState"

class GetFreeProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api/contact', parameters);
  }

  getFreeEth(wallet) {
    return this.submit(
      'post',
      `${this.endpoint}/${wpaths.GET_FREE_ETH}`,
      { wallet }
    )
  }

  getFreeBas(wallet) {
    return this.submit(
      'post',
      `${this.endpoint}/${wpaths.GET_FREE_BAS}`,
      { wallet }
    )
  }

  validFreeState(wallet,type){
    return this.submit(
      'post',
      `${this.endpoint}/${VALID_STATE}`,
      {
        wallet,
        type
      }
    )
  }

}

export default GetFreeProxy
