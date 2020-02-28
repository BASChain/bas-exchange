<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <el-card class="col-md-8 col-sm-10 box-card">
        <div class="clearfix" slot="header">
          <h4 @click="chageItem(2)">
            {{this.commitData.domain}} Transaction Hash
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
            {{ `${commitData.domain}.${commitData.topDomain}`}}
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
.bas-btn-group button:disabled {
  color: rgba(212,216,216,1);
  border-color:  rgba(212,216,216,1);
}
</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import RegistApplyFooter from './components/RegistApplyFooter.vue'
import RegistTransFooter from './components/RegistTransFooter.vue'
import {approveBasToken} from '@/bizlib/web3'
import {registSubDomain} from '@/bizlib/web3/domain-api.js'

export default {
  name:"DomainNewRegisting",
  data() {
    return {
      commitData:{
        domain:'',
        calcCost:0,
        isSubdomain:true,
        topDomain:''
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
        dappState.wallet,
        cmtData.costWei,
        cmtData.topDomain,
        cmtData.domain,
        cmtData.year
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
    registCommit(chainId,wallet,costWei,topDomain,domain,year){
      this.registState = 'approving'
      approveBasToken(chainId,wallet,costWei).then(resp=>{
        let state = resp.status ? 'success' : 'fail';
        this.addItem(resp.transactionHash,state)
        this.registState = 'confirming'
        return true;
      }).then(ret=>{
        if(ret){
          registSubDomain(chainId,topDomain,domain,year).then(resp=>{
            console.log(resp)
            let state = resp.status ? 'success' : 'fail';
            this.addItem(resp.transactionHash,state)
            this.registState = 'success'
            this.completed =true
          }).catch(ex=>{
            this.registState = 'fail'
          })
        }
      }).catch(ex=>{
        console.log(ex)
        this.registState = 'fail'
        if(ex.code===4001){
          alert('您拒绝了MetaMask 授权.')
        }
      })
    },
    chageItem(idx){
      const item =         {
          hash:'0x89224aa5e79396cc2435e76d03d5e395d5d5bb757ab6035a2544f5efd5f97e24',
          //loading ,success,fail
          state:'loading'
        };
      console.log(idx)
      this.txHashes.push(item)
    },
    configRefs(){
      console.log('configRefs')
      alert('Come soon')
      //this.registCommit(chainId,wallet,costWei,topDomain,domain,year)
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
      let topDomain = this.commitData.topDomain
      if(!topDomain)return;
      let next =  {
        name:"domain.registsub",
        params:{
          topDomain:topDomain,
          subDomain:''
        }
      }
      this.$router.push(next)
    }
  }
}
</script>
