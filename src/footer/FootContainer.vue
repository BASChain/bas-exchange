<template>
  <div class="container">
    <div class="row nav-foot-row">
      <ul class="w-25 text-left">
        <router-link  :to="{name:'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <img src="/static/icons/logo_btm.png" alt="BAS Exchange" class="foot-logo">
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">
            <i class="fa fa-facebook-official"></i>
            Github
          </a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">Facebook</a>
        </router-link>
      </ul>
      <ul class="w-25">
        <router-link  :to="{ name: 'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">{{ $t('menu.HomeIndex')}}</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a href="" class="nav-link">域名市场</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a href="" class="nav-link">搜索域名</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">什么是BAS</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">如何使用BAS</a>
        </router-link>
      </ul>
      <ul class="w-25 foot-ul">
        <router-link  :to="{ name: 'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">域名购买</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">域名出售</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">买家指南</a>
        </router-link>
        <router-link  :to="{ name: 'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">卖家指南</a>
        </router-link>
        <router-link  :to="{ name: 'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">帮助中心</a>
        </router-link>
      </ul>
      <ul class="w-25 ">
        <router-link  :to="{ name: 'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">插件下载</a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link">浏览器下载</a>
        </router-link>

      </ul>
    </div>

    <div class="row justify-content-between align-content-between" id="foot-copyright">
      <div class="bas-copyrigth">
        {{copyright}}
      </div>
      <div>
        <select class="form-control" v-model="lang"
          @change="langChanged(lang)">
          <option v-for="(item,index) in langOptions"
            :key="index" :value="item.id">
            {{ item.text }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"FootContainer",
  data() {
    return {
      lang:'en',
      langOptions:[
        {id:"en",text:"English"},
        {id:"zh-CN",text:"中文"},
        {id:"zh-TW",text:"繁體中文"},
      ],
      copyright:"Copyright © 2020 All rights reserved.",
    }
  },
  mounted() {
    const defLang = this.$i18n.locale;
    console.log('>>>>',defLang)
  },
  methods: {
    langChanged( lg ) {
      console.log(lg)
      const i18nLang = this.$i18n.locale;
      if(i18nLang !== lg){
        this.$i18n.locale = lg;
        this.$store.commit('setLang',lg)
      }
    }
  },
}
</script>
<style>
.foot-logo {
  height: 32px;
}

.nav-foot-row {
  margin-top:20px;
}

.nav-foot-row>ul {
  margin:26px 0;
  list-style: none;
}

.nav-foot-row a.nav-link {
  font-size:16px;
  font-weight:400;
  margin: 10px auto;
  color:rgba(4,6,46,1) !important;
}

.fa-socail-icon {
  font-size:30px;
}
</style>
