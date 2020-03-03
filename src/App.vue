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

    }
  }
</script>

<style>

</style>
