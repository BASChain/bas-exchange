<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <el-card class="col-md-8 col-sm-10 box-card">
        <div class="clearfix" slot="header">
          <h4>
            Transaction Hash
          </h4>
        </div>
        <div class="text item bas-inline-between"
          v-for="(item,index) in getItems" :key="index">
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
      <el-card v-if="completed" class="col-md-8 col-sm-10 box-card">
        <div class="domain-regist--result-container text-center">
          <img src="/static/icons/bingo.png" class="bas-bingo">
          <h6 v-if="registState == 'approving'" class="bas-text-green mt-2">
            {{$t('p.DomainRegistApprove')}}
          </h6>
          <h6 v-if="registState == 'confirming'" class="bas-text-green mt-2">
            {{$t('p.DomainRegistConfirm')}}
          </h6>
          <h6 v-if="registState == 'fail'" class="text-danger mt-2">
            {{$t('p.DomainRegistFail')}}
          </h6>
          <h6 v-if="registState == 'success'" class="bas-text-green mt-2">
            {{$t('p.DomainRegistSuccess')}}
          </h6>
          <h2 style="margin-top:.75rem;">
            {{ `${commitData.domain}`}}
          </h2>
          <h6 v-if="registState == 'success'"
            style="color:rgba(212,216,216,1)">
            {{ $t('p.DomainRegistSuccessTip') }}
          </h6>
        </div>

        <div class="w-100 bas-btn-group text-center">
          <button @click="configRefs" :disabled="btnDisabled"
            class="w-25 mx-2 btn bas-btn-green-border">
            <i v-if="btnDisabled" class="fa fa-ban"></i>
            配置域名
          </button>
          <button @click="gotoWallet" :disabled="btnDisabled"
            class="w-25 mx-2 btn bas-btn-green-border">
            <i v-if="btnDisabled" class="fa fa-ban"></i>
            去我的资产钱包
          </button>
          <button @click="continueRegist" :disabled="btnDisabled"
            class="w-25 mx-2 btn" :class="btnDisabled ? '' : 'bas-btn-primary'">
            <i v-if="btnDisabled" class="fa fa-ban"></i>
            继续申请
          </button>
        </div>
      </el-card>

      <!-- <regist-apply-footer registState="DomainRegistSuccess"
        :domian="commitData.domain"/> -->
      <!-- <regist-trans-footer v-if="!isApplyType" registState="DomainRegistSuccess" /> -->
    </div>
  </div>
</template>
<style>

</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import RegistApplyFooter from './components/RegistApplyFooter.vue'
import RegistTransFooter from './components/RegistTransFooter.vue'
import {currentChainId,approveBasTokenEmitter } from '@/bizlib/web3'
import { registerTopDomainEmitter } from '@/bizlib/web3/domain-api.js'
//import punycode from 'punycode'

export default {
  name:"DomainNewTopRegisting",
  data() {
    return {
      commitData:{
        domain:'',
        costWei:'',
        openApplied:true,
        isCustomed:false,
        customPriceWei:0,
        year:'',
      },
      txHashes:[],
      dappState:{

      },
      completed:true,
      //DomainRegistConfirm,DomainRegistSuccess
      //approving confirming success
      registState:'approving'
    }
  },
  components:{
    LoadingDot,
    RegistApplyFooter,
    RegistTransFooter
  },
  mounted(){
    let dappState = this.$store.getters['web3/dappState']
    this.dappState = Object.assign({},dappState);
    let cmtData = this.$route.params.commitData;
    if(cmtData && dappState.chainId){
      console.log('cmtData',cmtData,this.dappState)
      this.commitData = Object.assign({},this.commitData,cmtData)

      //return;
      //1 approve
      this.registCommit(
        dappState.chainId,
        cmtData.costWei
      )

    }else{

    }
  },
  computed:{
    getItems(){
      return this.txHashes;
    },
    getRegistState(){
      return `p.${this.registState}`
    },
    getFullDomain(){
      return `${this.commitData.domain}.${this.commitData.topDomain}`
    },
    btnDisabled(){
      if(this.registState ==='success' || this.registState ==='fail')return false;
      return true
    }
  },
  methods:{
    addItem(hash,state){
      this.txHashes.push({
        hash,state
      })
    },
    updateItem(hash,state){
      let idx = this.txHashes.findIndex(el=> el.hash === hash)
      if(idx>=0){
        this.txHashes.splice(idx,1,{hash,state})
      }
    },
    registCommit(chainId,costWei){
      this.registState = 'approving'
      approveBasTokenEmitter(chainId,costWei).on('transactionHash',(txhash)=>{
        this.addItem(txhash,'loading')
      }).on('receipt',(receipt)=>{
        let status = receipt.status;
        this.updateItem(receipt.transactionHash,'success')
        console.log('>>>',receipt)
        //confirming
        this.registState = 'confirming'
      }).on('error',(err,receipt)=>{
        // enable btns
        this.registState = 'fail'
        //4001
        if(err.code === 4001){
          let errMsg = this.$t('g.MetaMaskRejectedAuth')
          this.$message(this.$basTip.error(errMsg))
        }
        if(receipt){
          this.updateItem(receipt.transactionHash,'fail')
        }
      });

    },
    configRefs(){
      let fullDomain = this.commitData.domain
      if(fullDomain){
        //this.$router.push({path:`/domain/settings/${fullDomain}`})
        this.$router.push({path:`/domain/dnsupdate/${fullDomain}`})
      }
    },
    gotoWallet(){
      //wallet.layout
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({name:'wallet.layout'})
    },
    continueRegist(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      let next =  {
        name:"domain.regist",
        params:{
          domain:''
        }
      }
      this.$router.push(next)
    }
  },
  watch:{
    registState:function(val,oldVal){
      //approving
      if(oldVal ==='approving' && val ==='confirming'){
        console.log('registTop>>>',this.commitData)
        let that = this;
        let domain = this.commitData.domain;
        let openApplied = this.commitData.openApplied;
        let isCustomed = this.commitData.isCustomed;
        let customPriceWei = this.commitData.customPriceWei;
        let year = this.commitData.year;

        registerTopDomainEmitter(
          domain,openApplied,isCustomed,customPriceWei,year
        ).on('transactionHash',(txhash) =>{
          that.addItem(txhash,'loading')
        }).on('receipt',(receipt)=>{
          that.updateItem(receipt.transactionHash,'success')
          that.registState = 'success'
        }).on('error',(error,receipt) =>{
          that.registState = 'fail'
          //4001
          if(error.code === 4001){
            let errMsg = that.$t('g.MetaMaskRejectedAuth')
            that.$message(that.$basTip.error(errMsg))
          }
          if(receipt){
            that.updateItem(receipt.transactionHash,'fail')
          }
        })

      }


    }
  }
}
</script>
