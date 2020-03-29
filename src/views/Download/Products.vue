<template>
  <v-layout>
    <page-container>
      <div slot="header" class="download-product--header">
        <div class="container" id="dlExtension">
          <div class="row justify-content-center align-items-center">
            <h1 class="header-slogan">
              Blockchain Addresss Alias Refferer
            </h1>
          </div>
          <div class="row justify-content-center align-items-center">
            <p style="font-size:30px;font-weight:200;margin-top:1rem;">The Blockchain Address Service Extension</p>
          </div>
          <div class="row justify-content-center align-items-center pt-lg-5 bas-download--icon-box">
            <span @click="openChromeExtension">
              <img src="/static/icons/chrome_download.png" class="header-download-img" >
            </span>
            <span @click="openFirefoxExt">
              <img src="/static/icons/firefox_download.png" class="header-download-img">
            </span>

            <span @click="OfflineExtDownload">
              <img src="/static/icons/other_download.png" class="header-download-img">
            </span>
          </div>
        </div>
      </div>

      <div slot="body" class="products-body">
        <div class="wallet-bg-wrapper">
          <div class="bas-wallet-left">
            <div class="bas-wallet--inner">
              <h1>{{wallet.title}}</h1>
              <div class="mt-4" id="dlWallet">
                <a @click="downloadApp('ios')">
                  {{$t('p.WalletDownloadIphone')}}
                </a>
              </div>
              <div class="mb-4">
                <a @click="downloadApp('ios')">
                  {{$t('p.WalletDownloadAndroid')}}
                </a>
              </div>

              <div class="bas-qrcode-wrapper">
                <div class="qrcode-wallet"></div>
              </div>
              <div class="mt-2">
                <p>
                  {{wallet.qrcodeDesc}}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div class="explorer-bg-wrapper">
          <div class="bas-explorer-left" >
            <div class="bas-explorer-inner">
              <h1 class="text-center mb-4">
                {{explorer.title}}
              </h1>
              <div class="bas-extension--left">
                <div class="bas-explorer-download" id="dlExplorer">
                  <a class="download-event"
                    @click="DownloadExplorerHanle">
                    <i class="fa fa-download"> </i>
                    {{explorer.osText}}
                  </a>
                  <el-select v-model="explorer.os"
                    class="bas-explorer-select"

                    size="large">
                    <el-option
                      v-for='item in explorer.osTypes'
                      :label="item.text"
                      :value="item.os"
                      :key="item.os">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="bas-explorer-content">
                <p>
                  {{explorer.about}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>

<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'
  import {
    ChromeExtensionStore,FirefoxExtensionStore,
    getOfflineExtFile,
    getDownloadAppsPath,MacBrowserApp,
  } from '@/bizlib/apps'
  export default {
    name:"Products",
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },

    data() {
      return {
        extension:{
          slogan:"Blockchain Addresss Alias Refferer",
          subtilte:"Blockchain Addresss Alias Refferer"
        },
        wallet:{
          title:"数字钱包",
          qrcodeDesc:"iOS & Android 下载二维码"
        },
        explorer:{
          os:"mac",
          title:"BAS Explorer",
          about:"浏览器介绍....",
          osText:"Get BAS Explorer For ",
          osTypes:[
            {
              text:"MAC",
              i18n:"GetExplorer4Mac",
              os:'mac'
            },
            {
              text:"WINDOWS",
              i18n:"GetExplorer4Win",
              os:'windows'
            }
          ]
        }
      }
    },
    methods: {
      openChromeExtension(){
        let url= ChromeExtensionStore
        window.open(url,'Chrowe Extension')
      },
      openFirefoxExt(){
        let url= FirefoxExtensionStore
        window.open(url,'Firfox Extension')
      },
      OfflineExtDownload(){
        let url = getOfflineExtFile(BasRuntime.browser)
        window.open(url)
      },
      downloadApp(type){
        this.$message(this.$basTip.warn(`${type} APP开发中...`))
      },
      DownloadExplorerHanle(){
        let fileType = this.explorer.os
        this.$message(this.$basTip.warn(`${fileType} APP开发中...`))
        let url = getDownloadAppsPath(MacBrowserApp)
        //window.open(url)
      }
    },
    mounted() {
      const anchor = this.$route.params.anchor
      if(anchor){
        let inner = setInterval(() => {
          let target = document.querySelector(`#${anchor}`)
          console.log('>>>>',anchor)
          if(target){
            console.log('>>>>',target.scrollIntoView)
            target.scrollIntoView()
          }
          clearInterval(inner)
        }, 100);
      }
    },
  }
</script>
<style>
.download-product--header {
  width: 100%;
  height: 603px;
  background:rgba(245,246,246,1);
}

.download-product--header h1.header-slogan {
  margin-top:6rem;
  font-size:58px;
  font-weight: 400;
}

.bas-download--icon-box span {
  cursor: pointer;
  margin: 20px 20px 40px 20px;
}

@media screen and (max-width:1024px){
  .download-product--header {
    margin-top:4.5rem;
    height: 503px;
  }
  .download-product--header h1.header-slogan {
    font-size:52px;
  }

}
@media screen and (max-width:1366px){
  .download-product--header {
    height: 603px;
  }
}

.products-body {
  background:rgba(245,246,246,1);
}
.wallet-bg-wrapper {
  width: 100%;
  height: 100vh;
  background-image:url('./assets/product_wallet_bg.png');
  background-size:cover;
  background-position:50%;
}

.bas-wallet-left {
  width: 52%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.bas-wallet--inner {
  width: 300px;
  display: inline-block;
  /* border: 1px solid sienna; */
}
.bas-wallet--inner h1 {
  font-size: 4.5rem;
  font-weight: 400;
}

.bas-wallet--inner a {
  cursor: pointer;
  font-size:1rem;
  color: rgba(25,28,33,.75);
  font-weight: 500;
  line-height: 1.5rem;
}

.bas-qrcode-wrapper {
  width: 226px;
  height: 226px;
  background: rgba(0,0,0,.65);
}

.explorer-bg-wrapper {
  width: 100%;
  height: 100vh;
  background-image:url('./assets/product_explorer_bg.png');
  background-size:cover;
  background-position:50%;
}

.bas-explorer-left {
  width: 52%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.bas-explorer-inner {
  color:#fff;
}

.bas-explorer-inner h1 {
  font-size: 4.5rem;
  color: #fff;
}

.bas-explorer-download {
  width: 334px;
  height: 40px;
  color:#fff;
  margin: 1rem auto;
  background: rgba(0,202,155,.95);
  padding: auto .25rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.bas-explorer-download > a {
  width: calc(100% - 80px);
  padding: 4px 0;
  font-size: 1.2rem;
  font-weight: 400;
  text-align:center;
  cursor: pointer;
}

.bas-explorer-download > a > i {
  margin-right: .5rem;
}

.bas-explorer-select {
  width: 120px;
  background: rgba(0,202,155,.95);
  align-items: center;
}

.bas-explorer-select span.el-input__prefix {
  display: -webkit-flex;
  align-items: center;
  color:#fff;
}
.bas-explorer-select .el-input__inner {
  background: rgba(0,202,155,.95);
  border-color: rgba(0,202,155,.95);
  color:#fff;
}
.bas-explorer-select .el-input__suffix-inner{
  background: rgba(0,202,155,.95);
  border-color: rgba(0,202,155,.95);
  color:#fff;
}

.bas-explorer-content > p {
  text-align: left;
  width: 335px;
  /* margin: .75rem .25rem .2rem 0; */
  color:#fff;
  word-wrap: break-word;
  /* border: 1px solid #88934a; */
}
</style>
