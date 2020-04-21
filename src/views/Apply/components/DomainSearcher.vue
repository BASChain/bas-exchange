<template>
  <div class="container mb-4">
    <div class="row justify-content-center align-items-center mb-1">
      <div class="col-9 bas-tabs-wrapper">
        <ul class="bas-tabs">
          <li class="bas-tab"  :class="subActived ? 'active' : ''">
            <label for="tabSubDomain" class="sub-domain"
              @click="tabClick('sub')"
            >
              {{$t('l.SecondDomain')}}
            </label>

          </li>
          <li class="bas-tab" :class="subActived ? '' : 'active'">
            <label for="tabTopdoamin" class="top-domain"
              @click="tabClick('top')" >
              {{ $t('p.ApplyTabRootName') }}
            </label>

          </li>
        </ul>
        <div class="input-wrapper">
          <div id="basTabContentSub"
            v-show="subActived"
            class="bas-content">
            <el-input v-model="subSearchText"
              type="text"
              @keyup.enter.native="searchSub"
              :placeholder="searcherPlaceHolder"
              class="domain--searcher">
              <!-- <el-select v-model="topSelectText" slot="suffix"
                class="domain-sub--searcher-select"
                placeholder="请选择">
                <el-option v-for="(it,idx) in topDomains"
                  :key="idx"
                  :label="it.text" :value="it.name"/>

              </el-select> -->
              <div slot="suffix"
               class="domain-sub--suffix-wrapper">
                <div class="toptext-show">
                  <span>{{`.${topSelectText}`}}</span>
                </div>
                <div
                  @click="togglePopTopSelect"
                  class="top-toggle-icon">
                  <i class="fa" :class="topArrowClass"></i>
                </div>
              </div>
              <button slot="append"
                @click.prevent="searchSub" class="bas-append-serachbtn">
                Search
              </button>
            </el-input>
          </div>
          <div v-show="!subActived"
            id="basTabContentTop" class="bas-content">
            <el-input v-model="topSearchText"
              :placeholder="searcherPlaceHolder"
              @keyup.enter.native="searchTop"
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

          <div v-show="domainSubPoperVisible"
            class="domain-sub--poper">
            <div v-loading="submodel.loading"
              class="row row-container">
              <div v-for="(item,idx) in topDomains" class="bas-col-20 text-center"
                @click="selectTopText(item.name)"
                :key="idx">
                <span class="domaintext">{{`.${item.name}`}}</span>
              </div>
              <div v-if="topDomains.length == 0"
                class="no-result w-100">
                <span>
                  {{$t('p.DomainSearchNoResultTip')}}
                </span>
              </div>
            </div>
            <div class="domain-sub--footbar">
              <el-input size="mini"
                v-model="submodel.filterkey"
                :placeholder="filterPlaceHolder"
                @keyup.enter.native="filterTopDomain"
                class="sub-filter-input">
                <div @click="filterTopDomain"
                  slot="suffix">
                <i class="fa fa-search"></i>
                </div>
              </el-input>
              <el-button
                :disabled="loadMoreTopDisabled"
                @click="loadMoreTopDomains"
                type="default" size="mini">
                {{$t('l.More')}}
              </el-button>
              <el-button
                @click="closeDomainSubPoper"
                type="default" size="mini">
                {{$t('l.ChevronUp')}}
              </el-button>
            </div>
          </div>

      </div>

    </div>
    <div v-if="ctrl.searchState"
      class="row justify-content-center align-items-center">
      <div class="col-md-9 px-0 mt-2 mb-4">
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
                {{hasRegisted ? $t('l.HasBeenRegisted') : $t('l.Unregist')}}
              </span>
              <span v-if="hasRegisted">
                <el-button @click="whois"
                  size="mini" class="bas-btn-grass">
                  Who is
                </el-button>
              </span>
            </div>
            <button v-if="!hasRegisted" type="button"
              @click="gotoRegist"
              class="btn btn-sm bas-btn-primary">
              {{$t('l.gotoRegistBtn')}}
            </button>
          </div>
          <div v-if="ctrl.registState" class="result-body">
            <div class="bas-inline-flex">
              <label class="result-info-label">
                {{$t('l.Owner')}}
              </label>
              <span class="bas-info-text">
                {{asset.owner}}
              </span>
            </div>
            <div class="bas-inline-flex">
              <label class="result-info-label">
                {{$t('l.ExpiredDate')}}
              </label>
              <span class="bas-info-text">
                {{formatExpireDate}}
              </span>
              <span v-if="domainHasExpired"
                class="text-warning">
                {{$t('l.ExpireLabel')}}
              </span>
              <button
                v-if="showCybersquttingBtn"
                type="button"
                @click="gotoCybersquetting"
                class="btn bas-btn-xs bas-btn-primary">
                {{$t('l.GotoCybersquatting')}}
              </button>
            </div>
            <div v-if="topTabActived"
              class="bas-inline-flex">
              <label class="result-info-label">
                {{$t('l.HasOpenAppliedSubRegistLabel')}}
              </label>
              <span class="bas-info-text">
                {{asset.openApplied ? $t('g.Y') : $t('g.N')}}
              </span>
              <button type="button" @click="gotoRegistSub"
                v-if="asset.openApplied"
                class="btn bas-btn-xs bas-btn-primary">
                {{$t('l.RegistSubDomain')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center align-items-center">
      <div v-show="showSuggestList"
        class="col-md-9 pt-4">
        <div class="row justify-content-md-between align-items-center">
          <div v-for="(item,idx) in suggests"
            class="col-6 domain-sugguest-wrapper"
             :class="(idx+1)%2==1 ? 'right-m' : 'left-m'"
            :key="idx">
            <div class="sugguest-tag-box">
              <span>{{$t('l.Recommend')}}</span>
            </div>
            <div class="domain-sugguest-box"
             >
              <div class="sugguest-inner">
                <div class="flex">
                  <span class="domain">
                    {{item.domaintext}}
                  </span>
                  <span class="bas-number-per-year">
                    {{item.customPrice}}
                  </span>
                </div>
                <div class="flex">
                  <a @click="gotoRegistSuggestSub(item.toptext,item.subtext)"
                    class="btn btn-sm bas-btn-primary">
                    {{$t('l.gotoRegistBtn')}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css">
.domain-sub--footbar {
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top:1px solid rgba(235,237,237,1);
}

.domain-sub--footbar button.el-button {
  margin-right: .25rem;
  margin-left: .25rem;
}

.sub-filter-input {
  width: 40%;
  line-height: 32px;
  margin: .25rem 0;
}

.sub-filter-input div {
  cursor: pointer;
  height: 100%;
  align-items: center;
}

.sub-filter-input div>i{
  font-size:16px;
  font-weight: 500;
}

.domain-sub--suffix-wrapper {
  position: relative;
  width: 160px;
  height: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
}



.domain-sub--poper {
  position: absolute;
  width: 65%;
  top:104px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: #fff;
  border-collapse:collapse;
  color:rgba(4,6,46,1);
  box-shadow: 0 1px 14px 0 rgba(0,0,0,.1);
  box-sizing: border-box;
  transition:ease-in-out .3s;
}

.row-container {
  margin: 0;
  max-height: 202px;
  overflow-x: hidden;
  overflow-y: auto;
}

.domain-sub--poper div.bas-col-20 {
  cursor: pointer;
  width: 20%;
  margin-right:-1px;
  margin-bottom:-1px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(235,237,237,1);
}

.bas-col-20 > span {
  line-height: 48px;
}

.domain-sub--poper div.bas-col-20:focus, .domain-sub--poper div.bas-col-20:hover{
  background-color: #f5f7fa;
}

.domain-sub--suffix-wrapper .toptext-show {
  display: inline;
  padding: auto .5rem;
  align-items: center;
}

.toptext-show span {
  margin-right:.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color:rgba(4,6,46,1);
}

.top-toggle-icon {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
}

.top-toggle-icon > i {
  font-size: 18px;
  transition: transform .3s;
  transform:rote(180deg)
}

.domain-sugguest-wrapper {
  position: relative;
  width: 100%;
  margin: 12px 0px;
  padding: 0;
}

.sugguest-tag-box{
  position: absolute;
  float: left;
  background:rgba(255,87,47,1);
  border-radius:1px;
  padding: 0 .25rem;
}

.sugguest-tag-box span {
  font-size:12px;
  font-weight: 200;
  color: rgba(235,237,237,1);
}

.left-m > div.sugguest-tag-box {
  top:-10px;
  left: 12px;
}

.right-m > div.sugguest-tag-box {
  top:-10px;
  left: 0px;
}

.domain-sugguest-box {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
}

div.left-m {
  padding-left: 12px;
}
div.right-m {
  padding-right: 12px;
}

.sugguest-inner {
  width: 100%;
  height: 62px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.sugguest-inner div {
  margin: auto .5rem;
}

.sugguest-inner span.domain {
  color: rgba(0, 202, 155, 1);
  font-size: 18px;
  margin-right: 1rem;
}

.sugguest-inner span.bas-number-per-year::after {
  content:'BAS/year';
  color: #04062E ;
}

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

/* .bas-tabs>.bas-tab>label {
  display: block;
  margin: 0;
  padding-left: .4rem;
  font-size:18px;
  position: relative;
  cursor: pointer;
  color: #04062E;
  width:145px;
  line-height: 42px;
  background: url('./bas_tab.png') no-repeat;
  background-size: 100% 100%;
} */

.bas-tabs>.bas-tab>label.sub-domain {
  display: block;
  margin: 0;
  padding-left: .4rem;
  font-size:18px;
  position: relative;
  cursor: pointer;
  color: #04062E;
  width:155px;
  height: 42px;
  line-height: 42px;
  background: url('./sub.png') no-repeat;
  background-size: 100% 100%;
}

.bas-tabs>.bas-tab>label.top-domain {
  display: block;
  margin: 0;
  padding-left: .4rem;
  font-size:18px;
  position: relative;
  cursor: pointer;
  color: #04062E;
  width:155px;
  height: 42px;
  line-height: 42px;
  background: url('./top.png') no-repeat;
  background-size: 100% 100%;
}

.bas-tabs>.bas-tab:first-child>label {
  margin-left:-15px;
}

/* .bas-tabs>.bas-tab.active>label{
  color:rgba(0,202,155,1);
  width: 145px;
  display: inline-block;
  background: url('./bas_tab_active.png') no-repeat;
} */
.bas-tabs>.bas-tab.active>label.top-domain{
  width:155px;
  height: 42px;
  line-height: 42px;
  color:rgba(255,255,255,1);
  background: url('./top_active.png') no-repeat;
  background-size: 100% 100%;
}
.bas-tabs>.bas-tab.active>label.sub-domain{
  width:155px;
  height: 42px;
  line-height: 42px;
  color:rgba(255,255,255,1);
  background: url('./sub_active.png') no-repeat;
  background-size: 100% 100%;
}
/* .bas-tabs>.bas-tab.active>label{
  color:rgba(255,255,255,1);
  background: url('./bas_tab_active.png') no-repeat;
  background-size: 100% 100%;
}
.bas-tabs>.bas-tab.active>label{
  color:rgba(255,255,255,1);
  background: url('./bas_tab_active.png') no-repeat;
  background-size: 100% 100%;
} */

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
  width: 145px;
  background: url('./bas_tab_active.png') no-repeat;
  background-size: 100% 100%;
}

button.bas-append-serachbtn {
  width: 100%;
  height: 100%;
}
</style>
<script>
import {
  hasExpired,dateFormat,
  handleDomain,toUnicodeDomain,
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
    searcherPlaceHolder(){
      return this.$t('p.DomainSearchPlaceHolder')
    },
    filterPlaceHolder(){
      return this.$t('p.DomainFilterTopPlaceholderTip')
    },
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
        return this.$t('l.HasBeenRegisted')
      }else if(this.ctrl.registState === 'expired'){
         return this.$t('l.ExpireLabel')
      }else if(this.ctrl.registState === 'unused'){
         return this.$t('l.Unregist')
      }else {
        return ''
      }
    },
    showSuggestList(){
      return this.ctrl.tabActived === 'sub' && this.ctrl.searchState
        && this.suggests && this.suggests.length
    },
    topArrowClass(){
      return this.submodel.popvisible ? 'fa-chevron-up' : 'fa-chevron-down'
    },
    domainSubPoperVisible(){
      return this.ctrl.tabActived === 'sub' && this.submodel.popvisible
    },
    loadMoreTopDisabled(){
      const total = this.top.total
      const defaultSize = this.submodel.defaultSize
      const pagenumber = this.top.pagenumber
      return total == 0 || total <= (pagenumber)*defaultSize
    }
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
      submodel:{
        defaultSize:20,
        maxSize:50,
        filterkey:"",
        popvisible:false,
        loading:false,
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
      suggestpager:{
        pagenumber:1,
        pagesize:16,
        total:0
      },
      suggests:[
      ]
    }
  },
  methods: {
    togglePopTopSelect(){
      this.submodel.popvisible = !this.submodel.popvisible
    },
    closeDomainSubPoper(){
      this.submodel.popvisible = false;
    },
    selectTopText(name){
      this.topSelectText = name
      this.submodel.popvisible = false
    },
    loadMoreTopDomains(){
      if(this.top.pagenumber*this.submodel.defaultSize >= this.top.total)return;
      let text = this.submodel.filterkey
      if(text=='' || !text.trim().length)text = '';

      const proxy = new DomainProxy()
      const params = {
        pagenumber: this.top.pagenumber+1,
        pagesize:this.submodel.defaultSize,
        text:text
      }
      this.submodel.loading = true
      proxy.getTopDomainList(params).then(resp=>{
        if(resp.state){
          let domains = handleTopDomainList(resp.domains)
          this.top.total = resp.totalcnt
          this.top.pagenumber = resp.pagenumber
          this.top.pagesize = resp.pagesize
          let topDomains = this.topDomains;
          domains.map(item=>{topDomains.push(item)})

          this.topDomains = topDomains;
        }else{
          //this.top.total = 0
          //this.topDomains = Object.assign([])
        }
        this.submodel.loading = false
      }).catch(ex=>{
        this.submodel.loading = false
        console.log(ex)
      })
    },
    filterTopDomain(){
      let text = this.submodel.filterkey
      if(text=='' || !text.trim().length)text = '';

      const proxy = new DomainProxy()
      const params = {
        pagenumber: 1,
        pagesize:this.submodel.defaultSize,
        text:text
      }
      this.submodel.loading = true;
      proxy.getTopDomainList(params).then(resp=>{
        if(resp.state){
          let domains = handleTopDomainList(resp.domains)
          this.top.total = resp.totalcnt
          this.top.pagenumber = resp.pagenumber
          this.top.pagesize = resp.pagesize
          this.topDomains = Object.assign(domains)
        }else{
          this.top.total = 0
          this.topDomains = Object.assign([])
        }
        this.submodel.loading = false
      }).catch(ex=>{
        console.log(ex)
        this.submodel.loading = false
      })
    },
    appenTopDomains(text){

    },
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
        msg = this.$t('l.DomainSearchInputTips')
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
        this.$message(this.$basTip.error(this.$t('l.DomainSearchInputTips')))
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

        //sub suggest
        let ruleState = this.$store.getters['web3/ruleState']
        const decimals = ruleState.decimals||18;
        const subPrice = ruleState.subGas
        let subtext = this.subSearchText

        apiProxy.getSubdomainSugguest({
          pagenumber:1,
          pagesize:this.suggestpager.pagesize|| 8,
          searchdomains:handleDomain(fullText)
        }).then(resp=>{
          //console.log('su',resp)
          if(resp.state&&resp.recommend && resp.recommend.length){
            let domains = resp.recommend.map(item => {
              let price =
                item.rootdomain && item.rootdomain.assetinfo && item.rootdomain.assetinfo.rcustomeprice ?
                item.rootdomain.assetinfo.rcustomeprice/(10**decimals) : subPrice;
              item.customPrice = price
              item.toptext = toUnicodeDomain(item.rootdomain.assetinfo.name)
              item.domaintext = toUnicodeDomain(item.recommendname)
              item.subtext = subtext
              return item
            })

            domains = domains.sort((a,b) =>{ return parseFloat(a.customPrice) > parseFloat(b.customPrice) ? 1 : -1})
            //console.log(domains)

            this.suggests = Object.assign(domains)
          }
        }).catch(ex=>{
          console.log(ex)
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
    gotoRegistSuggestSub(toptext,subtext){
      console.log(toptext,subtext)
      if(toptext,subtext){
        this.$router.push({
          path:`/domain/applysub/${toptext}/${subtext}`,
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
      pagesize:this.submodel.defaultSize,
      text:''
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
        this.suggests = Object.assign([])
      }
      this.subSearchText = (val+'').trim().toLowerCase()
      if(val !== old ){
        this.ctrl.searchState = false;
        this.submodel.popvisible= false;
        this.suggests = Object.assign([])
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

