<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <el-card class="col-md-8 col-sm-10 box-card">
        <div class="clearfix" slot="header">
          <h4>Transaction Hash</h4>
        </div>
        <div class="text item bas-inline-between"
          v-for="(item,index) in txHashes" :key="index">
          <div class="">{{item.hash}}</div>
          <div v-if="item.state === 'loading'">
            <loading-dot />
          </div>
          <div v-else-if="item.state === 'success'">
            <i class="fa fa-check bas-text-green"></i>
          </div>
          <div v-else-if="item.state === 'fail'">
            <i class="fa fa-close text-danger"></i>
          </div>
        </div>
      </el-card>
    </div>
    <div class="row" style="height:24px;"></div>
    <div class="row justify-content-center align-items-center ">
      <regist-apply-footer v-if="isApplyType" registState="DomainRegistConfirm"/>
      <regist-trans-footer v-if="!isApplyType" registState="DomainRegistSuccess" />
    </div>
  </div>
</template>
<style>

</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import RegistApplyFooter from './components/RegistApplyFooter.vue'
import RegistTransFooter from './components/RegistTransFooter.vue'

export default {
  name:"DomainRegisting",
  data() {
    return {
      commitDomain:{},
      txHashes:[
        // {
        //   hash:'0x89224aa5e79396cc2435e76d03d5e395d5d5bb757ab6035a2544f5efd5f97e24',
        //   //loading ,success,fail
        //   state:'success'
        // },
        // {
        //   hash:'12234u847548754897594859347593578957789',
        //   //loading ,success,fail
        //   state:'fail'
        // },
        // {
        //   hash:'0x89224aa5e79396cc2435e76d03d5e395d5d5bb757ab6035a2544f5efd5f97e24',
        //   //loading ,success,fail
        //   state:'loading'
        // }
      ],
      registState:'submitting'
    }
  },
  components:{
    LoadingDot,
    RegistApplyFooter,
    RegistTransFooter
  },
  mounted(){
    if(this.$route.params.commitDomain){
      const commitDomain = this.$route.params.commitDomain;
      console.log(commitDomain)
      this.commitDomain = Object.assign({},commitDomain)
    }
  },
  computed:{
    isApplyType(){
      return !!this.commitDomain.registType
    },
    getRegistState(){
      return `p.${this.registState}`
    }
  }
}
</script>
