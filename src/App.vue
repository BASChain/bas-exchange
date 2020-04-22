<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>

  import { reloadChainAndWallet,DappMetaMaskListener,loadDappState } from '@/bizlib/web3'
  import { getNewBalance } from '@/bizlib/web3/token-api'
  import InitialProxy from '@/proxies/InitialProxy.js'
  import {getNetwork,checkSupport,getSupportNetworks} from '@/bizlib/networks'
  import { mapState } from 'vuex'
  export default {
    //Application Name
    name: 'ExchangeDApp',
    computed: {
      hasLogin(){
        return this.$store.getters['web3/metamaskConnected']
      },
      ...mapState({
        latestRootDomainsChanged:state => {return state.domains.latestRootDomainsChanged },
        latestSubDomainsChanged:state => {return state.domains.latestSubDomainsChanged },
        currentChainId:state =>{return state.web3.chainId}
      })
    },

    mounted() {
      const proxy = new InitialProxy();
      proxy.getInitialState().then(resp=>{
        console.log(resp)
        let ret = proxy.transDappState(resp)
        console.log('>>>>>>>>>LoadConfig for Server>>>>>>>',ret)
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
        }else{
          //reset wallet

        }
      },
      latestRootDomainsChanged(val,old){
        console.log('watch latestRootDomainsChanged',val,old)
        if(val){
          let that = this
          console.log('Lazy refresh loadLatestRootDomains')
          setTimeout(() => {
            that.$store.dispatch('loadLatestRootDomains',{enfroce:true,pagesize:12})
          }, 5000);
        }
      },
      latestSubDomainsChanged(val,old){
        console.log('watch latestSubDomainsChanged',val,old)
        if(val){
          let that = this
          console.log('Lazy refresh loadLatestSubDomains')
          setTimeout(() => {
            that.$store.dispatch('loadLatestSubDomains',{enfroce:true,pagesize:12})
          }, 5000);
        }
      },
      currentChainId(val,old){
        console.log('currentChainId',val)
        const isCN = this.$store.state.lang === 'zh-CN'

        //let
        if(val){
          const nw = getNetwork(val)

          let msgHtml = ''

          console.log(nw,msgHtml)
          let NoticeOPT = {
            position:'top-left',
            title:'Notice',
            message:'',
            offset: 60,
            duration:5000
          }

          if(checkSupport(val) && (val==3 || val=='3')){

            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-ropsten'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.RopstenNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-ropsten"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 5000

            this.$notify(NoticeOPT)
          }else if(checkSupport(val) && (val==1 || val=='1')){
            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-mainnet'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.MainnetNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-mainnet"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 10000

            this.$notify(NoticeOPT)
          }else{
            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-unsupport'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.UnsupportNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-unsupport"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 0

            this.$notify(NoticeOPT)
          }
        }
      }
    },
  }
</script>

<style>

</style>
