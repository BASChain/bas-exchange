<template>
  <div class="bas-wallet--leftnav">
    <el-menu
      text-color="#04062E"
      active-text-color="#FFF"
      :default-active="currentActive" class="bas-gray-bg">
      <el-menu-item class="bas-el-menu-item"
        v-for="(m,idx) in menus" :key="idx"
        @click="navRoute(m)"
      :index="m.name">
        <span>{{$t(`l.${m.i18nkey}`) }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:"WalletLeftNavigation",
  data(){
    return {
      currentActive:"wallet.index",
      menus:[
        {
          name:"wallet.index",
          i18nkey:"WalletInfo",
          text:"帐户信息",
          to:"wallet.index",
        },
        {
          name:"wallet.transaction",
          i18nkey:"OnMarket",
          text:"交易中",
          to:"wallet.transaction",
        },
        {
          name:"wallet.mailservers",
          i18nkey:"EWalletDomainMailServers",
          text:"邮箱域名",
          to:"wallet.mailservers",
        },
        {
          name:"wallet.maillist",
          i18nkey:"EWalletMailList",
          text:"我的邮箱",
          to:"wallet.maillist",
        },
      ]
    }
  },
  methods:{
    navRoute(menu){
      if(!menu || !menu.to)return
      this.$router.push({
        name:`${menu.to}`
      })
    }
  },
  mounted() {
    let name = this.$route.name
    this.currentActive = this.$route.name
  },
}
</script>
<style>
.bas-wallet--leftnav {

  font-size: 1.25rem;
  margin-top: 1rem;
  margin-right: 1.5rem;
  text-align: center;
  background:transparent;
  border:1px solid rgba(245,246,246,1);
}
</style>
