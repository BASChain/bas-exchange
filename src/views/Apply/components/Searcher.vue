<template>
<div>
  <form class="comp-searcher-form" >
    <div class="row justify-content-center align-items-center">
      <!-- <input type="text" v-model="searchText"
        placeholder="search your Domain..."
        class="col-6 comp-search-input"
        @keydown.enter="searchDomain"
        > -->
      <div class="col-9 auto-wrapper">
        <el-input
          v-model="searchText"
          placeholder="search your Domain..."
          class="autocomp-input">
          <button id="SearchBtn" slot="suffix" type="button"
            @click.prevent="searcherDomain">
            Search
          </button>
        </el-input>
      </div>
      <!-- <div class="col-9 auto-wrapper">
        <el-autocomplete class="autocomp-input"
          :fetch-suggestions="querySearch"
          v-model="searchText"
          :clearable="false"
          :trigger-on-focus="true"

          @select="searcherDomain"
          ref="searchInput"
          @blur="searchInputBlur"
          placeholder="search your Domain..."
        >
        <button id="SearchBtn" slot="suffix" type="button"
          @click.prevent="searcherDomain">
          Search
        </button>
        </el-autocomplete>
      </div> -->
    </div>
  </form>
  <div class="row justify-content-center align-items-center">
    <!-- <search-result /> -->
    <div v-if="showResult"  class="col-9 bas-searcher--result">
      <div class="bas-searcher--result-short">
        <div>
          <span v-if="unegisted" class="bas-text-green" >
            {{ searchText }}
          </span>
          <span v-if="!unegisted" class="bas-text-green"
            style="cursor:pointer;"
            @click="gotoWhois(searchText)">
            {{ searchText }}
          </span>
          <span class="bas-text-primary pl-1">
            {{ showState }}
          </span>
        </div>
        <button v-if="unegisted"  @click="gotoRegist"
          type="button"
          class="btn btn-sm bas-btn-primary" >
          去注册
        </button>
      </div>
      <div v-if="showInfo" class="bas-searcher--result-detail" style="margin-top: .5rem;">
        <div class="bas-inline">
          <label class="bas-form-label">所有者</label>
          <span>{{ ret.owner }}</span>
        </div>
        <div class="flex-inline">
          <label class="bas-form-label">到期日期</label>
          <span>{{ showExpireDate }}</span>
          <span v-if="hasExpired"  class="text-danger ml-5 mr-5">已过期</span>
          <button v-if="hasExpired"
           type="button"  @click="gotoCybersquatting"  :disabled="disabledCybersquatting"
            class="btn btn-sm bas-btn-primary" >
            去抢注
          </button>
          <span v-if="hasExpired && disabledCybersquatting"
          class="bas-domain--setprice-tip" style="font-size:12px;">
            {{ cybersquattingTip }}
          </span>
        </div>
        <div v-if="isTop" class="d-inline-flex">
          <label class="bas-form-label">是否开放二级域名</label>
          <span>{{$t(`g.${ret.openApplied ? 'Y' : 'N'}`)}}</span>
        </div>
        <!-- TopInfo -->
        <div v-if="topRegisted" class="flex-inline">
          <label class="bas-form-label">根域名有效期</label>
          <span>{{ topExpireDate }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.auto-wrapper {
  padding: 0px;
}
.autocomp-input {
  width: 100%;
}

.autocomp-input input {
  height: 60px;
  font-size:20px;
  background:rgba(245,246,246,1);
  border:1px solid rgba(225,229,229,0.5);
  border-radius:5px 0 0 5px;
}
.autocomp-input .el-input__suffix{
  right: 0px;
}
.autocomp-input button {
  height: 100%;
  min-width: 200px;
  font-size:20px;
  color:rgba(255,255,255,1);
  background:rgba(0,202,155,1);
  border:1px solid rgba(0,184,129,1);
  border-radius: 0px 5px 5px 0px;
}
</style>

<script>
import { findDomainByName } from '@/bizlib/web3/domain-api.js'
import { searchDomain } from '@/bizlib/web3/asset-api.js'

import {
  dateFormat,diffDays,handleDomain,
  hasExpired
 } from '@/utils'
import {
  isSubdomain,
  getTopDomain,
  getSplitDomain,
  checkDomainIllegal
} from '@/utils/domain-validator'
import { checkSupport4Search } from '@/bizlib/web3'
import AutoCompProxy from '@/proxies/AutoCompleteProxy.js'
import { transQueryDomain } from '@/proxies/api/trans-utils'
import DomainProxy from '@/proxies/DomainProxy.js'


export default {
  name:"SearcherComponent",
  components:{

  },
  data() {
    return {
      searchText:"",
      //using,expired,unused,""
      domainState:"",
      state:false,
      isTop:false,
      ret:{
        name:'',
        openApplied:false,
        expire:0,
        isRoot:false,
        rootHash:'',
      },
      topRegisted:false,
      topData:{
        name:'',
        openApplied:false,
        expire:0,
        isRoot:false,
      },
      cybersquattingTip:"根域名未开放或在有效期内,不支持抢注.",
      suggests:[]
    }
  },
  computed:{
    ...Vuex.mapGetters([
      'metaMaskDisabled',
    ]),
    disabledCybersquatting(){
      if(!this.searchText)return true;
      let text = this.searchText.trim().toLowerCase();
      let isSub = isSubdomain(this.searchText)
      if(!isSub){//顶级域名
        if(hasExpired(this.ret.expire)){
          return false;
        }else{
          return true;
        }
      }else{//二级域名
        if(!this.topRegisted)return false;

        //
        if(hasExpired(this.topData.expire))return false;
        //console.log("TOP.openApplied>>>>>>>>>>>>>>>>>>>",this.topData.openApplied)
        if(this.topData.openApplied)return false;
        return true;
      }
    },
    showExpireDate(){
      return dateFormat(this.ret.expire)
    },
    topExpireDate(){
      return this.topData.name ? dateFormat(this.topData.expire ) :''
    },
    using(){
      return Boolean(this.domainState ==='using')
    },
    showInfo(){
      return this.domainState==='using' || this.domainState === 'expired'
    },
    hasExpired(){
      return this.domainState === 'expired'
    },
    unegisted(){
      return this.domainState === 'unused'
    },
    showState(){
      if(this.domainState === 'unused'){
        return "未注册"
      }else{
        return "已被注册"
      }
    },
    showResult(){
      return Boolean(this.domainState)
    },
  },
  watch: {
    searchText:function (newInput,oldValue) {
      if(newInput !== oldValue){
        this.domainState =''
        this.topRegisted = false;
        this.state = false;
      }
    }
  },

  methods:{
    searchInputBlur(){
      console.log('>>>>>MS>>Blur',this.$refs.searchInput.suggestionVisible)
    },
    searcherDomain(){
      const commitText = handleDomain(this.searchText);
      //TODO valid 域名規則
      if(commitText === '' || commitText.length == 0){
        let tips = 'Please enter a domain string.'
        this.$message(this.$basTip.error(tips))
        return
      }

      if(checkDomainIllegal(commitText)){
        let tips = 'Domain name format is illegal'
        this.$message(this.$basTip.error(tips))
        return ;
      }

      // if(!checkSupport4Search()){
      //   let errTips = 'Current network unsupport.'
      //   this.$message(this.$basTip.error(errTips))
      //   return ;
      // }
      // if(window.ethereum && this.metaMaskDisabled){
      //   this.$metamask()
      //   return;
      // }

      let apiProxy = new DomainProxy()

      apiProxy.getDomainInfo(commitText).then(resp=>{
        console.log(resp)
        let ret = apiProxy.transData(resp)
        if(ret.state){
          this.state = true;
          let asset = ret.asset
          this.ret = Object.assign({},this.ret,asset)
          if(asset.parent && asset.parent.owner){
            this.topRegisted = true;
            this.topData = Object.assign({},asset.parent)
          }else{
            this.topRegisted = false;
          }

          this.domainState = hasExpired(asset.expire) ? 'expired' : 'using'
        }else{
          this.state = false;
          this.domainState = 'unused'
        }
      }).catch(ex=>{
        console.log(ex)
        this.$message(this.$basTip.error("查询失败,请重试."))
      })


      /**
       * Search
       */
      // searchDomain(commitText).then(resp=>{
      //   console.log(resp)
      //   if(resp.state){
      //     this.state = !!resp.state
      //     this.ret = Object.assign({},resp.data)
      //     if(resp.topData){
      //       this.topRegisted = true;
      //       this.topData = Object.assign({},resp.topData)
      //     }else{
      //       this.topRegisted = false;
      //     }
      //     this.domainState = hasExpired(resp.data.expire) ? 'expired' : 'using'
      //   }else{
      //     this.state = false;
      //     this.domainState = 'unused'
      //   }
      // }).catch(ex=>{
      //   console.log(ex)
      //   if(ex.code === -32603){
      //     let msg = this.$t('g.NetworkTimeout')
      //     this.$message(this.$basTip.error(msg))
      //   }
      // })
    },
    querySearch(queryText,cb){
      let suggests = []
      if(!queryText)cb(suggests);
      let autoComp = new AutoCompProxy();
      autoComp.getSuggests(queryText).then(resp =>{
        console.log(resp)
        if(resp.state){
          suggests = resp.data.map(s =>{
            return {value:s,link:s}
          })
          console.log(suggests)
          cb(suggests)
        }else{
          cb(suggests)
        }
      }).catch(ex=>console.log('Suggest fetch error.'))
    },
    createrFillter(queryText) {
      return (suggest) =>{
        return (suggest.toLowerCase().indexOf(queryText.toLowerCase()) === 0)
      }
    },
    resetRet(){
      let ret={
        name:'',
        openApplied:false,
        expire:0,
        isRoot:false,
        rootHash:'',
        topData:{
          name:'',
          openApplied:false,
          expire:0,
          isRoot:false,
        }
      }

      this.ret = Object.assign({},ret)
    },
    gotoRegist() {
      if(!this.searchText)return;
      if(this.metaMaskDisabled){
        this.$metamask()
        return;
      }
      let handleText = handleDomain(this.searchText)
      let flag = isSubdomain(handleText)
      if(flag){
        let domainStruct = getSplitDomain(handleText)
        this.$router.push({
          name:"domain.registsub",
          params:{
            topDomain:domainStruct.top,
            subDomain:domainStruct.domain
          }
        })
      }else{
        this.$router.push({
          name:"domain.regist",
          params:{
            domain:handleText
          }
        })
      }
    },
    gotoCybersquatting(){
      if(!this.searchText)return;
      if(this.metaMaskDisabled){
        this.$metamask()
        return;
      }
      let domain =  handleDomain(this.searchText)
      if(isSubdomain(domain)){
        let domainStruct = getSplitDomain(domain)
        this.$router.push({
          name:"domain.subcybersquatting",
          params:{
            subDomain:domainStruct.domain,
            topDomain:domainStruct.top
          }
        })
      }else {
        this.$router.push({
          name:"domain.topcybersquatting",
          params:{
            domain
          }
        })
      }
    },
    gotoWhois(domain){
      if(!domain)return;
      domain = domain.trim().toLowerCase()
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    }
  }
}
</script>
<style>
/* Components */
.comp-searcher-form {
  margin: 100px auto 30px auto;
}
.comp-search-container {
  padding: 0 auto 3rem auto;
}

.comp-search-input {
  height: 62px;
  font-size:20px;
  background:rgba(245,246,246,1);
  border:1px solid rgba(225,229,229,0.5);
  border-radius:5px 0 0 5px;
}
.comp-searcher-btn {
  height: 62px;
  min-width: 226px;
  font-size:20px;
  color:rgba(255,255,255,1);
  background:rgba(0,202,155,1);
  border:1px solid rgba(0,184,129,1);
  border-radius: 0px 5px 5px 0px;
}

.comp-searcher-btn:hover,.comp-searcher-btn:active {
  color: rgba(255,255,255,1);
  border: none;
  outline: none !important;
}

.bas-searcher--result {
  display: inline-block;
  padding: .5rem;
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
}
.bas-searcher--result-short {
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bas-searcher--result-short>div {
  display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
