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
          <div class="row justify-content-center align-items-center pt-lg-5">
            <div class="col-9 products-download-wrapper">
              <div class="dl-w-box--left">
                <div  @click="openChromeExtension"
                  class="extension-box chrome-bg">
                  <div class="bottom-text-box text-center">
                    <span>
                       {{$t('p.ProductsChromeWebstoreBottomTips')}}
                    </span>
                  </div>
                </div>
                <div @click="openFirefoxExt"
                  class="extension-box firefox-bg">
                  <div class="bottom-text-box text-center">
                    <span>
                      {{$t('p.ProductsFirefoxAddOnsBottomTips')}}
                    </span>
                  </div>
                </div>
              </div>

              <div class="dl-w-box--right">
                <div @click="OfflineExtDownload"
                  class="extension-box offline-bg"
                  :class="isCN ? 'offline-bg':'offline-bg-en'">
                </div>
                <div @click="openExtfansDownloadPage('BAS')"
                  class="extension-box"
                  :class="isCN ? 'external-bg':'external-bg-en'">
                </div>
                <div class="wenzi-float">
                  <h6>
                    {{$t('p.ProductsOfflineDownloadBottomTips')}}
                  </h6>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div slot="body" class="products-body">
        <div :class="isCN ? 'wallet-bg-wrapper':'wallet-bg-wrapper-en'">
          <div class="bas-wallet-left">
            <div class="bas-wallet--inner">
              <h1>{{$t('p.ProductsBASWalletTitle')}}</h1>
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
                  {{$t('p.ProductsQRCodeDesc')}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div :class="isCN ? 'explorer-bg-wrapper' : 'explorer-bg-wrapper-en'">
          <div class="bas-explorer-left" >
            <div class="bas-explorer-inner">
              <h1 class="text-center mb-4">
                {{explorer.title}}
              </h1>
              <div class="bas-extension--left">
                <div class="mb-2" id="dlExplorer">
                  <el-button class="explorer-download-btn"
                    @click="downloadExplorerHandle"
                    type="primary">
                    <i class="fa fa-download"></i>
                     {{explorer.osText}}
                  </el-button>
                  <!-- more os plat support
                  <el-dropdown split-button type="success"
                    @command="selectOsCmd"
                    @click="downloadExplorerHandle"
                    class="explorer-dropdown">
                    <span>
                      <i class="fa fa-download"></i>
                      {{explorer.osText}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        command="mac">
                        MAC
                      </el-dropdown-item>
                      <el-dropdown-item
                        command="win64">
                        Windows
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  -->
                </div>
              </div>
              <div class="bas-explorer-content pt-2">
                <p class="d-block">
                  {{$t('p.ProductsExplorerAboutContents')}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="metamask-guide-wrapper">
          <div class="container">
            <div class="row justify-content-center align-items-center">
              <div class="col-6 text-right">
                <div class="mt-5 bt-5">
                  <img :src="isCN ? '/static/icons/dl_metamask.png' : '/static/icons/dl_metamask_en.png'" class="img-fluid">
                </div>
              </div>
              <div class="col-6 text-left">
                <div class="d-block ml-5">
                  <div>
                    <h3>MetaMask</h3>
                  </div>
                  <div class="metamask-store pt-2">
                    <span>
                     {{$t('p.MetaMaskCanVisitWebsitePrfix')}} {{getBrowserStore}},{{$t('p.ClickDownload')}}
                    </span>
                    <div v-if="isChrome" @click="gotoStore4DownloadMetaMask"
                      class="dl-metamask-link chrome-logo" >
                    </div>
                    <div v-if="!isChrome" @click="gotoStore4DownloadMetaMask"
                      class="dl-metamask-link firefox-logo" >
                    </div>
                  </div>
                  <div class="metamask-store pt-2">
                    <span>
                      {{$t('p.MetaMaskCannotVisitWebsitePrfix')}}{{getBrowserStore}},{{$t('p.SelcetedOfflineInstallAppend')}},
                    </span>
                    <a @click="openExtfansDownloadPage('MetaMask')" class="bas-link">
                       {{$t('p.ClickHereDownload')}}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<style >
.metamask-guide-wrapper {
  width: 100%;
  background:rgba(245,246,246,1);
}

.metamask-store {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.metamask-store span {
  line-height: 25px;
  font-size: 18px;
}
.dl-metamask-link {
  margin-left: .5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  opacity: .75;
}

.dl-metamask-link img:hover,.dl-metamask-link:hover {
  opacity: .95;
}

.firefox-logo {
  background-image:url('./assets/firefox_logo.png');
  background-size:cover;
  background-position:50%;
}

.chrome-logo {
  background-image:url('./assets/chrome_logo.png');
  background-size:cover;
  background-position:50%;
}


</style>
<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'
  import { isMetaMask, getMetamaskExtensionHref } from '@/bizlib/metamask'
  import {
    ChromeExtensionStore,FirefoxExtensionStore,
    getOfflineExtFile,
    getDownloadAppsPath,MacBrowserApp,
    getExtfansUrl,
  } from '@/bizlib/apps'

  export default {
    name:"Products",
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },
    computed: {
      isChrome(){
         return BasRuntime.browser === 'chrome'
      },
      getBrowserLogo(){
        return BasRuntime.browser === 'firefox' ?  'firefox_logo' : 'chrome_logo'
      },
      getBrowserStore(){
        return BasRuntime.browser === 'firefox' ?  'Firefox ADD-ONS' : 'Chrome web store'
      },
      ...Vuex.mapState({
        isCN:state => state.lang === 'zh-CN'
      })
    },
    data() {
      return {
        browser:'',
        extension:{
          slogan:"Blockchain Addresss Alias Refferer",
          subtilte:"Blockchain Addresss Alias Refferer"
        },
        wallet:{
        },
        explorer:{
          os:"mac",
          title:"BAS Explorer",
          about:"浏览器介绍....",
          osText:"Get BAS Explorer For MAC",
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
      openExtfansDownloadPage(name){
        let url = getExtfansUrl(name)
        window.open(url,name)
      },
      downloadApp(type){
        this.$message(this.$basTip.warn(`${type} Come soon...`))
      },
      downloadExplorerHandle(){

        // if(this.explorer.os === 'mac'){

        // }
        let url = getDownloadAppsPath(MacBrowserApp)
        console.log('>>>>>>',url)
        window.open(url)
      },
      selectOsCmd(val){
        console.log(val)
        switch (val) {
          case 'mac':
            this.explorer.osText = 'Get BAS Explorer For MAC'
            this.explorer.os = 'mac'
            break;
          default:
            this.explorer.osText = 'Get BAS Explorer For MAC'
            this.explorer.os = 'mac'
            break;
        }
      },
      gotoStore4DownloadMetaMask(){
        const extensionStoreHref = getMetamaskExtensionHref(BasRuntime.browser);
        console.log(extensionStoreHref)
        if(extensionStoreHref){
          window.open(extensionStoreHref,'MetaMask Extension')
        }
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
.wallet-bg-wrapper-en {
  width: 100%;
  height: 100vh;
  background-image:url('./assets/product_wallet_bg.png');
  background-size:cover;
  background-position:50%;
}
/**Extensons begin*/
.products-download-wrapper {
  display: inline-flex;
  justify-content: space-around;
  /* border: 1px solid #556; */
}

.extension-box {
  cursor: pointer;
  height: 174px;
  display: inline-flex;
  direction: column;
  align-items: flex-end;
  justify-items: end;
  padding: 0px;
  opacity: .7;
  transition-property: all;
}

.extension-box:focus,.extension-box:hover {
  opacity: .98;
}

.bottom-text-box span{
  margin: auto .75rem .5rem .75rem;
}

.chrome-bg {
  background-image:url('./assets/chrome_dl.jpg');
  background-size:cover;
  background-position:50%;
}

.firefox-bg {
  background-image:url('./assets/firefox_dl.jpg');
  background-size:cover;
  background-position:50%;
}

.bottom-text-box {

  width: 100%;
  float: left;
  bottom: 0;
  margin-bottom:.75rem;
  padding: 10 20px;
}

.dl-w-box--left {
  background: #fff;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 12px;
  padding: 0;
}

.dl-w-box--right {
  position: relative;
  width: 50%;
  margin-left: 12px;
  background: #fff;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding:0rem;
}

.offline-bg {
  height: 100%;
  width: 50%;
  background-color: yellowgreen;
  background-image:url('./assets/offline_dl.png');
  background-size:cover;
  background-position:50%;
}

.offline-bg-en {
  height: 100%;
  width: 50%;
  background-color: yellowgreen;
  background-image:url('./assets/offline_dl_en.png');
  background-size:cover;
  background-position:50%;
}

.external-bg {
  height: 100%;
  width: 50%;
  background-image:url('./assets/external_dl.png');
  background-size:cover;
  background-position:50%;
}

.external-bg-en {
  height: 100%;
  width: 50%;
  background-image:url('./assets/external_dl_en.png');
  background-size:cover;
  background-position:50%;
}

.wenzi-float {
  position: absolute;
  width: 100%;
  float: right;
  right: 0;
  bottom: .5rem;
  display: inline-flex;
  justify-content: center;
  justify-items: center;
}

.wenzi-float div.dl-text-box {
  display: inline;
  text-align: center;
}

.wenzi-float h6 {
  text-align: center;
  line-height: 22px;
  font-weight:400;
  color:rgba(95,96,121,.75);
  margin-bottom: 0;
}

/**extension end */

.bas-wallet-left {
  width: 52%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.bas-wallet--inner {
  /* width: 300px; */
  display: inline-block;
  /* border: 1px solid sienna; */
}
.bas-wallet--inner h1 {
  font-size: 4rem;
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

.explorer-bg-wrapper-en {
  width: 100%;
  height: 100vh;
  background-image:url('./assets/product_explorer_bg_en.png');
  background-size:cover;
  background-position:50%;
}

.explorer-dropdown {
  min-width: 320px;
}

.explorer-dropdown button {
  font-size: 20px;
  line-height: 24px;
}

.explorer-download-btn {
  font-size: 20px;
  line-height: 24px;
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
  font-size: 1.125rem;
  line-height: 22px;
  width: 335px;
  /* margin: .75rem .25rem .2rem 0; */
  color:#fff;
  word-wrap: break-word;
  /* border: 1px solid #88934a; */
}
</style>
