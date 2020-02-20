<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>
  // import web3 from '@/bizlib'
  export default {

    //Application Name
    name: 'ExchangeDApp',

    mounted() {
      console.log('App.vue')
      if(window.ethereum){
        console.log('>>>>>>>>>>>>>>')
      }else{
        console.log('>>Not>')
      }
      if(this.$store.state.auth.authenticated){
        this.$store.dispatch('accout/find')
      }
    }
  }
</script>

<style>

</style>
