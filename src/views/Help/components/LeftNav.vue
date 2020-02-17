<template>
  <el-aside width="476px">
    <div class="bas-help--leftnav">
      <div class="bas-help-navlogo">
        <img src="/static/icons/logo-gray.png">
        <p>
          Help Center
        </p>
      </div>
      <el-menu
        text-color="#04062E"
        active-text-color="#FFF"
        default-active="1" class="bas-el-menu-bg">
        <el-menu-item class="bas-el-menu-item"
          v-for="(m,idx) in menus" :key="idx"
          @click="navRoute(m)"
        :index="(idx+1).toString()">
          <span>{{ m.text }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name:"HelpLeftNav",
  data(){
    return {
      menus:[
        {
          name:"help.issue",
          i18nkey:"HelpNav",
          text:"常见问题",
          to:"help.issue",
        },
        {
          name:"help.buyer",
          i18nkey:"HelpNav",
          text:"Buyer",
          to:"help.buyer",
        },
        {
          name:"help.seller",
          i18nkey:"HelpNav",
          text:"Seller",
          to:"help.seller",
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
.bas-help--leftnav {
  font-size: 1.25rem;
  margin-right: 1.5rem;
  text-align: center;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.bas-help-navlogo {
  padding: 1rem auto;
  border-bottom:1px solid rgba(235,237,237,1);
}

.bas-help-navlogo>img {
  margin: 1rem auto;
  width: 60px;
  height: 52px;
}
.bas-el-menu-bg {
  background:rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
}
</style>
