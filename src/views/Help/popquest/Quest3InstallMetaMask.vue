<template>
  <div>
    <h4 class="text-center">{{$t('p.HelpQuest3MetaMaskInstallInnerTitle')}}</h4>
    <div class="bas-issue-section">
      <p>{{$t('p.HelpQuest3MetaMaskDescP1')}}</p>

      <div class="">
        <a @click="downloadChrome" class="btn bas-btn-primary">Chrome Web Store Download</a>
        <a @click="downloadFirefox" class="btn bas-btn-primary ml-2">Firefox ADD-ONS Download</a>
      </div>
    </div>
    <div class="bas-issue-section">
      <h4>{{$t('p.HelpQuest3MetaMaskDescH2')}}</h4>
      <p>{{$t('p.HelpQuest3MetaMaskDescP3')}}</p>
      <img src="/static/img/mm-install-store-1.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP4')}}</p>
      <img src="/static/img/mm-install-store-2.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP5')}}</p>
      <img src="/static/img/mm-createacc-3.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP6')}}</p>
      <img src="/static/img/mm-createacc-4.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP7')}}</p>
      <img src="/static/img/mm-createacc-5.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP8')}}</p>
      <img src="/static/img/mm-createacc-6.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP9')}}</p>
      <img src="/static/img/mm-createacc-8.png" class="img-fluid">
      <p>{{$t('p.HelpQuest3MetaMaskDescP10')}}</p>
      <img src="/static/img/mm-createacc-9.png" class="img-fluid">
    </div>
  </div>
</template>

<script>
import { isMetaMask, getMetamaskExtensionHref } from '@/bizlib/metamask'

export default {
  name:"PopluarQuestInner3",
  computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {
    downloadChrome(){
        const extensionStoreHref = getMetamaskExtensionHref('chrome');
        if(extensionStoreHref){
          window.open(extensionStoreHref,'Chrome web store')
        }
    },
    downloadFirefox(){
        const extensionStoreHref = getMetamaskExtensionHref('firefox');
        if(extensionStoreHref){
          window.open(extensionStoreHref,'Firefox ADD-ONS')
        }
    }
  },
}
</script>
<style>

</style>
