<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>
  export default {

    //Application Name
    name: 'ExchangeDApp',

    mounted() {
      console.log('App.vue')
      if(this.$store.state.auth.authenticated){
        this.$store.dispatch('accout/find')
      }
    }
  }
</script>

<style>

</style>
