<template>
  <div class="bas-gray-bg">
    <h1 class="bas-market-title pt-5 pb-3">{{$t('p.MarketMostPopularDomainTitle')}}</h1>

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5">
          <div class="row justify-content-between align-items-lg-baseline">
            <div v-for="item in dataItems"
              class="col-md-6"
              :key="item.hash">
              <div class="bas-list-card">
                <div class="list-card--header">
                  <div class="block">
                    <h4>{{item.domaintext}}</h4>
                    <p class="small">{{item.shortAddress}}</p>
                  </div>
                  <div class="block">

                  </div>
                  <div class="inline-btn-group">
                    <span class="number">{{item.sellprice}}</span>
                  </div>
                </div>
                <div class="list-card--footer">
                  <div class="block-inline">
                    <p class="small">{{$t('l.expire')}}:{{item.expireDate}}</p>
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
<style>

</style>
<script>
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'
import {getWeb3State} from '@/bizlib/web3'
import DomainProxy from '@/proxies/DomainProxy.js'

export default {
  name:"PopularMain",
  components:{

  },
  computed: {
    ...Vuex.mapState({
      dataItems:state => {
        return state.domains.marketMostPopluar || []
      }
    })
  },
  data() {
    return {
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
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)

    this.$store.dispatch('loadMarketMostPopluar',{enfroce:true,pagesize:8})

    // let decimals = ruleState.decimals ||18
    // const proxy = new DomainProxy()
    // proxy.getFavoriteDomains({
    //   pagenumber:1,
    //   pagesize:8
    // }).then(resp=>{
    //   console.log(resp)
    //   if(resp.state){
    //     let domains = resp.domains.map(item=>{
    //       item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
    //       item.sellprice = (item.price || item.price.length<8) ? wei2Float(item.price,decimals) : item.price
    //       item.shortAddress = compressAddr(item.owner)
    //       item.domaintext = toUnicodeDomain(item.name)
    //       return item
    //     })

    //     this.dataItems = Object.assign(domains)
    //   }
    // }).catch(ex=>{
    //   console.log('popular list err',ex)
    // })
  }
}
</script>

