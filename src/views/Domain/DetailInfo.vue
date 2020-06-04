<template>
<div class="detail-bg-wrapper">
  <div class="container">
    <div class="row justify-content-center">
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
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('l.DomainHash')}}</label>
            <span>{{asset.hash}}</span>
          </div>
          <div class="bas-inline d-none">
            <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
            <span>{{contact.tel}}</span>
          </div>
          <div class="bas-inline ">
            <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
            <span>{{contact.email}}</span>
          </div>
          <div class="bas-inline d-none">
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
              <div class="bas-inline" :class="asset.isRoot ? '' : 'd-none'">
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
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7 bas-refdata-box--header">
        <div class="bas-card__header">
          <div class="bas-card__header-title ">
            <span>{{$t('l.ReffererData')}}</span>
          </div>
          <a v-if="isMine" class="bas-link" @click="gotoSetting">
            {{$t('l.GotoConfiguration')}}
          </a>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7 pt-2 bas-refdata-box--body">
        <el-form :model="refdata"  label-width="140px" class="refdata-form">
          <el-form-item :label="$t('p.DomainDetailRefiPv4Label')" >
            <el-input type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')"
              :value="refdata.A" autosize="{minRows:1,maxRows:8}"/>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefIPv6Label')" >
            <el-input :value="refdata.AAAA" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefMXLabel')" >
            <el-input :value="refdata.MX" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefMXBCALabel')" >
            <el-input :value="refdata.MXBCA" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefWalletLabel')" >
            <el-input :value="refdata.BlockChain" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefAliasLabel')" >
            <el-input :value="refdata.CName" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefIOTALabel')" >
            <el-input :value="refdata.IOTA" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('p.DomainDetailRefExtensionLabel')" >
            <el-input :value="refdata.Optional" type="textarea" :disabled="true"
              :placeholder="$t('p.DomainRefDataShowPlaceholder')" autosize>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
        <div v-if="showRegistBtn"
          class="col-7 bas-card__body bas-card__body--top-canregist bas-gray-bg">
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
    <div class="row justify-content-center mb-5">
      <div class="col-12" style="height:2.5rem"></div>
    </div>
  </div>
</div>

</template>

<style>
/* //4,6,46,1 */
.bas-refdata-box--header {
  border: 1px solid rgba(235,237,237,1);
  border-bottom: 0px ;
}
.bas-refdata-box--body {
  border: 1px solid rgba(235,237,237,1);
  border-top: 0px ;
}

.refdata-form div.el-textarea.is-disabled>textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(255,255,255,.95);
  border: 1px solid rgba(235,237,237,.65);
}

.refdata-form label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}
.domain-ref-data {
  word-break: break-all;
  font-size:.85rem;
}
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
import { getDomainDetailAssetCI } from '@/bizlib/web3/domain-api.js'
import { findDomainDetail } from '@/bizlib/web3/asset-api'

import { getDomainDetail } from "@/web3-lib/apis/domain-api"

import {
  getDomainType,isTop,
} from '@/utils/Validator.js'
import {
  hasExpired,toUnicodeDomain,
  dateFormat,hex2IPv4,hex2IPv6,
  isOwner,handleDomain,
  wei2Bas
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
      refdata:{
        A:"",

      },
      configs:{
        subGas:4,
      }
    }
  },
  computed:{
    ...Vuex.mapGetters({
      loginState:'dapp/loginState'
    }),
    handleDomain(){
      return toUnicodeDomain(this.domain)
    },
    isMine(){
      return isOwner(this.configs.wallet,this.asset.owner)
    },
    subUnitPrice(){
      const ruleState = this.$store.getters["dapp/ruleState"]
      if(this.asset.openApplied && this.asset.isCustomed && this.asset.customPrice){
        return wei2Bas(this.asset.customPrice)
      }else {
        return ruleState.subBas
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
    async loadDomainDetail(text){
      if(!text)return;
      const web3State = this.$store.getters['web3State']
      const resp = await getDomainDetail(text,web3State.chainId)
      console.log('Load DomainInfo resp>>',resp)
      if(resp.state){
        this.asset = Object.assign({},resp.assetinfo)
        this.refdata = Object.assign({},resp.refdata)
      }

      //get from server
      // let proxy = new DomainProxy()
      // proxy.getDomainInfo(text).then(data=>{

      //   if(!data.state){
      //     this.$message(this.$basTip.warn(`Domain ${text} unfound.`))
      //     return
      //   }

      //   data = proxy.transData(data)
      //   //console.log('Serve API:',data)
      //   this.asset = Object.assign({},data.asset)
      //   this.dns = Object.assign({},data.dns)

      // }).catch(ex=>{
      //   console.log(ex)
      // })
    },
    gotoRegistSub() {
      if(this.$store.getters["metaMaskDisabled"]){
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
  },
  mounted(){
    const domaintext = this.$route.params.id;
    this.domain = domaintext
    if(!domaintext)return ;
    console.log(domaintext)
    this.loadDomainDetail(this.domain)
  },
  watch: {
    loginState(val,old){

      if(val && old == false){
        console.log('DetailInfo>>>>loginState',val)
        //this.loadDomainDetail(this.domain)
      }
    }
  },
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
