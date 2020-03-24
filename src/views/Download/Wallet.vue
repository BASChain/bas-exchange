<template>
  <div>
    <img src="/static/img/dl_wallet_bg.png" class="img-fluid">
    <div class="bas-wallet-wrapper">
      <div class="bas-wallet--inner">
        <h1>{{title}}</h1>
        <div class="mt-4">
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
            {{qrcodeDesc}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DownloadWallet",
  computed: {

  },
  data() {
    return {
      title:"数字钱包",
      qrcodeDesc:"iOS & Android 下载二维码"
    }
  },
  methods: {
    downloadApp(type) {
      console.log('>>>',type)
      this.$message(this.$basTip.warn('APP开发中...'))
    }
  },
}
</script>
<style>
.bas-wallet-wrapper {
  position: absolute;
  float: left;
  width: 50%;
  height: 100vh;
  left: 0;
  top:0;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid sienna; */
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
  background: #000;
}
</style>
