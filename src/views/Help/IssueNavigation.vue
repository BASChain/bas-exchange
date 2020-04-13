<template>
  <div role="tablist" class="help-collapse-list">
    <b-card class="mb-1">
      <b-card-header v-b-toggle.PopluarQuest1
        class="help-collapse--header" role="tab" header-tag="div">
        <h5>
          {{$t('p.HelpPopInstallExtensionOfflineTitle')}}
        </h5>
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
        <h5 >
          {{$t('p.HelpPopNeedMetaMaskTitle')}}
        </h5>
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
        <h5>
          {{$t('p.HelpPopHowTestOnRopstenTitle')}}
        </h5>
        <i class="fa"
          :class=" activeId ==='PopluarQuest3'? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="PopluarQuest3" accordion="PopluarQuestions" role="tabpanel">
        <b-card-body>
          <question-test-on-ropsten />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionInstallOffline from './popquest/Quest1OfflineInstall.vue'
import QuestionNeedMetaMask from './popquest/Quest2NeedMetaMask.vue'
import QuestionTestOnRopsten from './popquest/Quest4TestOnRopsten.vue'

export default {
  name:"PopluarQuestion",
  components:{
    QuestionInstallOffline,
    QuestionNeedMetaMask,
    QuestionTestOnRopsten,
  },
  computed: {
    ...mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {
      activeId:"PopluarQuest1"
    }
  },
  methods: {

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
.help-collapse-list div.card {
  border: none;
  border-top: 1px solid #ebeef5;
}

.help-collapse-list div.card:nth-last-child(1) {
  border-bottom: 1px solid #ebeef5;
}

.help-collapse-list div.card-body {
  padding: .75rem;
}

.help-collapse-list i.fa {
  cursor: pointer;
  font-weight: 100;
  font-size:12px;
}
.help-collapse-list div.help-collapse--header {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255,255,255,.03);
  border: none;
  margin: .25rem 0;
  padding: 0 .5rem;
}
</style>
