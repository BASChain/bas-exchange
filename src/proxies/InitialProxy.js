import BaseProxy from './Proxy'
import { networkAPIEndpoint } from '@/bizlib/web3'

const toWei = Web3.utils.toWei

const DAPP_STATE = "basBasicSettings"

const DEFAULT_STATE = {
  symbol:'BAS',
  decimals:18,
  rareGas: toWei('2000','ether'),
  rootGas: toWei('200', 'ether'),
  subGas: toWei('4', 'ether'),
  externalGas: toWei('100', 'ether'),
  maxRegYears:5,
  maxRegDays: 157680000,
  maxDataLength:512,
  maxPriceBas: 10000000000
}

class InitialProxy extends BaseProxy {
  constructor(parameters = {}) {
    const prefix = networkAPIEndpoint()
    super(`api${prefix}/contact`, parameters);
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
      rootGas:resp.brootgas,
      subGas:resp.subgas,
      maxYearReg:resp.maxyear,
      externalGas:resp.custompricegas
    }

    return Object.assign({},DEFAULT_STATE,state)
  }

  defaultDappState(){
    return DEFAULT_STATE
  }
}

export default InitialProxy
