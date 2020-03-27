<template>
  <div>
    <div class="market-search-warp">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <el-input
            class="col-md-8 market-search--input"
            placeholder="Please enter a domain name... "
            v-model="searchText">
            <el-button slot="append" icon="el-icon-search"
              class="basel-search-append--green" >
              Search
            </el-button>
          </el-input>
        </div>

        <div class="row justify-content-center align-items-center d-none">
          <div class="col-md-8 px-0 mb-2">
            <div class="domain--result-card">
              <div class="result-header">
                <div>
                  <span
                    @click="whois"
                    class="bas-text-green"
                    :class="exactExist ? 'bas-link' : ''">
                    {{exactAsset.name}}
                  </span>
                  <span>
                    {{exactAsset.owner ? '500BAS' : ''}}
                  </span>
                </div>
                <button v-if="exactAsset.onsale" type="button"
                  @click="gotoBuying"
                  class="btn btn-sm bas-btn-primary">
                  购买
                </button>
              </div>
              <div v-if="exactExist" class="result-body">
                <div class="bas-inline-flex">
                  <label class="result-info-label">
                    所有者
                  </label>
                  <span class="bas-info-text">
                    {{exactAsset.owner }}
                  </span>
                </div>
                <div class="bas-inline-flex">
                  <label class="result-info-label">
                    到期日期
                  </label>
                  <span class="bas-info-text">
                    {{formatExpireDate}}
                  </span>
                  <span
                    class="text-warning">
                    已过期
                  </span>
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
  hasExpired,dateFormat,

} from '@/utils'

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
      }
    }
  },
  methods: {
    gotoBuying(){
      //去购买域名
    },
    whois(){

    }
  },
  mounted() {
    let searchText = this.$route.params.searchText
    this.searchText = searchText;
  },
}
</script>
<style>

</style>
