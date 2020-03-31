<template>
  <div class="favorate-top10-wrapper bas-gray-bg">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="section-title">
          {{$t(`p.${titleI18n}`)}}
        </h1>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-12 pb-5">
          <div class="row justify-content-between align-items-lg-baseline">
            <div v-for="item in dataItems"
              class="col-md-6 col-sm-6"
              :key="item.hash">
              <div class="bas-region-item">
                <div class="region-item--header">
                  <div class="block">
                    <h4>{{item.domaintext}}</h4>
                    <p class="small">{{item.shortAddress}}</p>
                  </div>
                  <div class="block">

                  </div>
                  <div class="inline-btn-group">
                    <span class="bas-unit-price year">
                      {{item.sellprice}}
                    </span>
                  </div>
                </div>
                <div class="region-item--footer">
                  <div class="block-inline">
                    <p class="small">过期时间:{{item.expireDate}}</p>
                  </div>
                  <div class="block-inline">
                    <a class="bas-whois" @click="gotoWhois(item.domaintext)">
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
import DomainProxy from '@/proxies/DomainProxy.js'
export default {
  name:"HomeFavoriteList",
  computed: {

  },
  data() {
    return {
      titleI18n:"HomeTop10MostPop",
      dataItems:[],
      pager:{
        pagenumber:1,
        pagesize:12,
        total:0
      },
      ctrl:{
        loading:false,
      },
      ruleState:{
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
      //console.log(data)
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

    let decimals = ruleState.decimals ||18
    const proxy = new DomainProxy()
    proxy.getFavoriteDomains({
      pagenumber:1,
      pagesize:12
    }).then(resp=>{
      console.log(resp)
      if(resp.state){
        let domains = resp.domains.map(item=>{
          item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
          item.sellprice = (item.price || item.price.length<8) ? wei2Float(item.price,decimals) : item.price
          item.shortAddress = compressAddr(item.owner)
          item.domaintext = toUnicodeDomain(item.name)
          return item
        })

        this.dataItems = Object.assign(domains)
      }
    }).catch(ex=>{
      console.log('popular list err',ex)
    })
  },
}
</script>
<style>

</style>
