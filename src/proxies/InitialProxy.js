import BaseProxy from './Proxy'

const DAPP_STATE = "basBasicSettings"

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
    super('api/contact', parameters);
  }

  getInitialState(){
    return this.submit(
      'post',
      `${this.endpoint}/${DAPP_STATE}`,
      { }
    )
  }

  transDappState(resp) {
    if (!resp) return DEFAULT_STATE

    let state = {
      rareGas: resp.arootgas,
      topGas:resp.brootgas,
      subGas:resp.subgas,
      maxYearReg:resp.maxyear,
      customedPriceGas:resp.custompricegas
    }

    return Object.assign({},DEFAULT_STATE,state)
  }

  defaultDappState(){
    return DEFAULT_STATE
  }
}

export default InitialProxy
