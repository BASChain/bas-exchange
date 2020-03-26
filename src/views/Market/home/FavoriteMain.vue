<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">
      {{getTitle}}
    </h1>

    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 text-right bas-btns-warp">
          <button
            class="btn bas-btn-start bas-btn-switch">
            已上架
          </button>
        </div>
        <div class="col-md-6 text-left bas-btns-warp">
          <button
            class="btn bas-btn-end bas-btn-switch">
            未上架
          </button>
        </div>
      </div>

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
                <span class="small bas-expired">
                  过期时间:2020-03-32
                </span>
                <button class="btn btn-sm bas-btn-pink">
                  求购
                </button>
              </div>
            </div>
            <div class="list-card--tags">
              <div class="block-inline">
                <p class="small purchase-number-pink">
                  6
                </p>
              </div>
              <div class="badge-inline-flex">
                <span v-for="id in 3" :key="id" class="bas-badge">
                  <p class="small">
                     {{(id+1)*200}}
                  </p>
                </span>
              </div>
              <div class="block-inline pr-2">
                ...
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
  name:"FavorateMain",
  computed: {
    getTitle(){
      return '最期待的域名'
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
