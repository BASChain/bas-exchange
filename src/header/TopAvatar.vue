<template>
  <div>
    <!-- <div v-if="!connected" @click="login"
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
              {{$t('menu.TopbarCurrent')}}:{{ getNetWorkName }}
            </span>
            <span v-if="!connected">
              <i class="fa fa-chain"></i>
              Connect MetaMask
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="myWallet"
            :disabled="checkSupported"
            divided>
            {{$t('menu.TopbarMyWallet')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->

    <div class="bas-mine-wallet">
      <button class="bas-avatar-btn" @click="loginAndGotoWalletPage">
        {{$t('g.MineWallet')}}
      </button>
    </div>
  </div>


</template>
<style>
.bas-avatar-btn {
  cursor: pointer;
  display: inline-flex;
  margin: auto 0rem auto .5rem;
  /* width: 40px; */
  height: 40px;
  border-radius: 5px;
  /* border-top-right-radius: 0;
  border-bottom-right-radius: 0; */
  font-size: .95rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 0 20px;
  border: none!important;
  background: rgba(0,202,155,.85);
}

.bas-avatar-btn-hash {
  width: 80px !important;
  word-break: break-all !important;
  font-size: 14px !important;
}
</style>
<script>

import { checkSupport } from '@/bizlib/networks'
import {
  enableMetaMask,
} from '@/web3-lib'

// will depared
import {
  connectMetamask,listenerNetwork,initOANNConfigs,
  currentChainId,currentWallet,getCurrentWallet,
  loadWeb3Listener
} from '@/bizlib/web3'


export default {
  name:"TopAvatar",
  beforeCreate() {
  },
  data() {
    return {
    }
  },
  computed:{

  },
  methods:{
    loginAndGotoWalletPage(){
      if(this.$store.getters['metaMaskDisabled']){
        console.log('OK')
        this.$metamask()
        return
      }
      // //TODO checkSupport

      // //TODO login
      enableMetaMask().then(resp=>{
        console.log(resp)
        this.$store.commit('dapp/setMetaMaskLogin',res)
      }).catch(ex=>{
        if(ex.code === 4001){
          this.$message(this.$basTip.error($t('code.4001')))
        }else if(ex.code === -32601){
          this.$message(this.$basTip.error($t('g.NetworkTimeout')))
        }
      })

      this.$router.push({
        name:"wallet.index",
      })
    }
  },
  mounted(){

  }
}
</script>

