import {fromWei,toWei, BN} from 'web3-utils'
import punycode from "punycode";

export const MinGasWei = 100000;

/**
 * compare bas > weibn 1, = 0 ,< -1
 * @param {*} bas ether number or string
 * @param {*} wei bn or wei
 */
export const compareBas2Wei = (bas,wei) =>{
  const basbn = new BN(fromWei(toWei(bas+'','ether'),'wei'))
  console.log(basbn.toString());
  return basbn.cmp(new BN(wei,10))
}

/**
 * baswei > wei  1 ; = 0 ; < -1
 * @param {*} baswei string or number
 * @param {*} wei string or number
 */
export const compareWei2Wei = (baswei, wei) => {
  const basbn = new BN(baswei+'',10);
  const weibn = new BN(wei+'',10)
  console.log(basbn.toString());
  return basbn.cmp(weibn);
};

/**
 * trim>toLowerCase>punycode
 * @param {*} name
 */
export function prehandleDomain(name){
  if(name === undefined ) throw 'Illegal name.'
  name = name +''
  const resname = name.trim().toLowerCase();
  return punycode.toUnicode(resname);
}

export default {
  MinGasWei,
  compareBas2Wei,
  compareWei2Wei,
  prehandleDomain
};
