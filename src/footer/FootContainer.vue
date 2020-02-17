<template>
  <div class="container">
    <div class="row nav-foot-row">
      <ul class="w-25">
        <router-link  :to="{name:'home.index' }"
          active-class="active"
          class="foot-item" tag="li">
          <img src="/static/icons/logo_btm.png" alt="BAS Exchange" class="foot-logo">
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link fa-socail-icon">
            <i class="fa fa-github-square"></i>
            Github
          </a>
        </router-link>
        <router-link :to="{ name: 'home.index' }"
          class="foot-item" tag="li">
          <a class="nav-link fa-socail-icon">
            <i class="fa fa-facebook-square"></i>
            Facebook
          </a>
        </router-link>
      </ul>
      <ul class="w-25">
        <router-link v-for="(m,index) in navMenusA" :to="{ name: m.to }"
          :key="index"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">{{ $t(m.i18n) }}</a>
        </router-link>
      </ul>
      <ul class="w-25 foot-ul">
        <router-link  v-for="(nav,index) in navMenuB" :key="index"
          :to="{ name: nav.to }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">
            {{ $t( nav.i18n )}}
          </a>
        </router-link>
      </ul>
      <ul class="w-25 foot-ul">
        <router-link  v-for="(nav,index) in navMenuC" :key="index"
          :to="{ name: nav.to }"
          active-class="active"
          class="foot-item" tag="li">
          <a class="nav-link">
            {{ $t( nav.i18n )}}
          </a>
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
import { mapState } from 'vuex'
import { translateI18n } from '@/utils'
import {
  navMenusGroupA,
  navMenusGroupB,
  navMenusGroupC } from './js/nav-menu.js'

export default {
  name:"FootContainer",
  data() {
    return {
      lang:'',
      langOptions:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        {id:"zh-TW",text:"繁體中文"},
      ],
      copyright:"Copyright © 2020 All rights reserved.",
    }
  },
  mounted() {
    this.lang =this.$i18n.locale;
  },
  methods: {
    langChanged( lg ) {
      // console.log(lg)
      const i18nLang = this.$i18n.locale;
      if(i18nLang !== lg){
        this.$i18n.locale = lg;
        this.$store.commit('setLang',lg)
      }
    }
  },
  computed: {
    ...mapState({
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
  font-weight:300;
  color:rgba(4,6,46,1) !important;
}

.fa-socail-icon {
  margin-top: 1.25rem;
  font-size:30px;
}
</style>
