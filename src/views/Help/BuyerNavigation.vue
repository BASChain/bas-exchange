<template>
  <div role="tablist" class="help-collapse-list">
    <b-card class="mb-1">
      <b-card-header v-b-toggle.PopluarQuest1
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpPopInstallExtensionOfflineTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='PopluarQuest1'? 'fa-chevron-down' : 'fa-chevron-right'"></i>

      </b-card-header>
      <b-collapse id="PopluarQuest1" :visible="activeId ==='PopluarQuest1' " accordion="PopluarQuestions" role="tabpanel">
        <b-card-body>
          
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:"BuyerIssueNav",
  comments:{

  },
  computed: {
    ...mapState({
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
