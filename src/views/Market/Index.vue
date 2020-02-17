<template>
  <el-container  >
    <el-header>
      <el-form label-width="226px">
        <el-form-item label="" class="w-75">
          <el-input
            type="text" v-model="searchText"
            placeholder="Please enter your domain..."
            autocimplete="off" >
            <el-button slot="append" icon="el-icon-search"
              class="bas-el-append--green">
              Search
            </el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container>
      <el-aside width="226px">
        <el-menu default-active="1"
          text-color="#00CA9B" active-text-color="#fff"
          style="border:none!important;"
          >
          <el-menu-item index="1" class="bas-el-menu-item">
            <span>全部</span>
          </el-menu-item>
          <el-menu-item index="2" class="bas-el-menu-item">
            <span>出售</span>
          </el-menu-item>
          <el-menu-item index="3" class="bas-el-menu-item">
            <span>求购</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div v-if="showResult" class="bas-market--search-result">
          <span>{{ result.domain }}</span>
          <div style="margin-right:.5rem;">
            <span :class="resultClass">
              {{isRegisted ? $t('p.MarketDomainRegisted') : $t('p.MarketDomainUnregisted')}}
            </span>
            <el-button class="bas-btn-primary">
              {{isRegisted ? $t('g.BtnWhois') : $t('g.BtnGotoRegist') }}
            </el-button>
          </div>
        </div>

        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.bas-market--header {
  padding-left:226px;
}



button.bas-el-append--green{
  color: aliceblue !important;
  background:rgba(0,202,155,1) !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.bas-market--search-result {
  width: 100%;
  padding: 10px;
  display: inline-flex;
  direction: row;
  justify-content: space-between;
  align-items: center;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}
.bas-market--search-result--unregisted {
  color: #E55151;
}
</style>
<script>
import {
    getDomainType,
    checkDomainLegal,
    isRareDomain,
    isSubdomain
  }  from '@/utils/domain-validator'

export default {
  name:'MarketIndex',
  data(){
    return {
      searchText:"",
      result:{
        domain:'',
        state:''
         //state:using,unused,unregisted
      }
    }
  },
  methods:{
    setResult(result){
      this.result = Object.assign({},result);
    }
  },
  mounted(){
  },
  computed:{
    showResult(){
      return !!this.searchText
    },
    resultClass(){
      if(this.result.state === 'unregisted'){
        return 'bas-text-red'
      }
      return 'bas-text-green'
    },
    isRegisted(){
      return !(this.result.state === 'unregisted')
    },
    showResultBtn(){
      if(this.result.state === 'unregisted'){
        return 'MarketDomainUnregisted'
      }else if(this.result.state === ''){
        return ''
      }else {
        return 'MarketDomainRegisted'
      }
    }
  },
  watch:{
    searchText: function (value) {
      console.log('>>>>>',value)
      if(value){

        const state = isRareDomain(value) ? 'using' : 'unregisted'
        setTimeout(this.setResult({domain:value,state}),30000)
      }else{
        setTimeout(this.setResult({domain:'',state:''}),30000)
      }


    }
  }

}
</script>
