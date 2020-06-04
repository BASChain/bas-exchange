<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            {{$t('p.DomainRegistTopTitle')}}
          </div>
        </div>
        <div class="bas-gray-split" />

        <div v-loading="ctrl.loading"
          class="bas-card__body bas-border-none">
          <el-form class="col-10" label-width="160px">
            <el-form-item>
              <label slot="label">
                {{$t('l.Domain')}}
              </label>
              <el-input v-model="domain"
                class="bas-regist--domain-input"
                @input="changeLower"
                placeholder="please enter domain...">
                <template v-if="showDomainAppend"
                  slot="append">
                  {{ domainType }}
                </template>
              </el-input>
              <div v-if="subWarnShow" class="bas-text-warning">
                <i class="fa fa-warning"></i>
                {{$t('p.DomainRegistTopClosedTip')}}
              </div>
            </el-form-item>
            <el-form-item>
              <label slot="label">{{$t('l.PriceBas')}}</label>
              <span> {{unitPrice}} </span>
              <span> {{ruleState.symbol}}/year </span>
            </el-form-item>

            <el-form-item v-if="topShow" >
              <label slot="label">
                {{$t('l.HasOpenAppliedSubRegistLabel')}}
              </label>
              <el-radio-group v-model="openApplied"
                @change="openAppliedChange">
                <el-radio :label="false" @change="closeSubApply">
                  {{$t('l.N')}}
                </el-radio>
                <el-radio :label="true"  @change="openSubApply">
                   {{$t('l.Y')}}
                </el-radio>
              </el-radio-group >
            </el-form-item>
            <el-form-item v-if="customPriceEdidShow"
              >
              <label slot="label">{{$t('p.DomainDetailRegistSubTips')}} {{minsubBas}}</label>
              <el-input-number v-model="subUnitPrice"
                :disabled="!customPriceEditEnabled"
                :precision="2" :step="1.0"
                controls-position="right"
                @change="customedPriceChanged"
                :min="minsubBas"
                >
              </el-input-number>
              <el-checkbox v-model="isCustomed"
                @change="customedCheckedChange"
                class="bas-domain--setprice-tip">
                Notice: {{$t('p.DomainRegistExternalBasTip')}}{{ ruleState.externalBAS }}{{ruleState.symbol}}
              </el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('l.PurchaseYears')">
              <el-input-number v-model="years" name="years"
                controls-position=""
                :min="1" :max="ruleState.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div v-if="showTopAssetInfo"
            class="bas-regist--topdomain-container">
            <h5 class="">{{$t('p.DomainRegistSubRootInfoTitle')}}</h5>
            <div class="bas-inline-flex">
              <div class="bas-label-100" >{{$t('l.ExpiredDate')}}:</div>
              <span>{{getTopExpired}}</span>
            </div>
            <div class="bas-inline-flex">
              <div class="bas-label-100">{{$t('l.Owner')}}:</div>
              <span>{{getTopOwner}}</span>
              <a class="bas-link bas-small" @click.prevent="gotoWhois" style="margin-left:1.5rem;">
                Who is >>
              </a>
            </div>
          </div>

          <div class="col-12 text-center">
            <span class="bas-text-green">{{$t('l.Total')}}:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary" @click="commitRegist">
            {{$t('l.RegistBtn')}}
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  wei2Bas,
  bas2Wei,
  transBAS2Wei,
  dateFormat,
  getTopFromSub,
  handleDomain,toUnicodeDomain,
  diffBnFloat,
  numThousandsFormat,
}from '@/utils'
import {
  MAX_BILLON_VOL,
  getDomainType,
  isTop,isSub,isRareTop,
  CheckLegal,domainSplit,
} from '@/utils/Validator.js'

import {
 PARAM_ILLEGAL, LACK_OF_ETH,
 RPC_SERVER_ERROR,LACK_OF_TOKEN,
 ROOT_REGIST_CLOSE,
 DOMAIN_FORMAT_ILLEGAL,DOMAIN_HAS_TAKEN,
 DOMAIN_TOP_EXPIRED
} from '@/web3-lib/api-errors.js'

//import DomainProxy from '@/proxies/DomainProxy.js'

import { findDomainInfo,hasTaken } from '@/web3-lib/apis/domain-api.js'
import {preCheck4Root,preCheck4Sub} from '@/web3-lib/apis/domains-apply.js'

export default {
  name:"RegistDomain",
  computed: {
    showDomainAppend(){
      return this.domain !== undefined && this.domain !== ''
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

      return this.domain === '' ? '': this.$t(`g.${getDomainType(this.domain)}`)
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
      let totals = parseFloat(this.unitPrice*this.years)
      return this.isCustomed ? totals + parseFloat(this.ruleState.externalBas) : totals
    },

    ...Vuex.mapGetters({
      ruleState:'dapp/ruleState',
      minsubBas:state => parseFloat(wei2Bas(state.dapp.subGas))

    }),
    ...Vuex.mapState({
      dappState:state =>state.dapp
    })
  },
  data() {
    return {
      domain:'',
      years:1,
      openApplied:true,
      isCustomed:false,
      subUnitPrice:4,
      unitPrice:4,
      maxPriceBas:MAX_BILLON_VOL,
      topasset:{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4*10**18
      },
      ctrl:{
        loading:false
      },
    }
  },
  methods: {
    setUnitPrice(){
      let domain = this.domain
      const ruleState = this.$store.getters['dapp/ruleState']

      console.log('>>>>>UnitPrice',ruleState,domain)
      if(domain === undefined ||domain ===''||domain.trim()===''){
        this.unitPrice = ruleState.subBas
        return
      }

      let type = getDomainType(domain)

      const topasset = this.topasset;
      switch (type) {
        case 'subdomain':
          this.unitPrice = ruleState.subBas
          if(topasset.owner && topasset.openApplied
            && topasset.isCustomed){
              this.unitPrice = wei2Bas(topasset.customPrice)
            }else{
              this.unitPrice = wei2Bas(topasset.customPrice)
            }
          break;
        case 'raretop':
          this.unitPrice = ruleState.rareBas
          break;
        case 'commontop':
          this.unitPrice = ruleState.rootBas
          break;
        default:
          break;
      }
    },
    changeLower(val){
      if(val){
        this.domain = val.trim().toLowerCase()
      }
    },
    openAppliedChange(){

    },
    closeSubApply(val){
      //console.log(val)
      this.isCustomed = false;
      const ruleState = this.$store.getters["dapp/ruleState"]
      this.subUnitPrice = ruleState.subBas
    },
    openSubApply(val){
       console.log(val)
    },
    customedPriceChanged(){

    },
    customedCheckedChange(){
      if(!this.isCustomed){
        const ruleState = this.$store.getters["dapp/ruleState"]
        this.subUnitPrice = ruleState.subBas
      }
    },
    gotoWhois(){
      if(this.topasset.name){
        this.$router.push({
          path:`/domain/detail/${this.topasset.name}`
        })
      }
    },
    async loadTopasset(text){
      let that = this;
      const web3State = this.$store.getters['dapp/web3State']
      const chainId = web3State.chainId
      console.log('FindRootDomain',text,web3State)

      if(chainId){
        findDomainInfo(text,chainId).then(resp=>{
          console.log(resp)
          if(resp.state){
            this.topasset = Object.assign({},resp.assetinfo)
            this.setUnitPrice()
          }
        }).catch(e=>{
          console.log(e)
        })
      }


      //const proxy = new DomainProxy()
      // proxy.getDomainInfo(handleDomain(text)).then(resp=>{
      //   if(resp.state){
      //     let asset = resp.assetinfo
      //     const ret = {
      //       name:asset.name,
      //       expire:asset.expire,
      //       owner:asset.owner,
      //       openApplied:asset.ropentopublic,
      //       isCustomed:asset.riscustomed,
      //       customPrice:asset.rcustomeprice
      //     }
      //     that.topasset = Object.assign({},ret)
      //   }else{
      //     that.resetTopAsset()
      //   }
      //   that.setUnitPrice()
      // }).catch(ex=>{
      //   that.resetTopAsset()
      //   that.setUnitPrice()
      // })

    },
    resetTopAsset(){
      const defSubGas = this.$store.state.dapp.subGas
      this.topasset = Object.assign({},{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        customPrice:defSubGas
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
            msg = `${domain} ${this.$t('l.Illegal')}`
            break;
          case 10001:

            msg = `${domain} ${this.$t('l.ErrorMaxLength256')}`
            break;
          case 10002:
            msg = `${domain} ${this.$t('l.ErrorHasSpecialCharacter')}`
            break;
          case 10003:
            msg = `${domain} 域名超过二级`
            break;
          case 10004:
            msg = `${domain} ${this.$t('l.ErrorHasUpperCase')}`
            break;
          case 10012:
            msg = `${domain} ${this.$t('l.ErrorHasSpecialCharacter')}`
            break;
          default:
            msg = `${domain} ${this.$t('l.Illegal')}`
            break;
        }
        this.$message(this.$basTip.error(msg))
        return false;
      }
    },
    async commitRegist(){
      let domain = this.domain
      if(!this.validForm())return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      const issub = isSub(domain)
      const web3State = this.$store.getters['dapp/web3State']
      const chainId = web3State.chainId

      const subUnitPrice = this.subUnitPrice
      if(parseFloat(subUnitPrice) <= 0.00 ){
        let priceTip = this.$t('p.SaleOnPriceUnitBasValidError',{begin:0,end:numThousandsFormat(MAX_BILLON_VOL)})
         this.$message(this.$basTip.error(priceTip))
         return
      }

      try{
        const exist = await hasTaken(domain,chainId,!issub);
        if(exist){
          this.$message(this.$basTip.error(this.$t(`code.200002`,{"domaintext":domain})))
          return
        }
      }catch(e){
        console.error(e)
        return;
      }

      if(issub){
        let domainStruct = domainSplit(domain.trim().toLowerCase());
        let subText = domainStruct.subtext
        let topText = domainStruct.toptext
        await this.commitSubRegisting(subText,topText)
      }else {//top
        await this.commitTopRegisting(domain)
      }
    },
    async commitSubRegisting(subText,topText){
      const web3State = this.$store.getters['dapp/web3State'];

      let chainId = web3State.chainId;
      let wallet = web3State.wallet;

      const commitData = {
        isSubDomain:true,
        domainText:subText,
        topText,
        openApplied:false,
        isCustomed:false,
        customPriceWei:bas2Wei(this.subUnitPrice+''),
        costWei:0,
        years:this.years,
        chainId,
        wallet
      }
      try{
        this.ctrl.loading = true
        const resp = await preCheck4Sub(topText,subText,this.years,chainId,wallet);
        this.ctrl.loading = false
        console.log('CommitTopData:',data)

        const data = Object.assign({},commitData,{hash:resp.hash,costWei:resp.costwei})
        this.$router.push({
          name:'domain.applyresult',
          params:{
            commitData:data
          }
        })
      }catch(ex){
        this.ctrl.loading = false
       let msg = ''
        switch (ex) {
          case DOMAIN_HAS_TAKEN:
          case DOMAIN_FORMAT_ILLEGAL:
            msg = this.$t(`code.${ex}`,{text:subText})
            this.$message(this.$basTip.error(msg))
            return
          case ROOT_REGIST_CLOSE:
          case DOMAIN_TOP_EXPIRED:
            msg = this.$t(`code.${ex}`,{text:topText})
            this.$message(this.$basTip.error(msg))
            return

          case LACK_OF_TOKEN:
          case LACK_OF_ETH:
            this.$message(this.$basTip.error(this.$t(`code.${ex}`)))
              return

          case DOMAIN_FORMAT_ILLEGAL:
            console.error(ex)
            return
          default:
            break;
        }
        console.error(ex)
      }
    },
    async commitTopRegisting(text){
      let topErrMsg = ''

      const web3State = this.$store.getters['dapp/web3State'];
      const chainId = web3State.chainId;
      const wallet = web3State.wallet;
      const costWei = bas2Wei(this.getTotal)
      const customWei = bas2Wei(this.subUnitPrice)

      console.log(chainId,web3State)

      const commitData = {
        isSubDomain:false,
        domainText:text,
        openApplied:this.openApplied,
        isCustomed:this.isCustomed,
        customPriceWei:customWei,
        years:this.years,
        chainId,
        wallet
      }

      const inputParams = {
        domaintext:text,
        isCustomed:this.isCustomed,
        customWei:customWei,
        years:this.years,
        chainId,
        wallet
      }

      try{
        this.ctrl.loading = true
        const resp = await preCheck4Root(inputParams)
        this.ctrl.loading = false
        this.$router.push({
          name:'domain.applyresult',
          params:{
            commitData:Object.assign({},commitData,{costWei:resp.costwei,hash:resp.hash})
          }
        })
      }catch(ex){
        this.ctrl.loading = false
        let msg = ''
        switch (ex) {
          case DOMAIN_HAS_TAKEN:
          case DOMAIN_FORMAT_ILLEGAL:
            msg = this.$t(`code.${ex}`,{text:text})
            this.$message(this.$basTip.error(msg))
            return
          case ROOT_REGIST_CLOSE:
          case DOMAIN_TOP_EXPIRED:
            msg = this.$t(`code.${ex}`,{text:text})
            this.$message(this.$basTip.error(msg))
            return

          case LACK_OF_TOKEN:
          case LACK_OF_ETH:
            this.$message(this.$basTip.error(this.$t(`code.${ex}`)))
              return

          case DOMAIN_FORMAT_ILLEGAL:
            console.error(ex)
            return
          default:
            break;
        }
        console.error(ex)
      }
    }
  },
  mounted() {
    this.domain = this.$route.params.domainText

    //this.ruleState = Object.assign({},ruleState)

    //console.log('>rule>',this.ruleState)
    this.setUnitPrice()
    let topText = getTopFromSub(this.domain)
    if(topText){
      this.loadTopasset(topText)
    }
  },
  watch: {
    domain:function (val,old){
      this.setUnitPrice()
      console.log(">>>>>>ruleState>>>",this.ruleState)
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
