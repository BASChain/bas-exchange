<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            域名注册
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10" label-width="160px">
            <el-form-item label="域名" >
              <el-input v-model="domain"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ domainType }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="canApply">
                <i class="fa fa-warning"></i>
                此根域名暂不支持二级域名注册，根域名所有者未开放注册权限
              </div>
            </el-form-item>

            <el-form-item v-if="false" label="别名" class="w-50">
              <el-input placeholder="Please enter alias..." v-model="alias"></el-input>
            </el-form-item>

            <el-form-item label="价格" >
              <span> {{unitPrice}} </span>
              <span> BAS/year </span>
            </el-form-item>
            <el-form-item label="是否开放二级域名注册" v-show="showSubDomainInfo">
              <template>
                <el-radio v-model="openState" label="" @change="closeSubApply">否</el-radio>
                <el-radio v-model="openState" label="1"  @change="openSubApply">是</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="二级域名价格" v-show="showSubDomainInfo">

              <el-input-number v-model="subUnitPrice" name="subUnitPrice"
                :precision="2" :step="1.0"
                controls-position="right" :disabled="subUnitPriceEnable"
                :min="0" >
              </el-input-number>
              <span class="bas-domain--setprice-tip" >
                Notice: 如开启自定义价格，将额外收取{{configs.customedPriceGas}}BAS
              </span>
              <!-- <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
              </el-tooltip> -->
            </el-form-item>
            <div>

            </div>
            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                @change="handleYearsChange" :min="1" :max="maxYear">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div v-if="showTopDomainInfo"
            class="bas-regist--topdomain-container">
            <h5 class="">根域名信息</h5>
            <div class="bas-inline-flex">
              <div class="bas-label-100" >到期日期:</div>
              <span>{{topExpired}}</span>
            </div>
            <div class="bas-inline-flex">
              <div class="bas-label-100">所有者:</div>
              <span>{{topOwner}}</span>
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
          <button class="btn w-25 bas-btn-primary" @click="registing">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
a.bas-link {
  cursor: pointer;
  color: rgba(0,202,155,.9);
  font-weight: 300;
  font-size:1.25rem;
}
a.bas-link:hover {
  color: rgba(0,202,155,1);
  font-weight: 500;
}

.bas-text-warning {
  margin-top: .2rem;
  color:rgba(255,87,47,1);
  line-height:22px!important;
}
.bas-regist--domain-container {
  width: 60%;
}
.bas-regist--topdomain-container{
  margin-left: 1.375rem;
}
.bas-regist--topdomain-container >p:not(:nth-last-child(1)) {
  margin-bottom: .25rem;
  padding: .25rem 0 !important;
  line-height: 1rem !important;
}

.bas-domain--setprice-tip {
  color:rgba(255,87,47,1);
  background:rgba(255,87,47,0.1);
  border-radius:2px;
  padding: .325rem;
}
.bas-domain--setprice-tip > span {
  color:rgba(255,87,47,1);
}
</style>
<script>
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getTopDomain
 }  from '@/utils/domain-validator'

 import { queryDomainByName } from '@/bizlib/web3/domain-api.js'
 import { dateFormat,diffDays } from '@/utils'

export default {
  name:"DomainRegist",
  data(){
    return {
      domain:"",
      unitPrice:4,
      subUnitPrice:10,
      years:1,
      openState:'',
      domainType:'',
      alias:'',
      parentDomain:'',
      topOwner:'',
      topExpired:'',
      maxYear:5,
      error:'',
      configs:{
        rareGas:5000 ,
        topGas:20 ,
        subGas:4 ,
        customedPriceGas:100,
        maxYearReg:5,
      }
    }
  },
  mounted(){
    const id = this.$route.params.id
    if(id){
      this.domain = id;
      this.domainType =  getDomainType(id)
    }
    let cfg = this.$store.getters['web3/getOANNConfigs']
    this.subUnitPrice = cfg.subGas
    this.configs = Object.assign({},this.configs,cfg)

  },
  computed:{
    showSubDomainInfo(){
      const dTpye =  getDomainType(this.domain)
      return dTpye !== 'subdomain'
    },
    showTopDomainInfo(){
      return !!this.topOwner
    },
    showRootInfo(){
      return this.openState
    },
    getTotal(){
      let baseSum = this.years * this.unitPrice;
      return this.openState ? baseSum + this.configs.customedPriceGas : baseSum;
    },
    subUnitPriceEnable(){
      //console.log('>>subUnitPriceEnable>>>>>',this.openState)
      return !this.openState
    },
    canApply(){
      return this.domain ==='com' || this.domain === 'bas'
    }
  },
  methods:{
    queryDomain(text){
      if(this.$store.getters['metaMaskDisabled'] && !text) return;
      queryDomainByName(text).then(ret=>{
        if(ret.state){


        }else{

        }
      }).catch(ex=>{
        console.log(ex)
      })

      //Top
      if(isSubdomain(text)){

      }
    },
    domainChanged(text){
      console.log('>>>>',text)
      if(checkDomainIllegal(text)){
        this.domainType = 'illegal'
        return;
      }
      this.domainType = getDomainType(text)
      if(isSubdomain(text)){
        //sub
        this.unitPrice = this.configs.subGas;

        let topText = getTopDomain(text)

        console.log(this.parentDomain)
        queryDomainByName(topText).then(ret=>{
          if(ret.state){
            this.parentDomain = topText;
            this.topOwner = ret.data.owner
            this.topExpired = dateFormat(ret.data.expire*1000)
          }else{
            this.topOwner = ''
            this.topExpired = ''
            this.parentDomain = '';
          }
        }).catch(ex=>{})
      }else{
        //top
        this.unitPrice = isRareDomain(text) ? this.configs.rareGas : this.configs.topGas;
        this.parentDomain = '';

      }
    },
    setDomainType(domain){
      this.domainType = getDomainType(domain)
    },
    gotoWhois(){
      console.log(this.parentDomain)
      if(!this.parentDomain)return;
      this.$router.push({
        path:`/domain/detail/${this.parentDomain}`
      })
    },
    handleDomainUnitPrice(){

    },
    handleYearsChange(value) {

    },
    validForm(){
      if(!this.domain || this.domainType == 'illegal'){
        const error = '域名非法或为空'
        this.$message(this.$basTip.error(error))

        return false;
      }
      // if(this.getTotal != (this.years * this.unitPrice)){

      //   return false;
      // }
      return true;
    },
    openSubApply(){

    },
    closeSubApply(){
      if(!this.openState)this.subUnitPrice =10;
    },
    registing(){
      //valid form
      if(!this.validForm()){
        //console.log('>>>>flase>>on')
        return;
      }
      const commitDomain = {
        "domain":this.domain,
        "total":this.getTotal,
        "unitPrice":this.unitPrice,
        "years":this.years,
        "subUnitPrice":this.subUnitPrice,
        "domainType":this.domainType,
        "alias":this.alias
      }

      if(this.domain.endsWith('.bas') || this.domainType === 'subdomain'){
        commitDomain.registType = 'apply';
      }
      //check web3
      this.$router.push({
        name:'domain.registing',
        params:{
          commitDomain:commitDomain
        }
      })
    }
  },
  watch:{
    domain:function (val) {
      let that = this;
      setTimeout(()=>{
        that.domainChanged(val)
      },2000)

    }
  }
}
</script>

