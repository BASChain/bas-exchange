<template>
  <div class="container bg-white">
    <div class="row justify-content-center align-items-center">
      <el-card body-style="backgroup:rgba(245,246,246,1);"
        shadow="never"
        class="col-md-8 col-sm-10 box-card bas-gray-bg">
        <div class="bas-inline-flex" >
          <div class="bas-info-label bas-label-100" style="font-size:1.25rem;color:#04062E;">
            {{$t('l.Domain')}}
          </div>
          <div class="bas-info-text ">
            <span style="font-size:1.45rem;">
              {{ domainText }}
            </span>
            <span class="domain-type-boxer">
              {{domainType}}
            </span>
          </div>
        </div>
        <div class="bas-inline-flex pt-3">
          <div class="bas-info-label bas-label-100">
            {{$t('l.Owner')}}
          </div>
          <div class="bas-info-text">
            {{asset.owner}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            {{$t('l.ExpiredDate')}}
          </div>
          <div class="bas-info-text">
            {{expireDate}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            {{$t('l.DomainHash')}}
          </div>
          <div class="bas-info-text">
            {{asset.domainhash}}
          </div>
        </div>
      </el-card>
    </div>

    <!-- SubDomain Setting -->
    <div v-if="isTopDomain"
      class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div class="pt-4 pb-2">
          <h5>{{$t('l.SubDomainConfiguration')}}</h5>
        </div>
      </div>

      <el-form
        label-width="220px"
        class="col-md-8 col-sm-10">
        <el-form-item :label="isOpenToPublicLabel">
          <el-radio-group
            @change="OpenAppliedChanged"
            v-model="asset.openApplied">
            <el-radio :label="false" :disabled="state.oaLoading"
              @change="showOpenAppliedConfirm">
              {{$t('l.N')}}
            </el-radio>
            <el-radio :disabled="state.oaLoading"
              @change="showOpenAppliedConfirm"
              :label="true">
              {{$t('l.Y')}}
            </el-radio>
          </el-radio-group>
          <loading-dot v-if="state.oaLoading" style="float:right;"/>
        </el-form-item>
        <el-form-item >
          <label slot="label">{{$t('l.SubDomainPrice')}}</label>
          <el-input-number v-model="ctrl.subUnitPrice" name="subUnitPrice"
            :precision="2" :step="1.0" :disabled="!editCustomPriceEnable"
            controls-position="right"
            @change="customedPriceChanged"
            :min="ruleState.subGas" class="w-25">
          </el-input-number>
          <el-checkbox v-model="asset.isCustomed"
            @change="customedCheckedChange"
            :disabled="isCustomedCheckDisabled"
            class="bas-domain--setprice-tip">
            Notice: {{getNotice}}
          </el-checkbox>
          <loading-dot v-if="state.customedLoading" style="float:right;"/>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="setCustomed" :disabled="state.customedLoading"
            type="primary" class="bas-btn-primary w-25">
            {{  $t('g.Confirm') }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible="ctrl.openAppliedDialogVisible"
        :title="tip.oaConfirmTitle"
        :before-close="cancelOpenApplied"
        width="30%">
        <h5 class="text-center">
          {{oaConfirmMessage}}
        </h5>
        <div class="dialog-footer" slot="footer">
          <el-button size="mini"
            @click="cancelOpenApplied">
            {{  $t('g.Cancel') }}
          </el-button>
          <el-button type="primary" class="bas-btn-primary"
            size="mini"
            @click="confirmOpenApplied">
            {{  $t('g.Confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>

    <div v-if="isTopDomain"
      class="row justify-content-center align-content-center">
      <div class="bas-split-h" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
    </div>

    <div class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div class="bas-refs-header pt-3 pb-2">
          <div>
            <h5>{{$t('l.DnsMappingData')}}</h5>
          </div>
          <!-- <div>
            <a class="btn btn-sm bas-btn-primary"
              v-if="dnsDisabled"
              @click="updateAll"
              style="width:100px;"
              :class="loading ? 'bas-disabled' : ''">
              {{ $t('g.Update')}}
            </a>
            <a class="btn btn-sm bas-btn-primary"
              v-if="!dnsDisabled"
              @click="saveAll"
              style="width:100px;"
              :class="loading ? 'bas-disabled' : ''">
               {{ $t('g.Saving') }}
            </a>
          </div> -->
        </div>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">

      <el-form class="col-md-8 col-sm-10" label-width="140px">
        <el-form-item >
          <div class="bas-w-68 dns-demo-wrapper">
            <span>
              {{$t('l.DemoIPPrefix')}} 104.238.165.23
            </span>
          </div>
        </el-form-item>
        <el-form-item label="IPV4">
          <el-input v-model="dns.ipv4"
            :placeholder="dnsPlaceHolder"
            @input="trimIPv4Text"
            :disabled="dnsDisabled"
            class="bas-w-68"/>

        </el-form-item>
        <el-form-item label="IPV6">
          <el-input  v-model="dns.ipv6"
            :placeholder="dnsPlaceHolder"
            :disabled="dnsDisabled"
            @input="trimIPv6Text"
            class="bas-w-68"/>
        </el-form-item>
        <el-form-item >
          <label slot="label">
            {{$t('l.BlockChainAddress')}}
          </label>
          <el-input v-model="dns.wallet"
            :placeholder="dnsPlaceHolder"
            @input="trimWalletText"
            :disabled="dnsDisabled"
            class="bas-w-68"/>
        </el-form-item>
        <el-form-item>
          <label slot="label">
            {{$t('l.Alias')}}
          </label>
          <el-input v-model="dns.alias"
            :placeholder="dnsPlaceHolder"
            @input="trimAliasText"
            :disabled="dnsDisabled"
            class="bas-w-68" />
        </el-form-item>
        <el-form-item >
          <label slot="label">
            {{$t('l.ExtraInfo')}}
          </label>
          <el-input
            :disabled="dnsDisabled"
            v-model="dns.extrainfo"
            :placeholder="dnsPlaceHolder"
            class="bas-w-68"
            type="textarea" autosize/>
        </el-form-item>
        <el-form-item label="">
          <span slot="label">
            <loading-dot v-if="state.dnsLoading" style="float:left;"/>
          </span>

          <el-button v-if="state.dnsEditDisabled"
            :disabled="state.dnsLoading"

            type="primary" class="bas-w-68 bas-btn-primary"
            @click="changeDnsEdit(false)">
            {{$t('l.UpdateInfoBtn')}}
          </el-button>
          <el-button v-if="!state.dnsEditDisabled"
            :disabled="state.dnsLoading"
            type="primary" class="bas-w-40 bas-btn-primary"
            @click="saveAll">
            {{$t('g.Confirm')}}
          </el-button>

          <el-button
            v-if="!state.dnsEditDisabled"
            :disabled="state.dnsLoading"
            type="plain" class="w-25"
            @click="changeDnsEdit(true)">
            {{$t('g.Cancel')}}
          </el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="Warning" class="bas-w-68 bas-btn-pink"
            :disabled="state.dnsLoading"
            @click="deleteAll">
            {{$t('l.ClearAllConfiguration')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
div.bas-w-68 > input.el-input__inner::-webkit-input-placeholder {
  color: rgba(4, 6, 46, .3) !important;
}
div.bas-w-68 > input.el-input__inner::-moz-placeholder {
   color: rgba(4, 6, 46, .3) !important;
}
div.bas-w-68 > input::-ms-input-placeholder {
   color: rgba(4, 6, 46, .3) !important;
}
div.bas-w-68 > textarea.el-textarea__inner::-webkit-input-placeholder {
   color: rgba(4, 6, 46, .3) !important;
}
div.bas-w-68 > textarea.el-textarea__inner::-moz-placeholder {
   color: rgba(4, 6, 46, .3) !important;
}
div.bas-w-68 > textarea.el-textarea__inner::-ms-input-placeholder
{
  color: rgba(4, 6, 46, .3) !important;
}
.el-input.is-disabled .el-input__inner {
  color:rgba(4, 6, 46, .9) !important;
}
.dns-demo-wrapper {
  height: 32px;
  display: inline-flex;
  direction: column;
  background:rgba(0,202,155,.1);
  color: rgba(0,202,155,1);
  border-radius:2px;
  justify-content: flex-start;
  align-items: center;
}

.dns-demo-ip p {
  line-height: 30px;
}
.domain-type-boxer {
  padding: 4px 1rem;
  color: #00ca9b;
  margin-left: .5rem;
  border-radius: 1rem;
  border: 1px solid #00ca9b;
}
</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import {
  transBAS2Wei,
  dateFormat,
  isOwner,
  handleDomain,
  toUnicodeDomain,
  validIPv4, validIPv6,
  IPv6ToHex, IPv4ToHex,
} from '@/utils'
import { checkSupport } from '@/bizlib/networks';
import {getCurrentState,getWeb3State} from '@/bizlib/web3'
import { getBasAssetInstance,getDomainDetails } from '@/bizlib/web3/asset-api.js'
import {getBasTokenInstance} from '@/bizlib/web3/token-api'
import { oannInstance } from '@/bizlib/web3/oann-api'
import DomainValidator from '@/utils/Validator.js'
import DomainProxy from '@/proxies/DomainProxy.js'
import {getDnsInfoByHash} from '@/bizlib/web3/dns-api'


export default {
  name:"DnsUpdate",
  components:{
    LoadingDot,
  },
  computed: {
    isOpenToPublicLabel(){
      return this.$t('l.HasOpenAppliedSubRegistLabel')
    },
    dnsPlaceHolder(){
      return this.state.dnsEditDisabled ? this.$t('p.DnsConfigurationPlaceHolder'):''
    },
    domainText(){
      return toUnicodeDomain(this.params.domain)
    },
    domainType(){
      let domain = toUnicodeDomain(this.params.domain)
      const dType =  DomainValidator.getDomainType(domain)

      return this.$t(`g.${dType}`)
    },
    expireDate(){
      if(!this.asset.expire)return ''
      return dateFormat(this.asset.expire,'YYYY-MM-DD HH:mm:ss')
    },
    oaConfirmMessage(){
      return this.asset.openApplied ?
        this.$t('p.DnsUpdateOpenAppliedConfirmMsg') :  this.$t('p.DnsUpdateCloseAppliedConfirmMsg')
    },
    editCustomPriceEnable(){
      return this.asset.openApplied && this.asset.isCustomed && !this.state.customedLoading
    },
    isCustomedCheckDisabled(){
      return !this.asset.openApplied || this.state.customedLoading
    },
    showCustomedSaveText(){
      return this.ctrl.canCustomedSave ?  this.$t('g.Saving') : this.$t('g.Update')
    },
    isTopDomain(){
      return DomainValidator.isTop(this.params.domain)
    },
    dnsDisabled(){
      return this.state.dnsEditDisabled || this.state.dnsLoading
    },
    loading(){
      return this.state.ipLoading || this.state.walletLoading
        || this.state.aliasLaoding || this.state.extraLoading;
    },
    getNotice(){
      let lg = this.$store.state.lang
      const externalBAS = this.ruleState.externalBAS
      return lg === 'zh-CN' ? `如开启自定义价格，将额外收取 ${ externalBAS } BAS` : `If the custom price is turned on, an additional ${externalBAS} BAS will be charged`
    }
  },
  data(){
    return {
      params:{
        domain:''
      },
      tip:{
        oaConfirmTitle:'提示',
      },
      ctrl:{
        openAppliedDialogVisible:false,
        subUnitPrice:4,
        canCustomedSave:false,
      },
      asset:{
        name:'',
        owner:'',
        expire:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4*10**18,
        domainhash:'',
      },
      dns:{
        ipv4:'',
        ipv6:'',
        wallet:'',
        alias:'',
        extrainfo:''
      },
      ruleState:{
        decimals:18,
        rareGas:500,
        topGas:20,
        subGas:4,
        externalBAS:100,
        maxYearReg:5,
        aliasLen: 256,
        extensionLen:512
      },
      dappState:{
        wallet:'',
        chainId:''
      },
      state:{
        oriOpenApplied:false,
        oaLoading:false,
        customedLoading:false,
        customeddisabled:false,
        dnsLoading:false,
        dnsEditDisabled:true,
      },
      oridns:{

      }
    }
  },
  methods:{
    trimIPv4Text(val){
      console.log(val)
      if(val){
        this.dns.ipv4 = val.trim()
      }
    },
    trimIPv6Text(val){
      if(val){
        this.dns.ipv6 = val.trim()
      }
    },
    trimWalletText(val){
      if(val){
        this.dns.wallet = val.trim()
      }
    },
    trimAliasText(val){
      if(val){
        //this.dns.alias = val.trim()
      }
    },
    reloadDNSconfig(domain){
      let ruleState = this.$store.getters['web3/ruleState']
      let handleText = handleDomain(domain)
      let proxy = new DomainProxy()
      proxy.getDomainInfo(handleText).then(resp=>{
        //console.log(resp)
        if(resp.state){
          let data = proxy.transData(resp)
          this.asset = Object.assign(this.asset,data.asset)
          let decimals = ruleState.decimals||18
          if(this.asset.isCustomed){
            this.ctrl.subUnitPrice = this.asset.customPrice/(10 ** decimals)
          }else{
            this.ctrl.subUnitPrice = ruleState.subGas
          }
          this.dns = Object.assign(this.dns,data.dns)
          this.oridns = Object.assign({},data.dns)
        }else{
          console.error(`unfound ${domain} from the API Server.`)
        }
      }).catch(ex=>{
        console.log(ex)
      })
    },
    reloadDNS(hash){
      const web3State = getWeb3State();
      let wallet = web3State.wallet;
      let chainId = web3State.chainId;
      if(hash){
        getDnsInfoByHash(hash).then(ret=>{
          console.log(hash,ret)
          this.dns = Object.assign(ret)
          this.oridns = Object.assign(ret)
        }).catch(ex=>{
          console.log(ex)
        })
      }
    },
    reloadDomain(text){

    },
    deleteAll(){
      let msg = ''
      if(this.state.dnsLoading){
        msg = this.$t('g.TransactionWaitTips')
        this.$message(this.$basTip.error(msg))
        return false;
      }
      if(!this.checkAuthor()){
        return;
      }
      const web3State = getWeb3State();

      let inst = oannInstance(web3State.chainId,web3State.wallet)
      let options = {from:web3State.wallet}

      let namehash = this.asset.domainhash;
      if(!namehash){
        console.error(`${this.domainText} namehash is null`)
        return
      }

      this.state.dnsEditDisabled = true;
      this.state.dnsLoading = true;
      inst.methods.setRecord(
        namehash,
        IPv4ToHex('0.0.0.0'),
        IPv6ToHex('::'),
        "0x",
        '0x',
        ''
      ).send(options).then(resp=>{
        this.state.dnsLoading = false
        this.clearDnsAttr()
        msg = this.$t('g.UpdateSuccess')
        this.$message(this.$basTip.warn(msg))
        // getDnsInfoByHash(hash).then(ret=>{
        //   console.log(hash,ret)
        //   this.dns = Object.assign({},ret)
        //   this.oridns = Object.assign({},ret)
        // }).catch(ex=>{
        //   console.log(ex)
        // })
      }).catch(ex=>{
        this.state.dnsLoading = false
        this.exceptionMsg(ex)
      })

    },
    OpenAppliedChanged(val){
      console.log(val)
    },
    cancelOpenApplied(){
      this.ctrl.openAppliedDialogVisible = false;
      this.asset.openApplied = this.state.oriOpenApplied
    },
    confirmOpenApplied(){
      let commitState = this.asset.openApplied
      if(!this.checkAuthor())return;
      console.log('>>>>',commitState)
      //commitData
      let msg = ''

      const web3State = getWeb3State();
      let inst = oannInstance(web3State.chainId,web3State.wallet)
      let options = {from:web3State.wallet}

      let namehash = this.asset.domainhash;
      if(!namehash){
        console.error(`${this.domainText} namehash is null`)
        return
      }

      this.state.oaLoading = true
      if(commitState){
        inst.methods.openToPublic(namehash).send(options)
          .then(resp=>{
            this.state.oaLoading = false
            this.asset.openApplied = true
            msg = this.$t('g.UpdateSuccess')
            this.$message(this.$basTip.warn(msg))
          }).catch(ex=>{
             this.state.oaLoading = false
             this.asset.openApplied = false
             this.exceptionMsg(ex)
          })
      }else {
        inst.methods.closeToPublic(namehash).send(options)
          .then(resp=>{
            this.state.oaLoading = false
            this.asset.openApplied = false
            msg = this.$t('g.UpdateSuccess')
            this.$message(this.$basTip.warn(msg))
          }).catch(ex=>{
             this.state.oaLoading = false
             this.asset.openApplied = true
             this.exceptionMsg(ex)
          })
      }
      this.ctrl.openAppliedDialogVisible = false

    },
    showOpenAppliedConfirm(val){
      this.ctrl.openAppliedDialogVisible = true
      this.state.oriOpenApplied = !val
    },
    customedPriceChanged(val){
      let decimals = this.ruleState.decimals ||18
      let oriPrice = this.asset.customePrice/(10 ** decimals)
      if(this.asset.openApplied && this.asset.isCustomed){
        if((parseFloat(oriPrice) -parseFloat(val)) != 0.0){
          this.ctrl.canCustomedSave = true
        }
      }
    },
    customedCheckedChange(val){
      this.ctrl.canCustomedSave = true
    },

    //commit data Methods
    checkAuthor(){
      let state = getWeb3State();
      let chainId = state.chainId;
      let wallet = state.wallet;
      let errMsg = this.$t('g.ParameterIllegal')
      if(!chainId || !wallet){
        this.$metamask()
        //this.$message(this.$basTip.error('MetaMask 登录已失效,请点击我的钱包登录.'))
        return false;
      }
      if(!checkSupport(chainId)){
        errMsg = '当前网络不支持修改,请切换到Ropsten网络.'
        this.$message(this.$basTip.error(errMsg))
        return false;
      }
      let domain = this.domainText
      if(!isOwner(this.asset.owner,wallet)){
        errMsg = `请确认该域名: ${domain} 属于前钱包[${wallet}]账户下`
        this.$message(this.$basTip.error(errMsg))
        return false;
      }
      if(!this.asset.domainhash){
        this.$message(this.$basTip.error(errMsg))
        return false;
      }
      return true;
    },
    setCustomed(){
      if(!this.checkAuthor()){
        return;
      }

      if(this.state.customedLoading){
        return
      }
      if(!this.asset.openApplied){
        console.log('Error: open to pulic is false')
        return;
      }
      let isCustomed = this.asset.isCustomed


      const web3State = getWeb3State();
      let inst = oannInstance(web3State.chainId,web3State.wallet)
      let options = {from:web3State.wallet}

      let namehash = this.asset.domainhash;
      if(!namehash){
        console.error(`${this.domainText} namehash is null`)
        return
      }
      let msg = ''

      if(isCustomed){
        this.openCustomPrice(inst,namehash,web3State.wallet,options)
      }else {
        this.closeCustomed(inst,namehash,options)
      }
    },
    async openCustomPrice(inst,hash,wallet,options){
      let msg = ''
      let subUnitPrice = this.ctrl.subUnitPrice
      let decimals = this.ruleState.decimals||18
      let commitPriceWei = transBAS2Wei(subUnitPrice)
      //subUnitPrice* (10 ** decimals)
      let externalWei = (this.ruleState.externalBAS||100) * (10**decimals)

      let token = await getBasTokenInstance(wallet)
      let approveAddress = inst._address

      let basBal = await token.methods.balanceOf(wallet).call()
      let basBalFloat = parseFloat(basBal/(10**decimals))
      console.log("BAS Balance",basBalFloat,'>>>',commitPriceWei)
      if(basBalFloat - parseFloat(this.ruleState.externalBAS||100) < 0.0){
        msg = this.$t('g.LackOfBasBalance')
        this.$message(this.$basTip.error(msg))
        return ;
      }

      this.state.customedLoading = true;
      token.methods.approve(approveAddress,externalWei+'')
        .send(options).then(ret=>{
          msg = this.$t('p.DnsUpdateApproveSuccess')
          this.$message(this.$basTip.warn(msg))
          return true;
        }).then(flag=>{
          if(flag){
            inst.methods.openCustomedPrice(hash,commitPriceWei+'')
              .send(options)
              .then(ret=>{
                msg = this.$t('g.UpdateSuccess')
                this.$message(this.$basTip.warn(msg))
                this.asset.customPrice = commitPriceWei
                this.state.customedLoading = false;
              })
              .catch(ex=>{
                this.state.customedLoading = false;
                this.exceptionMsg(ex)
              })
          }
          this.ctrl.canCustomedSave = false
        }).catch(ex=>{
          this.state.customedLoading = false;
          this.ctrl.canCustomedSave = false
          this.exceptionMsg(ex)
        })
    },
    closeCustomed(inst,hash,options){
      let msg = ''
      this.state.customedLoading = true;
      inst.methods.closeCustomedPrice(hash)
        .send(options).then(resp=>{
          this.state.customedLoading = false;
          this.ctrl.canCustomedSave = false
          this.ctrl.subUnitPrice = this.ruleState.subGas
          msg = this.$t('g.UpdateSuccess')
          this.$message(this.$basTip.warn(msg))
        }).catch(ex=>{
          this.state.customedLoading = false;
          this.ctrl.canCustomedSave = false
          this.exceptionMsg(ex)
        })
    },
    exceptionMsg(ex){
      console.log(ex)
      let msg = ''
      if(ex.code == 4001){
        msg = this.$t('g.4001')
        this.$message(this.$basTip.error(msg))
      }
      if(ex.code == -32601){
        msg = this.$t('g.NetworkTimeout')
        this.$message(this.$basTip.error(msg))
      }
    },
    editSetting(){
      this.state.dnsEditDisabled = false;
    },
    changeDnsEdit(flag){
      this.state.dnsEditDisabled = flag
      if(flag){//可编辑
        this.dns = Object.assign({},this.oridns)
      }else{
        this.oridns = Object.assign({},this.dns)
      }
      console.log(flag,'>',this.state.dnsEditDisabled)
    },
    clearDnsAttr(){
      this.dns.ipv4 = ''
      this.dns.ipv6 = ''
      this.dns.wallet = ''
      this.dns.alias = ''
      this.dns.extrainfo = ''
    },
    saveAll(){
      let msg = ''
      if(this.state.dnsLoading){
        msg = '正在保存,请稍候.'
        this.$message(this.$basTip.error(msg))
        return false;
      }
      if(!this.checkAuthor()){
        return;
      }
      let aliasLen = this.ruleState.aliasLen ||256;
      let extraMaxLen = this.ruleState.extensionLen || 512;
      let hash = this.asset.domainhash;
      let ipv4 = this.dns.ipv4 ||'0.0.0.0'
      let ipv6 = this.dns.ipv6 ||'::'
      let address = this.dns.wallet||'';
      let alias = this.dns.alias ||'';
      let extrainfo = this.dns.extrainfo||'';
      if(!validIPv4(ipv4)){
        this.$message(this.$basTip.error(`${ipv4} illegal`))
        return
      }
      if(!validIPv6(ipv6)){
        this.$message(this.$basTip.error(`${ipv6} illegal`))
        return
      }
      if(address && !Web3.utils.isAddress(address)){
        msg = `您输入的地址${address}不正确,请输入区块链地址.`
        this.$message(this.$basTip.error(msg))
        return;
      }
      if(Web3.utils.stringToHex(alias).length > aliasLen){
        msg = `您输入的别名${alias}太长,超过了${aliasLen}字符.`
        this.$message(this.$basTip.error(msg))
        return;
      }

      const web3State = getWeb3State();

      let inst = oannInstance(web3State.chainId,web3State.wallet)
      let options = {from:web3State.wallet}

      let namehash = this.asset.domainhash;
      if(!namehash){
        console.error(`${this.domainText} namehash is null`)
        return
      }

      this.state.dnsEditDisabled = true;
      this.state.dnsLoading = true;

      let extraBytes = extrainfo == '0x'? '' : Web3.utils.stringToHex(extrainfo+'')
      console.log(namehash,IPv4ToHex(ipv4),
      IPv6ToHex(ipv6),address,extraBytes,alias)
      inst.methods.setRecord(
        namehash,
        IPv4ToHex(ipv4),
        IPv6ToHex(ipv6),
        address||"0x",
        extraBytes,
        alias||''
      ).send(options).then(resp=>{
        this.state.dnsLoading = false
        msg = this.$t('g.UpdateSuccess')
        this.$message(this.$basTip.warn(msg))
      }).catch(ex=>{
        this.state.dnsLoading = false
        this.exceptionMsg(ex)
      })
    },

  },
  mounted() {
    let domain = this.$route.params.domain
    this.params.domain = domain
    let expire = this.$route.params.expire

    let dappState = this.$store.getters['web3/dappState']
    this.dappState = Object.assign(this.dappState,dappState)
    let ruleState = this.$store.getters['web3/ruleState']

    let pOpenApplied = this.$route.params.openApplied
    let pIsCustomed = this.$route.params.isCustomed
    let pPrice = this.$route.params.price

    this.ruleState = Object.assign(this.ruleState,ruleState)
    const web3State = getWeb3State();
    let wallet = web3State.wallet;
    let chainId = web3State.chainId;

    let handleText = handleDomain(domain)
    let proxy = new DomainProxy()
    proxy.getDomainInfo(handleText).then(resp=>{
      //console.log(resp)
      if(resp.state  ){
        let data = proxy.transData(resp)
        this.asset = Object.assign(this.asset,data.asset)
        let decimals = ruleState.decimals||18
        if(this.asset.isCustomed){
          this.ctrl.subUnitPrice = this.asset.customPrice/(10 ** decimals)
        }else{
          this.ctrl.subUnitPrice = ruleState.subGas
        }
        this.dns = Object.assign(this.dns,data.dns)
        return data.asset.domainhash;
      }else{
        let domainCode = handleDomain(handleDomain(domain))
        let domainhash = Web3.utils.keccak256(domainCode)
        this.asset.domainhash = domainhash
        this.asset.expire = expire ||0
        this.asset.owner = wallet||''
        if(!DomainValidator.isSub(domain)){
          this.asset.openApplied = Boolean(pOpenApplied)

          this.asset.isCustomed = pIsCustomed
          if(pOpenApplied && pIsCustomed){
            this.ctrl.subUnitPrice = pPrice
          }
        }
        console.error(`unfound ${domain} from the API Server.`)
        return domainhash
      }
    }).then(hash =>{
      if(hash){
        console.log(hash,chainId,wallet)
        getDnsInfoByHash(hash,chainId,wallet).then(ret=>{
          console.log('Sol DNS:',ret)
          this.dns = Object.assign(this.dns,ret)
          this.oridns = Object.assign({},ret)
        }).catch(ex=>{
          console.error('Query DNS sol methods:',ex)
        })
      }
    }).catch(ex=>{
      console.log(ex)
    })
  },
}
</script>

