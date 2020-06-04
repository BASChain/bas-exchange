<template>
  <div class="container d-none">
    <div class="row">
      <div class="col-6">
        <h5 class="section-title text-left">
          {{$t('p.HomeTop10MostPop')}}
        </h5>
      </div>
      <div class="col-6">
        <h5 class="section-title text-left">
         {{$t('p.HomeTopExpensiveTitle')}}
        </h5>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="domain-combox-wrapper">
          <div v-for="item in popItems"
            :key="item.hash" class="bas-region-item">
            <div class="region-item--header">
              <div class="block">
                <h4>{{item.domaintext}}</h4>
                <p class="small">{{$t('l.expire')}}: {{item.expireDate}}</p>
              </div>
              <div class="inline-flex-shrink">

              </div>
              <div class="inline-btn-group">
                <span class="bas-unit-price year">
                  {{item.sellprice}}
                </span>
                <button v-if="item.openApplied"
                  @click="gotoRegist(item)"
                  class="btn btn-sm bas-btn-primary">
                  {{$t('l.gotoRegistBtn')}}
                </button>
              </div>
            </div>
            <div class="region-item--footer">
              <div class="region-item--tag">
                <div class="domain-type" :class="item.domainTypeI18n">
                  <span>{{$t('l.topTag')}}</span>
                </div>
                <div v-if="item.openApplied"
                  class="open-applied">
                  {{$t('l.hasOpened')}}
                </div>
                <span>
                  {{item.shortAddress}}
                </span>
              </div>
              <div class="block-inline">
                <a class="bas-btn-whois" @click="gotoWhois(item.domaintext)">
                  {{$t('l.whoisBtn')}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="domain-combox-wrapper">
          <div v-for="item in expensiveItems"
            :key="item.hash" class="bas-region-item">
            <div class="region-item--header">
              <div class="block">
                <h4>{{item.domaintext}}</h4>
                <p class="small">{{$t('l.expire')}}: {{item.expireDate}}</p>
              </div>
              <div class="inline-flex-shrink">

              </div>
              <div class="inline-btn-group">
                <span class="sell-label">
                  {{$t('l.DealPrice')}}
                </span>
                <span class="bas-unit-price sell">
                  {{item.sellprice}}
                </span>
                <button :disabled="true"
                  @click="gotoRegist(item)"
                  class="btn btn-sm bas-btn-primary">
                  {{$t('l.hasSold')}}
                </button>
              </div>
            </div>
            <div class="region-item--footer">
              <div class="region-item--tag">
                <div class="domain-type"  :class="item.domainTypeI18n">
                  <span v-if="item.domainTypeI18n === 'raretop'">
                    {{$t('l.topTag')}}
                  </span>
                  <span v-if="item.domainTypeI18n === 'subdomain'">
                    {{$t('l.subTag')}}
                  </span>
                  <span v-if="item.domainTypeI18n === 'commontop'">
                    {{$t('l.commonTag')}}
                  </span>
                </div>
                <div class="open-applied"> {{$t('l.hasOpened')}}</div>
                <span>
                  {{item.shortAddress}}
                </span>
              </div>
              <div class="block-inline mr-0">
                <a class="bas-btn-whois" @click="gotoWhois(item.domaintext)">
                  Who is
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.domain-combox-wrapper {
  display: block;
}

.domain-combox-wrapper .bas-region-item {
  background:rgba(255,255,255,1);
  border:1px solid rgba(235,237,237,1);
}

.bas-region-item .region-item--header {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(235,240,240,1);
}

.bas-region-item .region-item--footer {
  padding: .25rem 0;
  margin-bottom: 0;
}
.bas-region-item .region-item--footer * {
  margin-bottom: 0;
}


.region-item--footer a.bas-btn-whois {
  cursor: pointer;
  padding: .25rem .5rem;
  background:rgba(0,202,155,.1);
  border-radius: 1px;
  line-height: 22px;
  font-size: 16px;
  font-weight:400;
  color: rgba(0,202,155,1);
}

.region-item--tag {
  display: inline-flex;
  justify-content: stretch;
  font-size: 13px;
}
.region-item--tag span {
  padding: auto 6px;
  margin-right: .25rem;
}

.region-item--tag div {
  color:rgba(4,6,46,1);
  padding: auto 6px;
  margin-right: .25rem;
}

.region-item--tag div.domain-type{
  text-align: center;
  padding: auto .5rem;
  font-weight:400;
  border-radius: 4px;
}
 div.domain-type.commontop,div.domain-type.subdomain {
  color:rgba(109,212,0,1);
  background:rgba(109,212,0,.1);
}

div.domain-type.raretop {
  color:rgba(243,95,63,1);
  background:rgba(243,95,63,.1);
}

.region-item--tag div.domain-type span {
  margin: auto .25rem;
}


.region-item--tag div.open-applied {
  /* width: 50px; */
  text-align: center;
  padding: auto .5rem;
  font-weight:400;
  color:rgba(0,202,155,1);
  background:rgba(0,202,155,.1);
}



</style>
<script>
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'
import { getDomainTypeNoIllegal } from '@/utils/Validator'
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
    },
    ...Vuex.mapState({
      expensiveItems:state=>{
        return state.domains.homeExpensive || []
      },
      popItems:state => {
        return state.domains.homeFavorate || []
      }
    })
  },
  data() {
    return {
      //popItems:[],
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
            item.openApplied = item.ropentopublic
            item.domainTypeI18n = getDomainTypeNoIllegal(item.name)
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
            item.domainTypeI18n = getDomainTypeNoIllegal(item.domain)
            return item
          })

          this.expensiveItems = Object.assign(domains)
        }
      }).catch(ex=>{
        console.log('popular list err',ex)
      })
    },
    gotoRegist(item){
      if(item.domaintext){
        this.$router.push({
          path:`/domain/applysub/${item.domaintext}`,
        })
      }
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

    //this.loadPopularItems(params)
    //this.loadExpensiveItems(params)
    // this.$store.dispatch('loadHomeFavorateDomains',{enfroce:true,pagesize:3})
    // this.$store.dispatch('loadHomeExpensiveDomains',{enfroce:true,pagesize:3})
  },
}
</script>
<style>

</style>
