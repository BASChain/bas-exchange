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

        <el-menu
          class="mx-auto basnav-el--wrapper"
          :text-color="navMenuColor"
          active-text-color="#00ca9b"
          :router="false"
          :default-active="'apply.index'"
          mode="horizontal">

          <template v-for="(item,index) in topMenus">

            <el-menu-item v-if="!item.children"
              :key="index" :index="item.to"
              class="bas-elnav-item"
              @click="navRouter(item)"
              :class="currentRoute && currentRoute.split('/').find(p => p ===item.to) ? 'is-active':''">
              <router-link
                :to="{name:item.name,path:item.to}"
                active-class="active"
                tag="a">
                {{$t(item.i18n)}}
              </router-link>
            </el-menu-item>

            <el-submenu
              v-if="item.children && item.children.length > 0"
              :index="item.to" :key="index"
              >
              <template slot="title">
                <span  @click="hasSubClick(item.name)">
                  {{$t(item.i18n)}}
                </span> {{containPath(item.to)}}
              </template>
              <el-menu-item v-for="(it,idx) in item.children" :key="idx"
                @click="navSubRouter(item,it)"
                class="bas-elnav-item"
                :class="currentRoute.includes(item.to) ? 'is-active':''">
                <router-link
                  :to="{name:it.name,path:it.to}"
                  active-class="active"
                  tag="a">
                  {{$t(it.i18n)}}
                </router-link>

              </el-menu-item>
            </el-submenu>

          </template>
        </el-menu>

        <!-- <ul class="navbar-nav mx-auto">
          <router-link v-for="(item,index) in topMenus" :key="index"
             class="nav-item"
            tag="li">
            <a class="nav-link" :class="topnavClass">
              {{ $t(item.i18n) }}
            </a>
          </router-link>
        </ul> -->
        <!-- avatars -->
        <div class="avatar-wrap">
          <top-avatar />
        </div>
        <div class="mine-wrap d-none">
          <top-mine />
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
<style>
.mine-wrap {
  margin: auto .5rem auto 0;
  line-height: 38px;
  padding: 0 4px 0 1px;
  background: rgba(0,202,155,.85);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.basnav-el--wrapper.el-menu.el-menu--horizontal {
  background: transparent;
  border: none;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom:2px solid #00CA9B !important;
}

.basnav-el--wrapper.el-menu--horizontal>.el-menu-item a{
  color: inherit;
}

.basnav-el--wrapper.el-menu--horizontal>.el-menu-item a:hover {
  color:#00CA9B;
}
.bas-elnav-item {
  font-size: 1rem;
  padding: 0 .5rem;
}

.el-menu--popup .bas-elnav-item > a{
  font-size: .85rem;
  color: rgba(4,6,46,1);
}

.el-menu--popup .bas-elnav-item > a:hover {
  color:#00CA9B;
  text-decoration: none;
}
.basnav-el--wrapper li:focus,.basnav-el--wrapper li:hover {
  background: transparent !important;
  color:#00CA9B !important;
}

.bas-elnav-item a.active {
  color:#00CA9B !important;
}

.el-menu--horizontal>.el-submenu:focus,.el-menu--horizontal>.el-submenu:hover{
  background: transparent !important;
  color:#00CA9B !important;
}
.basnav-el--wrapper > .el-submenu .el-submenu__title {
  font-size: .9rem;
}
.basnav-el--wrapper > .el-submenu .el-submenu__title:hover {
  background: transparent !important;
  color:#00CA9B !important;
}

.basnav-actived {
  border-bottom: 2px solid #00CA9B;
  color:#00CA9B;
}

a.basnav-route-actived {
  color:#00CA9B !important;
}

.basnav-el--wrapper li>a {
  font-size:1rem;
  text-decoration: none!important;
}
.basnav-popper-class {
  font-size: 1rem;
  color: #00CA9B;
}
.basnav-el--wrapper li>a:hover{
  font-size:1rem;
  text-decoration: none!important;
}
</style>
<script>

import  {navMenus}  from './js/nav-menu.js'
import TopAvatar from './TopAvatar.vue'
import TopMine from './TopMine'
export default {
  name:"topbar",
  components:{
    TopAvatar,
    TopMine,
  },
  data() {
    return {
      menuCollapsed:false,
      navMenus,
      lang:'',
      options:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        {id:"jp",text:"日本語"},
        // {id:"zh-TW",text:"繁體中文"},
      ],
      state:{
        activeColor:"#00ca9b"
      },
      currentRoute:''
    };
  },
  props:{
    isBlack:{
      type:[Boolean,String],
      required:true
    }
  },
  methods:{
    hasSubClick(name){
      console.log(name)
      this.$router.push({name})
    },
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
    },
    pathActiveLast(to){
      let fullPaths = this.$route.fullpath.split('/')
      return fullPaths.length && fullPaths[fullPaths.length-1] === to
    },
    containPath(to){
      let fullPath = this.$route.fullpath

    },
    navRouter(item){
      console.log('menu',item)
      this.$router.push({name:item.name})
    },
    navSubRouter(item,it){
      console.log('submenu',item,it)
    }
  },
  computed: {
    ...Vuex.mapState({
      topnav:state=>state.topnav
    }),
    topMenus (){
      return this.navMenus.filter(m => !m.hidden)
    },
    navMenuColor(){
      return this.isBlack ? "#ffffff" : "#04062e"
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
    },
    currentRoutePath(){
      return this.$route.fullpath||''
    }
  },
  mounted() {
    let curLang = this.$store.getters['currentLang']
    this.$i18n.locale = curLang;
    this.lang = curLang
    this.currentRoute = this.$route.fullPath
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

