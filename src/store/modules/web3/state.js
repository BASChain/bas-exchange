/**
 * isInjected 代表web3 injected with 1.2.6
 */
export default {
  isInjected:false,
  dappLoaded:false,
  chainId: null,
  wallet: null,
  approvAddress:'',
  symbol:'BAS',
  decimals:18,
  gasPrice:2000000000,
  ethBal:0,
  basBal:0,
  drawWei:0,
  rareGas:2000 * (10**18),
  topGas:200 *(10**18),
  subGas:4 * (10**18),
  customedPriceGas:100*(10**18),
  externalBAS:100*10**18,
  maxYearReg:5,
  maxDaysReg: 157680000,
  //asset config
  aliasLen:256,
  extensionLen:512,
  error:null,
}
