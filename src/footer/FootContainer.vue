<template>
  <div class="container">
    <div class="nav-foot-row row">
      <ul class="col-md-3 col-sm-6">
        <router-link  :to="{name:'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <img src="/static/icons/logo_btm.png" alt="BAS Exchange" class="foot-logo">
        </router-link>
        <li class="foot-item">
          <a class="nav-link fa-socail-icon" target="BASChain"
            href="https://github.com/BASChain">
            <i class="fa fa-github-square"></i>
            Github
          </a>
        </li>
        <li class="foot-item">
          <a target="facebook"
            href="https://www.facebook.com/groups/145932483508371/?ref=bookmarks"
            class="nav-link fa-socail-icon">
            <i class="fa fa-facebook-square"></i>
            Facebook
          </a>
        </li>
      </ul>
      <ul class="col-md-3 col-sm-6">
        <router-link v-for="(m,index) in navMenusA" :to="{ name: m.to }"
          :key="index"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">{{ $t(m.i18n) }}</a>
        </router-link>
      </ul>
      <ul class="col-md-3 foot-ul col-sm-5">
        <router-link v-for="(nav,index) in navMenuB" :key="index"
          :to="{ name: nav.to,query:{activeId:nav.activeId||'' } }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">
            {{ $t( nav.i18n )  }}
          </a>
        </router-link>
      </ul>
      <ul class="col-md-3 foot-ul col-sm-6">
        <li class="foot-item">
          <a @click="gotoExtensionDownload" class="nav-link">
            {{ $t( 'menu.ExtensionIndex' )}}
          </a>
        </li>
        <li class="foot-item">
          <a :href="getBrowserMacHref" class="nav-link">
            {{ $t( 'menu.BrowserIndex' )}}
          </a>
        </li>
        <li class="foot-item">
          <a href="#" class="nav-link">
            {{ $t( 'menu.MailAppPage' )}}
          </a>
        </li>
      </ul>
    </div>

    <div class="row justify-content-between align-content-between" id="foot-copyright">
      <div class="bas-copyrigth">
        {{ copyright }}
      </div>
      <div class="d-none">

      </div>
    </div>
  </div>
</template>

<script>

import { translateI18n } from '@/utils'
import {
  navMenusGroupA,
  navMenusGroupB,
  navMenusGroupC } from './js/nav-menu.js'
import {getDownloadAppsPath,MacBrowserApp} from '@/bizlib/apps'

export default {
  name:"FootContainer",
  data() {
    return {
      lang:'',
      options:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        // {id:"zh-TW",text:"繁體中文"},
      ],
      copyright:"Copyright © 2020 All rights reserved.",
    }
  },
  mounted() {
   // this.lang =this.$i18n.locale;

  },
  methods: {
    langChanged( lg ) {
      // console.log(lg)
      const i18nLang = this.$i18n.locale;
      if(i18nLang !== lg){
        this.$i18n.locale = lg;
        this.$store.commit('setLang',lg)
      }
    },
    gotoExtensionDownload(){
      this.$router.push({
        name:'download.products'
      })
    },
    gotoHelpCenter(){
      this.$router.push({
        name:'help.issue'
      })
    }
  },
  computed: {
    ...Vuex.mapState({
      currentLang:(state) => {
        this.lang = state.currentLang
      }
    }),
    socialMenus () {
      return socialMenus
    },
    navMenusA() {
      return navMenusGroupA
    },
    navMenuB(){
      return navMenusGroupB
    },
    navMenuC(){
      return navMenusGroupC
    },
    getBrowserMacHref(){
      return getDownloadAppsPath(MacBrowserApp)
    }
  },
}
</script>
<style>
.bas-i18n-select {
  width: 100px;
  user-select: none;
}
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
  font-weight:300;
  color:rgba(4,6,46,1) !important;
}

.fa-socail-icon {
  margin-top: 1.25rem;
  font-size:30px;
}
.foot-item >a {
  cursor: pointer;
}
</style>
