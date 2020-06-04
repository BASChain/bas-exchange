<template>
  <div class="bdindex-bg-wrapper">
    <div class="header-bg bas-gray-bg">
      <div class="container">
        <div class="row align-items-center header-row">
          <div class="col-6 text-right pr-2 border-right">
            <div class="d-block right">
              <span class="title-prefix">{{$t('l.GeneralLedger')}}</span>
              <span class="number-total">{{totalLedgerBas}}</span>
            </div>
            <div class="d-block right">
              <span class="title-prefix">{{$t('l.Withdrawn')}}</span>
              <span class="number-recovered">{{sumdrawBas}}</span>
            </div>
          </div>
          <div class="col-6 pl-2">
            <div class="d-block left">
              <span class="title-prefix">{{$t('l.Undrawn')}}</span>
              <span class="total-recover">{{drawBas}}</span>
            </div>
            <div class="d-block left">
              <span>
                <el-button size="small" class="recover-btn">
                  {{$t('l.DrawBAS')}}
                </el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="body-bg-wrapper mt-2">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-8 detail-header">
            <h4>
              {{$t('p.BreakdownTableListTitle')}}
            </h4>
            <div>
              <span>
                <!-- <i class="fa fa-refresh"></i> -->
              </span>
            </div>
          </div>
        </div>

        <div class="row justify-content-center align-items-center">
          <income-details class="col-lg-8 col-md-10"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.detail-header {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.detail-header h4 {
  font-size:22px;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}

.border-right {
  border-right: 1px solid rgba(235,237,237,1);
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

.header-row > div.right {
  margin:auto 30px;
  text-align: left;
}

.recover-btn {
  width: 96px;
}
</style>
<script>

import {
  wei2BasFormat,
} from '@/utils'
import IncomeDetails from './IncomeDetails.vue'

export default {
  name:"BreakdownIndex",
  components:{
    IncomeDetails
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
      },
      pager:{
        pagenumber:1,
        pagesize:20,
        total:0
      },
      ctrl:{
        tableloading:false
      },
      ruleSate:{
        decimals:18
      }
    }
  },
  methods: {

  },
  mounted() {
    //this.$store.dispatch('web3/refreshAccountBase')
    this.ruleState = Object.assign(this.$store.getters['web3/ruleState'])
  },
}
</script>
<style>
.bdindex-bg-wrapper {
  width: 100%;
  height: 190px;
  align-items: center;
}

.bdindex-bg-wrapper div.header-row {
  height: 190px;
}

.header-row div {
  margin: 1rem auto;
}
.header-row div.right>span:nth-last-child(1) {
  margin-left: .25rem;
  margin-right: 30px;
}

.header-row div.left>span:first-child {
  margin-left: 30px;
  margin-right: .25rem;
}

.header-row>span.title-prefix {
  font-weight:400;
  color:rgba(68,70,99,1);
  line-height:22px;
  letter-spacing:1px;
}
</style>
