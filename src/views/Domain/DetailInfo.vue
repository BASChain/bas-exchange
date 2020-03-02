<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header bas-green-bg text-white">
          <div class="bas-card__header-title">
            {{ domain }} {{$t('p.DominDetailRegistTitle')}}
          </div>
          <div class="bas-card__tools d-none">
            <button class="btn btn-secondary">Regist</button>
          </div>
        </div>

        <div class="bas-card__body">
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
            <span class="bas-small">{{info.owner}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
            <span>{{contact.tel}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
            <span>{{contact.email}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailSiteLabel')}}</label>
            <span>{{contact.website}}</span>
          </div>
          <div class="bas-inline">
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
                <span>{{ info.openApplied ? $t('g.Y') : $t('g.N')}}</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">{{$t('p.DomainExpirationLable')}}</label>
                <span>{{expireDate}}</span>
              </div>
            </div>
            <div v-if="showRegistBtn" class="bas-whois--right-container">
              <div class="bas-price-container">
                <h1 class="bas-text-green d-inline" style="font-size:">{{subUnitPrice}}</h1>
                <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
              </div>
              <div class="bas-whois-btn-container w-100">
                <button class="btn bas-btn-primary w-100" @click="gotoRegistSub">去注册</button>
              </div>
            </div>
          </div>
        </div>

        <div class="bas-card__body bas-card__body--last-radius">
          <div class="bas-card__header pt-2 pb-3">
            <div class="bas-card__header-title ">
              <span>映射数据：</span>
            </div>
            <a v-if="isMine" class="bas-link" @click="gotoSetting">去配置</a>
          </div>

          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefOwnerLabel')}}</label>
            <span class="bas-small">{{info.owner}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefiPv4Label')}}</label>
            <span>{{ipv4Str}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefIPv6Label')}}</label>
            <span>{{ipv6Str}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefWalletLabel')}}</label>
            <span>{{info.wallet}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefAliasLabel')}}</label>
            <span>{{info.alias}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailRefExtensionLabel')}}</label>
            <span>{{extensionDataStr}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findDomainByName,getDomainDetailAssetCI } from '@/bizlib/web3/domain-api.js'
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getTopDomain,
  splitTopDomain,
  isOwner
 }  from '@/utils/domain-validator'
import { dateFormat,hex2IPv4,hex2IPv6 } from '@/utils'
import { currentWallet } from '@/bizlib/web3'
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
      info:{
        owner:'',
        openApplied:false,
        isCustomed:false,
        isPureA:false,
        customedPrice:'',
        expire:'',
        ipv4:'',
        ipv6:'',
        wallet:'',
        alias:'',
        extension:''
      },
      configs:{
        subGas:4,
      }
    }
  },
  mounted(){
    this.domain = this.$route.params.id;
    let cfg = this.$store.getters['web3/getOANNConfigs']
    this.configs = Object.assign({},this.configs,cfg)
    this.loadDomainDetail(this.domain)
  },
  computed:{
    ...mapGetters([
      'checkMetamaskEnable'
    ]),
    isMine(){
      return isOwner(this.info.owner,currentWallet())
    },
    subUnitPrice(){
      if(this.info.openApplied && this.info.customedPrice){
        return this.info.customedPrice
      }else {
        return this.configs.subGas;
      }
    },
    expireDate(){
      if(this.info.expire){
        return dateFormat(this.info.expire*1000)
      }
      return ''
    },
    ipv4Str(){
      if(this.info.ipv4){
        return hex2IPv4(this.info.ipv4)
      }else{
        return ''
      }
    },
    ipv6Str(){
      if(this.info.ipv6){
        return hex2IPv6(this.info.ipv6)
      }else{
        return ''
      }
    },
    extensionDataStr(){
      if(this.info.extension){
        return web3.utils.hexToString(this.info.extension)
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
      return !isSubdomain(this.domain) && this.info.openApplied
    }
  },
  methods:{
    loadDomainDetail(text){
      if(!text)return;
      getDomainDetailAssetCI(text).then(resp=>{
        if(resp.state){
          let data = resp.data;
          console.log(data)
          this.info = Object.assign({},this.info,data)
        }else{

        }
      }).catch(ex=>{

      })
    },
    gotoRegistSub() {
      if(!this.checkMetamaskEnable){
        this.$metamask()
        return;
      }

      let next =  {
        name:"domain.registsub",
        params:{
          topDomain:this.domain,
          subDomain:''
        }
      }
      this.$router.push(next)
    },
    gotoSetting(){
      if(!this.domain)return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        name:'domain.subsettings',
        params:{
          domain:this.domain
        }
      })
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
