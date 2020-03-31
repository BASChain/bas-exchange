<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card" v-loading="ctrl.loading">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            注册子域名
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10"
            label-width="160px">
            <el-form-item label="域名" >
              <el-input v-model="subText"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ `.${showTopDomain}` }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="showErrorTips">
                <i class="fa fa-warning"></i>
                {{errorMsg}}
              </div>
            </el-form-item>


            <el-form-item label="价格" >
              <span> {{ unitPrice }} </span>
              <span> BAS/year </span>
            </el-form-item>

            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                :min="1" :max="ruleState.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div class="row justify-content-center align-items-center">
            <el-form class="col-10 bas-topinfo-container"
              size="mini" label-position="right"
              >
              <el-form-item>
                <h6 slot="label" class="pt-2">其根域名信息</h6>
              </el-form-item>
              <el-form-item
                label-width="120px" label="根域名">
                <span>{{ showTopDomain}}</span>
              </el-form-item>
              <el-form-item v-if="Boolean(topasset.owner)"
                label-width="120px" label="到期日期">
                <span>{{ topExpireDate }}</span>
              </el-form-item>
              <el-form-item label-width="120px" :label="topasset.owner ? '所有者' :`根域名${topText}`">
                {{ topasset.owner ? topasset.owner : '未注册' }}
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
            <span class="bas-text-green">总计:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary"
            :disabled="ctrl.loading"
            @click="commitRegist">
              注册
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
  ,diffBnFloat
} from '@/utils'
import {
  getDomainType,
  CheckLegal,
} from '@/utils/Validator.js'
import {calcSubCost} from '@/bizlib/web3/oann-api'
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
    }
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
      ruleState:{
        subGas:4,
        maxYearReg:5,
      },
      errorMsg:'',
      ctrl:{
        loading:false
      }
    }
  },
  methods: {
    validForm(){
      let errMsg = ''
      if(this.subText == ''){
        this.$message(this.$basTip.error('请输入子域名.'))
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
            errMsg = `${fullText} 非法`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10001:
            errMsg = `${fullText} 域名超长[最大256 byte]`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10002:
            errMsg = `${fullText} 域名含有特殊字符`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10003:
            errMsg = `${fullText} 域名超过二级`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10004:
            errMsg = `${fullText} 域名含有大写字母`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10011:
            errMsg = `${fullText} 域名已被注册`
            this.$message(this.$basTip.error(errMsg))
            break;
          case 10012:
            errMsg = `${fullText} 根域名未开放注册`
            this.$message(this.$basTip.error(errMsg))
            break;
          default:
            errMsg = `${fullText} 非法`
            this.$message(this.$basTip.error(errMsg))
            break;
          return false;
        }
      }
    },
    commitRegist(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(this.validForm()){
        let dappState = this.$store.getters['web3/dappState']
        let chainId = dappState.chainId;
        let wallet = dappState.wallet;
        let decimals = this.ruleState.decimals || 18;
        let subText = this.subText;
        let topText = this.topText
        const commitData = {
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
        this.ctrl.loading = true
        calcSubCost({
          subText,
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
          this.ctrl.loading = false
          console.log('CommitTopData:',commitData)
          this.$router.push({
            name:'domain.applyresult',
            params:{
              commitData
            }
          })
        }).catch(ex=>{
          console.log('calcTopCost>>>>',ex)
          let errMSG = ''
          this.ctrl.loading = false
          switch (ex) {
            case 1002:
              this.$message(this.$basTip.error(this.$t('g.LackOfEthBalance')))
              return;
            case 1003:
              this.$message(this.$basTip.error(this.$t('g.LackOfBasBalance')))
              return;
            case 6000:
              this.$message(this.$basTip.error(this.$t('g.DomainExist')))
              return;
            case 7005:
              this.$message(this.$basTip.error(this.$t('g.DomainValidSol')))
              return;
            default:
              return;
          }
        })
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
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    const params = this.$route.params
    const topText = params.topText
    this.topText = topText
    this.subText = params.subText||''
    console.log('Params',params)

    if(topText){
      const proxy = new DomainProxy()
      proxy.getDomainInfo(handleDomain(topText)).then(resp=>{
        const ret = proxy.transData(resp)
        console.log(ret)
        if(ret.state){
          let asset = ret.asset;
          this.topasset = Object.assign({},asset)
          if(asset.openApplied && asset.isCustomed && asset.customPrice){
            let decimals = this.ruleState.decimals
            this.unitPrice = asset.customPrice / (10**decimals)
          }
          if(!asset.openApplied){
            this.errorMsg = `${topText} 未开放注册`
          }
        }else{
          this.unitPrice = this.ruleState.subGas
        }
      }).catch(ex=>{
        console.error(ex)
      })

      if(this.subText){
        let fullstr = `${this.subText}.${topText}`
        proxy.getDomainInfo(handleDomain(fullstr)).then(resp=>{
          if(resp.state&&resp.assetinfo){
            this.errorMsg = `${fullText} 域名已被注册.`
            this.exist = true;
          }else{
            this.exist = false;
          }
        }).catch(ex=>{
          this.exist = false;
        })
      }
    }
  },
  watch: {
    subText:function(val,old){
      if(val){
        if(this.topasset.owner&& !this.topasset.openApplied){
          this.errorMsg = `${this.topText} 未开放注册`
        }else{
          const proxy = new DomainProxy()
          const fullText = handleDomain(`${val}.${this.topText}`)
          proxy.getDomainInfo(handleDomain(fullText)).then(resp=>{
            if(resp.state&&resp.assetinfo){
              this.errorMsg = `${fullText} 域名已被注册.`
              this.exist = true;
            }else{
              this.exist = false;
            }
          }).catch(ex=>{
            this.exist = false;
          })
        }
      }else{
        this.exist = false;
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
