<template>
<div class="background-fill-wrapper bas-gray-bg">
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <el-card class="col-md-8 col-sm-10 box-card">
        <div class="clearfix" slot="header">
          <h4>
            Transaction Hash
          </h4>
        </div>
        <div class="text item bas-inline-between"
          v-for="(item,index) in transactions" :key="index">
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

    <div class="row justify-content-center align-items-center mt-3">
      <el-card class="col-md-8 col-sm-10 box-card">
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
            {{ domainFullText }}
          </h2>
          <h6 v-if="registState == 'success'"
            style="color:rgba(212,216,216,1)">
            {{ $t('p.DomainRegistSuccessTip') }}
          </h6>
        </div>

        <div class="w-100 bas-btn-group text-center">
          <button @click="gotoUpdateDNS" :disabled="btnDisabled"
            class="w-25 mx-2 btn bas-btn-green-border">
            <i v-if="btnDisabled" class="fa fa-ban"></i>
            {{$t('l.ConfigurationDNS')}}
          </button>
          <button @click="gotoWallet" :disabled="btnDisabled"
            class="w-25 mx-2 btn bas-btn-green-border">
            <i v-if="!completed" class="fa fa-ban"></i>
            {{$t('l.GtotoMyWallet')}}
          </button>
          <button @click="continueRegist" :disabled="btnDisabled"
            class="w-25 mx-2 btn" :class="btnDisabled ? '' : 'bas-btn-primary'">
            <i v-if="!completed" class="fa fa-ban"></i>
             {{$t('l.ApplyAgain')}}
          </button>
        </div>
      </el-card>
    </div>
  </div>
</div>

</template>

<script>
import LoadingDot from '@/components/LoadingDot.vue'

import {
  toUnicodeDomain
} from '@/utils'

import {
  approveToken4OannEmitter,
  registRootEmitter,
  registSubEmitter
} from '@/web3-lib/apis/oann-api.js'

export default {
  name:"RegistResult",
  components:{
    LoadingDot,

  },
  computed: {
    domainFullText(){
      if(!this.commitData.domainText)return ''
      let fullText = this.commitData.isSubDomain ? `${this.commitData.domainText}.${this.commitData.topText}` :
        this.commitData.domainText;

        try{
          return toUnicodeDomain(fullText)
        }catch(ex){
          return fullText
        }
    },
    btnDisabled(){
      return !this.completed
    },
    getTxHashes(){
      return this.transactions;
    }
  },
  data() {
    return {
      completed:false,
      registState:'approving',
      commitData:{
        isSubDomain:false,
        domainText:'',
        topText:'',
        costWei:'',
        openApplied:true,
        isCustomed:false,
        years:1,
      },
      transactions:[

      ],
      tmpData:{
        expire:0,//second
        unitTS:365*24*60*60
      },
      dappState:{
        chainId:'',
        wallet:''
      }
    }
  },
  methods: {
    addTxHashItem(hash,state){
      this.transactions.push({
        hash,state
      })
    },
    updateTxHashItem(hash,state){
      let idx = this.transactions.findIndex(el => el.hash === hash)
      if(idx >= 0){
        this.transactions.splice(idx,1,{hash,state})
      }
    },
    commitApprove(){
      //
      let web3State = this.$store.getters['dapp/web3State'];//getWeb3State()
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;
      let costWei = this.commitData.costWei+'';
      console.log('CommitApprove',chainId,wallet,costWei)
      approveToken4OannEmitter(costWei,chainId,wallet).on('transactionHash',(txhash)=>{
        this.registState = 'approving'
        this.addTxHashItem(txhash,'loading')
      }).on('receipt',(receipt)=>{
        let status = receipt.status;

        this.updateTxHashItem(receipt.transactionHash,'success')
        this.registState = 'confirming'
      }).on('error',(err,receipt)=>{
        console.error('Approve RPC',err)
        this.registState = 'fail'
        //4001
        if(receipt){
          this.updateTxHashItem(receipt.transactionHash,'fail')
        }
      }).catch(ex=>{
        this.registState = 'fail'
        if(ex.code === 4001){
          let errMsg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(errMsg))
        }else if(ex.code === -32601 && ex.message){
          this.$message(this.$basTip.error(ex.message))
        }
      })
    },
    domainSendTransaction(){
      let data = this.commitData
      let that = this
      const web3State = this.$store.getters['web3State']
      console.log('domainSendTransaction>>>>>',this.commitData)

      let expire = new Date().getTime()/1000 + parseInt(data.years)* this.tmpData.unitTS
      this.tmpData.expire = expire
      if(data.isSubDomain){
        registSubEmitter({
          topText:data.topText,
          subText:data.domainText,
          years:data.years,
          chainId:data.chainId,
          wallet:data.wallet
        }).on('transactionHash',(txhash)=>{
          that.addTxHashItem(txhash,'loading')
        }).on('receipt',(receipt)=>{
          console.log('Regist Sub Complete>>>>>',receipt)

          console.log('Expire Tmp:',expire)
          let status = receipt.status;
          if(status){
            that.registState = 'success'

            that.updateTxHashItem(receipt.transactionHash,'success')
            that.$store.dispatch('ewallet/syncEWalletAssets',web3State)
            //that.$store.commit('updateLatestSubDomainsChanged',true)
          }else{
            that.registState = 'fail'
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
          that.completed = true

        }).on('error',(err,receipt)=>{
          console.error('Confirm RPC Error',err)
          that.registState = 'fail'
          if(receipt){
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
        }).catch(ex=>{
          that.registState = 'fail'
          if(ex.code === 4001){
            let errMsg = that.$t(`code.${ex.code}`)
            that.$message(that.$basTip.error(errMsg))
          }else if(ex.code === -32601 && ex.message){
            that.$message(that.$basTip.error(ex.message))
          }else{
            console.error(ex)
          }
        })
      }else {//top

        registRootEmitter(data).on('transactionHash',(txhash)=>{
          that.addTxHashItem(txhash,'loading')
        }).on('receipt',(receipt)=>{
          console.log('Regist Sub Complete>>>>>',receipt)
          let status = receipt.status;
          if(status){
            that.registState = 'success'
            that.updateTxHashItem(receipt.transactionHash,'success')
            setTimeout(() => {
              that.$store.dispatch('ewallet/syncEWalletAssets',web3State)
            }, 1000);

            //that.$store.commit('updateLatestRootDomainsChanged',true)
          }else{
            that.registState = 'fail'
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
          that.completed = true
        }).on('error',(err,receipt)=>{
          console.error(err)
          that.registState = 'fail'
          if(receipt){
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
        }).catch(ex=>{
          that.registState = 'fail'
          if(ex.code === 4001){
            let errMsg = that.$t(`code.${ex.code}`)
            that.$message(that.$basTip.error(errMsg))
          }else if(ex.code === -32601 && ex.message){
            that.$message(that.$basTip.error(ex.message))
          }else{
            console.error(ex)
          }
        })
      }
    },
    gotoUpdateDNS(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      let fullDomain = this.commitData.domainText
      if(this.commitData.isSubDomain){
        fullDomain = `${this.commitData.domainText}.${this.commitData.topText}`
      }

      const data = this.commitData
      if(fullDomain){
        this.$router.push({
          path:`/domain/updaterefdata/${fullDomain}`,
          name:'domain.updaterefdata',
          params:{
            domaintext:fullDomain,
            isRoot:!Boolean(data.isSubDomain),
            openApplied:data.openApplied,
            isCustomed:data.isCustomed,
            customedPrice:data.customedPrice
          }
        })
        // let customPrice = data.customPriceWei ? data.customPriceWei/10**18 : 4.00;
        // let openApplied = data.openApplied
        // let isCustomed = data.isCustomed
        // if(this.commitData.isSubDomain){
        //   this.$router.push({path:`/domain/dnsupdate/${fullDomain}/${this.tmpData.expire}`})
        // }else{
        //   let path = `/domain/dnsupdate/${fullDomain}/${this.tmpData.expire}/${openApplied}/${isCustomed}/${customPrice}`
        //   this.$router.push({path:path})
        // }
      }


    },
    gotoWallet(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      //subasset,topasset
      const activeTab = this.commitData.isSubDomain ? 'subasset' :'topasset'

      this.$router.push({
        name:'wallet.layout',
        query:{
          activeName:activeTab
        }
      })
    },
    continueRegist(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(this.commitData.isSubDomain) {
        if(this.commitData.topText){
          this.$router.push({
            path:`/domain/applysub/${this.commitData.topText}`,
          })
        }
      }else {
        this.$router.push({
          name:"domain.applydomain",
          params:{
            domainText:''
          }
        })
      }
    }
  },
  mounted() {
    let commitData = this.$route.params.commitData;
    this.commitData = Object.assign(this.commitData,commitData)
    //this.commitData.isSubDomain = true
    //this.commitData.topText = 'eth'
    console.log(commitData)
    if(this.commitData.domainText && this.commitData.costWei){
      this.commitApprove()
    }
  },
  watch: {
    registState:function(val,old) {
      if(old === 'approving' && val === 'confirming'){
        this.domainSendTransaction()
      }
    }
  },
}
</script>
<style>

</style>
