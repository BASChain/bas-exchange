<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            抢注域名
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10" label-width="160px">
            <el-form-item label="域名" >
              <el-input v-model="domain" :disabled="true"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ domainType }}</template>
              </el-input>
              <div class="bas-text-warning" v-if="!topData.openApplied">
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
            <el-form-item label="是否开放二级域名注册" >
              <template>
                <el-radio v-model="openState" label="" @change="closeSubApply">否</el-radio>
                <el-radio v-model="openState" label="1"  @change="openSubApply">是</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="二级域名价格" v-show="showSubConfig">

              <el-input-number v-model="subUnitPrice" name="subUnitPrice"
                :precision="2" :step="1.0"
                controls-position="right" :disabled="!this.customedCheck"
                :min="configs.subGas" >
              </el-input-number>
              <el-checkbox v-model="customedCheck" class="bas-domain--setprice-tip">
                Notice: 如开启自定义价格，将额外收取{{configs.customedPriceGas}}BAS
              </el-checkbox>

              <!-- <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
              </el-tooltip> -->
            </el-form-item>
            <div>

            </div>
            <el-form-item label="购买期限">
              <el-input-number v-model="years" name="years"
                controls-position="right"
                :min="1" :max="configs.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div v-if="showTopDomainInfo"
            class="bas-regist--topdomain-container">
            <h5 class="">根域名信息</h5>
            <div class="bas-inline-flex">
              <div class="bas-label-100" >到期日期:</div>
              <span>{{getTopExpireDate}}</span>
            </div>
            <div class="bas-inline-flex">
              <div class="bas-label-100">所有者:</div>
              <span>{{this.topData.owner}}</span>
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
</style>
<script>
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getTopDomain,
  getSplitDomain,
 }  from '@/utils/domain-validator'

import {
  findDomainByName,
  validExistDomain,
  calcSubCost,
  calcTopCost,
} from '@/bizlib/web3/domain-api.js'

import { dateFormat,diffDays,diffBn,hasExpired } from '@/utils'

export default {
  name:"TopCybersquatting",
  data(){
    return {
      domain:"",
      unitPrice:20,
      years:1,
      openState:"1",
      domainType:'',
      subUnitPrice:4,
      customedCheck:false,
      commitTop:{
        openApplied:false,
        isCustomed:false,
        customedPrice:4
      },
      topData:{
        domain:'',
        owner:'',
        expire:'',
        openApplied:true,
        isCustomed:false,
        customedPrice:4
      },
      error:'',
      configs:{
        decimals:18,
        rareGas:5000 ,
        topGas:20 ,
        subGas:4 ,
        customedPriceGas:100,
        maxYearReg:5,
      }
    }
  },
  mounted(){
    const domain = this.$route.params.domain
    this.domain = domain||''
    this.domainType =  getDomainType(domain)

    let cfg = this.$store.getters['web3/getOANNConfigs']
    this.subUnitPrice = cfg.subGas
    this.configs = Object.assign({},this.configs,cfg)

  },
  computed:{
    showSubConfig(){
      const dTpye =  getDomainType(this.domain)
      return dTpye !== 'subdomain' && Boolean(this.openState)
    },
    showTopDomainInfo(){
      return !!this.topData.owner
    },
    showRootInfo(){
      return this.openState
    },
    getTotal(){
      let baseSum = this.years * this.unitPrice;
      return this.customedCheck ? baseSum + this.configs.customedPriceGas : baseSum;
    },
    subUnitPriceEnable(){
      return !this.openState
    },
    getTopExpireDate(){
      if(!this.topData.expire)return ''
      return dateFormat(this.topData.expire)
    },
  },
  methods:{
    topExist(){
      return this.topData.owner && this.topData.expire
    },
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
    resetTopData(defaultPrice){
        this.topData.owner=''
        this.topData.expire=''
        this.topData.openApplied=true,
        this.topData.isCustomed=false,
        this.topData.customedPrice=defaultPrice ||this.configs.subGas
    },
    setSubUnitPrice(price){
      this.subUnitPrice = price;
    },
    domainChanged(text){
      //console.log('>>>>',text)
      if(checkDomainIllegal(text)){
        this.domainType = 'illegal'
        return;
      }
      this.domainType = getDomainType(text)
      if(isSubdomain(text)){
        //sub
        this.unitPrice = this.configs.subGas;

        let topText = getTopDomain(text)
        this.topData.domain = topText;
        let openAsync = true
        if(openAsync && topText){
          findDomainByName(topText).then(resp=>{
            if(resp.state){
              this.topData.expire = resp.data.expire
              this.topData.owner = resp.data.owner
              this.topData.openApplied = resp.data.openApplied;
              this.topData.isCustomed = resp.data.isCustomed
              this.topData.customedPrice = resp.data.customedPrice

              if(resp.data.openApplied && resp.data.isCustomed && resp.data.customedPrice){
                this.unitPrice = resp.data.customedPrice
              }
            }else{
              this.resetTopData()
            }
          }).catch(ex=>{
            this.resetTopData()
          })
        }
      }else{
        //top
        this.unitPrice = isRareDomain(text) ? this.configs.rareGas : this.configs.topGas;
        this.resetTopData()
      }
    },
    setDomainType(domain){
      this.domainType = getDomainType(domain)
    },
    gotoWhois(){
      if(!this.topData.domain)return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        path:`/domain/detail/${this.topData.domain}`
      })
    },
    openSubApply(){
      if(!this.openState)this.subUnitPrice =this.topData.customedPrice
    },
    closeSubApply(){
      if(!this.openState)this.subUnitPrice =this.configs.subGas;
    },

    // the Regist all enter
    async registing(){
      let errMsg = ''

      let dType = getDomainType(this.domain)
      if(dType == 'illegal'){
        errMsg = this.domain +" "+ this.$t('g.illegal')
        this.$message(this.$basTip.error(errMsg))
        return;
      }

      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      let dappState = this.$store.getters['web3/dappState']

      //exist check
      let exsitResp = await validExistDomain(this.domain)
      console.log(exsitResp)
      let now = (new Date().getTime())/1000
      if(exsitResp.exist && exsitResp.owner && !hasExpired(exsitResp.expire)){
        this.$message(
          this.$basTip.error(
            `${this.domain}域名已存在,请选用其他域名注册!`
          ))
        return;
      }

      if(dType === 'subdomain'){
        let domainStruct = getSplitDomain(this.domain)
        let params = {
          fullDomain:this.domain,
          domain:domainStruct.domain,
          topDomain:domainStruct.top,
          year:this.years
        }
        this.registSub(params,dappState.basBal,18)
      }else{
        let decimals = this.configs.decimals||18;
        let customPriceWei = this.subUnitPrice * (10**decimals)
        let domain = this.domain
        let openApplied = Boolean(this.openState)
        let isCustomed = !!this.customedCheck
        let year = this.years;
        let wallet = dappState.wallet;

        this.registTop(
          domain,openApplied,isCustomed,
          customPriceWei,year,wallet,decimals
        )
        //this.$alter('Come Soon...')
      }
    },
    registTop(
      domain,openApplied,isCustomed,
      customPriceWei,year,wallet,decimals){

      calcTopCost(domain,isCustomed,year,wallet).then(resp=>{
        if(!resp.isValid){
          this.$message(this.$basTip.warn('预估校验未通过'))
          return;
        }
        console.log(resp)
        let basBalance = resp.basBalance
        if(!diffBn( resp.basBalance , resp.cost, decimals )){
          let warnMsg = this.$t('g.LackOfBasBalance')
          this.$message(this.$basTip.warn(warnMsg))
          return;
        }
        let commitData = {
          isSubdomain:false,
          costWei:resp.cost,
          domain,
          openApplied,
          isCustomed,
          customPriceWei,
          year
        }
        console.log('CommitData>>',commitData)
        this.$router.push({
          name:'domain.cybersquattingres',
          params:{
            commitData
          }
        })
      }).catch(ex=>{
        console.log('>>',ex)
      })
    },
    registSub({
      fullDomain,
      domain,
      topDomain,
      year},basBal,decimals){

      let basBalance = this.$store.state.web3.basBal;
      calcSubCost(year,domain,topDomain).then(ret =>{
        let cost = ret.cost;
        if( !diffBn (basBal,cost,decimals)){
          let warnMsg = this.$t('g.LackOfBasBalance')
          this.$message(this.$basTip.warn(warnMsg))
          return;
        }
        let commitData = {
          isSubdomain:true,
          costWei:ret.cost,
          domain,
          topDomain,
          year
        }
        //check balance >= cost

        this.$router.push({
          name:'domain.newregisting',
          params:{
            commitData
          }
        })
      }).catch(ex=>{
        console.log(ex)
      })
    }
  },
  watch:{
    domain:function (val) {
      let that = this;
      setTimeout(()=>{
        that.domainChanged(val)
      },1000)
    },

  }
}
</script>

