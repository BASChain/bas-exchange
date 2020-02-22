<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>
  import { CheckRuntime } from '@/bizlib/check-runtime'
  import { connectMetamask } from '@/bizlib/web3'
  export default {
    //Application Name
    name: 'ExchangeDApp',

    mounted() {
      // if(this.$store.state.auth.authenticated){
      //   this.$store.dispatch('accout/find')
      // }

      //init browser info to state
      const runtime = new CheckRuntime(window.navigator.userAgent)
      if(runtime.info){
        this.$store.commit('setBrowser',runtime.info)
      }
    }
  }
</script>

<style>

</style>
