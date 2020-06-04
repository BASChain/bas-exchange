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
            <li v-for="(item,index) in navMenus"

            :key="index">
              <router-link v-if="!item.children"
                active-class="active"
                :to="{name:item.name,path:item.to}"
                tag="a" class="nav-link" :class="topnavClass">

                  {{ $t(item.i18n) }}

              </router-link>
            </li>
          </ul>
        <!-- avatars -->
        <div class="avatar-wrap">
          <top-avatar />
        </div>
        <div class="i18n-wrapper">
          <el-select v-model="lang" size="mini"
            @change="langChanged(lang)"
            class="bas-i18n-select-top">
            <el-option v-for="opt in selI18ns"
              size="mini"
              :label="opt.text"
              :value="opt.id"
              :key="opt.id">
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
  name:"topbar",
  components:{
    TopAvatar,
  },
  computed: {
    toggleMenu(){
      //mini screen
    },
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
  data() {
    return {
      menuCollapsed:false,
      navMenus,
      lang:'',
      selI18ns:[
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
    downloadToggle () {

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

  mounted() {
    let curLang = this.$store.getters['currentLang']
    console.log(curLang)
    this.$i18n.locale = curLang;
    this.lang = curLang
  },
}
</script>
<style>
.header-wrap {
  height: 68px;
  width: 100vw;
}

.header-logo {
  margin: 0 !important;
  width: 168px;
}

.top-menu-black {
  font-size:16px;
  font-weight:300;
  color:rgba(255,255,255,1) !important;
  line-height:22px;
  letter-spacing:1px;
}

.top-menu {
  font-size:16px;
  font-weight:300;
  color:rgba(4,6,46,1) !important;
  line-height:22px;
  letter-spacing:1px;
}

.header-warp-black {
  background-color: rgba(4,6,46,.5);
}

.header-warp-white {
  background-color: rgba(255,255,255,.9);
  transition-property:all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  /* transition-delay: 0s;
  box-shadow: 0 1px 1px 0 rgba(196,196,196,0.5); */
}

.active .top-menu {
  color: #00CA9B !important;
  font-weight:300;
  border-bottom:2px solid rgba(0,202,155,1);
}

.bas-i18n-select-top {
  width: 100px;
  user-select: none;
  background: transparent;

}
.bas-i18n-select-top div {
  background: transparent;
  border: none;
}
.bas-i18n-select-top input {
  text-align: right;
  background: transparent;
  border: none;
}

.header-warp-black .bas-i18n-select-top input{
  color:#fff;
}

</style>
