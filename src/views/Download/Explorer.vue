<template>
  <div class="bas-extension-bg">
    <div class="bas-extension-wrapper">
      <h1 class="text-center mb-4">
        BAS Explorer
      </h1>
      <div class="bas-extension--left">
        <div class="bas-explorer-download">
          <a class="download-event"
            @click="DownloadExplorerHanle">
            <i class="fa fa-download"> </i>
            {{osText}}
          </a>
          <el-select v-model="os"
            class="bas-explorer-select"
            size="large">
            <el-option
              v-for='item in osTypes'
              :label="item.text"
              :value="item.os"
              :key="item.os">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="bas-explorer-content">
        <p>
          {{aboutExplorer}}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import {getDownloadAppsPath,MacBrowserApp} from '@/bizlib/apps'
export default {
  name:"DownloadExplorer",
  data() {
    return {
      os:'mac',
      osText:"Get BAS Explorer For ",
      aboutExplorer:'浏览器介绍....',
      osTypes:[
        {
          text:"MAC",
          i18n:"GetExplorer4Mac",
          os:'mac'
        },
        // {
        //   text:"Windows",
        //   i18n:"GetExplorer4Win",
        //   os:'windows'
        // }
      ]
    }
  },
  methods: {
    DownloadExplorerHanle(){
      let fileType = this.os
      let url = getDownloadAppsPath(MacBrowserApp)
      console.log('>>>>>>',url)
      window.open(url)
    }
  },
}
</script>
<style>
.bas-extension-bg {
  height: calc(100vh + 60px);
  height:-webkit-calc(100vh + 60px);
  height: -moz-calc(100vh + 60px);
  width: 100%;
  display: inline-flex;
  direction: column;
  justify-content: flex-start;
  align-items: center;
  background: url('./assets/explorer_bg.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
}

.bas-extension-wrapper {
  width:55%;
  /* margin-left: 18%; */
  display: inline-block;
  direction: column;
  justify-content:start;
  align-items: stretch;
  /* border: 1px solid #fff; */
}

.bas-extension-wrapper h1 {
  font-size: 4.5rem;
  color: #fff;
}

.bas-extension--left {
  width: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  color:#fff;
}

.bas-explorer-content {
  width: 100%;
  justify-self: start;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: stretch;
}

.bas-explorer-content > p {
  text-align: left;
  width: 335px;
  /* margin: .75rem .25rem .2rem 0; */
  color:#fff;
  word-wrap: break-word;
  /* border: 1px solid #88934a; */
}

.bas-explorer-download {
  width: 324px;
  height: 40px;
  color:#fff;
  margin: 1rem auto;
  background: rgba(0,202,155,.95);
  padding: auto .25rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.bas-explorer-download > a {
  width: calc(100% - 80px);
  padding: 4px 0;
  font-size: 1.2rem;
  font-weight: 400;
  text-align:center;
  cursor: pointer;
}

.bas-explorer-download > a > i {
  margin-right: .5rem;
}

.bas-explorer-select {
  width: 80px;
  background: rgba(0,202,155,.95);
  align-items: center;
}

.bas-explorer-select span.el-input__prefix {
  display: -webkit-flex;
  align-items: center;
  color:#fff;
}
.bas-explorer-select .el-input__inner {
  background: rgba(0,202,155,.95);
  border-color: rgba(0,202,155,.95);
  color:#fff;
}
.bas-explorer-select .el-input__suffix-inner{
  background: rgba(0,202,155,.95);
  border-color: rgba(0,202,155,.95);
  color:#fff;
}
</style>
