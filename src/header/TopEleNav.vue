<template>
  <nav class="navbar navbar-expand-lg fixed-top header-wrap"
    :class="topbarBgClass"
    >

    <div class="container" id="TopBar">
      <router-link
        :to="{ name: 'home.index' }"
        class="navbar-brand">
        <img :src="topLogo" alt="BAS Exchange" class="header-logo">
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu">
        <i class="fa fa-bars" style="color:#fff"></i>
      </button>
      <div id="navContainer"
        :class="{ show : menuCollapsed}"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <!-- <router-link v-for="(item,index) in topMenus" :key="index"
            :to="{name:item.name,to:item.to}"
            active-class="active"
            :class="(!item.children) ? 'nav-item' : 'dropdown'"
            :tag="(!item.children) ? 'li' : 'li'">
            <a class="nav-link"
              :class="topnavClass">
              {{ $t(item.i18n) }}
            </a>
          </router-link> -->

          <template v-for="(items,index) in topMenus">
            <router-link v-if="!item.children" :key="index"
              :to="{name:item.name,path:item.to}"
              active-class="active"
              tag="li">
              <a class="nav-link" :class="topnavClass">
                {{ $t(item.i18n) }}
              </a>
            </router-link>

          </template>
        </ul>

        <!-- avatars -->
        <div class="avatar-wrap">
          <top-avatar />
        </div>
        <div class="i18n-wrapper">
          <el-select v-model="lang" size="mini"
            @change="langChanged(lang)"
            class="bas-i18n-select-top">
            <el-option v-for="option in options"
              size="mini"
              :label="option.text"
              :value="option.id"
              :key="option.id">
            </el-option>
          </el-select>
        </div>
      </div>

    </div>

  </nav>
</template>

<script>
import  {navMenus}  from './js/nav-menu.js'
import TopAvatar from './TopAvatar.vue'

export default {
  name:"topnavEle",
  components:{
    TopAvatar,
  },
  data() {
    return {
      menuCollapsed:false,
      navMenus,
      lang:'',
      options:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        // {id:"zh-TW",text:"繁體中文"},
      ]
    };
  },
  props:{
    isBlack:{
      type:[Boolean,String],
      required:true
    }
  },
  methods:{
    toggleMenu () {

    },
    logout() {
      //alert('logout')
    },
    langChanged( lg ) {

      const i18nLang = this.$i18n.locale;
      if(i18nLang !== lg){
        this.$i18n.locale = lg;
        this.$store.commit('setLang',lg)
      }
    }
  },
  computed: {
    topMenus (){
      return this.navMenus
    },
    topbarBgClass() {
      return this.isBlack ? 'header-warp-black' : 'header-warp-white'
    },
    topnavClass() {
      return this.isBlack ? 'top-menu-black' : 'top-menu'
    },
    topLogo (){
      return this.isBlack ? '/static/icons/logo_header.png' : '/static/icons/logo_header_blk.png'
    }
  },
  mounted() {
    let curLang = this.$store.getters['currentLang']
    this.$i18n.locale = curLang;
    this.lang = curLang
  },
}
</script>
<style>

</style>
