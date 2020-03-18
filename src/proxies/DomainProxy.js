import BaseProxy from './Proxy'

const DOMAIN_INFO = 'domainInfo'

class DomainProxy extends BaseProxy {
  constructor(parameters = {}) {
    super('api/domain', parameters);
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
}

export default DomainProxy;
