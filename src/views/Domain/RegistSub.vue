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
              <div class="bas-text-warning" v-if="showErrorTip">
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
                :min="1" :max="configs.maxYearReg">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>

          <div
            class="bas-regist--topdomain-container">
            <h4 class="">根域名信息</h4>
            <p>到期日期:{{ topExpireDate }}</p>
            <p>
              <span>所有者:{{ topData.owner ? topData.owner : '未注册' }}</span>
              <a v-if="topData.owner !== ''" class="bas-link" @click.prevent="gotoWhois(topData.domain)">
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
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getSplitDomain
 }  from '@/utils/domain-validator'
import { findDomainByName,validExistDomain,calcSubCost } from '@/bizlib/web3/domain-api.js'
import { dateFormat,diffDays } from '@/utils'

export default {
  name:"DomainRegistSub",
  data(){
    return {
      domain:"",
      years:1,
      hasError:false,
      topData:{
        domain:'',
        owner:'',
        expire:'',
        unitPrice:4,
        openApplied:true
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

    let topDomain = this.$route.params.topDomain
    let subDomain = this.$route.params.subDomain
    console.log(`${subDomain}.${topDomain}`)
    this.topData.domain = topDomain
    if(!topDomain)return;
    this.domain = subDomain;

    let cfg = this.$store.getters['web3/getOANNConfigs']
    this.configs = Object.assign({},this.configs,cfg)

    findDomainByName(this.topData.domain).then(resp=>{
      console.log(resp)
      if(resp.state){
        this.topData.owner = resp.data.owner
        this.topData.expire = resp.data.expire;
        this.topData.unitPrice = resp.data.customedPrice;
        this.topData.openApplied = resp.data.openApplied;
        if(!resp.data.openApplied){
          this.error = '此根域名暂不支持二级域名注册，根域名所有者未开放注册权限'
        }
      }else{
        this.topData.owner = ''
        this.topData.expire = '';
        this.topData.unitPrice = 4;
        this.error = ''
      }
    }).catch(ex=>{

    })
  },
  computed:{
    getTotal(){
      return this.years * this.topData.unitPrice;
    },
    topExpireDate(){
      if(!this.topData.expire)return ''
      return dateFormat(this.topData.expire)
    },
    showErrorTip(){
      return !!(this.error)
    }
  },
  methods:{
    gotoWhois(domain){
      if(!domain)return;
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    },
    async calcCost(){

    },

    async registing(){
      let error = '域名非法或为空'
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      //valid form
      if(!this.topData.openApplied){
        error = `顶级域名 ${this.topData.domain} 未开放注册.`
        this.$message(this.$basTip.error(error))
        return;
      }
      if(!this.domain || checkDomainIllegal(this.domain) || !this.topData.domain){
        const error = '域名非法或为空'
        this.$message(this.$basTip.error(error))
        return ;
      }
      let fullDomain = `${this.domain}.${this.topData.domain}`
      let exsitResp = await validExistDomain(fullDomain)

      if(exsitResp.exist && exsitResp.owner){
        this.$message(
          this.$basTip.error(
            `${this.domain}.${this.topData.domain} 域名已存在,请选用其他域名注册!`
          ))
        //this.$alert(` ${this.domain}.${this.topData.domain} 域名已存在,请选用其他域名注册!`)
        return;
      }


      let dappState = this.$store.getters['web3/dappState']
      let year = this.years;
      calcSubCost(year,this.domain,this.topData.domain).then(ret =>{
        const commitData = {
          costWei:ret.cost,
          isSubdomain:true,
          domain:this.domain,
          year:year,
          topDomain:this.topData.domain
        }
        console.log(commitData)
        this.$router.push({
          name:'domain.newregisting',
          params:{
            commitData
          }
        })
      }).catch(ex=>{
        if(ex==9001){
          this.$alert(` ${this.domain}.${this.topData.domain} 域名已存在,请选用其他域名注册!`)
          return;
        }
      })
    }
  },
  watch:{
    domain:function (val) {
      if(checkDomainIllegal(val)){
        this.error = '域名非法'
      }else{
        this.error = ''
      }
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

