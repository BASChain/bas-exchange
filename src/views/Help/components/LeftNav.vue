<template>
  <el-aside width="476px">
    <div class="bas-help--leftnav">
      <div class="bas-help-navlogo">
        <img src="/static/icons/logo_green.png">
        <p>
          Help Center
        </p>
      </div>
      <el-menu
        text-color="#04062E"
        active-text-color="#FFF"
        :default-active="activeName" class="bas-el-menu-bg">
        <el-menu-item class="bas-el-menu-item"
          v-for="(m,idx) in menus" :key="idx"
          @click="navRoute(m)"
        :index="m.path">
          <span>{{$t(`l.${m.i18nkey}`)}}</span>
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
      activeName:"help.issue",
      menus:[
        {
          name:"help.issue",
          i18nkey:"HelpNavCommIssue",
          text:"常见问题",
          to:"help.issue",
          path:"/help/issue",
        },
        {
          name:"help.buyer",
          i18nkey:"HelpNavBuyerIssue",
          text:"Buyer",
          to:"help.buyer",
          path:"/help/buyer",
        },
        {
          name:"help.seller",
          i18nkey:"HelpNavSellerIssue",
          text:"Seller",
          to:"help.seller",
          path:"/help/seller",
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
    let name = basvue.$route.fullPath
    //console.log('>>>',name)
    if(name){
      this.activeName = name;
    }else{
      this.activeName = "help.issue";
    }
  },
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
