<template>
  <div>
    <div class="market-search-warp">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <el-input class="col-md-8 market-search--input" v-model="searchText">
            <el-button slot="append" icon="el-icon-search"
              class="basel-search-append--green" >
              Search
            </el-button>
          </el-input>
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

  },
}
</script>
<style>
.market-search-warp {
  background: #fff;
  border-top: 1px solid rgba(225,229,229,1);
  align-items: center;
}

.market-search--input {
  margin: 46px auto;
  line-height: 50px;
}
.market-search--input input{
  font-size: 1rem;
  height: 52px;
}

.basel-search-append--green {
  width: 226px;
  background: rgba(0,202,155,.95);
}

.market-search--input >.el-input-group__append {
  color: #fff;
  font-size: 1rem;
  background: rgba(0,202,155,.95);
}
/**List CARD */
.bas-btns-warp button {
  width: 126px;
}
.bas-btn-start {
  margin: .75rem -.5rem .75rem .5rem;
}
.bas-btn-end {
  margin: .75rem auto .75rem .5rem;
}
.btn-group-warp .text-right button {
  margin-right: 0rem;
}
.btn-group-warp .text-left button {
  margin-left: .5rem;
}
.bas-list-card {
  width: 100%;
  display: block;
  margin: .75rem .5rem;
  justify-content: space-between;
  align-items: center;
  color: rgba(4,6,46,.6);
  background: #fff;
  border: 1px solid rgba(245,246,246,1);
}

.list-card--header {
  width: 100%;
  padding: 24px 12px 0 12px;
  display: inline-flex;
  justify-content: space-between;
  align-items: baseline;
}

.list-card--header h4 {
  color: rgba(4,6,46,1);
  font-size:24px;
  font-weight: 600;
}
.list-card--header span.number {
  line-height: 28px;
  font-size: 24px;
  font-weight: 600;
  color: rgba(4,6,46,1);
}
.list-card--header span.number:after {
  content: 'BAS';
  font-size: 1rem;
  font-weight: 300;
}

.list-card--footer {
  width: 100%;
  padding: 4px 12px 12px 12 px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(245,246,246,1);
}

.block-inline * {
  margin: .25rem .5rem;
}
.market-whois {
  cursor: pointer;
  transition: 50ms;
}

a.market-whois:after {
  content: '>>';
}
a.market-whois:hover {
  font-weight: 500;
}
.purchase-number-pink {
  font-size:.75rem;
  color:rgba(255,87,47,1);
}
.purchase-number-pink::before {
  content: '已有';
  font-size:.5rem;
  color: rgba(4,6,46,.6);
}
.badge-inline-flex {
  padding: auto 30px;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}

.badge-inline-flex * {
  margin: auto .25rem;
}
.bas-badge {
  font-size:.5rem;
  line-height: 1rem;
  border-radius: 16px;
  background: rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
}
.bas-badge p {
  margin: auto 12px;
}
.purchase-number-pink::after {
  content: '人正在求购中...';
  font-size:10px;
  color: rgba(4,6,46,.6);
}
.list-card--tags {
  width: 100%;
  padding: 4px 12px 12px 12 px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid rgba(245,246,246,1);
}
</style>
