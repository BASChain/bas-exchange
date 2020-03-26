<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">{{getTitle}}</h1>

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
  name:"BuyingMain",
  computed: {
    getTitle(){
      return '求购的域名'
    }
  },

}
</script>
<style>

</style>
