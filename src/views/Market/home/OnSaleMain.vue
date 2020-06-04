<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">
      {{getTitle}}
    </h1>

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5">
          <div class="row ">
            <div v-for="item in items"
              class="col-lg-6 col-md-6 bas-row--padding"
              :key="item.owner">
              <div class="bas-list-card">
                <div class="list-card--header">
                  <div class="block">
                    <h4>{{item.domaintext}}</h4>
                    <p class="small">
                      {{item.shortAddress}}
                    </p>
                  </div>
                  <div class="block">

                  </div>
                  <div class="inline-btn-group">
                    <span class="number">
                      {{item.sellprice}}
                    </span>
                    <button @click="gotoBuying(item)"
                      class="btn btn-sm bas-btn-pink">
                      {{$t('l.Buying')}}
                    </button>
                  </div>
                </div>
                <div class="list-card--footer">
                  <div class="block-inline">
                    <p class="small">
                      {{$t('l.expire')}}:{{item.expireDate}}
                    </p>
                  </div>
                  <div class="block-inline">
                    <a class="market-whois" @click="gotoWhois(item.domaintext)">
                      Who is
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'

import {getWeb3State} from '@/bizlib/web3'
import {MarketProxy} from '@/proxies/MarketProxy.js'

export default {
  name:"OnSaleMain",
  computed: {
    getTitle(){
      return this.$t('p.MarketOnSaleDomainTitle')
    },
    ...Vuex.mapState({
      items:state=>{
        return state.domains.marketOnSale || []
      }
    })
  },
  data() {
    return {
      total:0,
      pagenumber:1,
      pagesize:8,
      ruleState:{
        decimals:18
      }
    }
  },
  methods: {
    gotoWhois(text){
      if(text){
        this.$router.push({
          path:`/domain/detail/${text}`
        })
      }
    },
    gotoBuying(data) {
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      const web3State = getWeb3State()
      if(isOwner(data.owner,web3State.wallet)){
        this.$message(this.$basTip.error('当前域名已在您账户下,不需要购买.'))
        return;
      }
      console.log(data)
      let domaintext = data.domaintext
      let pricevol = data.sellprice
      //isOwner

      if(domaintext && typeof pricevol !== 'undefined'){
        this.$router.push({
          path:`/market/buying/${domaintext}/${pricevol}`
        })
      }

    }
  },
  mounted(){
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    this.$store.dispatch('loadMarketOnSale',{enfroce:true,pagesize:8})

    // const proxy = new MarketProxy()
    // let pagenumber = this.pagenumber||1
    // let pagesize = this.pagesize || 8

    // const decimals = ruleState.decimals || 18;
    // proxy.getSellingDomains({
    //   pagenumber,
    //   pagesize
    // }).then(resp=>{

    //   if(resp.state){
    //     this.total = resp.totalpage
    //     let list =resp.domains.map(item=>{
    //       item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
    //       item.shortAddress = compressAddr(item.owner)
    //       item.sellprice = item.price ?  wei2Float(item.price,decimals) : ''
    //       item.domaintext = toUnicodeDomain(item.domain)
    //       return item
    //     })
    //     console.log(list)

    //     this.items = Object.assign(list)
    //   }
    // }).catch(ex=>{
    //   console.log(ex)
    // })
  },
}
</script>
<style>

</style>
