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
                <template slot="append">{{ `.${topData.domain}` }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="hasError">
                <i class="fa fa-warning"></i>
                {{error}}
              </div>
            </el-form-item>

            <el-form-item v-if="false" label="别名" class="w-50">
              <el-input placeholder="Please enter alias..." v-model="alias"></el-input>
            </el-form-item>

            <el-form-item label="价格" >
              <span> {{ topData.unitPrice }} </span>
              <span> BAS/year </span>
            </el-form-item>

            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                @change="handleYearsChange" :min="1" :max="configs.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div
            class="bas-regist--topdomain-container">
            <h4 class="">根域名信息</h4>
            <p>到期日期:{{ topExpireDate }}</p>
            <p>
              <span>所有者:{{ topData.owner }}</span>
              <a class="bas-link" @click.prevent="gotoWhois(topData.domain)">
                Who is >>
              </a>
            </p>
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

<script>
import {
  getDomainType,
  checkDomainLegal,
  isRareDomain,
  isSubdomain,
  getSplitDomain
 }  from '@/utils/domain-validator'
import { queryDomainByName } from '@/bizlib/web3/domain-api.js'
import { dateFormat,diffDays } from '@/utils'

export default {
  name:"DomainRegistSub",
  data(){
    return {
      domain:"",
      years:1,
      hasError:false,
      domainType:'subdomain',
      topData:{
        domain:'',
        owner:'',
        expire:'',
        unitPrice:4
      },
      configs:{
        rareGas:5000 ,
        topGas:20 ,
        subGas:4 ,
        customedPriceGas:100,
        maxYearReg:5,
      },
      error:''
    }
  },
  mounted(){

    let topDomain = this.$route.params.parentDomain || 'lanbery'
    if(!topDomain)return;
    let cfg = this.$store.getters['web3/getOANNConfigs']
    this.configs = Object.assign({},this.configs,cfg)

    this.topData.domain = topDomain;
    queryDomainByName(topDomain).then(ret=>{
      if(ret.state){
        this.topData.owner = ret.data.owner
        this.topData.expire = ret.data.expire;
        this.topData.unitPrice = 8;
      }else{
        this.topData.owner = ''
        this.topData.expire = '';
        this.topData.unitPrice = 4;
      }
    }).catch(ex=>{})

  },
  computed:{
    getTotal(){
      return this.years * this.topData.unitPrice;
    },
    topExpireDate(){
      if(!this.topData.expire)return ''

    }
  },
  methods:{
    setDomainType(domain){
      this.domainType = getDomainType(domain)
    },
    gotoWhois(domain){
      if(!domain)return;
      this.$router.push({
        path:`/domain/detail/${domain}`
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
      this.setDomainType(val)
    }
  }
}
</script>
<style>
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

