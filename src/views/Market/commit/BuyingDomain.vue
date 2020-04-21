<template>
  <div class="bas-gray-bg w-100">
    <div class="row justify-content-center align-items-center pt-5 pb-5">
      <div class="col-5 market-buying-wrap" v-loading.lock="ctrl.loading">
        <div class="market-buying--asset">
          <div class="bas-inline-flex">
            <h5>
              {{$t('p.MarketBuyingDomain')}} <span>{{domaintext}}</span>
            </h5>
            <div class="domain-type-badge">
              <span >{{$t(`g.${getDomainType}`)}}</span>
            </div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label">{{$t('l.Owner')}}</div>
            <div class="bas-info-text">{{asset.owner}}</div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label">{{$t('l.ExpiredDate')}}</div>
            <div class="bas-info-text">{{getAssetExpireDate}}</div>
          </div>
        </div>

        <div v-if="!!topasset.owner" class="market-buying--top mt-4">
          <div class="bas-header-tool">
            <h6>
               {{$t('p.DomainRegistSubRootInfoTitle')}}
            </h6>
            <div>
              <a class="bas-link" @click="gotoTopWhois(topasset.name)">who is>></a>
            </div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label">{{$t('p.ApplyTabRootName')}}</div>
            <div class="bas-info-text">{{topasset.name}}</div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label">{{$t('l.Owner')}}</div>
            <div class="bas-info-text">{{topasset.owner}}</div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label">{{$t('l.ExpiredDate')}}</div>
            <div class="bas-info-text">{{getTopAssetExpireDate}}</div>
          </div>
        </div>

        <div class="market-buying--foot mt-4">
          <div class="bas-inline-flex--center">
            <span class="payment-prefix">{{$t('l.PaymentAmout')}}</span>
            <span class="bas-number">{{pricevol}}</span>
          </div>
          <div class="bas-inline-flex--center">
            <button @click="submitBuying"
              class="btn bas-btn-primary bas-w-60">
              {{$t('l.Buying')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  handleDomain,dateFormat,diffBnFloat,transBAS2Wei
} from '@/utils'
import {getDomainType} from '@/utils/Validator.js'
import {getWeb3State} from '@/bizlib/web3'
import {getNewBalance,checkBalance} from '@/bizlib/web3/token-api'
import DomainProxy from '@/proxies/DomainProxy.js'
export default {
  name:"MarketBuyingDomain",
  computed: {
    getDomainType(){
      if(!this.domaintext)return ''
      return getDomainType(this.domaintext)
    },
    getAssetExpireDate(){
      return dateFormat(this.asset.expire)
    },
    getTopAssetExpireDate(){
      return dateFormat(this.topasset.expire)
    }
  },
  data() {
    return {
      domaintext:'',
      pricevol:'',
      asset:{
        domainhash:"",
        isroot:false,
        name:"",
        owner:""
      },
      topasset:{
        domainhash:"",
        name:"",
        owner:""
      },
      ctrl:{
        loading:false
      },
      ruleState:{

      }
    }
  },
  methods: {
    gotoTopWhois(text){
      if(text){
        this.$router.push({
          path:`/domain/detail/${text}`
        })
      }
    },
    submitBuying(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      const web3State = getWeb3State()
      console.log(web3State)
      let decimals = 18;

      const commitData = {
        domaintext:this.domaintext,
        hash:this.asset.domainhash,
        costWei:transBAS2Wei(this.pricevol),
        pricevol:this.pricevol,
        owner:this.asset.owner
      }
      //检查余额
      this.ctrl.loading = true
      checkBalance(web3State.chainId,web3State.wallet,this.pricevol).then(ret=>{
        console.log('Balance Check:',ret)
        this.ctrl.loading = false
        this.$router.push({
          name:'market.bought',
          params:{
            commitData
          }
        })
      }).catch(ex=>{
        console.log(ex)
        this.ctrl.loading = false
        if(ex === 1002){
          this.$message(this.$basTip.error(this.$t('g.LackOfBasBalance')))
        }else if(ex === 1003 ){
          this.$message(this.$basTip.error(this.$t('g.LackOfBasBalance')))
        }
      })
      // getNewBalance().then(resp=>{
      //   if(!resp.basBal || diffBnFloat(commitData.costWei,resp.basBal)){
      //     this.$message(this.$basTip.error(this.$t('g.LackOfBasBalance')))
      //     return ;
      //   }
      //   this.$router.push({
      //     name:'market.bought',
      //     params:{
      //       commitData
      //     }
      //   })
      // }).catch(ex=>{
      //   console.log(ex)
      // })
    }
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)

    let decimals = ruleState.decimals ||18

    let params = this.$route.params;
    this.domaintext = params.domaintext
    this.pricevol = params.pricevol;

    const proxy = new DomainProxy()
    if(this.domaintext){
      proxy.getDomainInfo(handleDomain(this.domaintext)).then(resp=>{
        const ret = proxy.transData(resp)
        console.log(ret)
        if(ret.state){
          this.asset = Object.assign(ret.asset)
          if(ret.asset.parent){
            this.topasset = Object.assign(ret.asset.parent)
          }
        }
      }).catch(ex=>{

      })
    }

  },
}
</script>
<style>
.market-buying--foot {
  display: inline;
  text-align: center;
  justify-content: center;
}

.bas-inline-flex--center {
  width: 100%;
  margin: 1.25rem auto;
  justify-content: center;
  align-items: center;
}

.bas-inline-flex--center>span.bas-number {
  font-size: 36px;
  color:  #00CA9B ;
}

.bas-inline-flex--center>span.bas-number::after {
  content: 'BAS';
  color:  #00CA9B ;
  font-size: 16px;
  margin-left: .25rem;
}
.bas-inline-flex--center>span.payment-prefix {
  color:  #00CA9B ;
  font-size: 1rem;
  margin-right: .25rem;
}

.market-buying-wrap {
  background: rgba(255,255,255,.8);
  padding: 1.5rem 1rem;
}
.market-buying--asset * ,.market-buying--top * {
  line-height: 1.2rem;
  margin-bottom: auto;
  justify-self: start;
}

.domain-type-badge {
  margin-left: 1.25rem;
  margin-bottom: .5rem;
  line-height: 1.2rem;
  color:rgba(16,205,161,1);
  background:rgba(16,205,161,.1);
  border-radius:14px;
  border:1px solid rgba(0,202,155,1);
}

.domain-type-badge span {
  font-size: 14px;
  margin: auto .75rem;
}

.market-buying--asset {
  padding: 1.25rem;
}

.bas-header-tool {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.market-buying--top {
  padding: 1.25rem;
  border-radius:1px;
  background:rgba(245,246,246,1);
  opacity:0.75;
  border:1px solid rgba(235,237,237,1);
}
</style>

