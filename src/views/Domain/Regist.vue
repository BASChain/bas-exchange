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
                placeholder="please enter a domain...">
                <template slot="append">{{ getDomainType }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="canApply">
                <i class="fa fa-warning"></i>
                此根域名暂不支持二级域名注册，根域名所有者未开放注册权限
              </div>
            </el-form-item>

            <el-form-item label="价格" >
              <span> {{unitPrice}} </span>
              <span> BAS/year </span>
            </el-form-item>
            <el-form-item label="是否开放二级域名注册">
              <template>
                <el-radio v-model="openState" label="" @change="closeSubApply">否</el-radio>
                <el-radio v-model="openState" label="1"  @change="openSubApply">是</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="二级域名价格">

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

          <div class="col-12 text-center">
            <span class="bas-text-green">总计:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-primary-btn ">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.bas-text-warning {
  margin-top: .2rem;
  color:rgba(255,87,47,1);
  line-height:22px!important;
}
.bas-regist--domain-container {
  width: 60%;
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
  isTopDomain,
  isSubdomain,
 }  from '@/utils/domain-validator'

export default {
  name:"DomainRegist",
  data(){
    return {
      domain:"",
      unitPrice:50,
      subUnitPrice:10,
      years:1,
      openState:'',
      domainType:'',
    }
  },
  mounted(){
    const id = this.$route.params.id
    console.log(id)
    this.domain = id;
  },
  computed:{
    getDomainType(){
      return getDomainType(this.domain)
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
    handleDomainUnitPrice(){

    },
    handleYearsChange(value) {

    },
    validForm(){

    },
    openSubApply(){

    },
    closeSubApply(){
      if(!this.openState)this.subUnitPrice =10;
    }
  },
  watch:{
    openState:(val) => {
      //console.log('>>>>>>>>>Watch>>>>>>',val,"---", Boolean(val))
    }
  }
}
</script>

