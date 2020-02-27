<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header bas-green-bg text-white">
          <div class="bas-card__header-title">
            {{getDomain ? getDomain :'❤️🌟.cn'}} {{$t('p.DominDetailRegistTitle')}}
          </div>
          <div class="bas-card__tools d-none">
            <button class="btn btn-secondary">Regist</button>
          </div>
        </div>

        <div class="bas-card__body">
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
            <span class="bas-small">{{owner}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
            <span>{{tel}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
            <span>{{email}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailSiteLabel')}}</label>
            <span>{{website}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailContactAddressLabel')}}</label>
            <span>{{contactAddr}}</span>
          </div>
          <hr>

          <div class="bas-whois--second">
            <div class="d-block">
              <div class="bas-inline">
                <label class="bas-form-label">{{$t('p.DomainDetailTypeLabel')}}</label>
                <span>{{ $t(`g.${domainType}`) }}</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">{{$t('p.DomainDetailOpenApplyLabel')}}</label>
                <span>{{ openApply ? $t('g.Y') : $t('g.N')}}</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">{{$t('p.DomainExpirationLable')}}</label>
                <span>{{expireDate}}</span>
              </div>
            </div>
            <div class="bas-whois--right-container">
              <div class="bas-price-container">
                <h1 class="bas-text-green d-inline" style="font-size:">{{unitPrice}}</h1>
                <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
              </div>
              <div class="bas-whois-btn-container w-100">
                <button class="btn bas-btn-primary w-100" @click="gotoRegistSub">去注册</button>
              </div>
            </div>
          </div>
        </div>

        <div class="bas-card__body bas-card__body--last-radius">
          <div class="bas-card__header-title pt-2 pb-3">
           映射数据：
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefOwnerLabel')}}</label>
            <span class="bas-small">{{configs.owner}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefiPv4Label')}}</label>
            <span>{{configs.ipv4}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefIPv6Label')}}</label>
            <span>{{configs.ipv6}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefWalletLabel')}}</label>
            <span>{{configs.wallet}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefAliasLabel')}}</label>
            <span>{{alias}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefExtensionLabel')}}</label>
            <span>{{configs.extension}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryDomainByName } from '@/bizlib/web3/domain-api.js'
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getTopDomain
 }  from '@/utils/domain-validator'
import { dateFormat,hex2IPv4,hex2IPv6 } from '@/utils'
export default {
  name:"DomainDetail",
  data(){
    return {
      domain:'',
      owner:'',
      tel:'',
      email:'',
      website:'',
      contactAddr:'',
      openApply:false,
      expire:'',
      alias:'',
      unitPrice:4,
      configs:{
        owner:'',
        ipv4:"",
        ipv6:'',
        wallet:'',
        extension:''
      }
    }
  },
  mounted(){
    this.domain = this.$route.params.id;
    this.loadDomainDetail(this.domain)
  },
  computed:{
    ...mapGetters([
      'checkMetamaskEnable'
    ]),
    getDomain(){
      return  this.domain
    },
    expireDate(){
      if(this.expire){
        return dateFormat(this.expire*1000)
      }
      return ''
    },
    domainType(){
      if(!this.domain)return ''
      return getDomainType(this.domain)
    }
  },
  methods:{
    loadDomainDetail(text){
      if(!text)return;
      queryDomainByName(text).then(ret=>{
        if(ret.state){
          let data = ret.data;
          this.owner = data.owner;
          this.expire = data.expire
          this.alias = data.aName;
          this.configs.ipv4 = hex2IPv4(data.ipv4)
          this.configs.ipv6 = hex2IPv6(data.ipv6)
        }
      }).catch(ex=>{})

    },
    gotoRegistSub() {
      if(!this.checkMetamaskEnable){
        this.$metamask()
        return;
      }
      let next =  {
        name:"domain.registsub",
        params:{
          parentDomain:this.domain,
          parentOwner:this.owner,
        }
      }
      this.$router.push(next)
    }
  }
}
</script>
<style>

.bas-whois--second {
  width: 100%;
  display: inline-flex;
  direction: row;
  align-items: center;
  justify-content:space-between;
}
.bas-whois--right-container {
  display: inline-block;
  justify-items: center;
  min-width: 200px;
}
.bas-price-container {
  display: inline-block;
  justify-items: baseline;
  font-size: 14px;
}
</style>
