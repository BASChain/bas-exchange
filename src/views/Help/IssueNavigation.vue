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
          <QuestionInstallOffline />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card class="mb-1">
      <b-card-header
        v-b-toggle.PopluarQuest2
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpPopNeedMetaMaskTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='PopluarQuest2'? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="PopluarQuest2" accordion="PopluarQuestions" role="tabpanel">
        <b-card-body>
          <question-need-meta-mask />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card class="mb-1">
      <b-card-header
        v-b-toggle.PopluarQuest3
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpQuest3MetaMaskInstallTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='PopluarQuest3'? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="PopluarQuest3" accordion="PopluarQuestions" role="tabpanel">
        <b-card-body>
          <quest-install-meta-mask />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card class="mb-1">
      <b-card-header
        v-b-toggle.PopluarQuest4
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpPopHowTestOnRopstenTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='PopluarQuest4'? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="PopluarQuest4" accordion="PopluarQuestions" role="tabpanel">
        <b-card-body>
          <question-test-on-ropsten />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import QuestionInstallOffline from './popquest/Quest1OfflineInstall.vue'
import QuestionNeedMetaMask from './popquest/Quest2NeedMetaMask.vue'
import QuestInstallMetaMask from './popquest/Quest3InstallMetaMask.vue'
import QuestionTestOnRopsten from './popquest/Quest4TestOnRopsten.vue'

export default {
  name:"PopluarQuestion",
  components:{
    QuestionInstallOffline,
    QuestionNeedMetaMask,
    QuestInstallMetaMask,
    QuestionTestOnRopsten,
  },
  computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      activeId:""
    }
  },
  methods: {

  },
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if(isJustShown){
        this.activeId =  collapseId
      }
    })
  },
}
</script>
<style>

</style>
