<template>
  <div class="container bg-white">
    <div class="row justify-content-center align-content-center">
      <el-card shadow="never" body-style="backgroup:rgba(245,246,246,1);"
        class="col-md-8 col-sm-10 box-card bas-domaininfo--card bas-gray-bg">
        <div label="域名">
          <div class="clearfix item domain-info-inline" >
            <div class="domain-info-caption">
              域名 {{domain}}
            </div>
            <div class="domain-info-type">
              <span>{{ $t(`g.${domainType}`) }}</span>
            </div>
          </div>
        </div>

        <div class="domain-info-inline">
          <div class="bas-info-label">
            <span>所有者</span>
          </div>
          <div class="bas-form-text">
            {{ info.owner }}
          </div>
        </div>
        <div class="domain-info-inline">
          <div class="bas-info-label">
            <span>到期日期</span>
          </div>
          <div class="bas-form-text">
            {{ expireDate }}
          </div>
        </div>
        <div class="domain-info-inline">
          <div class="bas-info-label">
            <span>域名Hash</span>
          </div>
          <div class="bas-form-text">
            {{ info.nameHash }}
          </div>
        </div>
        <div v-if="!info.isRoot" class="domain-info-inline">
          <div class="bas-info-label">
            <span>根域名Hash</span>
          </div>
          <div class="bas-form-text">
            {{ info.rootHash }}
          </div>
        </div>
      </el-card>
    </div>

    <div class="row justify-content-center align-content-center">
      <div class="col-md-8 col-sm-10" style="padding:.5rem 0;">
        <div class="bas-refs-header">
          <div>
            <h5>映射数据配置</h5>
          </div>
          <div>
            <a class="btn btn-sm bas-btn-primary"
              v-if="getAllSaved"
              @click="settingAll"
              style="width:100px;">
              {{ $t('g.Setting')}}
            </a>
            <a class="btn btn-sm bas-btn-primary"
              v-if="!getAllSaved"
              @click="saveAll"
              style="width:100px;">
               {{ $t('g.Saving') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center align-content-center">
      <el-form label-width="100px" class="col-md-8 col-sm-10" >
        <el-form-item label="IPV4">
            <el-input v-model="ipv4"
              :disabled="ipv4Disabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('ipv4')">
              {{ ipv4Disabled ? $t('g.Setting') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="ipState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="IPV6">
            <el-input v-model="ipv6"
              :disabled="ipv6Disabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('ipv6')">
              {{ ipv6Disabled ? $t('g.Setting') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="ipState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="钱包地址">
            <el-input v-model="info.wallet"
              :disabled="walletDisabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('wallet')">
              {{ walletDisabled ? $t('g.Setting') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="walletState"  style="float:right;"/>
        </el-form-item>
        <el-form-item label="别名">
            <el-input v-model="info.alias"
              :disabled="aliasDisabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('alias')">
              {{ aliasDisabled ? $t('g.Setting') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="aliasState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="附加信息" >
            <el-input v-model="info.extension"
              type="textarea"
              autosize
              :disabled="extensionDisabled"
              style="width:60%;">
              <template slot="append">
                 <loading-dot />
              </template>
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('extension')">
              {{ extensionDisabled ? $t('g.Setting') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="extensionState" style="float:right;"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoadingDot from '@/components/LoadingDot.vue'
import { checkSupport } from '@/bizlib/networks';
import { getDomainType } from '@/utils/domain-validator'
import { getBasAssetInstance, getDomainDetailAssetCI } from '@/bizlib/web3/domain-api.js'
import {
  dateFormat ,
  hex2IPv4,hex2IPv6,
  validIPv4, validIPv6,
  IPv6ToHex, IPv4ToHex,
  validBCAddr
} from '@/utils'
export default {
  name:"SubDomainSettings",
  data(){
    return {
      domain:'',
      //上下架
      marketid:'',
      ipv4:'',
      ipv6:'',
      ipv4Disabled:true,
      ipState:false,
      ipv6Disabled:true,
      walletDisabled:true,
      walletState:false,
      extensionDisabled:true,
      extensionState:false,
      aliasDisabled:true,
      aliasState:false,
      info:{
        signedDomain:'',
        nameHash:'',
        owner:'',
        isRoot:'',
        expire:'',
        isRoot:false,
        rootHash:'',
        ipv4:'',
        ipv6:'',
        wallet:'',
        extension:'',
        alias:''
      },
      dappState:{
        chainId:'',
        wallet:'',
        gasPrice:''
      }
    }
  },
  components:{
    LoadingDot,
  },
  computed:{
    domainType(){
      return getDomainType(this.domain)
    },
    expireDate(){
      return dateFormat(this.info.expire * 1000,'YYYY-MM-DD HH:mm:ss')
    },
    ipv4Translate(){
      return hex2IPv4(this.info.ipv4)
    },
    ipv6Translate(){
      return hex2IPv6(this.info.ipv6)
    },
    getAllSaved(){
      let flag = this.ipv4Disabled && this.ipv6Disabled && this.walletDisabled
        && this.extensionDisabled && this.aliasDisabled;
      return flag;
    }
  },
  mounted(){
    this.domain = this.$route.params.domain;
    let dappState = this.$store.getters['web3/dappState']
    this.dappState = Object.assign({},dappState);

    getDomainDetailAssetCI(this.domain).then(resp =>{
      if(resp.state){
        console.log(resp.data)
        this.info = Object.assign({},this.info, resp.data)
        this.ipv4 = hex2IPv4(resp.data.ipv4)
        this.ipv6 = hex2IPv6(resp.data.ipv6)
        //console.log(this.info)
      }
    }).catch(ex=>{
      console.log(ex)
    })
  },
  methods:{
    getAssetInst(){
      let dappState = this.dappState;
      let chainId = dappState.chainId;
      if(!checkSupport(chainId)||!dappState.wallet || !this.domain){
        const error = '当前网络不支持或没有域名信息'
        this.$message(this.$basTip.error(error))
        return false;
      }
      let options = {from:dappState.wallet,gasPrice:dappState.gasPrice}
      let inst = getBasAssetInstance(chainId,web3,options)
      return inst;
    },
    getOptions(){
      return {
        from:this.dappState.wallet,
        gasPrice:this.dappState.gasPrice
      }
    },
    singleSetting(tag) {
      switch(tag){
        case 'ipv4':
          this.ipv4Set()
          break;
        case 'ipv6':
          this.ipv6Set()
          break;
        case 'wallet':
          this.walletSet()
          break;
        case 'extension':
          this.extensionSet()
          break;
        case 'alias':
          this.aliasSet()
          break;
      }
    },
    ipv4Set(){
      if(this.ipv4Disabled){
        this.ipv4Disabled = !this.ipv4Disabled;
      }else{
        let inst = this.getAssetInst()
        let ipv4 = this.ipv4 ||'0.0.0.0';
        let ipv6 = this.ipv6||'::';
        if(ipv4 && !validIPv4(ipv4)){
          this.$message(this.$basTip.error(`${ipv4} illegal`))
          return
        }
        if(ipv6 && !validIPv6(ipv6)){
          this.$message(this.$basTip.error(`${ipv6} illegal`))
          return
        }
        if(inst && this.info.signedDomain){
          this.ipState = true
          inst.methods.setIP(
            this.info.signedDomain,
            IPv4ToHex(ipv4),
            IPv6ToHex(ipv6)
          ).send(this.getOptions()).then(r=>{
            this.ipState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.ipState = false
            this.$message(this.$basTip.error('fail'))
          })
        }
        this.ipv4Disabled = !this.ipv4Disabled;
      }
    },
    ipv6Set(){
      if(this.ipv6Disabled){
        this.ipv6Disabled = !this.ipv6Disabled;
      }else{
        let inst = this.getAssetInst()
        let ipv4 = this.ipv4 ||'0.0.0.0';
        let ipv6 = this.ipv6||'::';
        if(ipv4 && !validIPv4(ipv4)){
          this.$message(this.$basTip.error(`${ipv4} illegal`))
          return
        }
        if(ipv6 && !validIPv6(ipv6)){
          this.$message(this.$basTip.error(`${ipv6} illegal`))
          return
        }
        if(inst && this.info.signedDomain){
          this.ipState = true
          inst.methods.setIP(
            this.info.signedDomain,
            IPv4ToHex(ipv4),
            IPv6ToHex(ipv6)
          ).send(this.getOptions()).then(r=>{
            this.ipState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.ipState = false
            this.$message(this.$basTip.error('fail'))
          })
        }
        this.ipv6Disabled = !this.ipv6Disabled;
      }
    },
    walletSet(){
      if(this.walletDisabled){
        this.walletDisabled = !this.walletDisabled;
      }else{
        let inst = this.getAssetInst()
        if(inst && this.info.signedDomain && validBCAddr(this.info.wallet)){
          this.walletState = true
          inst.methods.setBCAddress(this.info.signedDomain,this.info.wallet||'')
          .send(this.getOptions()).then(r=>{
            this.walletState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.walletState = false
            this.$message(this.$basTip.error('fail'))
          })
        }
        this.walletDisabled = !this.walletDisabled;
      }
    },
    extensionSet(){
      if(this.extensionDisabled){
        this.extensionDisabled = !this.extensionDisabled;
      }else{
        let inst = this.getAssetInst()
        if(inst && this.info.signedDomain){
          this.aliasState = true
          inst.methods.setAlias(this.info.signedDomain,this.info.alias||'')
          .send(this.getOptions()).then(r=>{
            this.aliasState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.aliasState = false
            this.$message(this.$basTip.error('fail'))
          })
        }
         this.extensionDisabled = !this.extensionDisabled;
      }
    },
    aliasSet(){
      if(this.aliasDisabled){
        this.aliasDisabled = !this.aliasDisabled;
      }else{
        let inst = this.getAssetInst()
        if(inst && this.info.signedDomain){
          this.aliasState = true
          inst.methods.setAlias(this.info.signedDomain,this.info.alias||'')
          .send(this.getOptions()).then(r=>{
            this.aliasState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.aliasState = false
            this.$message(this.$basTip.error('fail'))
          })
        }
        this.aliasDisabled = !this.aliasDisabled;
      }
    },
    settingAll(){
      this.setAllDisabledState(false)
    },
    saveAll(){
      //todo
      this.setAllDisabledState(true)
    },
    setAllDisabledState(flag) {
      this.ipv4Disabled = flag;
      this.ipv6Disabled = flag;
      this.walletDisabled = flag;
      this.extensionDisabled = flag;
      this.aliasDisabled = flag;
    }
  }
}
</script>
<style>

.domain-info-inline {
  display: inline-flex;
  margin-bottom: .5rem;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}
.domain-info-type {
  margin-left: 1.5rem;
  color: #00CA9B;
  border-radius: .9rem;
  border: 1px solid #00CA9B;
  line-height: 1.5rem;
  font-size:14px;
  /* width:140px; */
  text-align: center;
  justify-content: center;
  align-items: center;
}

.domain-info-type span{
  margin: auto 1.25rem;
}
.bas-info-label:after {
  content: ':';
  margin-right: .5rem;
}
.bas-info-text  {
  margin-left: .5rem;
}
.bas-refs-header {
  width: 100%;
  display: inline-flex;
  align-content: center;
  justify-content: space-between;
}
.bas-link-settings{
  margin-left: 1rem;
}
</style>
