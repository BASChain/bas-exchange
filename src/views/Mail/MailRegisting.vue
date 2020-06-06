<template>
  <div class="background-fill-wrapper bas-gray-bg">
    <div class="container">
      <div class="row justify-content-center align-items-center pt-5">
        <el-card class="col-md-8 col-sm-10 box-card">
          <div class="clearfix regist-header" slot="header">
            <div class="regist-header--title">
              <h3>{{titleText}}</h3>
            </div>
            <div class="regist-header--state">
              <span>{{showState}}</span>
            </div>
          </div>
          <div class="tx-hashes-container">
            <div class="tx-hash-header">
              <h5>Transaction Hash</h5>
            </div>
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
        <el-card class="col-md-8 col-sm-10 box-card">
          <div class="regist-btns-wrapper">
            <el-button @click="gotoMailConfiguration" :disabled="confBtnDisabled"
              class="w-25 mx-2">
              <i v-if="confBtnDisabled" class="fa fa-ban"></i>
              {{$t('l.UpdateConfiguration')}}
            </el-button>
            <el-button @click="gotoMyMailList" :disabled="inprogress"
              class="w-25 mx-2">
              <i v-if="inprogress" class="fa fa-ban"></i>
              {{$t('l.GtotoMyWallet')}}
            </el-button>
            <el-button @click="continueRegist" :disabled="inprogress"
              class="w-25 mx-2 bas-btn-primary">
              <i v-if="inprogress" class="fa fa-ban"></i>
              {{$t('l.ApplyAgain')}}
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

import {
  registMailApprovEmitter,registMailConfirmEmitter
} from '@/web3-lib/apis/mail-manager-api'
import {
  APPROVING_SATE,CONFIRMING_STATE,
  FAILURE_STATE,SUCESS_STATE,
  TX_LOAING,TX_SUCCESS,TX_FAILURE
} from '@/web3-lib/utils/cnst'
import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
  DOMAIN_NOT_EXIST,MAILSERVICE_INACTIVED,MAIL_REGIST_BY_OWNER,
  MAIL_HASH_EXIST,MAIL_YEAR_OVER_MAX,LACK_OF_TOKEN
}from '@/web3-lib/api-errors'


import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"MailRegisting",
  components:{
    LoadingDot
  },
  computed: {
    showState(){
      const state = this.registState
      if(!this.commitData.domainhash){
        return ''
      }
      switch (state) {
        case APPROVING_SATE:
          return this.$t('p.DomainRegistApprove')
        case CONFIRMING_STATE:
          return this.$t('p.DomainRegistConfirm')
        case SUCESS_STATE:
          return this.$t('p.DomainRegistSuccess')
        case FAILURE_STATE:
          return this.$t('p.DomainRegistFail')
        default:
          return this.$t('p.DomainRegistFail')
      }
    },
    titleText(){
      return `${this.commitData.mailname}@${this.commitData.domaintext}`
    },
    inprogress(){
      const state =this.registState
      return state === APPROVING_SATE || state === CONFIRMING_STATE
    },
    confBtnDisabled(){
      const state =this.registState
      return state === APPROVING_SATE || state === CONFIRMING_STATE || state === FAILURE_STATE
    },
    ...Vuex.mapState({
      mailGas:state => state.dapp.mailRegGas
    }),
  },
  data() {
    return {
      commitData:{},//domaintext,domainhash,mailalias,costwei
      txHashes:[],
      ctrl:{
        loading:false,
      },
      registState:APPROVING_SATE,//approving,confirming,success,failure
    }
  },
  methods: {
    addTxHashItem(hash,state){
      this.txHashes.push({hash,state})
    },
    comboFulltext(mailhash,domaintext,mailtext){
      if(typeof mailtext === 'string' && mailtext){
        return ``
      }
    },
    updateTxHashState(hash,state){
      const idx = this.txHashes.findIndex(it => it.hash === hash)
      if(idx>=0){
        this.txHashes.splice(idx,1,{hash,state})
      }
    },
    updateTxHashFail(){
      this.txHashes = this.txHashes.map(it => {
        if(it.state === TX_LOAING){
          it.state = TX_FAILURE
        }
        return it
      })
    },
    commitApprove(){
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const commitData = this.commitData
      const domainhash = commitData.domainhash
      const mailhash = commitData.mailhash
      const costwei =  commitData.costwei

      if(!costwei || !domainhash || !mailhash){
        console.error('refresh cant not commit')
        return
      }
      let msg = ''
      try{
        const that = this
        registMailApprovEmitter(costwei,chainId,wallet).on('transactionHash',(txhash)=>{
          that.registState = APPROVING_SATE
          that.addTxHashItem(txhash,TX_LOAING)
        }).on('receipt',receipt =>{
          console.log('receipt>>>Approve>>',receipt)
          if(receipt.status){
            that.registState = CONFIRMING_STATE;
            that.updateTxHashState(receipt.transactionHash,TX_SUCCESS)
          }else{
            that.registState = FAILURE_STATE
            that.updateTxHashState(receipt.transactionHash,TX_FAILURE)
          }
        }).on('err',(err,receipt) =>{
          console.err(`${APPROVING_SATE} error`,err,receipt)
          that.registState = FAILURE_STATE
          that.updateTxHashFail()
        }).catch(ex =>{
          that.registState = FAILURE_STATE
          that.updateTxHashFail()
          if(ex.code === USER_REJECTED_REQUEST){
            msg = that.$t(`code.${ex.code}`)
            that.$message(that.$basTip.error(msg))
          }else{
            console.error(ex)
          }
        })
      }catch(err){
        console.error('trycatch:',err)
        that.registState = APPROVING_SATE
        console.error("BAS-err",err)
      }
    },
    commitSendConfirm(){
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const commitData = this.commitData
      const domainhash = commitData.domainhash
      const years = commitData.years
      const domaintext = commitData.domaintext
      let mailalias = commitData.mailalias
      const mailhash = commitData.mailhash
      if(!years||!domaintext||!domainhash||!mailhash){
        console.error('BAS-err','lost parameters.')
        return;
      }
      if(typeof mailalias ==='undefined')mailalias = ''
      let msg = ''
      const that = this
      try{
        registMailConfirmEmitter(
          years,domaintext,mailhash,
          mailalias,
          chainId,wallet,domainhash
        ).on('transactionHash',txhash =>{
          //this.registState = CONFIRMING_STATE
          that.addTxHashItem(txhash,TX_LOAING)
        }).on('receipt',receipt =>{

          if(receipt.status){
            that.registState = SUCESS_STATE
            that.updateTxHashState(receipt.transactionHash,TX_SUCCESS)
          }else{
            that.registState = FAILURE_STATE
            that.updateTxHashState(receipt.transactionHash,TX_FAILURE)
          }


        }).on('err',(err,receipt)=>{
          console.error('Approving>>>>>>>>',err)
          that.registState = FAILURE_STATE
          that.updateTxHashFail()
        }).catch(ex=>{
          that.registState = FAILURE_STATE
          if(ex.code === USER_REJECTED_REQUEST){
            msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(msg))
            return
          }else{
            console.error("MetaMask Error:",ex)
          }
        })
      }catch(err){
        console.error("BAS-error:",err)
      }
    },
    gotoMailConfiguration(){
      const domaintext = this.$route.params.domaintext
      const hash = this.commitData.mailhash
      this.$router.push({
        path:`/mail/detail/${hash}/${domaintext}`,
        name:'mail.detail',
        params:{
          domaintext:domaintext,
          hash:hash
        }
      })
    },
    gotoMyMailList(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      this.$router.push({
        name:'wallet.maillist'
      })
    },
    continueRegist(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      this.$router.push({
        path:'/mail/regist'
      })
    }
  },
  mounted() {
    const commitData = this.$route.params.commitData ||{};
    const domaintext = this.$route.params.domaintext;
    const years = this.$route.params.years
    const mailname = this.$route.params.mailname


    console.log("commitData>>>>>",commitData,domaintext,years,mailname)

    this.commitData = Object.assign({},commitData,{domaintext,years,mailname})
    const costwei = new Web3.utils.BN(years+'').mul(new Web3.utils.BN(this.mailGas)).toString()
    console.log("costWei:",costwei)
    this.commitApprove()
  },
  watch: {
    registState:function (cur,old) {
      console.log('>>>>>>>>>>>>>>>>>.',cur,old)
      if(old === APPROVING_SATE && cur === CONFIRMING_STATE){
        this.commitSendConfirm()
      }
    }
  },
}
</script>
<style>
.background-fill-wrapper {
  display: inline-flexbox;
  min-height: calc(100vh - 260px);
}

.box-card div.regist-header>div {
  text-align: center;
  width: 100%;
}
.regist-header--title {
  font-size:36px;
  font-family:Lato-Semibold,Lato;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:44px;
  letter-spacing:1px;
}

.regist-header--state {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(2,184,148,1);
  line-height:25px;
}

.card-body--state {
  width: 100%;
  text-align: center;
}

.tx-hash-header {
  width: 100%;
  border-bottom: 1px solid rgba(245,246,246,1);
  border-bottom-right-radius: .5rem;
  border-bottom-left-radius: .5rem;
  margin-bottom: .5rem;
}

.inprogress-state {
  width:260px;
}
.regist-btns-wrapper {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
}
</style>
