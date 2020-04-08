<template>
<div class="detail-bg-wrapper">
  <div class="container">
    <div class="row justify-content-center pb-5">
      <div class="col-7 bas-card">
        <div class="bas-card__header bas-green-bg text-white">
          <div class="bas-card__header-title">
            {{ handleDomain }} {{$t('p.DominDetailRegistTitle')}}
          </div>
          <div class="bas-card__tools d-none">
            <button class="btn btn-secondary">Regist</button>
          </div>
        </div>

        <div class="bas-card__body">
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
            <span class="bas-small">{{asset.owner}}</span>
          </div>
          <div class="bas-inline d-none">
            <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
            <span>{{contact.tel}}</span>
          </div>
          <div class="bas-inline ">
            <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
            <span>{{contact.email}}</span>
          </div>
          <div class="bas-inline ">
            <label class="bas-form-label">{{$t('p.DomainDetailSiteLabel')}}</label>
            <span>{{contact.website}}</span>
          </div>
          <div class="bas-inline d-none">
            <label class="bas-form-label">{{$t('p.DomainDetailContactAddressLabel')}}</label>
            <span>{{contact.address}}</span>
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
                <span>{{ asset.openApplied ? $t('g.Y') : $t('g.N')}}</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">{{$t('p.DomainExpirationLable')}}</label>
                <span>{{expireDate}}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="bas-card__body bas-card__body--last-radius">
          <div class="bas-card__header">
            <div class="bas-card__header-title ">
              <span>{{$t('l.ReffererData')}}</span>
            </div>
            <a v-if="isMine" class="bas-link" @click="gotoSetting">
              {{$t('l.GotoConfiguration')}}
            </a>
          </div>

          <!-- <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefOwnerLabel')}}</label>
            <span class="bas-small">{{info.owner}}</span>
          </div> -->
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefiPv4Label')}}</label>
            <span>{{dns.ipv4}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefIPv6Label')}}</label>
            <span>{{dns.ipv6}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefWalletLabel')}}</label>
            <span>{{dns.wallet}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefAliasLabel')}}</label>
            <span>{{dns.alias}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefExtensionLabel')}}</label>
            <span>{{dns.extrainfo}}</span>
          </div>
        </div>
        <div v-if="showRegistBtn"
          class="bas-card__body bas-card__body--top-canregist bas-gray-bg">
            <div class="row justify-content-center">
              <div class="col-12 text-center">
                  <span>{{$t('p.DomainDetailRegistSubTips')}}</span>
                  <h1 class="bas-text-green d-inline" style="font-size:">{{subUnitPrice}}</h1>
                  <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
              </div>

              <div class="col-12 text-center pt-2">
                <button class="btn bas-btn-primary w-25" @click="gotoRegistSub">
                  {{$t('l.gotoRegistBtn')}}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style>
.bas-card__body--top-canregist {
  clear: both;
  width: 100%;
  height: 118px;
}

.detail-bg-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;

}

.bas-whois--right-container{
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
}

.bas-whois--right-box {
  width: 180px;
}
</style>
<script>
//
import { mapGetters } from 'vuex'
import { getDomainDetailAssetCI } from '@/bizlib/web3/domain-api.js'
import { findDomainDetail } from '@/bizlib/web3/asset-api'
import { hexToString} from 'web3-utils'

import {
  getDomainType,isTop,
} from '@/utils/Validator.js'
import {
  hasExpired,toUnicodeDomain,
  dateFormat,hex2IPv4,hex2IPv6,
  isOwner,handleDomain
} from '@/utils'

import DomainProxy from '@/proxies/DomainProxy.js'

export default {
  name:"DomainDetail",
  data(){
    return {
      domain:'',
      unitPrice:4,
      contact:{
        tel:'',
        email:'',
        website:'',
        address:'',
      },
      asset:{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        expire:null,
        customPrice:0
      },
      info:{
        owner:'',
        openApplied:false,
        isCustomed:false,
        isPureA:false,
        customedPrice:'',
        expire:'',
      },
      dns:{
        owner:'',
        ipv4:'',
        ipv6:'',
        wallet:'',
        alias:'',
        extrainfo:''
      },
      configs:{
        subGas:4,
      }
    }
  },
  mounted(){
    let dappState = this.$store.getters['web3/dappState']
    this.configs = Object.assign({},this.configs,dappState)
    this.domain = this.$route.params.id;
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(dappState,this.domain)
    if(!this.domain)return ;

    this.loadDomainDetail(handleDomain(this.domain))
  },
  computed:{
    ...mapGetters([
      'checkMetamaskEnable'
    ]),
    handleDomain(){
      return toUnicodeDomain(this.domain)
    },
    isMine(){
      return isOwner(this.configs.wallet,this.asset.owner)
    },
    subUnitPrice(){
      if(this.asset.openApplied && this.asset.isCustomed && this.asset.customPrice){
        return this.asset.customPrice/(10**this.configs.decimals)
      }else {
        return this.configs.subGas/(10**this.configs.decimals);
      }
    },
    expireDate(){
      if(this.asset.expire){
        return dateFormat(this.asset.expire)
      }
      return ''
    },
    ipv4Str(){
      if(this.dns.ipv4){
        return hex2IPv4(this.dns.ipv4)
      }else{
        return ''
      }
    },
    ipv6Str(){
      if(this.dns.ipv6){
        return hex2IPv6(this.dns.ipv6)
      }else{
        return ''
      }
    },
    domainType(){
      if(!this.domain)return ''
      return getDomainType(this.domain)
    },
    showRegistBtn(){
      if(!this.domain)return false;
      return isTop(this.domain) && this.asset.openApplied
    }
  },
  methods:{
    loadDomainDetail(text){
      if(!text)return;
      // findDomainDetail(text).then(resp=>{
      //   console.log(resp)
      //   if(resp.state){
      //     this.info = Object.assign({},this.info,resp.data)
      //     if(resp.dns){
      //       this.dns = Object.assign({},this.dns,resp.dns);
      //     }
      //   }
      // }).catch(ex=>console.log(ex))

      //get from server
      let proxy = new DomainProxy()
      proxy.getDomainInfo(text).then(data=>{

        if(!data.state){
          this.$message(this.$basTip.warn(`Domain ${text} unfound.`))
          return
        }

        data = proxy.transData(data)
        //console.log('Serve API:',data)
        this.asset = Object.assign({},data.asset)
        this.dns = Object.assign({},data.dns)

      }).catch(ex=>{
        console.log(ex)
      })
    },
    gotoRegistSub() {
      if(!this.checkMetamaskEnable){
        this.$metamask()
        return;
      }
      let topText = this.domain
      if(topText){
        this.$router.push({
          path:`/domain/applysub/${topText}`,
        })
      }
    },
    gotoSetting(){
      if(!this.domain)return;
      let msg = '';
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      if(hasExpired(this.asset.expire)){
        msg = this.$t('g.DomainExpired')
        this.$message(this.$basTip.error(msg))
        return
      }
      let domain = toUnicodeDomain(this.asset.name)
      this.$router.push({path:`/domain/dnsupdate/${domain}`})
      // this.$router.push({
      //   name:'domain.subsettings',
      //   params:{
      //     domain:this.domain
      //   }
      // })
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
