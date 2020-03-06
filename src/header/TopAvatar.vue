<template>
  <div>
    <div v-if="!connected" @click="login"
      class="bas-avatar-btn">
      <span>Login</span>
    </div>
    <div v-if="connected">
    <el-dropdown trigger="click"
      placement="bottom-start"
      @command="handleCommand"
      size="medium">
      <div class="bas-avatar-btn">
        <span >{{  showNetworkShort }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="connectMetaMask">
          <span v-if="connected" class="bas-avatar-btn-hash">
            当前:{{ getNetWorkName }}
          </span>
          <span v-if="!connected">
            <i class="fa fa-chain"></i>
            Connect MetaMask
          </span>
        </el-dropdown-item>
        <el-dropdown-item command="myWallet"
          :disabled="checkSupported"
          divided>
          我的钱包
        </el-dropdown-item>
        <!-- <el-dropdown-item
          command="changeNetwork">
          {{ showChangeNetwork }}
        </el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>


</template>
<style>
.bas-avatar-btn {
  cursor: pointer;
  display: inline-flex;
  margin: auto -1rem auto 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  font-size: .85rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0,202,155,.85);
}

.bas-avatar-btn-hash {
  width: 80px !important;
  word-break: break-all !important;
  font-size: 14px !important;
}
</style>
<script>
import { mapState,mapGetter } from 'vuex'
import { checkSupport } from '@/bizlib/networks'
import {
  connectMetamask,listenerNetwork,initOANNConfigs,
  currentChainId,currentWallet,getCurrentWallet
} from '@/bizlib/web3'

export default {
  name:"TopAvatar",
  beforeCreate() {
  },
  data() {
    return {
      wallet:'',
      network:''
    }
  },
  computed:{
    connected(){
      return this.$store.getters['web3/metamaskConnected']
    },
    getHashClass(){
      return this.wallet != '' ? 'bas-avatar-btn-hash' :'';
    },
    getNetWorkName(){
      const nwName = this.$store.getters["web3/getNetworkName"]
      return nwName;
    },
    showNetworkShort(){
      const nwName = this.$store.getters["web3/getNetworkName"]
      if(!nwName){
        return 'Login'
      }else {
        return nwName.charAt(0).toLocaleUpperCase()
      }
    },
    checkSupported(){
      return !this.$store.getters['web3/checkNetworkSupported']
    },
    showChangeNetwork(){
      const nwName = this.$store.getters["web3/getNetworkName"]
      return nwName == 'mainnet' ? "Change to Ropsten" : "Change to Mainnet"
    }
  },
  methods:{
    showDowndrop(){
      return false;
    },
    handleCommand(cmd){
      switch(cmd){
        case 'connectMetaMask':
          //this.login();
          break;
        case 'myWallet':
          if(this.connected){
            this.gotoWalletInfo(this.$store.state.web3.wallet)
          }else{
            alert('please connect MetaMask First!')
          }
          break;
        case 'changeNetwork':
            this.changeNetwork()
            break;
        default:
          break;
      }
      return false;
    },
    changeNetwork(){
      if(this.network == 'ropsten'){
        this.network = 'mainnet'
      }else if(this.network=='mainnet'){
        this.network = 'ropsten'
      }else {
        this.network = 'ropsten'
      }
    },
    login(){
      let injected = this.$store.state.web3.isInjected;
      console.log('logoin>>>',injected)
      if(injected){
        try{
          connectMetamask().then(res => {
            this.$store.commit('web3/enable',res)
            let wallet = res.wallet;
            let chainId = res.chainId;
            if(wallet && chainId){
              let opts = {from:wallet,gasPrice:res.gasPrice}
              //event start
              listenerNetwork(wallet)

              //init OANN
              initOANNConfigs(res.chainId,opts)
            }

          });

        }catch(e){
          console.log(e)
          if(e.code ==4001){
            alert('Metamask 未授权')
          }
        }
      }else{
         this.$metamask()
      }
    },
    logout(){
      this.wallet = ''
    },
    async initLogin(){
      refreshAccount(window.web3).then(data=>{
        console.log(data)
        this.$store.dispatch('web3/fillChaidAndWallet',data)
      }).catch(ex=>{
        console.log(ex)
      })
    },
    gotoWalletInfo(wallet){
      this.$router.push({
        path:"/wallet",
      })
    }
  },
  mounted(){

  }
}
</script>

