import { toWei } from 'web3-utils'
/**
 * DApp State
 * typeDiction DNS data type diction
 */
export default {
  injected:false,
  chainId:null,
  wallet:null,
  ethwei:null,
  baswei:null,
  withdraw:null,
  symbol: "BAS",
  decimals: 18,
  rareGas: toWei('2000','ether'),
  rootGas: toWei('200' ,'ether'),
  subGas: toWei('4', 'ether'),
  externalGas: toWei('100', 'ether'),
  maxRegYears: 5,
  maxRegDays: 157680000,
  typeDiction: [],
  maxDataLength: 512,
  maxPriceBas:10000000000
};
