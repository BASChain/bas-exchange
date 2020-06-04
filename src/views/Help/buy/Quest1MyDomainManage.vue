<template>
  <div>
    <div class="bas-issue-section">
      <p>{{$t('p.BuyerQuest1MyDomainManageDescP1')}}</p>
      <img :src="`/static/img/help/bas_test_wf_06_${i18nSuffix}.png`"  class="img-fluid">
    </div>
  </div>
</template>

<script>

export default {
  name:"BuyQuest1MyDomainManage",
  computed: {
    ...Vuex.mapState({
      i18nSuffix:state => state.lang.toLowerCase(),
      isCN:state => state.lang === 'zh-CN'
    })
  },
}
</script>
<style>

</style>
