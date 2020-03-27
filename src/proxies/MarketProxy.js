import BaseProxy from './Proxy'

const SELLING_LIST = "SellingDomainList"

export class MarketProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api/market', parameters);
  }

  getSellingDomains({pagenumber=1,pagesize=8,wallet=''}){

    return this.submit(
      'post',
      `${this.endpoint}/${SELLING_LIST}`,
      {
        pagenumber,
        pagesize,
        wallet
      }
    )
  }

}

export default {
  MarketProxy
}
