import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'

class WalletProxy extends BaseProxy {
  constructor(parameters={}){
    super('api',parameters);
  }

  getTotal(wallet){
    return this.submit(
      'post',
      `${this.endpoint}/${wpaths.GET_DOMAIN_TOTAL}`,
      {wallet}
    )
  }

  getList({wallet,pageNumber=1,pageSize=5}){
    //console.log('parameters:',wallet)
    return this.submit(
      'post',
      `${this.endpoint}/${wpaths.GET_DOMAIN_LIST}`,
      { wallet,pageNumber,pageSize }
    )
  }
}

export default WalletProxy
