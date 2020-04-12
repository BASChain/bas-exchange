import BaseProxy from './Proxy'
import { networkAPIEndpoint } from '@/bizlib/web3'

const SELLING_LIST = "SellingDomainList"
const SEARCH_LIST = "marketSearch"

export class MarketProxy extends BaseProxy {
  constructor(parameters = {}) {
    const prefix = networkAPIEndpoint()

    super(`api${prefix}/market`, parameters);
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

  queryDomains({ pagenumber = 1, pagesize = 8, text = '' }) {

    return this.submit(
      'post',
      `${this.endpoint}/${SEARCH_LIST}`,
      {
        pagenumber,
        pagesize,
        text
      }
    )
  }
}

export default {
  MarketProxy
}
