<template>
  <nav class="navbar navbar-expand-lg fixed-top nav-warp-bg">
    <div id="topbar-wrap" class="container">
      <router-link
        :to="{ name: 'home.index' }"
        class="navbar-brand">
        <img src="/static/icons/logo_btm.png" alt="BAS Exchange" class="bas-logo">
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
        <ul class="navbar-nav ml-auto">
          <router-link
            :to="{ name: 'home.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Home
            </a>
          </router-link>
          <router-link
            :to="{ name: 'account.index' }"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Registed
            </a>
          </router-link>
          <router-link
            :to="{ name: 'market.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Market
            </a>
          </router-link>
          <router-link
            :to="{ name: 'account.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Download
            </a>
          </router-link>

          <!-- avatars -->
        </ul>
        <div class="avatar-wrap">
          <b-dropdown variant="link" size="lg" no-caret toggle-class="text-decoration-none">
            <template v-slot:button-content>
              <!-- <div class="avatar-big">SS</div> -->
              <i class="fa fa-user-circle-o avatar-icon"></i>
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
export default {
  name:"topbar11",
  data() {
    return {
      menuCollapsed:false,
    };
  },
  methods:{
    toggleMenu() {
      console.log('toggler')
    },
    logout() {
      console.log('>>>>auth>logout')
      this.$store.dispatch('auth/logout')
    },
  }
}
</script>
<style>
.nav-warp-bg{
  height: 64px;
  background:rgba(245,246,246,.95);
}
.avatar-wrap{
  padding-left:20px;
}

#navContainer a.nav-link {
  color:rgba(4,6,46,1) !important;
}

.avatar-big{
  height: 44px;
  width: 44px;
  font-size:32px;
  border: none;
  border-radius: 44px;
  color: rgba(255,255,255,1);
  background:rgba(0,202,155,1);
}
.avatar-icon{
  height: 44px;
  width: 44px;
  font-size:44px;
  border: none;
  border-radius: 44px;
  color: rgba(255,255,255,1);
  background:rgba(0,202,155,1);
}
</style>
