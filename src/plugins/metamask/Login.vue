<template>
  <div v-if="visited"  style="z-index:99;">
    <div class="bas-dialog__wrapper" >
      <div class="bas-dialog__metamask" :style="containerStyle"
        aria-modal="true" aria-lable="tips">
        <div class="bas-dialog__metamask-header">
          <span>
            <i class="fa fa-warning"></i>
          </span>
          <a class="bas-dialog__close" @click="cancel">
            <i class="el-dialog__close el-icon el-icon-close" ></i>
          </a>
        </div>
        <div class="bas-dialog__metamask-body">
          <div class="bas-dialog__metamask-left">
            <h4 class="bas-dialog__metamask-warn">
              {{$t('p.MetaMaskPopTitle')}}
            </h4>
            <p class="bas-dialog__metamask-tips text-danger">
              <span>{{ showBasWarnDesc }}</span>
              <span>
                {{authorizeTip ? `,${authorizeTip}.` : ''}}
              </span>
            </p>
          </div>
          <div class="metamask-header-icon" :title="downloadTitle"
           @click="openExtensionStore">
            <img src="/static/icons/metamask_square.png" class="metamask-icon">
            <a class="metamask-download-btn">
              MetaMask
            </a>
          </div>
        </div>
        <div class="bas-dialog__metamask-footer">
          <a
            class="metamask-login-btn" @click="loginMetaMaskHandle">
            {{ canLoginState ? 'Login MetaMask' : "Close" }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMetaMask, getMetamaskExtensionHref } from '@/bizlib/metamask'
import { checkSupport } from '@/web3-lib/networks'

//TODO depared
import { loginMetaMask} from '@/bizlib/web3'

import {enableMetaMask} from '@/web3-lib'

export default {
  name:"MetamaskLoginPopup",
  data(){
    return {
      containerStyle:'margin-top:15vh;width:35%;',
      visited: false,
      basWarnCaption:"BAS Exchange 部分功能需要第三方插件",
      basWarnDesc:"您當前瀏覽器不支持Metamask插件,請使用chrome 或firefox",
      browser:'',
      supportNWNames:'ropsten',
      authorizeTip:'',
      chainId:'',
      network:'',
      next:'',
      zIndex:999
    }
  },
  computed:{
    canLoginState(){
      if(!isMetaMask())return false;
      if(this.chainId !== '' && !checkSupport(this.chainId))return false
      return true;
    },
    showBasWarnDesc(){
      let extensionStoreHref = getMetamaskExtensionHref(this.browser);
      if(!extensionStoreHref) return this.$t('p.MetaMaskPopExplorerUnSupportTip')
      if(!isMetaMask())return this.$t('p.MetaMaskPopNoMetaMaskTip')
      if(this.chainId !=='' && !checkSupport(this.chainId)){
        return this.$t('p.MetaMaskPopSelectNetworkPrefix')
      }
      return ''
    },
    footerBtnText(){
      let btnText = 'Login MetaMask';
      let chainId = this.$store.state.dapp.chainId;
      if(chainId!=null && !checkSupport(chainId)){
        btnText = "Close"
      }
      return btnText;
    },
    downloadTitle(){
      const extensionStoreHref = getMetamaskExtensionHref(this.browserName);
      switch(this.browserName){
        case 'chrome':
          return 'Go To Chrome Web Store';
        case 'firefox':
          return 'Go To Firefox Extension'
        default:
          return'Go To Firefox Extension'
      }
    },
    showFooterBtn(){
      if(!isMetaMask())return false;
      if(this.chainId !== '' && !checkSupport(this.chainId))return false
      return true;
    },
  },
  mounted(){
    this.authorizeTip = '';
    this.browser = window.BasRuntime ? window.BasRuntime.browser : '';
    const w = document.body.clientWidth;
    this.containerStyle = (w <=768 ? 'margin-top:15vh;width:90%;' : 'margin-top:15vh;width:35%;')

    if(window.ethereum && window.ethereum.chainId){
      this.chainId = parseInt(window.ethereum.chainId)
    }

  },
  methods:{
    show(){
      this.visited = true;
    },
    async loginMetaMaskHandle(){
      let vm = this;
      console.log('Connetct')
      if(!isMetaMask() || !this.canLoginState) {
        vm.visited = false;
        return
      };

      enableMetaMask().then(resp=>{
        console.log('Metamask Login>>>>>>>>>>>>>',resp)
        if(checkSupport(resp.chainId)){
          this.$store.commit('dapp/setMetaMaskLogin',resp)

        }

        console.log(vm.next)
        vm.visited = false;
        if(vm.next)vm.next();
        return resp
      }).then(resp=>{
        console.log('>>>>>>>Login>>>then>>>',resp)
      }).catch(ex=>{
        console.log(ex)
        if(ex.code ==4001){
          this.authorizeTip = '你终止了连接MetaMask'
        }
      })
    },
    cancel(){
      this.visited = false
    },
    openExtensionStore(){
      const extensionStoreHref = getMetamaskExtensionHref(this.browser);
      if(extensionStoreHref){
        window.open(extensionStoreHref,'MetaMask Extension')
      }
    }
  }
}
</script>

