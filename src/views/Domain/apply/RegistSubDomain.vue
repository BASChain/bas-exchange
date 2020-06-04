<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card" v-loading="ctrl.loading">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            {{$t('p.DomainRegistSubTitle')}}
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10"
            label-width="160px">
            <el-form-item :label="DomainLabel" >
              <el-input v-model="subText"
                 @input="changeLower"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ `.${showTopDomain}` }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="showErrorTips">
                <i class="fa fa-warning"></i>
                {{errorMsg}}
              </div>
            </el-form-item>


            <el-form-item :label="PriceLabel" >
              <span> {{ unitPrice }} </span>
              <span> BAS/year </span>
            </el-form-item>

            <el-form-item :label="PurchaseYearsLabel">
              <el-input-number v-model="years" name="years"
                :controls="false"
                controls-position="right"
                :min="1" :max="maxRegYears">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div class="row justify-content-center align-items-center">
            <el-form class="col-10 bas-topinfo-container"
              size="mini" label-position="right"
              >
              <el-form-item>
                <h6 slot="label" class="pt-2">{{$t('p.DomainRegistSubRootInfoTitle')}}</h6>
              </el-form-item>
              <el-form-item
                label-width="120px" :label="RootDomainLabel">
                <span>{{ showTopDomain}}</span>
                <span v-if="!topasset.owner">{{ $t('l.Unregist')}}</span>
              </el-form-item>
              <el-form-item v-if="Boolean(topasset.owner)"
                label-width="120px" :label="ExpireDateLabel">
                <span>{{ topExpireDate }}</span>
              </el-form-item>
              <el-form-item  v-if="topasset.owner !== ''"
                label-width="120px">
                <label slot="label">
                  {{$t('l.Owner')}}
                </label>
                <span>
                {{ topasset.owner }}
                </span>
              </el-form-item>
              <el-form-item v-if="topasset.owner !== ''"
                label-width="120px">
                <a slot="label"
                  class="bas-link topinfo-whois"
                  @click.prevent="gotoWhois">
                  Who is >>
                </a>
              </el-form-item>
            </el-form>
          </div>
          <div class="col-12 text-center pt-3">
            <span class="bas-text-green">{{$t('l.Total')}}:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary"
            :disabled="ctrl.loading"
            @click="commitRegist">
              {{$t('l.RegistBtn')}}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dateFormat,
  handleDomain,toUnicodeDomain
  ,diffBnFloat,
  wei2Bas
} from '@/utils'

import {
  getDomainType,
  CheckLegal,
} from '@/utils/Validator.js'


import {
 PARAM_ILLEGAL, LACK_OF_ETH,
 RPC_SERVER_ERROR,LACK_OF_TOKEN,
 ROOT_REGIST_CLOSE,
 DOMAIN_FORMAT_ILLEGAL,DOMAIN_HAS_TAKEN,
 DOMAIN_TOP_EXPIRED
} from '@/web3-lib/api-errors.js'

import {globalWebState} from '@/web3-lib'
import { findDomainInfo,hasTaken } from '@/web3-lib/apis/domain-api.js'
import {preCheck4Sub} from '@/web3-lib/apis/domains-apply.js'



import DomainProxy from '@/proxies/DomainProxy.js'


export default {
  name:"DomainRegistSub",
  computed: {
    getTotal(){
      return this.unitPrice * this.years
    },
    topExpireDate(){
      if(!this.topasset.expire) return ''
      return dateFormat(this.topasset.expire,'YYYY-MM-DD HH:mm:ss')
    },
    showErrorTips(){
      return (this.topasset.owner && !this.topasset.openApplied) || this.exist
    },
    showTopDomain(){
      try{
        return toUnicodeDomain(this.topasset.name)
      }catch(ex){
        return this.topasset.name
      }
    },
    DomainLabel(){
      return this.$t('l.Domain')
    },
    PriceLabel(){
      return this.$t('l.PriceBas')
    },
    PurchaseYearsLabel(){
      return this.$t('l.PurchaseYears')
    },
    RootDomainLabel(){
      return this.$t('p.ApplyTabRootName')
    },
    ExpireDateLabel(){
      return this.$t('p.DomainExpirationLable')
    },
    IsOwnerLabel(){
      let text = this.topasset.owner ? this.$t('l.Owner') :`${this.$t('l.RootDomain')} ${this.topText}`
      return text
    },
    ...Vuex.mapGetters({
      ruleState:'dapp/ruleState'
    }),
    ...Vuex.mapState({
      maxRegYears:state => state.dapp.maxRegYears
    })
  },
  data() {
    return {
      topText:'',
      subText:'',
      years:1,
      unitPrice:4,
      exist:false,
      topasset:{
        name:'',
        owner:''
      },
      errorMsg:'',
      ctrl:{
        loading:false
      }
    }
  },
  methods: {
    setUnitPrice(){
      const ruleState = this.$store.getters['dapp/ruleState']
      const topasset = this.topasset
      if(topasset.owner&&topasset.openApplied&&topasset.isCustomed){
        const customWei = topasset.customPrice
        this.unitPrice =  customWei ? wei2Bas(customWei) : ruleState.subBas
      }else{
        this.unitPrice = ruleState.subBas
      }
    },
    checkSubHasTaken(fullText,chainId){
      hasTaken(fullText,chainId,false).then(b=>{
        console.log('>>>>>>>>>.check>>>>',b)
        this.exist = b
        this.errorMsg = b ? this.$t('p.DomainRegistSubHasTakenTips',{domaintext:fullText}) : ''
      }).catch(ex=>{
        console.log(ex)
      })
    },
    changeLower(val){
      console.log(val)
      if(val){
        this.subText = (val+'').trim().toLowerCase()
      }
    },
    validForm(){
      let errMsg = ''
      if(this.subText == ''){
        this.$message(this.$basTip.error(this.$t('l.DomainInputTips')))
        return false;
      }
      let fullText = this.subText
      try{
        if(this.topText == '')throw 10000;
        fullText = `${this.subText}.${this.topText}`
        if(this.exist)throw 10011;
        CheckLegal(fullText)
        if(this.topasset.owner && !this.topasset.openApplied)throw 10012
        return true;
      }catch(ex){
        console.log(ex)
        switch (ex) {
          case 10000:
            errMsg = `${fullText } `+ this.$t('l.Illegal')
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10001:
            errMsg = `${fullText}` + this.$t('l.ErrorMaxLength256')
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10002:
            errMsg = `${fullText} ` + this.$t('l.ErrorHasSpecialCharacter')
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10003:
            errMsg = `${fullText} 域名超过二级`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10004:
            errMsg = `${fullText} ` + this.$t('l.ErrorHasUpperCase')
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10011:
            errMsg = `${fullText} ` + this.$t('g.DomainExist')
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10012:
            errMsg = `${fullText}` +this.$t('l.ErrorRootClosedRregist')
            this.$message(this.$basTip.error(errMsg))
            break;
          default:
            errMsg = `${fullText}` + this.$t('l.Illegal')
            this.$message(this.$basTip.error(errMsg))
            break;
          return false;
        }
      }
    },
    async commitRegist(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(this.validForm()){
        const web3State = this.$store.getters['dapp/web3State']
        let chainId = web3State.chainId;
        let wallet = web3State.wallet;
        let subText = this.subText;
        let topText = this.topText

        const preData = {
          isSubDomain:true,
          domainText:subText,
          topText,
          openApplied:false,
          isCustomed:false,
          customPriceWei:0,
          costWei:0,
          years:this.years,
          chainId,
          wallet
        }
        let subErrMsg = ''


        try{
          this.ctrl.loading = true
          const resp = await preCheck4Sub(topText,subText,this.years,chainId,wallet)
          const commitData = Object.assign({},preData,{hash:resp.hash,costWei:resp.costwei})

          console.log("Regist Sub Data",commitData)

          this.$router.push({
            name:'domain.applyresult',
            params:{
              commitData
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
      }
    },
    gotoWhois(){
      if(this.topasset.owner&& this.topasset.name){
        this.$router.push({
          path:`/domain/detail/${this.topasset.name}`
        })
      }
    }
  },
  async mounted() {
    //let ruleState = this.$store.getters['web3/ruleState']
    //this.ruleState = Object.assign({},ruleState)

    const web3State = await globalWebState()
    const params = this.$route.params
    const topText = params.topText
    this.topText = topText
    this.subText = params.subText||''
    console.log('Params',params,web3State)

    this.topasset = Object.assign(this.topasset,{name:topText});
    const chainId = web3State.chainId;

    if(topText){
      findDomainInfo(topText,chainId).then(resp=>{
        console.log('topasset',resp)
        if(resp.state){
          this.topasset = Object.assign({},resp.assetinfo);
        }
        this.setUnitPrice()
      }).catch(ex=>{
        console.log(ex)
        this.setUnitPrice()
      })

      if(this.subText && topText !== undefined){
        const fullText = `${this.subText}.${topText}`
        this.checkSubHasTaken(fullText,chainId)
      }
    }
  },
  watch: {
    subText:function(val,old){
      const topText = this.topText
      const web3State = this.$store.getters['dapp/web3State']
      console.log(">>>>>",val,topText,web3State.chainId)
      if(val !== ''&& topText !== '' && web3State.chainId){
        const fullText = `${val}.${topText}`
        this.checkSubHasTaken(fullText,web3State.chainId)
      }
    }
  },
}
</script>
<style>
.bas-topinfo-container {
  margin-left: 1.375rem;
  background: rgba(245,246,246,1);
}
.bas-topinfo-container > div.el-form-item--mini.el-form-item{
  margin-bottom: .05rem;
}
.topinfo-whois {
  font-size: 18px;
  font-weight: 400;
}
</style>
