import DomainProxy from '@/proxies/DomainProxy'
import { MarketProxy } from '@/proxies/MarketProxy.js'
import * as types from './mutations-types'
import {
  toUnicodeDomain, compressAddr,
  TS_DATEFORMAT, dateFormat, wei2Float
} from '@/utils'
import { getDomainTypeNoIllegal } from '@/utils/Validator'


export const loadHomeFavorateDomains = async (
  { commit, state },
  options = { pagesize: 3, enfroce: false }
) => {
  const params = {
    pagenumber: 1,
    pagesize: options.pagesize
  }
  if (options.enfroce || !state.homeFavorate || !state.homeFavorate.length) {
    if (options.enfroce) console.log('loadHomeFavorateDomains enfroce cached.')
    freshHomeFavoriteDomains(commit,params)
  } else {
    console.log('loadHomeFavorateDomains use cached.')
  }
}

function freshHomeFavoriteDomains(commit,params){
  let decimals = 18
  const proxy = new DomainProxy()
  proxy.getFavoriteDomains(params).then(resp => {
    if (resp.state) {
      let domains = resp.domains.map(item => {
        item.expireDate = item.expiretime ? dateFormat(item.expiretime, TS_DATEFORMAT) : ''
        item.sellprice = (item.price || item.price.length < 8) ? wei2Float(item.price, decimals) : item.price
        item.shortAddress = compressAddr(item.owner)
        item.domaintext = toUnicodeDomain(item.name)
        item.openApplied = item.ropentopublic
        item.domainTypeI18n = getDomainTypeNoIllegal(item.name)
        return item
      })

      commit(types.UPDATE_HOME_FAVORATE, domains)
      console.log('loadHomeFavorateDomains success cached.')
    }
  }).catch(ex => {
    console.log('loadHomeFavorateDomains Error:', ex)
  })
}

export const loadHomeExpensiveDomains = async (
  { commit, state },
  options = { pagesize: 3, enfroce: false }
) => {
  const params = {
    pagenumber: 1,
    pagesize: options.pagesize
  }
  if (options.enfroce || !state.homeExpensive || !state.homeExpensive.length) {
    if (options.enfroce) console.log('loadHomeExpensiveDomains enfroce cached.')
    let decimals = 18
    const proxy = new DomainProxy()
    proxy.getExpensiveDomains(params).then(resp => {
      if (resp.state) {
        let domains = resp.domains.map(item => {
          item.expireDate = item.expiretime ? dateFormat(item.expiretime, TS_DATEFORMAT) : ''
          item.sellprice = (item.price || item.price.length < 8) ? wei2Float(item.price, decimals) : item.price
          item.shortAddress = compressAddr(item.owner)
          item.domaintext = toUnicodeDomain(item.domain)
          item.openApplied = item.ropentopublic
          item.domainTypeI18n = getDomainTypeNoIllegal(item.domain)
          return item
        })

        commit(types.UPDATE_HOME_EXPENSIVE,domains)
        console.log('loadHomeExpensiveDomains success cached.')
      }
    }).catch(ex => {
      console.log('loadHomeExpensiveDomains Error:', ex)
    })
  }else{
    console.log('loadHomeExpensiveDomains use cached.')
  }

}

export const loadMarketOnSale = async (
  { commit, state },
  options = { pagesize: 8, enfroce: false }
) => {
  const params = {
    pagenumber: 1,
    pagesize: options.pagesize
  }
  if (options.enfroce || !state.marketOnSale || !state.marketOnSale.length) {
    if (options.enfroce) console.log('loadMarketOnSale enfroce cached.')
    const proxy = new MarketProxy()
    proxy.getSellingDomains(params).then(resp => {
      if (resp.state) {
        let domains = resp.domains.map(item => {
          item.expireDate = item.expiretime ? dateFormat(item.expiretime, TS_DATEFORMAT) : ''
          item.shortAddress = compressAddr(item.owner)
          item.sellprice = item.price ? wei2Float(item.price, 18) : ''
          item.domaintext = toUnicodeDomain(item.domain)
          return item
        })

        commit(types.UPDATE_MARKET_ON_SALE, domains)
        console.log('loadMarketOnSale success cached.')
      }
    }).catch(ex => {
      console.log('loadMarketOnSale Error:', ex)
    })
  }else{
    console.log('loadMarketOnSale use cached.')
  }
}

export const loadMarketMostPopluar = async (
  {commit,state},
  options = { pagesize: 8, enfroce: false }
) =>{
  const params = {
    pagenumber:1,
    pagesize:options.pagesize
  }
  if (options.enfroce || !state.marketMostPopluar || !state.marketMostPopluar.length) {
    if (options.enfroce) console.log('loadMarketMostPopluar enfroce cached.')
    const proxy = new DomainProxy()
    proxy.getFavoriteDomains(params).then(resp => {
      if (resp.state) {
        let domains = resp.domains.map(item => {
          item.expireDate = item.expiretime ? dateFormat(item.expiretime, TS_DATEFORMAT) : ''
          item.sellprice = (item.price || item.price.length < 8) ? wei2Float(item.price, 18) : item.price
          item.shortAddress = compressAddr(item.owner)
          item.domaintext = toUnicodeDomain(item.name)
          return item
        })
        commit(types.UPDATE_MARKET_MOST_POPULAR,domains)
        console.log('loadMarketMostPopluar success cached.')
      }
    }).catch(ex => {
      console.log('loadMarketMostPopluar Error:', ex)
    })
  }else{
    console.log('loadMarketMostPopluar use cached.')
  }
}



/**
 *
 * @param {*} param0
 * @param {*} options
 * {
 *  enforce:false,
 *
 * }
 */
export const loadLatestRootDomains = async (
  {commit,state},
  options={pagesize:12,enfroce:false}
  ) => {
  const params = {
    pagenumber:1,
    pagesize:options.pagesize,
    top:258
  }
  if (options.enfroce || !state.latestRootDomains || !state.latestRootDomains.length){
    if (options.enfroce) console.log('loadLatestRootDomains enfroce cached.')
    const proxy = new DomainProxy()
    proxy.getLatestRegist(params).then(resp=>{
      const ret = proxy.transTripleData(resp)
      if(ret.state){
        commit(types.UPDATE_LATEST_ROOT_DOMAINS,ret.domains)
        console.log('loadLatestRootDomains success cached.')
      }
      commit(types.UPDATE_LATEST_ROOT_DOMAINS_CHANGED,false)
    }).catch(ex=>{
      console.log('loadLatestRootDomains Error:',ex)
      commit(types.UPDATE_LATEST_ROOT_DOMAINS_CHANGED, false)
    })
  }else{
    console.log('LatestRootDomains use cached.')
  }
}
/**
 *
 * @param {*} param0
 * @param {*} options
 */
export const loadLatestSubDomains = async (
  { commit, state },
  options = { pagesize: 12, enfroce: false }
) => {
  const params = {
    pagenumber: 1,
    pagesize: options.pagesize,
    top: 2
  }
  if (options.enfroce || !state.latestSubDomains || !state.latestSubDomains.length) {
    const proxy = new DomainProxy()
    proxy.getLatestRegist(params).then(resp => {
      const ret = proxy.transTripleData(resp)
      if (ret.state) {
        commit(types.UPDATE_LATEST_SUB_DOMAINS, ret.domains)
        console.log('loadLatestSubDomains success cached.')
      }
    }).catch(ex => {
      console.log('loadLatestSubDomains Error:', ex)
    })
  } else {
    console.log('LatestSubDomains use cached.')
  }
}
export default {
  loadLatestRootDomains,
  loadLatestSubDomains,
  loadMarketMostPopluar,
  loadMarketOnSale,
  loadHomeFavorateDomains,
  loadHomeExpensiveDomains,
}
