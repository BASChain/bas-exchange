import { basDnsInstance } from './instances'
import { getWeb3} from './index'

const hexToString = Web3.utils.hexToString

/**
 * "0x1d0eea4cb6d379a7d38fa9fb4ea37166438cfc35c89276248729fa2f3004e7f4"
 * @param {*} namehash
 */
export async function getDnsInfoByHash(namehash,chainId,wallet){
  let web3js = getWeb3()
  const inst = basDnsInstance(web3js,chainId,{from:wallet})
  const resp = await inst.methods.query(namehash).call()
  const ret = {
    namehash: namehash,
    ipv4: hex2IPv4(resp.ipv4),
    ipv6: hex2IPv6(resp.ipv6),
    wallet: resp.bca ? hexBca2Str(resp.bca) : '',
    alias: resp.aliasName||'',
    extrainfo: resp.opData ? extraHex2Str(resp.opData) :''
  }

  return ret
}
/**
 *
 * @param {*} domaintext
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getDomainDnsInfo(domaintext,chainId,wallet) {

}

export function hexBca2Str(bca){
  if(!bca || bca === '0x')return ''
  return bca+''
}

export function hex2IPv4(hex) {
  if (!hex) return ''
  if (/^(0x)?[0]{8}$/.test(hex)) return ''
  let _hexStr = hex + '';
  if (hex.startsWith('0x')) _hexStr = hex.substr(2)
  let tmp = [4]
  for (var i = 0; i < 4; i++) {
    tmp[i] = parseInt(_hexStr.substring(i * 2, (i + 1) * 2), 16)
  }
  return tmp.join('.')
}
/**
 *
 * @param {*} hex
 */
export function hex2IPv6(hex) {
  if (!hex) return ''
  if (/^(0x)?[0]{32}$/.test(hex)) return '';
  let _hexStr = hex + '';
  if (hex.startsWith('0x')) _hexStr = hex.substr(2);
  let tmp = [8]
  for (var i = 0; i < 8; i++) {
    tmp[i] = _hexStr.substring(i * 4, (i + 1) * 4)
  }
  return tmp.join(':')
}

export function extraHex2Str(hex){
  try{
    return hexToString(hex)
  }catch(ex){
    console.log(ex)
    return ''
  }
}

export default {
  getDnsInfoByHash
}
