<template>
  <nav class="navbar navbar-expand-lg fixed-top header-wrap header-warp-bg">
    <div class="container" id="TopBar">
      <router-link
        :to="{ name: 'home.index' }"
        class="navbar-brand">
        <img src="/static/icons/logo_header.png" alt="BAS Exchange" class="header-logo">
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
            <a class="nav-link top-menu">
              {{ $t(item.i18n) }}
            </a>
          </router-link>

          <!-- avatars -->
        </ul>
        <div class="avatar-wrap">
          <b-dropdown variant="link" size="lg"
            class="m-md-2"
            no-caret toggle-class="text-decoration-none">
            <template v-slot:button-content>
              <div class="avatar-big">Login</div>

              <!-- <i class="fa fa-user-circle-o avatar-icon"></i> -->
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
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import  {navMenus}  from './js/nav-menu.js'

export default {
  name:"topbar",
  data() {
    return {
      menuCollapsed:false,
      navMenus
    };
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
      console.log(JSON.stringify(this.navMenus))
      return this.navMenus
    }
  },
}
</script>
<style>
.header-wrap {
  height: 100px;
  width: 100%;
}

.header-warp-bg {
  background-color: rgba(4,6,46,1);
}

.header-logo {
  margin: 0 !important;
  width: 228px;
  height: 48px;
}

.top-menu {
  font-size:16px;
  font-weight:300;
  color:rgba(255,255,255,1) !important;
  line-height:22px;
  letter-spacing:1px;
}



.active .top-menu {
  color: #00CA9B !important;
  font-weight:300;
  border-bottom:2px solid rgba(0,202,155,1);
}
</style>
