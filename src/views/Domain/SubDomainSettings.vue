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
            {{ info.name }}
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

    <div v-if="notSubDomain" class="row justify-content-center align-content-center">
      <div class="col-md-8 col-sm-10" style="padding:.5rem 0;">
        <div class="bas-refs-header">
          <div>
            <h5>二级域名配置</h5>
          </div>
        </div>
      </div>
    </div>
    <div v-if="notSubDomain" class="row justify-content-center align-content-center">
      <el-form  class="col-md-8 col-sm-10" label-width="80">
        <el-form-item label="是否开放二级域名注册">
          <template>
            <el-radio-group v-model="info.openApplied">
              <el-radio :label="false" @change="closeSubApply">否</el-radio>
              <el-radio :label="true"  @change="openSubApply">是</el-radio>
            </el-radio-group>
            <loading-dot v-if="openAppliedState" style="float:right;"/>
          </template>
        </el-form-item>
        <el-form-item label="二级域名价格" >
          <el-input-number v-model="subUnitPrice" name="subUnitPrice"
            :precision="2" :step="1.0"
            controls-position="right" :disabled="!customPriceEnable"
            @change="customedPriceChanged"
            :min="getMinUnitPrice" >
          </el-input-number>
          <el-checkbox v-model="info.isCustomed"
            @change="customedCheckedChange"
            :disabled="customedCheckEnabled"
            class="bas-domain--setprice-tip">
            Notice: 如开启自定义价格，将额外收取{{externalBas}}BAS
          </el-checkbox>
          <a class="bas-link bas-link-settings" :class="customedDisabledClass"
            @click="setCustomed" >
            {{  showCustomedSaveText }}
          </a>
          <loading-dot v-if="customedState" style="float:right;"/>
        </el-form-item>
      </el-form>
      <el-dialog :visible="openAppliedDialogVisiable"
        :title="openAppliedTitle"
        :before-close="cancelOpenApplied"
        width="30%">
        <span class="text-center">{{openAppliedMsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini"
            @click="cancelOpenApplied()">
            取 消
          </el-button>
          <el-button type="primary" class="bas-btn-primary"
            size="mini"
            @click="connfirmOpenApplied()">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>

    <div v-if="false" class="row justify-content-center align-content-center mb-3">
      <button type="button" @click="setDNSManagerData"
        class="btn btn-sm bas-btn-primary w-25">
        设置
      </button>
    </div>
    <div v-if="notSubDomain" class="row justify-content-center align-content-center">
      <div class="bas-split-h" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
    </div>


    <div class="row justify-content-center align-content-center" >
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
              {{ $t('g.Update')}}
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
              {{ ipv4Disabled ? $t('g.Update') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="ipState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="IPV6">
            <el-input v-model="ipv6"
              :disabled="ipv6Disabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('ipv6')">
              {{ ipv6Disabled ? $t('g.Update') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="ipState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="区块链地址">
            <el-input v-model="dns.wallet"
              :disabled="walletDisabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('wallet')">
              {{ walletDisabled ? $t('g.Update') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="walletState"  style="float:right;"/>
        </el-form-item>
        <el-form-item label="别名">
            <el-input v-model="dns.alias"
              :disabled="aliasDisabled"
              style="width:60%;">
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('alias')">
              {{ aliasDisabled ? $t('g.Update') : $t('g.Saving') }}
            </a>
            <loading-dot v-if="aliasState" style="float:right;"/>
        </el-form-item>
        <el-form-item label="附加信息" >
            <el-input v-model="dns.extrainfo"
              type="textarea"
              autosize
              :disabled="extensionDisabled"
              style="width:60%;">
              <template slot="append">
                 <loading-dot />
              </template>
            </el-input>
            <a class="bas-link bas-link-settings" @click="singleSetting('extension')">
              {{ extensionDisabled ? $t('g.Update') : $t('g.Saving') }}
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
import { getDomainType,isSubdomain } from '@/utils/domain-validator'
import { getDomainDetailAssetCI } from '@/bizlib/web3/domain-api.js'
import {getDappChainAndWallet} from '@/bizlib/web3'
import {
  getDomainDetails,
  getBasAssetInstance,
  closeOpenApplied,openOpenApplied
} from '@/bizlib/web3/asset-api.js'
import {getBasTokenInstance} from '@/bizlib/web3/token-api'
import {getOANNInstance} from '@/bizlib/web3/oann-api'


import {
  handleEnDomain,
  handleDeDomain,
  getCustomPrice,
  dateFormat ,
  isOwner,
  hex2IPv4,hex2IPv6,
  validIPv4, validIPv6,
  IPv6ToHex, IPv4ToHex,
  validBCAddr,
  transWei,
  toASCII
} from '@/utils'
import DomainProxy from '@/proxies/DomainProxy.js'

export default {
  name:"SubDomainSettings",
  data(){
    return {
      domain:'',
      //上下架
      marketid:'',
      customedState:false,
      openAppliedOperType:'',
      openAppliedTitle:'提示',
      openAppliedMsg:'您确定要关闭二级域名注册功能?',
      openAppliedDialogVisiable:false,
      openAppliedState:false,
      canCustomedSave:false,
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
      extensionData:'',
      subUnitPrice:4,
      oriIsCustomed:false,
      asset:{
        name:'',
        owner:'',
        hash:'',
        expire:null,
        openApplied:false,
        isRoot:false,
        isCustomed:false,
        customPrice:4*10**18,
      },
      info:{
        signedDomain:'',
        name:'',
        owner:'',
        isRoot:'',
        expire:'',
        openApplied:true,
        isCustomed:false,
        isPureA:false,
        isRoot:false,
        rootHash:'',
        customPrice:0,
      },
      dns:{
        ipv4:'',
        ipv6:'',
        wallet:'',
        extension:'',
        alias:''
      },
      dappState:{
        chainId:'',
        wallet:'',
        gasPrice:'',
        subGas:4*10**18,
        customedPriceGas:100*10**18,
      },
      dataChanged:false
    }
  },
  components:{
    LoadingDot,
  },
  computed:{
    showCustomedSaveText(){
      return this.canCustomedSave ?  this.$t('g.Saving') : this.$t('g.Update')
    },
    getMinUnitPrice(){
      return transWei(this.dappState.subGas,this.dappState.decimals)
    },
    customedDisabledClass(){
      return this.info.openApplied ? '' : 'bas-disabled'
    },
    customPriceEnable(){
      return this.info.isCustomed && this.info.openApplied && !this.customedState
    },
    customedCheckEnabled(){
      return !this.info.openApplied || this.customedState
    },
    notSubDomain(){
      return !isSubdomain(this.domain)
    },
    domainType(){
      return getDomainType(this.domain)
    },
    expireDate(){
      return dateFormat(this.info.expire,'YYYY-MM-DD HH:mm:ss')
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
    },
    externalBas(){
      return transWei(this.dappState.customedPriceGas)
    }
  },
  mounted(){
    this.domain = this.$route.params.domain
    let dappState = this.$store.getters['web3/dappState']
    //console.log(dappState)
    let currentState = getDappChainAndWallet()
    this.dappState = Object.assign({},dappState,currentState);

    if(!this.domain)return
    let handleText = handleEnDomain(this.domain)
    let proxy = new DomainProxy()
    proxy.getDomainInfo(handleText).then(resp=>{
      if(resp.state){
        resp = proxy.transData(resp)
        this.dns = Object.assign(this.dns,resp.dns)
        this.asset = Object.assign(this.asset,resp.asset)
        console.log(this.dns,this.asset)
      }else{

      }
    }).catch(ex=>{
      console.log(ex)
    })
  },
  methods:{
    checkAuthor(){
      let chainId = this.dappState.chainId;
      let address = this.info.owner;
      let wallet = this.dappState.wallet;
      let error = '当前网络不支持'
      if(!this.info.signedDomain){
        error = '信息不完整'
        this.$message(this.$basTip.error(error))
        return false;
      }
      if(!checkSupport(chainId) ||!this.domain){
        error = '当前网络不支持'
        this.$message(this.$basTip.error(error))
        return false;
      }
      if(!isOwner(address)){
        error = `请确认该域名: ${this.domain} 属于前钱包[${wallet}]账户下`
        this.$message(this.$basTip.error(error))
        return false;
      }
      return true;
    },
    closeSubApply(){
      if(this.checkAuthor()){
        this.openAppliedOperType = 'close'
        this.openAppliedDialogVisiable = true;
      }else{
        this.info.openApplied = true;
      }
    },
    openSubApply(){
      // this.topData.openApplied = true;
      if(this.checkAuthor()){
        this.openAppliedOperType = 'open'
        this.openAppliedDialogVisiable = true;
      }else{
        this.info.openApplied = false;
      }
    },
    cancelOpenApplied(){
      this.openAppliedDialogVisiable = false;
    },
    /**
     * 开启openToPublic
     */
    connfirmOpenApplied(){
      let msg = ''
      let hash = this.info.signedDomain;
      let wallet = this.dappState.wallet;
      let inst = getBasAssetInstance()
      if(this.openAppliedOperType === 'open'){
        this.openAppliedMsg = '您确定要开启二级域名注册功能?'
        this.info.isCustomed = false;
        this.info.openApplied = false;

        this.openAppliedState = true;

        inst.methods.openToPublic(hash).send({from:wallet}).then(ret=>{
          this.info.openApplied = true;
          this.openAppliedState = false;
        }).catch(ex=>{
          console.log(ex)
           this.openAppliedState = false;
           this.info.openApplied = false;
        })
        this.openAppliedDialogVisiable = false;
      }else{
        this.openAppliedMsg = '您确定要关闭二级域名注册功能?'
        this.openAppliedState = true;
        inst.methods.closeToPublic(hash).send({from:wallet}).then(ret=>{
          this.info.openApplied = false;
          this.subUnitPrice = transWei(this.dappState.subGas,this.dappState.decimals)

          this.openAppliedState = false;
        }).catch(ex=>{
          console.log(ex)
           this.openAppliedState = false;
           this.info.openApplied = true;
        })

        this.openAppliedDialogVisiable = false;
      }
    },
    async setCustomed(){
      //console.log('>>>>>>>>>>')
      if(!this.info.openApplied || !this.canCustomedSave){
        const error = '设置自定义价格,必须先开启二级域名注册'
        this.$message(this.$basTip.error(error))
        return;
      }


      if(this.checkAuthor()){
        this.customedState = !this.customedState;

        let hash = this.info.signedDomain;
        let wallet = this.dappState.wallet;
        console.log('wallet',wallet,'<<hahs>>',hash)

        let inst = getBasAssetInstance()
        let flag = false;
        let currCustomedCheckState = this.info.isCustomed

        if(currCustomedCheckState !== this.oriIsCustomed){
          flag = true;
        }
        let oriUnit = transWei(this.info.customPrice)
        if(parseInt(this.subUnitPrice) !== parseInt(oriUnit) ){
          flag = true;
        }
        if(!flag){
          console.log('no change customed data.')
          return;
        }

        if(currCustomedCheckState){//Set customed
          let externalGas = transWei(this.dappState.customedPriceGas)
          let customPriceWei = this.subUnitPrice*10**18
          let approveWei = this.dappState.customedPriceGas +''
          //(externalGas)*10**18

          let token = await getBasTokenInstance(wallet)
          let oann = await getOANNInstance(wallet)
          let approveAddress = oann._address;
          if(!approveAddress){
            throw new EvalError('no oann address')
          }

          console.log('Begin commit>>',customPriceWei,
            '>>approve>',approveWei,'<approve>>',approveAddress)
          let that =this;
          this.customedState = true
          token.methods.approve(approveAddress,approveWei).send({from:wallet}).then(ret=>{
            console.log('approve sucess',ret)
            return true;
          }).then(ret=>{
            console.log('approve sucess',ret)
            oann.methods.openCustomedPrice(hash,customPriceWei+'')
            .send({from:wallet}).then(ret =>{
                console.log('setCustomedTranx',ret)

              this.customedState = false
            }).catch(ex=>{


              console.log(ex)
              this.customedState = false
            })
          }).catch(ex=>{
            console.log(ex)
            this.customedState = false
          })

          // inst.methods.openCustomedPrice(hash,customPriceWei+'')
          // .send({from:wallet}).then(r=>{
          //   if(!r.status){
          //     console.log(r)
          //     this.info.isCustomed = false;
          //   }else{
          //     this.oriIsCustomed = true
          //   }
          //   this.customedState = false;
          // }).catch(ex=>{
          //   console.log(ex)
          //   this.customedState = false;
          // })

        }else{
          this.customedState = true;
          inst.methods.closeCustomedPrice(hash).send({from:wallet}).then(r=>{
            console.log(r)
            if(!r.status){
              this.info.isCustomed = true;
            }else{
               this.oriIsCustomed = false
            }
            this.customedState = false;
          }).catch(ex=>{
            console.log(ex)
            this.customedState = false;
          })
        }
        this.canCustomedSave = false;
      }
    },
    getOptions(){
      return {
        from:this.dappState.wallet,
        gasPrice:this.dappState.gasPrice
      }
    },
    singleSetting(tag) {
      let currentWallet = this.dappState.wallet;
      //console.log('Owner>>>',this.info.owner,'>>',currentWallet)
      if(isOwner(this.info.owner)){
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
      }else{
        this.$alert(`请确认${this.domain} 在您当前登录钱包[${currentWallet} ]帐户下`)
        return;
      }

    },
    ipv4Set(){
      if(this.ipv4Disabled){
        this.ipv4Disabled = !this.ipv4Disabled;
      }else{
        let inst = getBasAssetInstance()
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
        let inst = getBasAssetInstance()
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
        let inst = getBasAssetInstance()
        if(inst && this.info.signedDomain && validBCAddr(this.dns.wallet)){
          this.walletState = true
          inst.methods.setBCAddress(this.info.signedDomain,this.dns.wallet||'')
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
        let inst = getBasAssetInstance()
        if(inst && this.info.signedDomain){
          this.extensionState = true
          let opData = Web3.utils.toHex(this.extensionData ||'')
          inst.methods.setOpData(this.info.signedDomain,opData)
          .send(this.getOptions()).then(r=>{
            this.extensionState = false
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.extensionState = false
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
        let inst = getBasAssetInstance()
        if(inst && this.info.signedDomain){
          this.aliasState = true
          inst.methods.setAlias(this.info.signedDomain,this.dns.alias||'')
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
      let currentWallet = this.$store.state.web3.wallet;
      if(currentWallet.toUpperCase()  === this.info.owner.toUpperCase()){
        this.setAllDisabledState(false)
      }else{
        this.$alert(`请确认${this.domain} 在您当前登录钱包[${currentWallet} ]帐户下`)
        return;
      }
    },
    saveAll(){
      let currentWallet = this.$store.state.web3.wallet;
      if(currentWallet.toUpperCase()  === this.info.owner.toUpperCase()){
        let inst = getBasAssetInstance()
        if(inst && this.info.signedDomain){
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
          this.setAllState(true)
          let opData = Web3.utils.toHex(this.extensionData ||'')

          inst.methods.setRecord(
            this.info.signedDomain,
            IPv4ToHex(ipv4),
            IPv6ToHex(ipv6),
            this.info.wallet||'',
            opData,
            this.info.alias||''
          )
          .send(this.getOptions()).then(r=>{
            this.setAllState(false)
            this.$message(this.$basTip.warn('Success'))
          }).catch(ex=>{
            this.setAllState(false)
            this.$message(this.$basTip.error('fail'))
          })
        }
        this.setAllDisabledState(true)
      }else{
        this.$alert(`请确认${this.domain} 在您当前登录钱包[${currentWallet} ]帐户下`)
        return;
      }
    },
    setAllState(flag) {
      this.ipState = flag;
      this.walletState = flag;
      this.aliasState = flag;
      this.extensionState = flag;
    },
    setAllDisabledState(flag) {
      this.ipv4Disabled = flag;
      this.ipv6Disabled = flag;
      this.walletDisabled = flag;
      this.extensionDisabled = flag;
      this.aliasDisabled = flag;
    },
    setDNSManagerData(){
      this.$message(this.$basTip.warn('Come soon.'))
    },
    customedPriceChanged(val){
      let unitPrice = this.subUnitPrice;
      let ori = transWei(this.info.customPrice)
      if(this.info.isCustomed && (parseInt(val) !== parseInt(ori))){
        console.log(val,'<<>>>',ori)
        this.canCustomedSave = true
      }else{
        this.canCustomedSave = false
      }
    },
    customedCheckedChange(val){
      let oriIsCustomed = this.oriIsCustomed
      console.log(this.info.isCustomed,'<<.is>>',val)
      if(oriIsCustomed === val){
        this.canCustomedSave = false
      }else{
        this.canCustomedSave = true
      }
    }
  }
}
</script>
<style>

</style>
