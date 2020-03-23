<template>
  <v-layout>
    <page-container>

      <div slot="body" class="container pt-5 pb-5">
        <h1 class="text-center mb-5">使用方法</h1>
        <div class="row">
          <div class="col-md-6 ">
            <p style="font-size:1.875rem;">
              <span>Enter a string start With</span>
              <span class="bas-text-green">httpb://</span>
            </p>
            <img src="/static/img/bas_dl_ext1.png" class="img-fluid">
          </div>
          <div class="col-md-6">
            <p style="font-size:1.875rem;">The Extension will redirct domain reffere IP</p>
            <img src="/static/img/bas_dl_ext1.png" class="img-fluid">
          </div>
        </div>
      </div>

      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<style>



</style>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'

export default {
  name:"DownloadIndex",
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
  computed: {

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
      //let url= getDownloadAppsPath('firefox-bas-0.1.0.zip')//'/apps/'

      let url = getOfflineExtFile(BasRuntime.browser)
      console.log(url)
      window.open(url)
    }
  },
}
</script>

