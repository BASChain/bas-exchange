<template>
  <div class="container bas-section">
    <h1 class="section-title">{{ $t('p.HomeSeeNewSectionTitle') }}</h1>

    <el-row :gutter="24">
      <el-col :span="colSize">
        <div class="bas-home--seenew--twobox">
          <img src="/static/icons/httpb.png">
          <p>
           {{$t('p.HomeSeeNewSectionProtocolDesc')}}
          </p>
        </div>
      </el-col>
      <el-col :span="colSize">
        <div class="bas-home--seenew--twobox">
          <img :src="isCN ? '/static/icons/ca_service_zh.png' : '/static/icons/ca_service_en.png'">
          <p>
           {{$t('p.HomeSeeNewSectionCADesc')}}
          </p>
        </div>
      </el-col>
    </el-row>

    <div class="row justify-content-center align-items-center pt-5">
      <div v-for="(item,index) in productions" :key="index"
        @click="prodClick(index)"
        class="col-lg-4 col-md-12">
        <div class="home-prod-rect" :class="`prod-rect-bg-${index}`">
          <div class="home-prod-rect--left">
            <img :src=" '/static/icons/' + item.icon +''" class="home-prod-icon">
          </div>
          <div class="home-prod-rect--right">
            <p class="home-click">
              {{ $t(`p.${item.nameI18n}`)}}
              <i :class="'fa '+item.faIcon"></i>
            </p>
            <p>
              {{ $t(`p.${item.contentI18n}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {getExtensionStoreUrl,getDownloadAppsPath,MacBrowserApp} from '@/bizlib/apps'

export default {
  name:"SeeNewsSection",
  computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data(){
    return {
      captionTitle:"全新协议，新世界入口",
      colSize:12,
      productions:[
        {
          id:"basBrowser",
          nameI18n:"HomeProdExplorerName",
          faIcon:"fa-download",
          href:"",
          comments:"全新的浏览器，支持全新的httpb协议＋区块 链区块数据浏览",
          contentI18n:"HomeProdExplorerDesc",
          icon:"browser_icon.png"
        },
        {
          id:"basExtensions",
          nameI18n:"HomeProdExtensionName",
          faIcon:"fa-plug",
          href:"",
          comments:"浏览器插件支持区块链域名解析",
          contentI18n:"HomeProdExtensionDesc",
          icon:"exte_icon.png"
        },
        {
          id:"basWallet",
          nameI18n:"HomeProdWalletName",
          faIcon:"fa-external-link",
          href:"",
          comments:"浏览器插件支持区块链域名解析",
          contentI18n:"HomeProdWalletDesc",
          icon:"wallet_icon.png"
        }
      ]
    }
  },
  mounted() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if(width<1000){
      this.colSize =24
    }
  },

  methods: {
    prodClick(index) {
      switch (index) {
        case 0:
          this.dlBrowser()
          break;
        case 1:
          this.dlExtensions()
          break;
        case 2:
          //this.dlExtensions()
          break;
        default:
          break;
      }
    },
    dlBrowser(){
      let url = getDownloadAppsPath(MacBrowserApp)//"/apps/Uranium.app.zip"
       window.open(url,'Browser for mac')
    },
    dlExtensions(){
      let name = 'Chrome Extension'
      let url = getExtensionStoreUrl('firefox')
      if(BasRuntime.browser === 'chrome'){
        url = getExtensionStoreUrl('chrome')
        window.open(url,name)
      }else{
        name = "Firefox Extension"
        url = getExtensionStoreUrl('firefox')
        window.open(url,name)
      }
    }
  }
}
</script>
<style>


.home-click:hover {
  cursor: pointer;
}
</style>
