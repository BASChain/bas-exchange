<template>
  <div class="bas-wallet--leftnav">
    <el-menu
      text-color="#04062E"
      active-text-color="#FFF"
      default-active="1" class="bas-gray-bg">
      <el-menu-item class="bas-el-menu-item"
        v-for="(m,idx) in menus" :key="idx"
        @click="navRoute(m)"
      :index="(idx+1).toString()">
        <span>{{ m.text }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:"WalletLeftNavigation",
  data(){
    return {
      menus:[
        {
          name:"wallet.index",
          i18nkey:"WalletLeftNavInfo",
          text:"帐户信息",
          to:"wallet.index",
        },
        {
          name:"wallet.transaction",
          i18nkey:"WalletLeftNavInTransaction",
          text:"交易中",
          to:"wallet.transaction",
        },
        {
          name:"wallet.income",
          i18nkey:"WalletLeftNavIncome",
          text:"域名收入",
          to:"wallet.income",
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
  }
}
</script>
<style>
.bas-wallet--leftnav {
  font-size: 1.25rem;
  margin-right: 1.5rem;
  text-align: center;
  background:transparent;
  border:1px solid rgba(245,246,246,1);
}
</style>
