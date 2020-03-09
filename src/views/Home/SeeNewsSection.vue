<template>
  <div class="container bas-section">
    <h1 class="section-title">{{ captionTitle }}</h1>

    <el-row :gutter="24">
      <el-col :span="colSize">
        <div class="bas-home--seenew--twobox">
          <img src="/static/icons/httpb.png">
          <p>
            升级TLS1.3到TLS1.5 支持区块链公钥与签名的安全通 讯协议http + TLS1.5 + bas = httpb,全新的RFC标准。
          </p>
        </div>
      </el-col>
      <el-col :span="colSize">
        <div class="bas-home--seenew--twobox">
          <img src="/static/icons/ca_service_zh.png">
          <p>
            被完全颠覆的Ca中心
          </p>
        </div>
      </el-col>
    </el-row>

    <div class="row justify-content-center align-items-center">
      <div v-for="(item,index) in productions" :key="index"
        @click="prodClick(index)"
        class="col-lg-4 col-md-12">
        <el-container class="home-prod-rect">
          <el-aside width="150px" class="home-click">
            <img :src=" '/static/icons/' + item.icon +''" class="home-prod-icon">
          </el-aside>
          <el-main>
            <p class="home-click">
              {{ item.name }}
              <i :class="'fa '+item.faIcon"></i>
            </p>
            <div class="d-block">
              {{ item.comments }}
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>


</template>

<script>
import {getExtensionStoreUrl,getDownloadAppsPath,MacBrowserApp} from '@/bizlib/apps'
export default {
  name:"SeeNewsSection",
  data(){
    return {
      captionTitle:"全新协议，新世界入口",
      colSize:12,
      productions:[
        {
          id:"basBrowser",
          name:"Get BAS Explorer for mac",
          faIcon:"fa-download",
          href:"",
          comments:"全新的浏览器，支持全新的httpb协议＋区块 链区块数据浏览",
          icon:"browser_icon.png"
        },
        {
          id:"basExtensions",
          name:"BAS Extensions",
          faIcon:"fa-plug",
          href:"",
          comments:"浏览器插件支持区块链域名解析",
          icon:"exte_icon.png"
        },
        {
          id:"basWallet",
          name:"增强的数字货币钱包",
          faIcon:"fa-external-link",
          href:"",
          comments:"浏览器插件支持区块链域名解析",
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
