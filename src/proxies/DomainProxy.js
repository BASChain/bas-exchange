import BaseProxy from './Proxy'
import { dateFormat, toUnicodeDomain } from '@/utils'
import { networkAPIEndpoint } from '@/bizlib/web3'
const DOMAIN_INFO = 'domainInfo'
const DOMAIN_TOTAL = 'getDomainTotal'
const DOMAIN_LIST = 'getDomainList'
const DOMAIN_SELL = "domainSell"
const TLD_LIST = "tldList"
const LATEST_REGIST = "LatestRegisters"
const FAVORITE_DOMAINS = "favoriteDomainList"
const EXPENSIVE_DOMAINS ="ExpensiveDomains"
const SUGGEST_DOMAINS = "RecommendDomains"

const DomainQueryTypes = {
  top:258,
  raretop:0,
  commontop:1,
  sub:257,
  second:2,
}


class DomainProxy extends BaseProxy {
  constructor(parameters = {}) {
    const prefix = networkAPIEndpoint()
    super(`api${prefix}/domain`, parameters);
    this.domainQTypes = DomainQueryTypes
  }

  getDomainInfo(text) {
    return this.submit(
      'post',
      `${this.endpoint}/${DOMAIN_INFO}`,
      {
        domainname: text
      }
    )
  }

  transData(resp){
    let ret = {
      state: 0,
      dns: null,
      asset: null
    }
    if(resp.state){
      ret.state = 1;
      let asset = resp.assetinfo
      if (asset){
        let info = {
          name:asset.name,
          expire:asset.expire,
          owner:asset.owner,
          domainhash:asset.domainhash,
          isRoot:asset.isroot,
          openApplied:asset.ropentopublic,
          isPure:asset.rispurea,
          isCustomed:asset.riscustomed,
          customPrice:asset.rcustomeprice,
          parent:null
        }
        if(asset.parentdomain){
          let p = asset.parentdomain
          info.parent = {
            name:p.name,
            owner:p.owner,
            hash:p.domainhash,
            expire:p.expire,
            isRoot:p.isroot,
            isPure:p.rispurea,
            openApplied:p.ropentopublic,
            isCustomed:p.riscustomed,
            customPrice:p.rcustomeprice,
            parent:null
          }
        }
        ret.asset = info;
      }
      if(resp.dnsinfo){
        ret.dns = resp.dnsinfo
        ret.dns.wallet = resp.dnsinfo.bcaddr||''
      }

      return ret;
    }else{
      return ret
    }
  }

  getDomainTotal(wallet){
    return this.submit(
      'post',
      `${this.endpoint}/${DOMAIN_TOTAL}`,
      { wallet }
    )
  }

  getDomainList({wallet='',pageNumber=1,pageSize=10,domaintype=1}){
    return this.submit(
      'post',
      `${this.endpoint}/${DOMAIN_LIST}`,
      { wallet, pageNumber, pageSize, domaintype}
    )
  }

  getWalletSuggest({text='',wallet=''}) {
    console.log(text,wallet)
    return this.submit(
      'post',
      `${this.endpoint}/${DOMAIN_SELL}`,
      {
        text,
        wallet
      }
    )
  }

  getTopDomainList({pagenumber=1,pagesize=50,text=''}){
    return this.submit(
      'post',
      `${this.endpoint}/${TLD_LIST}`,
      { pagenumber, pagesize,text}
    )
  }

  getLatestRegist({ pagenumber = 1, pagesize = 9,top=258}){
    return this.submit(
      'post',
      `${this.endpoint}/${LATEST_REGIST}`,
      { pagenumber, pagesize, top}
    )
  }

  transTripleData(resp){
    const ret = {
      state:resp.state,
      total:resp.totalpage,
      pagenumber:resp.pagenumber||1,
      pagesize:resp.pagesize||12,
      domains:[]
    }
    if(!resp.state || resp.totalpage == 0)return ret

    let assetes = resp.latestdomains.map(item=>{
      if (item.assetinfo.isroot){
        item.assetinfo.openApplied = item.assetinfo.ropentopublic
      }
      item.assetinfo.domaintext = toUnicodeDomain(item.assetinfo.name||'')
      return item.assetinfo
    })
    ret.domains = assetes;
    return ret;
  }

  getFavoriteDomains({pagenumber=1,pagesize=8}){
    return this.submit(
      'post',
      `${this.endpoint}/${FAVORITE_DOMAINS}`,
      { pagenumber, pagesize }
    )
  }

  /**
   * 最贵的域名
   * @param {*} param0
   */
  getExpensiveDomains({ pagenumber = 1, pagesize = 8 }) {
    return this.submit(
      'post',
      `${this.endpoint}/${EXPENSIVE_DOMAINS}`,
      { pagenumber, pagesize }
    )
  }

  /**
   *
   * @param {*} param0
   */
  getSubdomainSugguest({
    pagenumber = 1,
    pagesize = 12,
    searchdomains
  }) {
    return this.submit(
      'post',
      `${this.endpoint}/${SUGGEST_DOMAINS}`,
      { pagenumber, pagesize, searchdomains}
    )
  }
}

export default DomainProxy;
