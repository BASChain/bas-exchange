<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>

  </div>
</template>

<script>

  import { DappMetaMaskListener } from '@/bizlib/web3'
  import { refreshPageInitial,getNewBalance } from '@/bizlib/web3/token-api'
  export default {
    //Application Name
    name: 'ExchangeDApp',

    mounted() {
      //refresh
      refreshPageInitial(window.web3).then(resp=>{
        this.$store.commit('web3/enable',resp)
        console.log('App Initial>>>',resp)
      }).catch(ex=>{
        console.log(ex)
      })
      //listener the Metamask network
      DappMetaMaskListener()

      //reload Wallet chainId balances
      // getNewBalance().then(resp=>{
      //   if(resp.ethBal){
      //     this.$store.commit('web3/updateETHBalance',resp.ethBal)
      //   }
      //   if(resp.basBal){
      //     this.$store.commit('web3/updateBASBalance',resp.basBal)
      //   }
      // }).catch(ex=>{
      //   console.log(ex)
      // })

      //reload others todo
    }
  }
</script>

<style>

</style>
