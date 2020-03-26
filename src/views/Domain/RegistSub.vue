<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            注册子域名
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
              <span> {{ unitPrice }} </span>
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

          <div class="row justify-content-center align-items-center">
            <el-form class="col-10 bas-topinfo-container"
              size="mini" label-position="right"
              >
              <el-form-item>
                <h6 slot="label" class="pt-2">其根域名信息</h6>
              </el-form-item>
              <el-form-item label-width="120px" label="到期日期">
                <span>{{ topExpireDate }}</span>
              </el-form-item>
              <el-form-item label-width="120px" label="所有者">
                {{ topData.owner ? topData.owner : '未注册' }}
              </el-form-item>
              <el-form-item v-if="topData.owner !== ''"
                label-width="120px">
                <a slot="label"
                  class="bas-link topinfo-whois"
                  @click.prevent="gotoWhois(topData.domain)">
                  Who is >>
                </a>
              </el-form-item>
            </el-form>
          </div>

          <!-- <div
            class="bas-regist--topdomain-container">
            <h6 class="">其根域名信息</h6>
            <p>到期日期:{{ topExpireDate }}</p>
            <p>
              <span>所有者:{{ topData.owner ? topData.owner : '未注册' }}</span>
            </p>
            <p>
              <a v-if="topData.owner !== ''" class="bas-link" @click.prevent="gotoWhois(topData.domain)">
                Who is >>
              </a>
            </p>
          </div> -->

          <div class="col-12 text-center pt-3">
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
<style >
.bas-topinfo-container {
  background: rgba(245,246,246,1);
  padding: 1rem auto;
}

.bas-topinfo-container > div.el-form-item--mini.el-form-item{
  margin-bottom: .05rem;
}
.topinfo-whois {
  font-size: 18px;
  font-weight: 400;
}

</style>
<script>
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getSplitDomain,
 }  from '@/utils/domain-validator'
import { findDomainByName,validExistDomain } from '@/bizlib/web3/domain-api.js'
import { calcSubCost } from '@/bizlib/web3/oann-api.js'
import { findDomainDetail } from '@/bizlib/web3/asset-api.js'
import { dateFormat, diffBn,diffDays,hasExpired } from '@/utils'

export default {
  name:"DomainRegistSub",
  data(){
    return {
      domain:"",
      years:1,
      hasError:false,
      unitPrice:4,
      topData:{
        domain:'',
        owner:'',
        expire:'',
        customPrice:4,
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
    this.unitPrice = cfg.subGas;

    findDomainDetail(topDomain).then(resp=>{
      console.log(resp)
      if(resp.state){
        this.topData = Object.assign({},this.topData,resp.data)
        if(resp.data.isCustomed && resp.data.customPrice){
          this.unitPrice = resp.data.customPrice/(10**18)
        }
      }else{
        //this.topData
      }
    }).catch(ex=>{
      console.log('load Top>>',ex)
    })
  },
  computed:{
    getTotal(){
      return this.years * this.unitPrice;
    },
    topExpireDate(){
      if(!this.topData.expire)return ''
      return dateFormat(this.topData.expire)
    },
    showErrorTip(){
      return !!(this.error)
    },
  },
  methods:{
    gotoWhois(domain){
      if(!domain)return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    },
    async registing(){
      let error = '域名非法或为空'
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }


      //valid form
      if(!this.topData.openApplied && !hasExpired(this.topData.expire)){
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

      if(checkDomainIllegal(fullDomain)){
        this.$message(this.$basTip.error('只支持二级域名注册.'))
      }

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
      let _subdomain = this.domain.toLowerCase().trim()
      let _topdomain = this.topData.domain.toLowerCase().trim()
      calcSubCost(year,_subdomain,_topdomain).then(ret =>{
        if(!ret.isValid){
          this.$message(this.$basTip.error('预估价格未通过'))
          return;
        }
        if(!diffBn(ret.currentBalance,ret.cost)){
          let warnMsg = this.$t('g.LackOfBasBalance')
          this.$message(this.$basTip.error(warnMsg))
          return;
        }

        const commitData = {
          costWei:ret.cost,
          isSubdomain:true,
          domain:_subdomain,
          year:year,
          topDomain:_topdomain
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
  background: rgba(245,246,246,1);
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

