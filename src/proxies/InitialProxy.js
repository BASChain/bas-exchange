import BaseProxy from './Proxy'

const DAPP_STATE = "tldList"

const DEFAULT_STATE = {
  symbol:'BAS',
  decimals:18,
  rareGas:500*(10**18),
  topGas:20*(10**18),
  subGas:4*(10**18),
  customedPriceGas:100*(10**18),
  maxYearReg:5,
  aliasMaxLen:256,
  extrainfoMaxLen:512
}

class InitialProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api/domain', parameters);
  }

  getInitialState(){
    return this.submit(
      'post',
      `${this.endpoint}/${DAPP_STATE}`,
      { pagenumber:1, pagesize:10 }
    )
  }

  transDappState(resp) {
    if (!resp.state) return DEFAULT_STATE

    return DEFAULT_STATE
  }

  defaultDappState(){
    return DEFAULT_STATE
  }
}

export default InitialProxy
