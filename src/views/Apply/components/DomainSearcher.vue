<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-9 bas-tabs-wrapper">
        <ul class="bas-tabs">
          <li class="bas-tab"  :class="subActived ? 'active' : ''">
            <label for="tabSubDomain"
              @click="tabClick('sub')"
            >
              二级域名
            </label>

          </li>
          <li class="bas-tab" :class="subActived ? '' : 'active'">
            <label for="tabTopdoamin"
              @click="tabClick('top')"
              >
              顶级域名
            </label>

          </li>
        </ul>
        <div class="input-wrapper">
          <div id="basTabContentSub"
            v-show="subActived"
            class="bas-content">
            <el-input v-model="subSearchText"
              type="text"
              @input="changSubLowerCase"
              placeholder="请输入子域名字符串"
              class="domain--searcher">
              <el-select v-model="topSelectText" slot="suffix"
                class="domain-sub--searcher-select"
                placeholder="请选择">
                <el-option v-for="(it,idx) in topDomains"
                  :key="idx"
                  :label="it.text" :value="it.name"/>

              </el-select>
              <button slot="append"
                @click.prevent="searchSub" class="bas-append-serachbtn">
                Search
              </button>
            </el-input>
          </div>
          <div v-show="!subActived"
            id="basTabContentTop" class="bas-content">
            <el-input v-model="topSearchText"
              placeholder="请输入域名字符串"
               @input="changTopLowerCase"
              class="domain--searcher">
              <div slot="suffix" class="domain--searcher-suffix">
                <span>{{topType}}</span>
              </div>
              <button slot="append"
                @click.prevent="searchTop">
                Search
              </button>
            </el-input>
          </div>
        </div>
      </div>

    </div>
    <div v-if="ctrl.searchState"
      class="row justify-content-center align-items-center">
      <div class="col-md-9 px-0 mt-2">
        <div class="domain--result-card">
          <div class="result-header">
            <div>
              <span
                @click="whois"
                class="bas-text-green"
                :class="hasRegisted ? 'bas-link' : ''">
                {{fullTextResult}}
              </span>
              <span>
                {{hasRegisted ? '已被注册' : '未注册'}}
              </span>
            </div>
            <button v-if="!hasRegisted" type="button"
              @click="gotoRegist"
              class="btn btn-sm bas-btn-primary">
              去注册
            </button>
          </div>
          <div v-if="ctrl.registState" class="result-body">
            <div class="bas-inline-flex">
              <label class="result-info-label">
                所有者
              </label>
              <span class="bas-info-text">
                {{asset.owner}}
              </span>
            </div>
            <div class="bas-inline-flex">
              <label class="result-info-label">
                到期日期
              </label>
              <span class="bas-info-text">
                {{formatExpireDate}}
              </span>
              <span v-if="domainHasExpired"
                class="text-warning">
                已过期
              </span>
              <button
                v-if="showCybersquttingBtn"
                type="button"
                @click="gotoCybersquetting"
                class="btn bas-btn-xs bas-btn-primary">
                去抢注
              </button>
            </div>
            <div v-if="topTabActived"
              class="bas-inline-flex">
              <label class="result-info-label">
                是否开放二级域名注册
              </label>
              <span class="bas-info-text">
                {{asset.openApplied ? $t('g.Y') : $t('g.N')}}
              </span>
              <button type="button" @click="gotoRegistSub"
                v-if="asset.openApplied"
                class="btn bas-btn-xs bas-btn-primary">
                注册二级域名
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css">
/** Tas */
.bas-tabs-wrapper {
  padding: 0;
}

.bas-tabs-wrapper ul{
  padding-inline-start: 15px;
}
.bas-tabs{
  display: block;
  position: relative;
  margin: 0 auto;
}

.bas-tabs .bas-tab {
  float: left;
  display: block;
}

.bas-tabs>.bas-tab>label {
  display: block;
  margin: 0;
  padding-left: .4rem;
  font-size:18px;
  position: relative;
  cursor: pointer;
  color: #04062E;
  width:130px;
  line-height: 42px;
  background: url('./bas_tab.png') no-repeat;
  background-size: 100% 100%;
}

.bas-tabs>.bas-tab:first-child>label {
  margin-left:-15px;
}

.bas-tabs>.bas-tab.active>label{
  color:rgba(0,202,155,1);
  background: url('./bas_tab_active.png');
}

.bas-tabs>.bas-tab.active>label::after {
  box-sizing: unset;
  -webkit-box-sizing: unset;
  border-right: none;
}


.bas-tab .bas-content {
  z-index: 0;
  position: absolute;
  width: 100%;
  top: 41px;
  left: 0;
  opacity:0;
  border: 1px solid rgba(245,246,246,1);
  transition: opacity 400ms ease-out;
}

.bas-tab.active> .bas-content {
  z-index: 1;/* or display: block; */
  opacity: 1;
  transition: opacity 400ms ease-out;
}

.bat-tabs>.bas-tab>[id^="tab"]:checked + label {
  color:rgba(0,202,155,1);
  background: url('./bas_tab_active.png');
}

button.bas-append-serachbtn {
  width: 100%;
  height: 100%;
}
</style>
<script>
import {
  hasExpired,dateFormat,
  handleDomain,
} from '@/utils'
import {
  getDomainType,isSub,
  CheckSearchLegal,getDomainTopType
} from '@/utils/Validator.js'

import {checkFetchDappState} from '@/bizlib/web3'
import DomainProxy from '@/proxies/DomainProxy.js'
import { handleTopDomainList } from './search-utils'

export default {
  name:"DomainSearcher",
  computed: {
    subActived(){
      return this.ctrl.tabActived === 'sub'
    },
    topType(){
      if(!this.topSearchText )return ''
      let type = getDomainTopType(this.topSearchText)
      return this.$t(`g.${type}`)
    },
    fullTextResult(){
      return this.ctrl.tabActived === 'sub' ?
        `${this.subSearchText}.${this.topSelectText}` : this.topSearchText
    },
    hasRegisted(){
      return this.ctrl.registState
    },
    domainHasExpired(){
      return hasExpired(this.asset.expire)
    },
    formatExpireDate(){
      return dateFormat(this.asset.expire,'YYYY-MM-DD HH:mm:ss')
    },
    topTabActived(){
      return this.ctrl.tabActived !== 'sub'
    },
    showCybersquttingBtn(){
      if(!this.asset.name)return false;
      //return true;
      console.log('>>>',this.asset.name)
      if(isSub(this.asset.name)){
        if(!hasExpired(this.asset.expire)){
          return false
        }
        if(this.topAsset.name){
          if(!this.topAsset.openApplied){
             return false
          }
          return hasExpired(this.asset.expire)
        }else{
          return hasExpired(this.asset.expire)
        }
      }else {
        return hasExpired(this.asset.expire)
      }
    },
    showRegistState(){
      if(this.ctrl.registState === 'using'){
        return "已注册"
      }else if(this.ctrl.registState === 'expired'){
         return '已过期'
      }else if(this.ctrl.registState === 'unused'){
         return '未注册'
      }else {
        return ''
      }
    },
  },
  data() {
    return {
      subSearchText:'',
      topSelectText:'',
      topSearchText:'',
      topDomains:[],
      top:{
        total:0,
        pagenumber:1,
        pagesize:50,
      },
      ctrl:{
        tabActived:'sub',
        registState:false,
        searchState:false
      },
      asset:{
        name:'',
        owner:'',
        expire:'',
        isRoot:false,
        domainhash:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4,
      },
      topAsset:{
        name:'',
        owner:'',
        expire:'',
        isRoot:false,
        domainhash:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4,
      },
      ruleState:{
        decimals:18,
        rareGas:500,
        topGas:20,
        subGas:4,
        externalBAS:100,
        maxYearReg:5,
        aliasLen: 256,
        extensionLen:512
      },
      suggests:[

      ]
    }
  },
  methods: {
    resetSearchData(){
      const asset= {
        name:'',
        owner:'',
        expire:'',
        isRoot:false,
        domainhash:'',
        openApplied:false,
        isCustomed:false,
        customPrice:4,
      }
      this.asset = Object.assign({},asset)
      this.topAsset = Object.assign({},asset)
    },
    tabClick(tag){
      this.ctrl.tabActived = tag
      this.ctrl.searchState = false;
    },
    validPopTips(text,isSub){
      let msg = ''
      if(!text){
        msg = '请输入要查询的域名'
        this.$message(this.$basTip.error(msg))
        return false;
      }
      try{
        CheckSearchLegal(text,isSub)
        return true;
      }catch(ex){
        msg = this.$t(`code.${ex}`)
        this.$message(this.$basTip.error(msg))
        return false;
      }
    },
    searchSub(){
      if(!this.subSearchText){
        this.$message(this.$basTip.error('请输入要查询的域名'))
        return
      }
      if(this.validPopTips(this.subSearchText,true)){
        let fullText = `${this.subSearchText}.${this.topSelectText}`

        let apiProxy = new DomainProxy()
        apiProxy.getDomainInfo(handleDomain(fullText)).then(resp=>{
          if(resp.state){
            const ret = apiProxy.transData(resp)
            console.log(ret)
            this.asset = Object.assign({},ret.asset)
            if(ret.asset.parent){
              this.topAsset = Object.assign({},ret.asset.parent)
            }
            this.ctrl.registState = true

          }else{
            this.resetSearchData()
            this.ctrl.registState = false
          }
          this.ctrl.searchState = true
        }).catch(ex=>{
          console.log(ex)
          this.$message(this.$basTip.error('查询服务出错'))
        })

      }
    },
    searchTop(){
      if(this.validPopTips(this.topSearchText,false)){
        let apiProxy = new DomainProxy()
        let handleText = handleDomain(this.topSearchText)
        apiProxy.getDomainInfo(handleText).then(resp=>{
          const ret = apiProxy.transData(resp)
          if(ret.state){
            this.asset = Object.assign({},ret.asset)
            this.ctrl.registState = true
          }else{
            this.resetSearchData()
            this.ctrl.registState = false
          }

          this.ctrl.searchState = true
        }).catch(ex=>{
          console.log(ex)
          this.$message(this.$basTip.error('查询服务出错'))
        })

      }
    },
    gotoCybersquetting(){
      console.log('gotoCybersquetting>>>>>')
      try{
        checkFetchDappState()
      }catch(ex){
        if(ex===1001){
          this.$metamask()
        }else if(ex === 3001){
          this.$message(this.$basTip.error('当前网络不支持'))
        }
        return;
      }
      let text = ''

      if(this.ctrl.tabActived === 'sub'){
        let topText = this.topSelectText
        text = this.subSearchText
        let topExpire = hasExpired(this.topAsset.expire)
        console.log('',this.topAsset.openApplied,topExpire)
        if(!text ||!topText)return;
        this.$router.push({
          name:"domain.subcybersquatting",
          params:{
            subDomain:text,
            topDomain:topText
          }
        })
      }else{
        text = this.topSearchText
        if(!text)return;
        const domain = handleDomain(text)
        this.$router.push({
          name:"domain.topcybersquatting",
          params:{
            domain
          }
        })
      }
    },
    gotoRegist(){
      let text = ''
      try{
        checkFetchDappState()
      }catch(ex){
        console.log(ex)
        if(ex===1001){
          this.$metamask()
        }else if(ex === 3001){
          this.$message(this.$basTip.error('当前网络不支持'))
        }
        return;
      }

      if(this.ctrl.tabActived === 'sub'){
        text = `${this.subSearchText}`
        if(!this.subSearchText || !this.topSelectText){
          return;
        }
        this.$router.push({
          path:`/domain/applysub/${this.topSelectText}/${text}`,
        })
      }else{
        text = this.topSearchText
        if(!text)return;
        this.$router.push({
          name:"domain.applydomain",
          params:{
            domainText:text
          }
        })
      }

    },
    gotoRegistSub(){
      let topText = this.asset.name
      if(topText && this.asset.openApplied){
        this.$router.push({
          path:`/domain/applysub/${topText}`,
        })
      }
    },
    whois(){
      if(this.hasRegisted && this.asset.name){
        this.$router.push({
          path:`/domain/detail/${this.asset.name}`
        })
      }
    },
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign(this.ruleState,ruleState)

    const proxy = new DomainProxy()
    const params = {
      pagenumber:this.top.pagenumber || 1,
      pagesize:this.top.pagesize||50
    }
    proxy.getTopDomainList(params).then(resp=>{
      if(resp.state){
        let domains = handleTopDomainList(resp.domains)
        this.top.total = resp.totalcnt
        this.top.pagenumber = resp.pagenumber
        this.top.pagesize = resp.pagesize
        this.topDomains = Object.assign(domains)
        this.topSelectText = domains[0].name
      }else{
        this.top.total = 0
        this.top.domains = Object.assign([])
      }
    }).catch(ex=>{
      console.log(ex)
    })

  },
  watch: {
    subSearchText(val,old){
      if(val===''){
        this.ctrl.searchState = false;
      }
      this.subSearchText = (val+'').trim().toLowerCase()
      if(val !== old ){
        this.ctrl.searchState = false;
      }
    },
    topSelectText(val,old){
      if(val===''){
        this.ctrl.searchState = false;
      }
      if(val !== old ){
        this.ctrl.searchState = false;
      }
    },
    topSearchText(val,old){
      if(val===''){
        this.ctrl.searchState = false;
      }
      this.topSearchText = (val+'').trim().toLowerCase()
      if(val !== old ){
        this.ctrl.searchState = false;
      }
    }
  },
}
</script>

<style>
.bas-btn-xs {
  padding: 0 .5rem;
  font-size: 12px;
  font-weight: 300;
}

.domain--result-card{
  width: 100%;
  display: block;
  direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  border: 1px solid rgba(235,237,237,1);
}
.domain--result-card span {
  margin-left: .25rem;
}

.domain--result-card .result-header {
  width: 100%;
  margin: .25rem .2rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.domain--result-card .result-header button {
  margin:.2rem;
  margin-right: .5rem;
}

.domain--result-card .result-body{
  width: 100%;
  margin: 0 .2rem;
  margin-bottom: .75rem;
}

.result-body .bas-inline-flex >label,.result-body .bas-inline-flex >span {
  font-size:14px;
  line-height: 28px;
  margin: 0 .25rem;
}

.result-body .result-info-label {
  margin-left: 0.75rem;
  margin-right: .5rem;
  font-size:.95rem;
}

.result-info-label:after {
  content: ':';
}

.result-body button {
  margin: .25rem 1.25rem;
  line-height: 22px;
}



/** Search Css */
.domain--searcher input {
  height:58px;
  font-size: 1.05rem;
  background:rgba(245,246,246,1);
}

.domain--searcher input:focus,.domain--searcher.el-inpu:focus{
  border: 1px solid rgba(225,229,229,0.75)
}

.domain--searcher .el-input-group__append {
  height: 100%;
  min-width: 200px;
  padding:  0px !important;
  border-radius: 0 4px 4px 0;
  border: 1px solid rgba(0,202,155,1);
  border-left: none;
  background: rgba(0,202,155,1);
}

.domain--searcher button {
  width: 100%;
  line-height: 54px;
  background: transparent;
  font-size:1.25rem;
  color:#fff;
  border: none;
  box-shadow: none;
}

.domain-sub--searcher-select {
  width: 160px;
  color:#04062E;
  border-left: none;
}

.domain--searcher .el-input__suffix {
  right: 0px;
  border: 0;
}

.domain--searcher .el-input__suffix input {
  text-align: end;
}

.domain--searcher-suffix {
  height: 100%;
}

.domain--searcher-suffix span{
  line-height: 58px;
  width:160px;
  color:rgba(135,136,155,1);
  font-size:18px;
  text-align: right;
  padding-right: .25rem;
}

</style>

