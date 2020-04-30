<template>
  <div>
    <div class="container pt-3 pb-3">
      <div class="app-exporer-zh-cn">
        <div class="app-explorer--left">
          <div class="inner-center">
            <h1 class="text-left mb-4">
              BAS Explorer
            </h1>
            <div class="dropdown abs-btn-group" role="group">
              <button type="button" class="bas-btn-group--left" @click="DownloadExplorerHanle">{{osText + os}}</button>
              <button id="bas-btn-group--right" @click="clickMenu" type="button" class="dropdown-toggle" 
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="triangle" :style="{ display: menuVisible ? '':'none' }"></div>
              <div class="dropdown-menu bas-btn-group--menu" :class="menuVisible?'show':''" 
              aria-labelledby="bas-btn-group--right">
                <a class="dropdown-item" href="#" @click="clickMac">Mac</a>
                <a class="dropdown-item" href="#" @click="clickWin">Windows</a>
              </div>
            </div>
            <div class="bas-explorer-content">
              <p>
                {{aboutExplorer}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bas-type-title">
        <p>APP</p>
      </div>
      <div class="row justify-content-start">
        <div v-for="item in apps" :key="item.hash" class="col-xl-4 col-md-6 col-12 pt-3">
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon">
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <h5>{{item.title}}</h5>
              </div>
              <div class="bas-inner-intro">
                <p>{{item.intro}}</p>
              </div>
              <div class="bas-inner-lable">
                <div v-for="min in item.labels" :key="min.hash" class="bas-inner-lable--min">{{min}}</div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <button class="bas-btn-get">Get</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bas-type-title">
        <p>浏览器插件</p>
      </div>
      <div class="row justify-content-start">
        <div v-for="item in browsers" :key="item.hash" class="col-xl-4 col-md-6 col-12 pt-3">
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon">
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <h5>{{item.title}}</h5>
              </div>
              <div class="bas-inner-intro">
                <p>{{item.intro}}</p>
              </div>
              <div class="bas-inner-lable">
                <div v-for="min in item.labels" :key="min.hash" class="bas-inner-lable--min">{{min}}</div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <button class="bas-btn-get">Get</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.triangle {
  width: 0;
  height: 0;
  top: 0px;
  left: 308px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  box-sizing: border-box;
  position: relative;
}

.dropdown-item:focus {
  background-color: rgba(0, 202, 155, 1);
}
.dropdown-item:hover {
  background-color: rgba(0, 202, 155, 0.5);
}
.dropdown-menu {
  left: 259px;
  top: -2px;
  min-width: 7rem;
  width: 115px;
  border-top: transparent;
  position: relative;
}
.dropdown-toggle::after {
  color: white;
  border-top: 0.3em solid;
  border-right: 0.2em solid transparent;
  border-bottom: 0;
  border-left: 0.2em solid transparent;
}
.abs-btn-group > .bas-btn-group--left {
  width: 306px;
  height: 48px;
  color:#fff;
  background: rgba(0, 202, 155, 1);
  padding: auto .25rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 20px;
  border: 0px;
}
.abs-btn-group > #bas-btn-group--right {
  width: 18px;
  height: 48px;
  background: rgba(0, 171, 131, 1);
  margin-left: -4px;
  margin-top: -19px;
  border: 0px;
  padding-top: 5px;
}
.bas-btn-get {
  width:66px;
  height:34px;
  background:rgba(245,246,246,1);
  border-radius:17px;
  font-size:22px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(0,202,155,1);
  line-height:30px;
  letter-spacing:1px;
  border: 0px;
}
.bas-inner-intro {
  width: 210px;
  height: 66px;
  padding-top: 8px;
  /* background-color: darkgray; */
}
.bas-inner-title {
  width: 210px;
  height: 30px;
  padding-top: 6px;
}
.bas-inner-title > h5 {
  font-size: 22px;
  line-height: 1.4;
}
.bas-inner-lable--min {
  width: auto;
  height: 23px;
  padding: 2px;
  text-align: center;
  font-weight: 400;
  border-radius: 14px;
  line-height:20px;
  font-size:14px;
  font-family:PingFangSC-Regular,Ping;
  color:rgba(159,160,175,1);
  background:rgba(238,240,240,1);
  margin-right: 5px;
  padding: 3px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 1px;
}
.bas-inner-lable {
  width: 210px;
  height: 25px;
  display: flex;
}
.bas-app-detail--left {
  /* padding: 0.5rem 0.5rem; */
  /* background-color: chartreuse; */
}
.bas-app-detail--left > img {
  width: 118px;
  height: 118px;
}
.bas-app-detail--center {
  width: 220px;
  height: 118px;
  padding-left: 8px;
}
.bas-app-detail--right {
  width: 75px;
  height: 118px;
  text-align: center;
}
.bas-type-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.bas-type-title > p{
  font-size: 2rem;
}
.row {
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(235,240,240,1);
}
.bas-app-detail {
  width: 100%;
  min-height: 142px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  padding: 10px 20px;
  justify-content: space-between;
  display: flex;
}
.bas-app-detail > p {
  text-align: right;
}
.app-exporer-zh-cn {
  height: 420px;
  width: 100%;
  background-image: url('./assets/app_explorer_bg_cn.png');
  background-size: cover;
  background-position: 50%;
}

.app-exporer-en {
  height: 420px;
  width: 100%;
  background-image: url('./assets/app_explorer_bg_en.png');
  background-size: cover;
  background-position: 50%;
}

.app-explorer--left {
  top:0;
  left: 20px;
  width: 50%;
  height: 100%;
  z-index:999;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
  color:#fff;
}

.bas-explorer-download {
  width: 324px;
  height: 48px;
  color:#fff;
  margin: 1rem auto;
  background: rgba(0, 202, 155, 1);
  padding: auto .25rem;
  /* display: inline-flex; */
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 20px;
}

.bas-explorer-select {
  width: 80px;
  background: rgba(0, 202, 155, 1);
  /* background: #00AB83; */
  align-items: center;
}
.bas-explorer-select .el-input__inner {
  background: rgba(0, 202, 155, 1);
  color:#fff;
  border: 0px;
}

.inner-center {
  /* display: inline-flex; */
  direction: column;
  width: 60%;
  color:#fff;
}

.bas-explorer-content {
  width: 100%;
  left: 248px;
  justify-self: start;
  display: inline-flex;
  direction: column;
  align-items: stretch;
  margin-top: 20px;
  position: absolute;
}
</style>
<script>
import {getDownloadAppsPath,MacBrowserApp,ExtChromeOffline} from '@/bizlib/apps'
import { mapState } from 'vuex'
export default {
  name:"AppStoreIndex",
  computed: {
    ...mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      menuVisible: false,
      os:'mac',
      osText:"Get BAS Explorer For ",
      aboutExplorer:'浏览器介绍....',
      osTypes:[
        {
          text:"MAC",
          i18n:"GetExplorer4Mac",
          os:'mac'
        },
        {
          text:"Windows",
          i18n:"GetExplorer4Win",
          os:'windows'
        }
      ],
      osApps:[
        {
          icon:"/static/icons/bas_pirate.png",
          title:"Pirate",
          intro:"intro",
          labels:[
            'ios',
            'android'
          ],
          type:"app"
        },
        {
          icon:"/static/icons/bas_bp.png",
          title:"BPasswordPro",
          intro:"intro",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app"
        },
        {
          icon:"/static/icons/bas_bmail.png",
          title:"Bmail",
          intro:"intro",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app"
        },
        {
          icon:"/static/icons/bas_bmail.png",
          title:"Bzoom",
          intro:"intro",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app"
        },
        {
          icon:"/static/icons/bas_bmail.png",
          title:"Bchat",
          intro:"intro",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app"
        },
        {
          icon:"/static/icons/bas-browser.png",
          title:"BAS Explorer",
          intro:"intro",
          labels:[
            'label1',
            'label2',
            'other'
          ],
          type:"browser"
        },
        {
          icon:"/static/icons/meta.png",
          title:"MetaMask",
          intro:"intro",
          labels:[
            'label1',
            'label2',
            'other'
          ],
          type:"browser"
        }
      ]
    }
  },
  methods: {
    clickMenu() {
      this.menuVisible = !this.menuVisible
    },
    clickMac() {
      this.os = 'mac'
      this.menuVisible = false
    },
    clickWin() {
      // this.os = 'windows'
      this.menuVisible = false
      alert("产品开发中")
    },
    DownloadExplorerHanle(){
      let fileType = this.os
      let url = getDownloadAppsPath(MacBrowserApp)
      console.log('>>>>>>',url)
      window.open(url)
    }
  },
  mounted() {

  },
  computed: {
    apps: function() {
      return this.osApps.filter(function(item) {
        if(item.type === 'app') {
          return item
        }
      }) 
    },
    browsers: function() {
      return this.osApps.filter(function(item) {
        if(item.type === 'browser') {
          return item
        }
      })
    }
  }
}
</script>
<style>

</style>
