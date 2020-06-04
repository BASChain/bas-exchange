import { basTransCheckInstance } from './instances'
import { getWeb3 } from './index'


// /**
//  *
//  * @param {*} handleText
//  * @param {*} chainId
//  * @param {*} wallet
//  */
// export async function getTopDomainInfo(handleText,chainId,wallet){
//   let web3js = getWeb3()
//   const inst = basTransCheckInstance(web3js, chainId, { from: wallet })

//   const Web3Utils = Web3.utils

//   const hash = Web3Utils.keccak256(handleText)
//   console.log('getTopDomainInfo>', handleText, hash)
//   const resp = await inst.methods.queryRootInfo(hash).call()
//   let ret = {
//     state:0,
//     asset:{
//       hash: hash
//     },
//     dns:{}
//   }

//   if (resp && isNaNOwner(resp.owner)){
//     ret.state = 1
//     const asset = {
//       owner: resp.owner,
//       expire:resp.expiration,
//       name: transHex2String(resp.rootName),
//       openApplied:resp.isOpen,
//       isCustomed:resp.isCustomed,
//       customPrice:resp.isCustomedPrice,
//     }
//     ret.asset = asset;
//     const dns = {
//       ipv4: hex2IPv4(resp.ipv4),
//       ipv6: hex2IPv6(resp.ipv6),
//       wallet: hexBca2Str(resp.bca),
//       alias:resp.aliasName,
//       extrainfo: extraHex2Str(resp.opData)
//     }
//     ret.dns = dns
//     return ret;
//   }else{
//     return ret
//   }
// }
// /**
//  *
//  * @param {*} handleText
//  * @param {*} chainId
//  * @param {*} wallet
//  */
// export async function getSubDomainInfo(handleText, chainId, wallet) {
//   let web3js = getWeb3()
//   const inst = basTransCheckInstance(web3js, chainId, { from: wallet })

//   const hash = keccak256(handleText)
//   console.log('getSubDomainInfo>', handleText, hash)
//   const resp = await inst.methods.querySubInfo(hash).call()
//   let ret = {
//     state: 0,
//     asset: {
//       hash:hash
//     },
//     rootasset:{
//     },
//     dns: {}
//   }

//   if (resp && isNaNOwner(resp.owner)) {
//     ret.state = 1
//     const asset = {
//       owner: resp.owner,
//       expire: resp.expiration,
//       name: transHex2String(resp.totalName),
//     }
//     ret.asset = asset;
//     const dns = {
//       ipv4: hex2IPv4(resp.ipv4),
//       ipv6: hex2IPv6(resp.ipv6),
//       wallet: hexBca2Str(resp.bca),
//       alias: resp.aliasName,
//       extrainfo: extraHex2Str(resp.opData)
//     }
//     if (resp.rootHash && isNaNOwner(resp.rootOwner)){
//       let top = await inst.methods.queryRootInfo(hash).call()
//       const rootasset = {
//         hash: resp.rootHash,
//         name:transHex2String(top.rootName),
//         owner: resp.rootOwner,
//         expire:top.expiration,
//         openApplied: top.isOpen,
//         isCustomed: top.isCustomed,
//         customPrice: top.isCustomedPrice
//       }

//       ret.rootasset = rootasset
//     }else{
//       ret.rootasset.hash = resp.rootHash
//     }

//     ret.dns = dns
//     return ret;
//   } else {
//     return ret
//   }
// }

// export function isNaNOwner(owner){
//   if(!owner)return false;
//   const Web3Utils = Web3.utils
//   return !!Web3Utils.hexToString(owner)
// }

// export function hexBca2Str(bca) {
//   if (!bca || bca === '0x') return ''
//   return bca + ''
// }

// export function transHex2String(hex) {
//   try{
//     return hexToString(hex)
//   }catch(ex){
//     return hex
//   }
// }

// export function hex2IPv4(hex) {
//   if (!hex) return ''
//   if (/^(0x)?[0]{8}$/.test(hex)) return ''
//   let _hexStr = hex + '';
//   if (hex.startsWith('0x')) _hexStr = hex.substr(2)
//   let tmp = [4]
//   for (var i = 0; i < 4; i++) {
//     tmp[i] = parseInt(_hexStr.substring(i * 2, (i + 1) * 2), 16)
//   }
//   return tmp.join('.')
// }
// /**
//  *
//  * @param {*} hex
//  */
// export function hex2IPv6(hex) {
//   if (!hex) return ''
//   if (/^(0x)?[0]{32}$/.test(hex)) return '';
//   let _hexStr = hex + '';
//   if (hex.startsWith('0x')) _hexStr = hex.substr(2);
//   let tmp = [8]
//   for (var i = 0; i < 8; i++) {
//     tmp[i] = _hexStr.substring(i * 4, (i + 1) * 4)
//   }
//   return tmp.join(':')
// }

// export function extraHex2Str(hex) {
//   try {
//     return hexToString(hex)
//   } catch (ex) {
//     console.log(ex)
//     return ''
//   }
// }
export default {
  // isNaNOwner,
  // transHex2String,
}
