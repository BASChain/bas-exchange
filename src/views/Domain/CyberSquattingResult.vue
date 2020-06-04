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

        <div v-if="refData.loadState" class="domain-regist--result-refs">
          <div class="result-refs-left">
            <div>
              <h5>映射数据</h5>
            </div>
            <div class="domain-info-inline">
              <div class="bas-info-label">
                <span>IPV4</span>
              </div>
              <div class="bas-form-text">
                {{ipv4}}
              </div>
            </div>
            <div class="domain-info-inline">
              <div class="bas-info-label">
                <span>IPV6</span>
              </div>
              <div class="bas-form-text">
                {{ipv6}}
              </div>
            </div>
            <div class="domain-info-inline">
              <div class="bas-info-label">
                <span>钱包地址</span>
              </div>
              <div class="bas-form-text">
                {{refData.wallet}}
              </div>
            </div>
            <div class="domain-info-inline">
              <div class="bas-info-label">
                <span>别名</span>
              </div>
              <div class="bas-form-text">
                {{refData.alias}}
              </div>
            </div>
            <div class="domain-info-inline">
              <div class="bas-info-label">
                <span>附加信息</span>
              </div>
              <div class="bas-form-text">
                {{extensionText}}
              </div>
            </div>
          </div>
          <div class="clearfix result-refs-right bas-btn-group">
            <button class="bas-btn-link" :disabled="!myBtnEnabled"
              @click="cleanMySetting">
              清空
            </button>
            <button class="btn " :disabled="!myBtnEnabled"
              :class=" myBtnEnabled ? 'bas-btn-primary':''"
             @click="configRefs">
              去配置
            </button>
          </div>
        </div>

        <div class="w-100 bas-btn-group text-center ">
          <button @click="goBackRegist" :disabled="btnDisabled"
            class="w-50 mx-2 btn" :class="btnDisabled ? 'bas-btn-secondary' : 'bas-btn-secondary'">
            <i v-if="btnDisabled" class="fa fa-ban"></i>
            返回注册
          </button>
        </div>
      </el-card>

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
import {currentChainId, approveBasTokenEmitter } from '@/bizlib/web3'
import {
  getDomainDetailAssetCI,
  registSubDomainEmitter,
  registerTopDomainEmitter
} from '@/bizlib/web3/domain-api.js'

import {hex2IPv4 ,hex2IPv6,toASCII} from '@/utils'

export default {
  name:"DomainNewTopRegisting",
  data() {
    return {
      //subdomain
      commitData:{
        isSubdomain:false,
        domain:'',
        topDomain:'',
        costWei:'',
        openApplied:true,
        isCustomed:false,
        customPriceWei:0,
        year:'',
      },
      refData:{
        loadState:false,
        ipv4:'',
        ipv6:'',
        wallet:'',
        alias:'',
        extension:''
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
  },
  mounted(){
    let dappState = this.$store.getters['web3/dappState']
    this.dappState = Object.assign({},dappState);
    let cmtData = this.$route.params.commitData;
    this.commitData = Object.assign({},this.commitData,cmtData)

    let fullDomain =
      (this.commitData.isSubdomain ?
        `${this.commitData.domain}.${this.commitData.topDomain}` : this.commitData.domain);

    this.loadRefData(fullDomain)

    if(cmtData  && dappState.chainId && cmtData.costWei){
     // console.log('cmtData',cmtData,this.dappState)
      this.commitApprove(cmtData.costWei,dappState.chainId)
    }else{
      console.log('Parameter illegal')
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
      if(this.commitData.isSubdomain){
        return `${this.commitData.domain}.${this.commitData.topDomain}`
      }else{
        return `${this.commitData.domain}`
      }
    },
    ipv4(){
      return hex2IPv4(this.refData.ipv4)
    },
    ipv6(){
      return hex2IPv6(this.refData.ipv6)
    },
    extensionText(){
      return this.refData.extension ? Web3.utils.hexToString(this.refData.extension) :''
    },
    myBtnEnabled(){
      //control my data operate
      return this.registState === 'success'
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
    loadRefData(domain){
      getDomainDetailAssetCI(domain).then(resp=>{
        if(resp.state){
          let data = resp.data
          this.refData = Object.assign({},data,{loadState:true})
        }else{
          this.refData.loadState = true
        }
      }).catch(ex=>{
        this.refData.loadState = true
      })
    },
    commitApprove(costWei,chainId){
      this.registState = 'approving'
      approveBasTokenEmitter(chainId,costWei).on('transactionHash',(txhash)=>{
        this.addItem(txhash,'loading')
      }).on('receipt',(receipt)=>{
        let status = receipt.status;
        this.updateItem(receipt.transactionHash,'success')
        //console.log('>>>',receipt)
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
      if(this.getFullDomain){
        //this.$router.push({path:`/domain/settings/${this.getFullDomain}`})
        this.$router.push({path:`/domain/dnsupdate/${this.getFullDomain}`})
      }
    },
    cleanMySetting(){
      //wallet.layout
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$Alert('Clean')
    },
    goBackRegist(){
      // if(this.$store.getters['metaMaskDisabled']){
      //   this.$metamask()
      //   return;
      // }
      if(this.commitData.isSubdomain){
        let topDomain = this.commitData.topDomain
        if(!topDomain)return;
        this.$router.push({
          name:'domain.registsub',
          params:{
            topDomain:topDomain,
            subDomain:''
          }
        })
      }else {
        this.$router.push({
          name:'domain.regist',
          params:{
            domain:''
          }
        })
      }
    }
  },
  watch:{
    registState:function(val,oldVal){
      //approving
      if(oldVal ==='approving' && val ==='confirming'){
        //console.log('registTop>>>',this.commitData)
        let that = this;
        let isSubdomain = this.commitData.isSubdomain;

        if(isSubdomain){//SubDomain Regist
          let chainId = this.dappState.chainId;
          let year = this.commitData.year;
          let topHex = toASCII(punycode.toASCII(this.commitData.topDomain))
          let subHex = toASCII( punycode.toASCII(this.commitData.domain))
          //console.log(chainId,topHex,subHex,year)
          registSubDomainEmitter(chainId,topHex,subHex,year).on('transactionHash',(txhash) =>{
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
        }else {//TopDomain Regist
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
}
</script>
