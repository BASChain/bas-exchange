<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            注册域名
          </div>
        </div>
        <div class="bas-gray-split" />

        <div class="bas-card__body bas-border-none">
          <el-form class="col-10" label-width="160px">
            <el-form-item label="域名" >
              <el-input v-model="domain"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template v-if="showDomainAppend"
                  slot="append">
                  {{ domainType }}
                </template>
              </el-input>
              <div v-if="subWarnShow" class="bas-text-warning">
                <i class="fa fa-warning"></i>
                此根域名暂不支持二级域名注册，根域名所有者未开放注册权限
              </div>
            </el-form-item>
            <el-form-item label="价格" >
              <span> {{unitPrice}} </span>
              <span> {{ruleState.symbol}}/year </span>
            </el-form-item>

            <el-form-item label="是否开放二级域名注册" v-if="topShow" >
              <el-radio-group v-model="openApplied"
                @change="openAppliedChange">
                <el-radio :label="false" @change="closeSubApply">否</el-radio>
                <el-radio :label="true"  @change="openSubApply">是</el-radio>
              </el-radio-group >
            </el-form-item>
            <el-form-item v-if="customPriceEdidShow"
              label="二级域名价格">
              <el-input-number v-model="subUnitPrice"
                :disabled="!customPriceEditEnabled"
                :precision="2" :step="1.0"
                controls-position="right"
                @change="customedPriceChanged"
                :min="ruleState.subGas" >
              </el-input-number>
              <el-checkbox v-model="isCustomed"
                @change="customedCheckedChange"
                class="bas-domain--setprice-tip">
                Notice: 如开启自定义价格，将额外收取{{ ruleState.externalBAS }}{{ruleState.symbol}}
              </el-checkbox>
            </el-form-item>
            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                :min="1" :max="ruleState.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div v-if="showTopAssetInfo"
            class="bas-regist--topdomain-container">
            <h5 class="">根域名信息</h5>
            <div class="bas-inline-flex">
              <div class="bas-label-100" >到期日期:</div>
              <span>{{getTopExpired}}</span>
            </div>
            <div class="bas-inline-flex">
              <div class="bas-label-100">所有者:</div>
              <span>{{getTopOwner}}</span>
              <a class="bas-link bas-small" @click.prevent="gotoWhois" style="margin-left:1.5rem;">
                Who is >>
              </a>
            </div>
          </div>

          <div class="col-12 text-center">
            <span class="bas-text-green">总计:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary" @click="commitRegist">注册</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  dateFormat,
  getTopFromSub,
  handleDomain,toUnicodeDomain,
  diffBnFloat,
}from '@/utils'
import {
  getDomainType,
  isTop,isSub,isRareTop,
  CheckLegal,
} from '@/utils/Validator.js'

import {calcTopCost,calcSubCost} from '@/bizlib/web3/oann-api'

import DomainProxy from '@/proxies/DomainProxy.js'
export default {
  name:"RegistDomain",
  computed: {
    showDomainAppend(){
      return this.domain !=''
    },
    topShow(){
      const type = getDomainType(this.domain)
      if(type === 'raretop' || type === 'commontop')return true;
      return false
    },
    subWarnShow(){
      return this.topasset && this.topasset.owner && !this.topasset.openApplied
    },
    customPriceEdidShow(){
      const type = getDomainType(this.domain)
      if((type === 'raretop' || type === 'commontop') && this.openApplied)return true;
      return false
    },
    customPriceEditEnabled(){
      return this.openApplied && this.isCustomed
    },
    domainType(){
      return this.$t(`g.${getDomainType(this.domain)}`)
    },
    showTopAssetInfo(){
      return this.topasset && this.topasset.owner
    },
    getTopOwner(){
      return this.topasset ? this.topasset.owner : ''
    },
    getTopExpired(){
      return this.topasset ? dateFormat(this.topasset.expire,'YYYY-MM-DD HH:mm:ss') : ''
    },
    getTotal(){
      if(this.domain === '')return 0;
      let totals = this.unitPrice*this.years
      return this.isCustomed ? totals + this.ruleState.externalBAS : totals
    }
  },
  data() {
    return {
      domain:'',
      years:1,
      unitPrice:4,
      openApplied:true,
      isCustomed:false,
      subUnitPrice:4,
      topasset:{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4*10**18
      },
      ruleState:{}
    }
  },
  methods: {
    setUnitPrice(){
      let domain = this.domain
      let type = getDomainType(domain)
      switch (type) {
        case 'subdomain':
          this.unitPrice = this.ruleState.subGas
          if(this.topasset.owner && this.topasset.openApplied
            && this.topasset.isCustomed){
              let decimals = this.ruleState.decimals||18
              this.unitPrice = this.topasset.customPrice/(10**18)
            }
          break;
        case 'raretop':
          this.unitPrice = this.ruleState.rareGas
          break;
        case 'commontop':
          this.unitPrice = this.ruleState.topGas
          break;
        default:
          break;
      }
    },
    openAppliedChange(){

    },
    closeSubApply(val){
      //console.log(val)
      this.isCustomed = false;
      this.subUnitPrice = this.ruleState.subGas
    },
    openSubApply(val){
       console.log(val)
    },
    customedPriceChanged(){

    },
    customedCheckedChange(){
      if(!this.isCustomed){
        this.subUnitPrice = this.ruleState.subGas
      }
    },
    gotoWhois(){
      if(this.topasset.name){
        this.$router.push({
          path:`/domain/detail/${this.topasset.name}`
        })
      }
    },
    loadTopasset(text){
      const proxy = new DomainProxy()
      let that = this;
      proxy.getDomainInfo(handleDomain(text)).then(resp=>{
        if(resp.state){
          let asset = resp.assetinfo
          const ret = {
            name:asset.name,
            expire:asset.expire,
            owner:asset.owner,
            openApplied:asset.ropentopublic,
            isCustomed:asset.riscustomed,
            customPrice:asset.rcustomeprice
          }
          that.topasset = Object.assign({},ret)
        }else{
          that.resetTopAsset()
        }
        that.setUnitPrice()
      }).catch(ex=>{
        that.resetTopAsset()
        that.setUnitPrice()
      })

    },
    resetTopAsset(){
      this.topasset = Object.assign({},{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4*10**18
      })
    },
    validForm(){
      let domain = this.domain
      let msg = ''
      try{
        CheckLegal(domain)
        if(this.topasset.owner && !this.topasset.openApplied)throw 10012
        return true
      }catch(ex) {
        console.log('>>>>>>',ex,typeof ex)
        switch (ex) {
          case 10000:
            msg = `${domain} 非法`
            break;
          case 10001:
            msg = `${domain} 域名超长[最大256 byte]`
            break;
          case 10002:
            msg = `${domain} 域名含有特殊字符`
            break;
          case 10003:
            msg = `${domain} 域名超过二级`
            break;
          case 10012:
            msg = `${domain} 根域名未开放注册`
            break;
          default:
            msg = `${domain} 非法`
            break;
        }
        this.$message(this.$basTip.error(msg))
        return false;
      }
    },
    commitRegist(){
      let domain = this.domain
      if(!this.validForm())return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(isSub(domain)){
        let arr = domain.split('.');
        let subText = arr[0]
        let topText = arr[1]
        this.commitSubRegisting(subText,topText)
      }else {//top
        this.commitTopRegisting(domain)
      }
    },
    commitSubRegisting(subText,topText){
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;
      let decimals = this.ruleState.decimals || 18;
      let subErrMsg = ''

      const commitData = {
        isSubDomain:true,
        domainText:subText,
        topText,
        openApplied:false,
        isCustomed:false,
        customPriceWei:(this.subUnitPrice * (10**decimals)),
        costWei:0,
        years:this.years,
        chainId,
        wallet
      }

      calcSubCost({
        subText:subText,
        topText,
        years:this.years,
        chainId,
        wallet
      }).then(resp=>{
        console.log('>>>>',resp)
        if(diffBnFloat(resp.cost,resp.basBal)){
          subErrMsg = this.$t('g.LackOfBasBalance')
          this.$message(this.$basTip.error(subErrMsg))
          return;
        }
        if(diffBnFloat(0.01*10**18,resp.ethBal)){
          subErrMsg = this.$t('g.LackOfEthBalance')
          this.$message(this.$basTip.error(subErrMsg))
          return
        }
        if(resp.exist || !resp.isValid){
          subErrMsg = this.$t('g.DomainValidSol')
          this.$message(this.$basTip.error(subErrMsg))
          return
        }

        commitData.costWei = resp.costWei
        console.log('CommitTopData:',commitData)
        this.$router.push({
          name:'domain.applyresult',
          params:{
            commitData
          }
        })
      }).catch(ex=>{
        console.log('calcTopCost>>>>',ex)
      })
    },
    commitTopRegisting(text){
      let topErrMsg = ''
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;
      let decimals = this.ruleState.decimals || 18;
      const commitData = {
        isSubDomain:false,
        domainText:text,
        openApplied:this.openApplied,
        isCustomed:this.isCustomed,
        customPriceWei:(this.subUnitPrice * (10**decimals)),
        costWei:0,
        years:this.years,
        chainId,
        wallet
      }
      calcTopCost({
        domainText:text,
        isCustomed:this.isCustomed,
        years:this.years,
        chainId,
        wallet
      }).then(resp=>{
        if(diffBnFloat(resp.cost,resp.basBal)){
          topErrMsg = this.$t('g.LackOfBasBalance')
          this.$message(this.$basTip.error(topErrMsg))
          return;
        }
        if(diffBnFloat(0.01*10**18,resp.ethBal)){
          topErrMsg = this.$t('g.LackOfEthBalance')
          this.$message(this.$basTip.error(topErrMsg))
          return
        }
        if(resp.exist || !resp.isValid){
          topErrMsg = this.$t('g.DomainValidSol')
          this.$message(this.$basTip.error(topErrMsg))
          return
        }
        commitData.costWei = resp.costWei
        console.log('CommitTopData:',commitData)

        this.$router.push({
          name:'domain.applyresult',
          params:{
            commitData
          }
        })

      }).catch(ex=>{
        console.log('calcTopCost>>>>',ex)
      })
    }
  },
  mounted() {
    this.domain = this.$route.params.domainText
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    this.setUnitPrice()
    let topText = getTopFromSub(this.domain)
    if(topText){
      this.loadTopasset(topText)
    }
  },
  watch: {
    domain:function (val,old){
      this.setUnitPrice()
      if(val && val !== old && isSub(val)){
        let topText = getTopFromSub(val)
        if(topText){
          this.loadTopasset(topText)
        }else {
          this.resetTopAsset()
        }
      }
    }
  },
}
</script>
<style>

</style>
