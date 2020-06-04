<template>
  <div>
    <div class="bas-issue-section">
      <h5 class="text-center">{{$t('p.HelpPopNeedMetaMaskTitle')}}</h5>
      <div class="bas-issue-section">
        <p>{{$t('p.HelpQuestNeedMetaMaskDesc1')}}</p>
        <p>{{$t('p.HelpQuestNeedMetaMaskDesc2')}}</p>
        <img src="/static/icons/metamask-account-01.png" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>

import {ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile
} from '@/bizlib/apps'
export default {
  name:"PopluarQuestInner2",
  computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {

  },
}
</script>
<style>

</style>
