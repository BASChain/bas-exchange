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
                {{$t('p.ProductsExplorerAboutContents')}}
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
                <p>{{item.title}}</p>
              </div>
              <div class="bas-inner-intro">
                <p>{{item.intro}}</p>
              </div>
              <div class="bas-inner-lable">
                <div v-for="min in item.labels" :key="min.hash" class="bas-inner-lable--min">{{min}}</div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <div class="bas-btn-get" @click="toDetail(item.id)">Get</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bas-type-title">
        <p>{{$t('l.BowserExtension')}}</p>
      </div>
      <div class="row justify-content-start">
        <div v-for="item in browsers" :key="item.hash" class="col-xl-4 col-md-6 col-12 pt-3">
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon">
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <p>{{item.title}}</p>
              </div>
              <div class="bas-inner-intro">
                <p>{{item.intro}}</p>
              </div>
              <div class="bas-inner-lable">
                <div v-for="min in item.labels" :key="min.hash" class="bas-inner-lable--min">{{min}}</div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <div class="bas-btn-get">Get</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-left {
  position: absolute;
  top: 128px;
}
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
.dropdown {
  position: absolute;
  top: 195px;
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
  /* width:64px; */
  height:32px;
  background:rgba(245,246,246,1);
  border-radius:17px;
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(0,202,155,1);
  line-height:30px;
  letter-spacing:1px;
  border: 0px;
  padding: 0px;
  transform: scale(1,1);
  -ms-transform: scale(1,1); /* IE 9 */
  -webkit-transform: scale(1,1); /* Safari and Chrome */
}
.bas-inner-intro > {
  margin-bottom: 0rem !important;
}
.bas-inner-intro {
  width: 100%;
  /* height: 66px; */
  padding-top: 8px;
  /* background-color: darkgray; */
}
.bas-inner-title {
  width: 100%;
  height: 30px;
  padding-top: 6px;
}
.bas-inner-title > p {
  font-size: 20px;
  /* font-size: 1.2rem; */
  line-height: 1.4;

  /* width:70px;
  height:30px; */
  /* font-size:22px; */
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
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
  width: 100%;
  height: 25px;
  display: flex;
}
.bas-app-detail--left {
  margin: 3% 0 3% 5%;
}
.bas-app-detail--left > img {
  width: 100px;
  /* height: 118px; */
}
.bas-app-detail--center {
  width: 50%;
  /* height: 118px; */
  margin-left: 2.5%;
  margin-top: 2%;
}
.bas-app-detail--right {
  width: 16%;
  /* width: 75px; */
  /* height: 118px; */
  margin-top: 3%;
  margin-right: 3%;
  text-align: center;
}
.bas-type-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.bas-type-title > p {
  font-size: 1.8rem;
  /* font-size:36px; */
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:50px;
  letter-spacing:2px;
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
  /* min-height: 142px; */
  background:rgba(255,255,255,1);
  border-radius:8px;
  /* padding: 10px 20px; */
  /* padding: 4% 5%; */
  justify-content: space-between;
  display: flex;
  justify-content: space-between;
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
.bas-explorer-content > p {
  position: absolute;
  left: 0;
}

.bas-explorer-content {
  width: 22%;
  /* left: 248px; */
  justify-self: start;
  display: inline-flex;
  direction: column;
  align-items: stretch;
  margin-top: 20px;
  position: absolute;
  top: 240px;
}
</style>
<script>
import {getDownloadAppsPath,MacBrowserApp,ExtChromeOffline} from '@/bizlib/apps'
export default {
  name:"AppStoreIndex",
  computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      menuVisible: false,
      os:'mac',
      osText:"Get BAS Explorer For ",
      aboutExplorer:'BAS浏览器是基于Chromium再开发的融合了BAS域名系统并且升级了安全协议的浏览器，目前处于开发阶段，只能用于浏览BAS测试网络.',
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
          icon:"/static/icons/bas_bp.png",
          title:"BPasswordPro",
          intro:"Password Management Using Blockchain Tech",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app",
          id: 1
        },
        {
          icon:"/static/icons/bas_bmail.png",
          title:"BMail",
          intro:"End-to-End Encrypted Mail System Using Blockchain Tech",
          labels:[
            'ios',
            'android',
            'other'
          ],
          type:"app",
          id: 2
        },
        // {
        //   icon:"/static/icons/bas_bmail.png",
        //   title:"Bzoom",
        //   intro:"intro",
        //   labels:[
        //     'ios',
        //     'android',
        //     'other'
        //   ],
        //   type:"app",
        //   id: 3
        // },
        // {
        //   icon:"/static/icons/bas_bmail.png",
        //   title:"Bchat",
        //   intro:"intro",
        //   labels:[
        //     'ios',
        //     'android',
        //     'other'
        //   ],
        //   type:"app",
        //   id: 4
        // },chrome firefox ,opera
        {
          icon:"/static/icons/bas-browser.png",
          title:"BAS Extension",
          intro:"Domain Service Using Blockchain",
          labels:[
            'chrome',
            'firefox',
            'opera'
          ],
          type:"browser",
          id: 5
        },
        {
          icon:"/static/icons/meta.png",
          title:"MetaMask",
          intro:"intro",
          labels:[
            'chrome',
            'firefox',
            'opera'
          ],
          type:"browser",
          id: 6
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
    },
    toDetail(id) {
      if (id===0) {
        this.$router.push('/appstore/appdetail')
      }
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
