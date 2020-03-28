<template>
  <div>
    <div class="market-search-warp">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <el-input
            @keyup.enter.native="queryDomains"
            class="col-md-8 market-search--input"
            placeholder="Please enter a domain name... "
            v-model="searchText">
            <el-button slot="append" icon="el-icon-search"
            @click="queryDomains"
              class="basel-search-append--green" >
              Search
            </el-button>
          </el-input>
        </div>

      </div>
    </div>

    <div class="search-result-wrap">
      <div class="container">
        <div class="row justify-content-center align-items-center pb-5">
          <div class="col-8">
            <div class="row justify-content-between align-items-lg-baseline">
              <div v-for="item in items"
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
                      <button
                        @click="gotoBuying(item)"
                        class="btn btn-sm bas-btn-grass">
                        购买
                      </button>
                    </div>
                  </div>
                  <div class="list-card--footer">
                    <div class="block-inline">
                      <p class="small">过期时间:{{item.expireDate}}</p>
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
  </div>
</template>

<script>
import {
  handleDomain,toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'
import {getWeb3State} from '@/bizlib/web3'
import DomainProxy from '@/proxies/DomainProxy.js'

import {MarketProxy} from '@/proxies/MarketProxy.js'

export default {
  name:"MarketSearchResult",
  components:{

  },
  computed: {
    exactHasexpired(){
      if(!this.exactAsset.expire)return false;
      return hasExpired(this.exactAsset.expire)
    },
    exactExist(){
      return !!this.exactAsset.owner
    }
  },
  data() {
    return {
      searchText:'',
      exactAsset:{
        onsale:false,
        name:'',
        owner:'asdasdasd',
        expire:''
      },
      pagination:{
        pagenumber:1,
        pagesize:100,
        total:0
      },
      items:[

      ]
    }
  },
  methods: {
    queryDomains(){
      let text = this.searchText ? this.searchText.trim().toLowerCase() : ''
      const data = {
        pagenumber:1,
        pagesize:100,
        text:handleDomain(text)
      }
      console.log(data)
      this.reloadResult(data)
    },
    reloadResult(params) {
      const proxy = new MarketProxy()
      let ruleState = this.$store.getters['web3/ruleState']
      const decimals = ruleState.decimals || 18;

      proxy.queryDomains(params).then(resp=>{
        console.log(resp)
        if(resp.state){
          this.pagination.total = resp.totalpage
          let list =resp.domains.map(item=>{
            item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
            item.shortAddress = compressAddr(item.owner)
            item.sellprice = item.price ?  wei2Float(item.price,decimals) : ''
            item.domaintext = toUnicodeDomain(item.domain)
            return item
          })

          console.log(list)
          this.items = Object.assign(list)
        }else{
          this.pagination.total = 0
          this.items = Object.assign([])
        }
      }).catch(ex=>{

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
    let searchText = this.$route.params.searchText
    this.searchText = searchText||'';
    //if(this.searchText)
    const data = {
      pagenumber:1,
      pagesize:100,
      text:handleDomain(searchText)
    }

    this.reloadResult(data)
  },
}
</script>
<style>

</style>
