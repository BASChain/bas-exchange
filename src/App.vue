<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>

  import { connectMetamask } from '@/bizlib/web3'
  export default {
    //Application Name
    name: 'ExchangeDApp',

    mounted() {
      // if(this.$store.state.auth.authenticated){
      //   this.$store.dispatch('accout/find')
      // }

      //init browser info to state

    }
  }
</script>

<style>

</style>
