<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>

  import { reloadChainAndWallet,DappMetaMaskListener,loadDappState } from '@/bizlib/web3'
  import { getNewBalance } from '@/bizlib/web3/token-api'
  import InitialProxy from '@/proxies/InitialProxy.js'
  export default {
    //Application Name
    name: 'ExchangeDApp',
    computed: {
      hasLogin(){
        return this.$store.getters['web3/metamaskConnected']
      }
    },

    mounted() {
      const proxy = new InitialProxy();
      proxy.getInitialState().then(resp=>{
        let ret = proxy.transDappState(resp)
        this.$store.commit('web3/loadDappState',ret)
      }).catch(ex=>{
        let ret = proxy.defaultDappState()
        this.$store.commit('web3/loadDappState',ret)
      })
    },
    beforeUpdate() {

    },
    async updated() {
      //refresh 如果MetaMask unLocked 就尝试自动登录
      let mmState = this.$store.getters['web3/loginState'];
      if(mmState.isInjected && window.ethereum && ethereum._metamask.isUnlocked){
        //auto load
        //console.log('DappLoginInit>>>',unlocked)
        try{
          let data = await reloadChainAndWallet(window.ethereum)
          console.log('Refresh Page LoadDapp Data>>',data)
          this.$store.commit('web3/loadLoginBase',data)
        }catch(ex){
          console.log('LoadDapp',ex)
        }
      }
    },
    watch: {
      hasLogin(val,oldval){
        if(val){
          let mmState = this.$store.getters['web3/loginState'];
          console.log('Watch Login Metamask',val,mmState)
          //loading listener
          DappMetaMaskListener()

          //loadBalance

          //loaded dappState
          // loadDappState(mmState.chainId,mmState.wallet).then(resp=>{
          //   //loadDappState
          //   this.$store.commit('web3/loadDappState',resp)

          // }).catch(ex=>{
          //   console.log(ex.message)
          // })
        }else{
          //reset wallet

        }
      }
    },
  }
</script>

<style>

</style>
