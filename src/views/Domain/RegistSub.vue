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
                <template slot="append">{{ top }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="canApply">
                <i class="fa fa-warning"></i>
                此根域名暂不支持二级域名注册，根域名所有者未开放注册权限
              </div>
            </el-form-item>

            <el-form-item label="别名" class="w-50">
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
                Notice: 如开启自定义价格，将额外收取100BAS
              </span>
              <!-- <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
              </el-tooltip> -->
            </el-form-item>
            <div>

            </div>
            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                @change="handleYearsChange" :min="1" :max="10">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div v-show="showSubDomainInfo"
            class="bas-regist--topdomain-container">
            <h4 class="">根域名信息</h4>
            <p>到期日期:{{topExpired}}</p>
            <p>
              <span>所有者:{{topOwner}}</span>
              <a class="bas-link" @click.prevent="gotoWhois(domain)">
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
  checkDomainLegal,
  isRareDomain,
  isSubdomain,
  getSplitDomain
 }  from '@/utils/domain-validator'

export default {
  name:"DomainRegistSub",
  data(){
    return {
      top:"",
      domain:"",
      subUnitPrice:10,
      years:1,
      openState:'',
      domainType:'',
      alias:'',
      topOwner:'0x08970FEd061E7747CD9a38d680A601510CB659FB',
      topExpired:'2025-01-23',
      error:''
    }
  },
  mounted(){
    const id = this.$route.params.id
    const domainObj = getSplitDomain(id)
    if(id){
      this.top = domainObj.top;
      this.domain = domainObj.domain;
      this.domainType =  getDomainType(id)
    }
  },
  computed:{
    unitPrice(){
      const dTpye =  getDomainType(this.domain)
      if(dTpye === 'subdomain'){
        //remote get
        return 40;
      }else if(dTpye === 'raredomain'){
        return 10000;
      }
      else if(dTpye === 'topdomain'){
        return 50;
      }else {
        return 50;
      }
    },
    showSubDomainInfo(){
      const dTpye =  getDomainType(this.domain)
      return dTpye !== 'subdomain'
    },
    showRootInfo(){
      return this.openState
    },
    getTotal(){
      return this.years * this.unitPrice;
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

