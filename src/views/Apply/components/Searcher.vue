<template>
<div>
  <form class="comp-searcher-form">
    <div class="row justify-content-center align-items-center ">
      <input type="text" v-model="searchText"
        placeholder="search your Domain..."
        class="col-6 comp-search-input"
        >
      <button id="SearchBtn" type="button" class="col-2 btn comp-searcher-btn"
        @click.prevent="searchDomain">
        Search
      </button>
    </div>
  </form>
  <div class="row justify-content-center align-items-center">
    <div v-show="showResult" class="col-8 bas-searcher--result">
      <div class="bas-searcher--result-short">
        <div>
          <span class="bas-text-green">{{ searchText }} </span>
          <span class="bas-text-primary pl-1">
            {{ showState }}
          </span>
        </div>
        <button v-if="unegisted"  @click="gotoRegist"
          class="btn bas-primary-btn">
          去注册
        </button>
      </div>
      <div v-show="showInfo" class="bas-searcher--result-detail">
        <div class="bas-inline">
          <label class="bas-form-label">所有者</label>
          <span>0x08970FEd061E7747CD9a38d680A601510CB659FB</span>
        </div>
        <div class="flex-inline">
          <label class="bas-form-label">到期日期</label>
          <span>2020-01-23</span>
          <span v-if="hasExpired"  class="text-danger ml-5 mr-5">已过期</span>
          <button v-if="hasExpired" @click="gotoRegist"
            class="btn bas-primary-btn">
            去抢注
          </button>
        </div>
        <div class="d-inline-flex">
          <label class="bas-form-label">是否开放二级域名</label>
          <span>是</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
  .bas-searcher--result-short {
    display: flex;
    justify-content: space-between;
  }

  .bas-searcher--result-short>div {
    display: -webkit-box;
	    -webkit-box-orient: vertical;
  }
</style>

<script>
export default {
  name:"SearcherComponent",
  data() {
    return {
      searchText:"",
      //using,expired,unused,""
      domainState:"",
      result:{

      }
    }
  },
  computed:{
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
        return "已注册"
      }
    },
    showResult(){
      return Boolean(this.domainState)
    }
  },
  watch: {
    searchText:function (newInput,oldValue) {
      if(newInput !== oldValue){
        this.domainState =''
      }
    }
  },
  mounted(){

  },
  methods:{
    searchDomain(){
      const commitText = this.searchText;
      console.log('show metamask')
      this.$metamask()

      // switch(commitText){
      //   case 'bas','com':
      //     this.domainState = 'using'
      //     break;
      //   case 'sina.com','baidu':
      //     this.domainState = 'expired'
      //     break;
      //   default:
      //     this.domainState = 'unused';
      //     break;
      // }
      //TODO call API
    },
    gotoRegist() {
      if(!this.searchText)return;
      this.$router.push({
        // path:`/domain/regist`,
        name:"domain.regist",
        params:{
          id:this.searchText
        }
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
</style>
