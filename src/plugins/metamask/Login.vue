<template>
  <div v-if="visited">
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
              {{basWarnCaption}}
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
          <a v-if="showFooterBtn"
            class="metamask-login-btn" @click="connectMetamask">
            {{ footerBtnText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMetaMask, getMetamaskExtensionHref } from '@/bizlib/metamask'
import {getNetworkName,checkSupport,getSupportNetworkNames} from '@/bizlib/networks'
import { connectMetamask } from '@/bizlib/web3'

export default {
  name:"MetamaskLoginPopup",
  data(){
    return {
      containerStyle:'margin-top:15vh;width:30%;',
      visited: false,
      basWarnCaption:"BAS Exchange 部分功能需要第三方插件",
      basWarnDesc:"您當前瀏覽器不支持Metamask插件,請使用chrome 或firefox",
      browser:'',
      supportNWNames:'ropsten',
      authorizeTip:'',
      chainId:'',
      network:'',
      next:''
    }
  },
  computed:{
    currentSupportNetworks(){
      return getSupportNetworkNames()
    },
    showBasWarnDesc(){
      let extensionStoreHref = getMetamaskExtensionHref(this.browser);
      if(!extensionStoreHref) return "当前浏览器不支持MetaMask插件,请使用Chrome 或 Firefox."
      if(!isMetaMask())return "请先安装MetaMask插件"

      if(!this.$store.getters['web3/metamaskConnected'])return "请先登陆MetaMask"
      let chainId = this.$store.state.web3.chainId;
      if(!checkSupport(chainId)){
        let nwNames = getSupportNetworkNames();
        return `请到MetaMask插件切换到 ${nwNames} 网络下操作`
      }
      return ''
    },
    footerBtnText(){
      let btnText = 'Login MetaMask';
      let chainId = this.$store.state.web3.chainId;
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
      return true;
    }
  },
  mounted(){
    this.authorizeTip = '';
    this.browser = window.BasRuntime ? window.BasRuntime.browser : '';


    const w = document.body.clientWidth;
    this.containerStyle = (w <=768 ? 'margin-top:15vh;width:90%;' : 'margin-top:15vh;width:30%;')

  },
  methods:{
    show(){
      this.visited = true;
    },
    async connectMetamask(){
      let vm = this;
      if(!isMetaMask()) return;
      try{
        let res =await connectMetamask();
        //console.log(res)
        this.$store.commit('web3/enable',res)
        this.visited = false;
        if(vm.next)vm.next();
      }catch(e){
        console.log(e)
        if(e.code ==4001){
          this.authorizeTip = '你终止了连接MetaMask'
        }
      }
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

