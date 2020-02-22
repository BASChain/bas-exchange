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

      // if(window.ethereum){
      //   console.log('connect Metamask first on page loading.')
      //   connectMetamask().then(res=>{
      //     this.$store.commit('web3/enable',res)
      //   }).catch(err=>{
      //     console.log(e)
      //     if(e.code ==4001){
      //       alert('Metamask 未授权')
      //     }
      //   });
      // }

      // if(this.$store.state.auth.authenticated){
      //   this.$store.dispatch('accout/find')
      // }

    }
  }
</script>

<style>

</style>
