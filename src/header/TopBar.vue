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
        <span class="navbar-toggler-icon"/>
      </button>
      <div id="navContainer"
        :class="{ show : menuCollapsed}"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <router-link v-for="(item,index) in topMenus" :key="index"
            :to="{ name: item.to }"
            active-class="active" class="nav-item"
            tag="li">
            <a class="nav-link" :class="topnavClass">
              {{ $t(item.i18n) }}
            </a>
          </router-link>

          <!-- avatars -->
        </ul>
        <div class="avatar-wrap">
          <!-- <b-dropdown variant="link" size="lg"
            class="m-md-2"
            no-caret toggle-class="text-decoration-none">
            <template v-slot:button-content>
              <div class="avatar-big">Login</div>
            </template>

            <b-dropdown-text>Current: Ropsten</b-dropdown-text>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Account Manager</b-dropdown-item>
            <b-dropdown-item>Test Network</b-dropdown-item>
            <b-dropdown-item>Revene</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">
              <i class="fa fa-sign-out"/>
              Logout
            </b-dropdown-item>
          </b-dropdown> -->

          <top-avatar />
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
  data() {
    return {
      menuCollapsed:false,
      navMenus
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
      alert('logout')
    }
  },
  computed: {
    topMenus (){
      return this.navMenus
    },
    topbarBgClass() {
      //console.log(this.isBlack)
      return this.isBlack ? 'header-warp-black' : 'header-warp-white'
    },
    topnavClass() {
      return this.isBlack ? 'top-menu-black' : 'top-menu'
    },
    topLogo (){
      return this.isBlack ? '/static/icons/logo_header.png' : '/static/icons/logo_header_blk.png'
    }
  },
}
</script>
<style>
.header-wrap {
  height: 68px;
  width: 100%;
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
  transition-delay: 0s;
  box-shadow: 0 1px 1px 0 rgba(196,196,196,0.5);
}

.active .top-menu {
  color: #00CA9B !important;
  font-weight:300;
  border-bottom:2px solid rgba(0,202,155,1);
}
</style>
