<template>
  <div class="container bg-white">
    <div class="row justify-content-center align-items-center">
      <el-card body-style="backgroup:rgba(245,246,246,1);"
        shadow="never"
        class="col-md-8 col-sm-10 box-card bas-gray-bg">
        <div class="bas-inline-flex" >
          <div class="bas-info-label bas-label-100" style="font-size:1.25rem;color:#04062E;">
            域名
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
            所有者
          </div>
          <div class="bas-info-text">
            {{asset.owner}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            到期日期
          </div>
          <div class="bas-info-text">
            {{expireDate}}
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">
            域名Hash
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
          <h5>二级域名配置</h5>
        </div>
      </div>

      <el-form
        label-width="160px"
        class="col-md-8 col-sm-10">
        <el-form-item label="是否开放二级域名注册">
          <el-radio-group
            @change="OpenAppliedChanged"
            v-model="asset.openApplied">
            <el-radio :label="false" :disabled="state.oaLoading"
              @change="showOpenAppliedConfirm">
              否
            </el-radio>
            <el-radio :disabled="state.oaLoading"
              @change="showOpenAppliedConfirm"
              :label="true">
              是
            </el-radio>
          </el-radio-group>
          <loading-dot v-if="state.oaLoading" style="float:right;"/>
        </el-form-item>
        <el-form-item label="二级域名价格" >
          <el-input-number v-model="ctrl.subUnitPrice" name="subUnitPrice"
            :precision="2" :step="1.0" :disabled="!editCustomPriceEnable"
            controls-position="right"
            @change="customedPriceChanged"
            :min="ruleState.subGas" >
          </el-input-number>
          <el-checkbox v-model="asset.isCustomed"
            @change="customedCheckedChange"
            :disabled="isCustomedCheckDisabled"
            class="bas-domain--setprice-tip">
            Notice: 如开启自定义价格，将额外收取{{ ruleState.externalBAS }}BAS
          </el-checkbox>
          <a class="bas-link bas-link-settings"
            @click="setCustomed"
            :class=" state.customedLoading ? 'bas-disabled' : ''">
            {{  showCustomedSaveText }}
          </a>
          <loading-dot v-if="state.customedLoading" style="float:right;"/>
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
            取 消
          </el-button>
          <el-button type="primary" class="bas-btn-primary"
            size="mini"
            @click="confirmOpenApplied">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <div v-if="isTopDomain" class="row justify-content-center align-content-center">
      <div class="bas-split-h" style="width:90%;border-top:1px solid rgba(150,150,166,1);"></div>
    </div>

    <div class="row justify-content-center align-items-center">
      <div class="col-md-8 col-sm-10">
        <div class="bas-refs-header pt-3 pb-2">
          <div>
            <h5>映射数据配置</h5>
          </div>
          <div>
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

          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <el-form class="col-md-8 col-sm-10" label-width="100px">
        <el-form-item label="IPV4">
          <el-input v-model="dns.ipv4"
          :disabled="dnsDisabled"
            class="bas-w-65"/>
          <loading-dot v-if="state.dnsLoading" style="float:right;"/>
        </el-form-item>
        <el-form-item label="IPV6">
          <el-input  v-model="dns.ipv6"
            :disabled="dnsDisabled"
            class="bas-w-65"/>
        </el-form-item>
        <el-form-item label="区块链地址">
          <el-input v-model="dns.wallet"
            :disabled="dnsDisabled"
            class="bas-w-65"/>
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="dns.alias"
            :disabled="dnsDisabled"
            class="bas-w-65" />
        </el-form-item>
        <el-form-item label="附加信息">
          <el-input
            :disabled="dnsDisabled"
            v-model="dns.extrainfo"
            class="bas-w-65"
            type="textarea" autosize/>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.domain-type-boxer {
  padding: 4px 1rem;
  color: #00ca9b;
  margin-left: .5rem;
  border-radius: 1rem;
  border: 1px solid #00ca9b;
}
</style>
<script>
import {stringToHex,isAddress} from 'web3-utils'
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

export default {
  name:"DnsUpdate",
  components:{
    LoadingDot,
  },
  computed: {
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
      }
    }
  },
  mounted() {
    let domain = this.$route.params.domain
    this.params.domain = domain
    let dappState = this.$store.getters['web3/dappState']
    this.dappState = Object.assign(this.dappState,dappState)
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign(this.ruleState,ruleState)

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
      }else{
        console.error(`unfound ${domain} from the API Server.`)
      }
    }).catch(ex=>{
      console.log(ex)
    })
  },
  methods:{

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
      let errMsg = '参数非法'
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
    updateAll(){
      this.state.dnsEditDisabled = false;
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
      let extrainfo = this.dns.exxtrainfo||'';
      if(!validIPv4(ipv4)){
        this.$message(this.$basTip.error(`${ipv4} illegal`))
        return
      }
      if(!validIPv6(ipv6)){
        this.$message(this.$basTip.error(`${ipv6} illegal`))
        return
      }
      if(address && !isAddress(address)){
        msg = `您输入的地址${address}不正确,请输入区块链地址.`
        this.$message(this.$basTip.error(msg))
        return;
      }
      if(stringToHex(alias).length > aliasLen){
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

      let extraBytes = extrainfo == '0x'? '' : stringToHex(extrainfo+'')
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
  }
}
</script>

