<template>
  <div>
    <h6 class="text-center pb-3">
      {{$t('p.HelpPopQuest1InnerTitle')}}
    </h6>
    <div class="bas-issue-section">
      {{$t('p.HelpPopQuest1InnerP01')}}
    </div>
    <div class="bas-issue-section">
      <h6>步骤一、下载安装文件</h6>
      <p>
        点击下方按钮下载 zip 文件，等待下载完成后，将文件解压缩。
      </p>
      <el-button @click="downloadExtHandle" class="bas-btn-primary">
        Download Chrome extensions
      </el-button>
    </div>
    <div class="bas-issue-section">
      <h6>步骤二、打开“扩展程序”页面</h6>
      <p>
      点击 Chrome 浏览器右上角菜单栏，从“更多工具”中打开“扩展程序”。
      </p>
      <img src="static/icons/help_basext_01.png" class="img-fluid">
    </div>
    <div class="bas-issue-section">
      <h6>步骤三、在右上角打开“开发者模式</h6>
      <p>
        点击下方按钮下载 zip 文件，等待下载完成后，将文件解压缩。在右上角找到开发者模式按钮，点击开启
      </p>
      <img src="static/icons/help_basext_02.png" class="img-fluid">
    </div>
    <div class="bas-issue-section">
      <h6>步骤四、安装扩展程序</h6>
      <p>
        在右上角找到开发者模式按钮，点击开启
      </p>
      <img src="static/icons/help_basext_03.png" class="img-fluid">
      <p>将下载的BAS插件.zip直接拖入Chrome插件管理界面安装.</p>
      <img src="static/icons/help_chrome_drop_install.png" class="img-fluid">
      <p>也可以解压(推荐用winrar)插件后,点击左侧“加载以解压的扩展程序”，选择刚才解压缩后的文件夹，点击“选择”，完成安装</p>
      <img src="static/icons/help_basext_04.png" class="img-fluid">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner1",
  computed: {
    ...mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {
    downloadExtHandle(){
      let url = getOfflineExtFile(BasRuntime.browser)
      window.open(url)
    },
  },
}
</script>
<style>

</style>
