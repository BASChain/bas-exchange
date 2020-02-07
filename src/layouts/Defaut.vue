<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <router-link :to="{name:'home.index'}"
        class="navbar-brand"
      >
        BAS Exchange
      </router-link>

      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"/>
      </button>

      <div :class="{show : menuCollapsed}"
        class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <router-link
            :to="{ name : 'home.index'}"
            active-class="active"
            class="nav-item"
            tag="li">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            :to="{ name : account.index }"
            active-class="active"
            class="nav-item"
            tag="li">
            <a class="nav-link">Account</a>
          </router-link>
        </ul>

        <span class="navbar-text">
            <a class="btn btn-secondary" href="#"
              @click.prevent="logout">
              <i class="fa fa-sign-out"></i>
            </a>
        </span>
      </div>
    </nav>

    <!-- main container -->
    <div class="container pt-5">
      <div class="row">
        <div class="col col-12">
          <slot/>
        </div>
      </div>
    </div>
  </div
<template>

<script>
export default {
  name:'DefaultLayout',
  data() {
    return {
      menuCollapsed:false,
    };
  },

  methods:{
    logout() {
      console.log('>>>>auth>logout')
      this.$store.dispatch('auth/logout')
    },
    toggleMenu() {

    }
  }
}
</script>
<style>

</style>
