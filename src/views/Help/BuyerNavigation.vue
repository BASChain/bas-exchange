<template>

  <div role="tablist" class="help-collapse-list">
    <b-card class="mb-1">
      <!-- <b-card-header v-b-toggle.BuyerQuest1
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.BuyerQuest1MyDomainAssetTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='BuyerQuest1'? 'fa-chevron-down' : 'fa-chevron-right'"></i>

      </b-card-header>
      <b-collapse id="BuyerQuest1" :visible="activeId ==='BuyerQuest1' " accordion="BuyerQuestions" role="tabpanel">
        <b-card-body>
          <BuyerQuestDomainAsset />
        </b-card-body>
      </b-collapse> -->
    </b-card>
  </div>
</template>

<script>
import BuyerQuestDomainAsset from './buy/Quest1MyDomainManage.vue'
export default {
  name:"BuyerIssueNav",
  components:{
    BuyerQuestDomainAsset,
  },
  computed: {
    ...Vuex.mapState({
      langSuffix:state => state.lang.toLowerCase(),
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      activeId:""
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      console.log('collapseId:', collapseId)
      console.log('isJustShown:', isJustShown)
      if(isJustShown){
        this.activeId =  collapseId
      }
    })
  },
}
</script>
<style>

</style>
