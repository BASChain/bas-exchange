
const toWei = Web3.utils.toWei
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
  mailSeviceGas: toWei('100', 'ether'),
  mailRegGas: toWei('2', 'ether'),
  maxRegYears: 5,
  domainYearItems:[
    { y: 5, total: 20 }, { y: 4, total: 16 }, { y: 3, total: 12 }, { y: 2, total: 8 }, { y: 1, total: 4 }
  ],
  maxMailRegYears:5,
  mailYearItems:[],
  maxRegDays: 157680000,
  typeDiction: [],
  maxDataLength: 512,
  maxPriceBas:10000000000,
  rootassets:[],
  mailassets:[],//{domaintext,hash}
};
