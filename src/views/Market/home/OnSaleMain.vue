<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">
      {{getTitle}}
    </h1>

    <div class="container">
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
                <button class="btn btn-sm bas-btn-pink">
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

<script>
export default {
  name:"OnSaleMain",
  computed: {
    getTitle(){
      return '出售中的域名'
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style>

</style>
