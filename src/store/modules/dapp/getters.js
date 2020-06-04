
import { LAST_CHAINID_KEY} from './mutation-types'

const fromWei = Web3.utils.fromWei
/**
 *
 */
const getters = {
  typeDicts: state => {
    return state.typeDiction;
  },
  ruleState: state => {
    const decimals = state.decimals;
    let cid = Cookies.get(LAST_CHAINID_KEY)

    return {
      chainId:state.chainId||cid,
      wallet:state.wallet,
      decimals,
      rareBas: fromWei(state.rareGas,'ether'),
      rootBas: fromWei(state.rootGas,'ether'),
      subBas: fromWei(state.subGas,'ether'),
      externalBas: fromWei(state.externalGas ,'ether'),
      mailSeviceBas: fromWei(state.mailSeviceGas,'ether'),
      mailRegBas: fromWei(state.mailRegGas,'ether'),
      maxRegYears: state.maxRegYears,
      maxMailRegYears: state.maxMailRegYears,
      maxDataLength: state.maxDataLength,
      maxPriceBas: state.maxPriceBas,
      minSubBas:fromWei (state.subGas ,'ether')
    };
  },
  /**
   * login status
   */
  loginState:state => {
    //console.log(state.chainId)
    return state.injected && Boolean(state.chainId) && Boolean(state.wallet)
  },
  web3State:state => {
    let cid = Cookies.get(LAST_CHAINID_KEY)
    return {
      injected: state.injected,
      chainId:state.chainId||cid,
      wallet:state.wallet
    };
  },
};

export default getters;
