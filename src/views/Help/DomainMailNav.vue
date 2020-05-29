<template>
  <div role="tablist" class="help-collapse-list help-domain-wrapper">
    <b-card class="bas-gray-bg">
      <b-card-header v-b-toggle.JoinBMailMiner
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpJoinBMailToServiceTitle')}}
        </h4>
        <i class="fa"
          :class=" joinBmailActvied ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="JoinBMailMiner" :visible="joinBmailActvied" accordion="DomainMailSers" role="tabpanel">
        <b-card-body>
          <JoinBmailDocsCn />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card class="bas-gray-bg">
      <b-card-header v-b-toggle.GetBMailAccount
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpGetBMailAccountTitle')}}
        </h4>
        <i class="fa"
          :class=" getBmailActived ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="GetBMailAccount" :visible="getBmailActived" accordion="DomainMailSers" role="tabpanel">
        <b-card-body>
          <GetBmailAccount />
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card class="bas-gray-bg">
      <b-card-header v-b-toggle.CreateMobilBmail
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpGetMobilBMailAccountTitle')}}
        </h4>
        <i class="fa"
          :class=" createBmailActived ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="CreateMobilBmail" 
        :visible="createBmailActived" accordion="DomainMailSers" role="tabpanel">
        <b-card-body>
          <CreateMobilBMail v-on:toGetMail="getMail" />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import JoinBmailDocsCn from './mails/HowToJoinBMailCn.vue'
import GetBmailAccount from './mails/GetBMailAccount.vue'
import CreateMobilBMail from './mails/CreateMobilBMail.vue'
export default {
  name:"DomainMailCollapse",
  components:{
    JoinBmailDocsCn,
    GetBmailAccount,
    CreateMobilBMail
  },
  computed: {
    getBmailActived() {
      return this.activeId === 'GetBMailAccount'
    },
    joinBmailActvied() {
      return this.activeId === 'JoinBMailMiner'
    },
    createBmailActived() {
      return this.activeId === 'CreateMobilBmail'
    }
  },
  data() {
    return {
      activeId: '',
      isActive: ''
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      // console.log('$$$$$$$$',collapseId)
      // console.log('&&&&&&&&&', isJustShown)
      if(isJustShown){
        this.activeId =  collapseId
        // console.log('###########', this.activeId)
      }
    })
    const activeId = this.$route.query.activeId
    // console.log('>>>>>>>activeId>>>>',activeId)
    if(activeId){
      this.activeId = activeId
    }
    window.addEventListener("scroll", this.handleScroll, true);
  },
  updated() {

  },
  methods: {
    getMail(isActive) {
      // console.log(this.activeId)
      this.isActive = isActive
      if (isActive) {
        this.activeId = 'GetBMailAccount'
      }
      // console.log(this.activeId)
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log('路由有变化')
  //     this.activeId = to.query.activeId
  //   }
  // }
}
</script>
<style>
.help-domain-wrapper p {
  font-size:14px;
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  color:rgba(96,96,107,1);
  line-height:20px;
}

.help-domain-wrapper>div.card {
  margin-bottom:24px;
}

</style>
