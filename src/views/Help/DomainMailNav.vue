<template>
  <div role="tablist" class="help-collapse-list help-domain-wrapper">
    <b-card class="bas-gray-bg">
      <b-card-header v-b-toggle.JoinBMailMiner
        class="help-collapse--header" role="tab" header-tag="div">
        <h4>
          {{$t('p.HelpJoinBMailToServiceTitle')}}
        </h4>
        <i class="fa"
          :class=" activeId ==='JoinBMailMiner' ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="JoinBMailMiner" :visible="activeId === 'JoinBMailMiner'" accordion="DomainMailSers" role="tabpanel">
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
          :class=" activeId ==='GetBMailAccount'? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </b-card-header>
      <b-collapse id="GetBMailAccount" :visible="activeId === 'GetBMailAccount'" accordion="DomainMailSers" role="tabpanel">
        <b-card-body>
          <GetBmailAccount />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import JoinBmailDocsCn from './mails/HowToJoinBMailCn.vue'
import GetBmailAccount from './mails/GetBMailAccount.vue'
export default {
  name:"DomainMailCollapse",
  components:{
    JoinBmailDocsCn,
    GetBmailAccount,
  },
  data() {
    return {
      activeId:'JoinBMailMiner'
    }
  },
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
