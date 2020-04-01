<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h5 class="section-title text-left">
          最受欢迎的域名
        </h5>
      </div>
      <div class="col-6">
        <h5 class="section-title text-left">
          已成交最贵的域名
        </h5>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div
          class="domain-combox-wrapper">
            <div v-for="item in popItems"
              class="col-12"
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
      <div class="col-6">
        <div
          class="domain-combox-wrapper">
            <div v-for="item in expensiveItems"
              class="col-12"
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
</template>

<script>
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'
import {getWeb3State} from '@/bizlib/web3'
import DomainProxy from '@/proxies/DomainProxy.js'

export default {
  name:"Top10DomainCombox",
  computed: {
    hasPopular(){
      return this.popItems && this.popItems.length > 0
    },
    hasExpensive(){
      return this.expensiveItems && this.expensiveItems.length > 0
    }
  },
  data() {
    return {
      popItems:[],
      expensiveItems:[],
      defPager:{
        pagenumber:1,
        pagesize:3
      },
      ruleState:{}
    }
  },
  methods: {
    loadPopularItems(params){
      let decimals = this.ruleState.decimals ||18
      const proxy = new DomainProxy()
      proxy.getFavoriteDomains(params).then(resp=>{
        //console.log(resp)
        if(resp.state){
          let domains = resp.domains.map(item=>{
            item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
            item.sellprice = (item.price || item.price.length<8) ? wei2Float(item.price,decimals) : item.price
            item.shortAddress = compressAddr(item.owner)
            item.domaintext = toUnicodeDomain(item.name)
            return item
          })

          this.popItems = Object.assign(domains)
        }
      }).catch(ex=>{
        console.log('popular list err',ex)
      })
    },

    loadExpensiveItems(params){
      let decimals = this.ruleState.decimals ||18
      const proxy = new DomainProxy()
      proxy.getExpensiveDomains(params).then(resp=>{
        //console.log(resp)
        if(resp.state){
          let domains = resp.domains.map(item=>{
            item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
            item.sellprice = (item.price || item.price.length<8) ? wei2Float(item.price,decimals) : item.price
            item.shortAddress = compressAddr(item.owner)
            item.domaintext = toUnicodeDomain(item.domain)
            return item
          })

          this.expensiveItems = Object.assign(domains)
        }
      }).catch(ex=>{
        console.log('popular list err',ex)
      })
    },
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
    const params = this.defPager

    this.loadPopularItems(params)
    this.loadExpensiveItems(params)
  },
}
</script>
<style>

</style>
