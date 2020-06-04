<template>
  <v-layout>
    <page-container>
      <div class="income-header-wrapper" slot="header">
        <div class="container">
          <div class="row income-row-header">
            <div class="w-50">
              <div class="income-header-inner">
                <div class="d-block text-right">
                  <span class="title-prefix">{{$t('l.GeneralLedger')}}</span>
                  <span class="number-total">{{totalLedgerBas}}</span>
                </div>
                <div class="d-block text-right">
                  <span class="title-prefix">{{$t('l.Withdrawn')}}</span>
                  <span class="total-recover">{{sumdrawBas}}</span>
                </div>
              </div>
            </div>
            <div class="w-50">
              <div class="income-header-inner">
                <div class="d-block text-left">
                  <span class="title-prefix">{{$t('l.Undrawn')}}</span>
                  <span class="total-recover">{{drawBas}}</span>
                </div>
                <div class="d-block text-left">
                  <span class="income-btn-wrapper">
                    <el-button @click="recoverHandle"
                      size="small" class="income-recover-btn">
                      {{$t('l.DrawBAS')}}
                    </el-button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <h4>
                {{$t('p.BreakdownTableListTitle')}}
              </h4>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="income-table-box">
                <income-details />
              </div>
            </div>
          </div>
        </div>
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<style>
.income-header-wrapper {
  width: 100%;
  align-items: center;
  background:rgba(245,246,246,1);
}

.income-row-header>div.w-50 {
  width: 100%;
  min-height: 165px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* border:1px solid #952700; */
}

.income-row-header>div.w-50:nth-last-child(1){
  border-left: 2px solid rgba(235,237,237,1);
}

.income-header-inner {
  width: 100%;
  margin: auto .75rem;
  display: inline-flexbox;
  direction: column;
}

.income-header-inner>div.d-block {
  width: 100%;
  text-align: right;
}

span.number-total {
  font-size: 36px;
  font-weight:bold;
  color:rgba(255,87,47,1);
  line-height:44px;
  letter-spacing:2px;
}

span.number-total::after {
  content: 'BAS';
  margin-left: .2rem;
  font-size: 16px;
  color:rgba(255,87,47,1);
}

span.number-recovered {
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:27px;
  font-size: 22px;
  letter-spacing:1px;
}
span.number-recovered::after {
  content:'BAS';
  margin-left: .2rem;
  font-size: 16px;
}
span.total-recover {
  font-size:36px;
  font-weight:bold;
  color:rgba(0,202,155,1);
  line-height:44px;
  letter-spacing:2px;
}
span.total-recover::after {
  content:'BAS';
  margin-left: .2rem;
  font-size: 16px;
  color:rgba(0,202,155,1);
}
.income-btn-wrapper {
  line-height: 53px;
}

.income-recover-btn {
  min-width: 118px;
}


</style>
<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'
  import IncomeDetails from './IncomeDetails.vue'
  import {
    wei2BasFormat,
  } from '@/utils'
  import { refreshAccount } from '@/bizlib/web3/token-api'
  import { recoverBAS } from '@/bizlib/web3/miner-api'

  export default {
    name:"IncomeHomeIndex",
    components: {
      VLayout,
      PageContainer,
      FootContainer,
      IncomeDetails,
    },
    computed: {
      totalLedgerBas(){
        return wei2BasFormat(this.head.totalledgerWei,18)
      },
      sumdrawBas(){
        return wei2BasFormat(this.head.sundrawWei,18)
      },
      ...Vuex.mapState({
        drawBas:state =>{
          //console.log(state)
          return wei2BasFormat(state.web3.drawWei,state.web3.decimals)
        }
      })
    },
    data() {
      return {
        head:{
          sundrawWei:0,
          totalledgerWei:0
        }
      }
    },
    methods: {
      refreshWalletBase(){
        if(this.$store.getters['metaMaskDisabled']){
          this.$metamask()
          return;
        }
        refreshAccount().then(data=>{
          console.log(data)
          this.$store.dispatch('web3/fillChaidAndWallet',data)
        }).catch(ex=>{
          console.log(ex)
        })
      },
      recoverHandle(){
        if(this.$store.getters['metaMaskDisabled']){
          this.$metamask()
          return;
        }

        let wei = this.$store.state.web3.drawWei
        if(wei==0 || wei ==='0'){
          this.$message(this.$basTip.error(this.$t('p.WalletRecoverZeroTip')))
          return
        }

        const dappState = this.$store.getters['web3/dappState']
        //
        recoverBAS(dappState.chainId,dappState.wallet).then(resp=>{
          let msg = this.$t('p.recoverSuccess') + this.drawBas
          this.refreshWalletBase()
          this.$message(this.$basTip.warn(msg))
        }).catch(ex=>{
          console.log('recover>>'+ex)
          if(ex==4001){
            this.$message(this.$basTip.error(ex.message))
          }else if(ex== -32601){
            this.$message(this.$basTip.error(ex.message))
          }
        })
      }
    },
    mounted() {
      //this.$store.dispatch('web3/refreshAccountBase')
    },
  }
</script>

