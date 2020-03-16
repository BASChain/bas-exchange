import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'

class GetFreeProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api', parameters);
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
}

export default GetFreeProxy
