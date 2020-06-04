<template>
  <div>
    <h6 class="text-center pb-3 pt-2">
      <!-- {{$t('p.HelpPopQuest1InnerTitle')}} -->
    </h6>
    <div class="bas-issue-section">
      <h6>{{$t('p.HelpQuest1Step1Title')}}</h6>
      <p>
        {{$t('p.HelpQuest1DownloadBtnPrefix')}}
      </p>
      <el-button @click="downloadExtHandle" class="bas-btn-primary" type="primary">
        Download Extensions
      </el-button>
    </div>
    <div class="bas-issue-section">
      <h6>{{$t('p.HelpQuest1Step2Title')}}</h6>
      <p>
        {{$t('p.HelpQuest1Step2Desc1')}}
      </p>
      <img :src="isCN ? 'static/img/help/quest_basext_01.png' : 'static/img/help/quest_basext_01_en.png'"
        class="img-fluid">
    </div>
    <div class="bas-issue-section">
      <h6>{{$t('p.HelpQuest1Step3Title')}}</h6>
      <p>
        {{$t('p.HelpQuest1Step3Desc1')}}
      </p>
      <img :src="isCN ? 'static/img/help/quest_basext_02.png' : 'static/img/help/quest_basext_02_en.png'" class="img-fluid">
    </div>
    <div class="bas-issue-section">
      <h6>{{$t('p.HelpQuest1Step4Title')}}</h6>
      <p>
        {{$t('p.HelpQuest1Step4Desc1')}}
      </p>
      <img :src="isCN ? 'static/img/help/chrome_drop_install.png':'static/img/help/chrome_drop_install_en.png'" class="img-fluid">
      <img :src="isCN ? 'static/img/help/quest_basext_04.png' : 'static/img/help/quest_basext_04_en.png'"
        class="img-fluid">
    </div>
  </div>
</template>

<script>

import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner1",
  computed: {
    ...Vuex.mapState({
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
.bas-issue-section > p {
  text-align: left;
}
</style>
