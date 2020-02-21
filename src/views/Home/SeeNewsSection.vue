<template>
  <div class="container bas-section">
    <h1 class="section-title">{{ captionTitle }}</h1>

    <el-row :gutter="24">
      <el-col :span="12">
        <div class="bas-home--seenew--twobox">
          <img src="/static/icons/httpb.png">
          <p>
            升级TLS1.3到TLS1.5 支持区块链公钥与签名的安全通 讯协议http + TLS1.5 + bas = httpb,全新的RFC标准。
          </p>
        </div>
      </el-col>
      <el-col :span="12">
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
        class="col-md-4">
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
export default {
  name:"SeeNewsSection",
  data(){
    return {
      captionTitle:"全新协议，新世界入口",
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

  methods: {
    prodClick(index) {
      alert(index);
    }
  }
}
</script>
<style>
.bas-home--seenew--twobox {
  width: 100%;
  display: inline-flex;
  direction: ltr;
  align-items: center;
  background:rgba(245,246,246,1);
  border:1px solid rgba(235,237,237,1);
}

.bas-home--seenew--twobox> img {
  margin: 1.25rem .75rem 2.5rem .5rem;
}


.home-see-news {
  height: 412px;
}

.home-prod-icon {
  margin: 20px;
  width: 84px;
  height: 84px;
}

.home-prod-rect {
  margin: 2rem 0;
  background-color:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
  padding: 8px 0;
}

.home-click:hover {
  cursor: pointer;

}
</style>
