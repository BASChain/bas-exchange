<template>
  <div>
    <div class="bas-issue-section">
      <h6>{{$t('p.HelpQuest4UsedBASDescP1')}} </h6>
      <ul>
        <li>{{$t('p.HelpQuest4UsedBASDescP2')}}</li>
        <li>{{$t('p.HelpQuest4UsedBASDescP3')}}</li>
        <li>{{$t('p.HelpQuest4UsedBASDescP4')}}</li>
      </ul>
    </div>
    <h5>{{$t('p.HelpQuest4UsedBASDescP5')}}</h5>
    <div class="bas-issue-section">
      <p>{{$t('p.HelpQuest4UsedBASDescP6')}}</p>
      <img :src="`/static/img/help/bas_test_wf_01_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP7')}}</p>
      <img :src="`/static/img/help/bas_test_wf_02_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP8')}}</p>
      <img :src="`/static/img/help/bas_test_wf_03_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP9')}}</p>
      <img :src="`/static/img/help/bas_test_wf_04_${i18nSuffix}.png`"  class="img-fluid">

      <img :src="`/static/img/help/bas_test_wf_05_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP10')}}</p>
      <img :src="`/static/img/help/bas_test_wf_06_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP11')}}</p>
      <img :src="`/static/img/help/bas_test_wf_07_${i18nSuffix}.png`"  class="img-fluid">

      <p>{{$t('p.HelpQuest4UsedBASDescP12')}}</p>

      <img src="/static/img/bas_dl_ext1.png" class="img-fluid">

    </div>

  </div>
</template>

<script>
import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner4",
  computed: {
    ...Vuex.mapState({
      i18nSuffix:state => state.lang.toLowerCase(),
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {

  },
}
</script>
<style>

</style>
