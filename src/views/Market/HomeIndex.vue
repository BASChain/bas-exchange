<template>
  <div>
    <div class="market-search-warp">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8 market-search--outer">
            <el-input class="market-search--input"
              @keyup.enter.native="gotoSearch"
              @input="validSerach"
              placeholder="Please enter a domain name... "
              v-model="searchText">
              <el-button slot="append" icon="el-icon-search"
                @click="gotoSearch"
                class="basel-search-append--green" >
                Search
              </el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <PopularMain />
    <!-- <FavoriteMain /> -->
    <on-sale-main />
    <!-- <BuyingMain /> -->
  </div>
</template>

<script>
import PopularMain from './home/PopularMain.vue'
import FavoriteMain from './home/FavoriteMain.vue'
import OnSaleMain from './home/OnSaleMain.vue'
import BuyingMain from './home/BuyingMain.vue'
import {
  CheckSearchMarketIllegal
} from '@/utils/Validator'
export default {
  name:"MarketHomeIndex",
  components:{
    PopularMain,
    FavoriteMain,
    OnSaleMain,
    BuyingMain,
  },
  computed: {

  },
  data() {
    return {
      searchText:''
    }
  },
  methods: {
    gotoSearch(){
      let searchText = this.searchText
      try{
        CheckSearchMarketIllegal(searchText)
      }catch(ex){
        this.$message(this.$basTip.error(this.$t('p.MarketSearchValidDomainTip')))
        return
      }
      if(searchText && searchText.trim().length){
        const text = searchText.trim()
        this.$router.push({
          name:'market.search',
          params:{
            searchText:text
          }
        })
      }
    },
    validSerach(value){

    }
  },
}
</script>
<style>

</style>
