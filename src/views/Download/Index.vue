<template>
  <v-layout>
    <page-container>
      <div slot="header" class="bas-download--header-bg">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <h1 class="download--header-slogan">
              Blockchain Addresss Alias Refferer
            </h1>
          </div>
          <div class="row justify-content-center align-items-center">
            <p style="font-size:30px;font-weight:200;margin-top:1rem;">The Blockchain Address Service Extension</p>
          </div>
          <div class="row justify-content-center align-items-center bas-download--icon-box">
            <img src="/static/icons/chrome_download.png" class="header-download-img">
            <img src="/static/icons/chrome_download.png" class="header-download-img">
            <img src="/static/icons/chrome_download.png" class="header-download-img">
          </div>

        </div>
      </div>
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
.bas-download-test-bg {
  height: 300px;
  /* background: url('./img/download-bg.jpg') */
}
.bas-download--header-bg {
  background: rgba(245,246,246,1);
}

.bas-download--header {
  display: block;
  direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 96px auto 58px;
}

.download--header-slogan {
  margin-top:6rem;
  font-size:58px;
  font-weight: 400;
}

.download--header-subdesc {
  margin-top:1rem;
  margin-bottom: 3rem;
  font-size:2.25rem;
  font-weight: 300;
}

.bas-download--icon-box {
  padding: 10px;
}

.bas-download--icon-box>img {
  margin:3rem 1.5rem;
}


</style>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:"DownloadIndex",
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
}
</script>

