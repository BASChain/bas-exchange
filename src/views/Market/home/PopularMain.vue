<template>
  <div class="bas-gray-bg">
    <h1 class="bas-market-title pt-5 pb-3">最受欢迎的域名</h1>


    <div class="container">
      <!-- <div class="row justify-content-center align-items-center">
        <div class="col-md-6 text-right bas-btns-warp">
          <button class="btn bas-btn-start bas-btn-switch"
            :class="activeTag == 1 ? 'active' : ''">
            已上架
          </button>
        </div>
        <div class="col-md-6 text-left bas-btns-warp">
          <button class="btn bas-btn-end bas-btn-switch"
            :class="activeTag == 1 ? '' : 'active'">
            未上架
          </button>
        </div>
      </div> -->
      <div class="row justify-content-center align-items-center pb-5">
        <div v-for="idx in 8"
          class="col-md-5"
          :key="idx">
          <div class="bas-list-card">
            <div class="list-card--header">
              <div class="block">
                <h4>ETH</h4>
                <p class="small">0xFd30...e865</p>
              </div>
              <div class="block">

              </div>
              <div class="inline-btn-group">
                <span class="number">9900</span>
                <button class="btn btn-sm bas-btn-grass">
                  购买
                </button>
              </div>
            </div>
            <div class="list-card--footer">
              <div class="block-inline">
                <p class="small">过期时间: 2020-3-21</p>
              </div>
              <div class="block-inline">
                <a class="market-whois">
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

</style>
<script>
export default {
  name:"PopularMain",
  components:{

  },
  computed: {

  },
  data() {
    return {
      activeTag:1,
      dataItems:[
        {
          name:'',
          owner:'',
          price:'',
          expire:'',
          type:''
        }
      ]
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>

