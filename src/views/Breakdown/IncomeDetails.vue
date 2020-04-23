<template>
  <div class="bas-income-table-wrapper">
    <el-table v-loading="ctrl.loading"
      :data="items" type="index"
      style="width:100%">
      <el-table-column :label="$t('l.RecepitNumber')"
        width="160px"
        prop="recepitnumber" />
      <el-table-column :label="$t('l.RootDomain')"
        width="260px"
        prop="root"/>
      <el-table-column :label="$t('l.IncomeType')"
        width="180px"
        prop="root"/>
      <el-table-column props="domain">
        <template slot-scope="scope" >
          <el-popover trigger="click" placement="right"
            popper-class="income-popover">
            <div class="inner-expand-wrapper">
              <div class="bas-w-25">
                <span>{{scope.row.operator}}</span>
              </div>
              <div class="bas-w-25">
                <span>{{scope.row.payment}}</span>
              </div>
              <div class="bas-w-25">
                <span>{{scope.row.transts}}</span>
              </div>
            </div>

            <div class="popover-domain" slot="reference">
              <el-tag size="medium">
                {{scope.row.domain}}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('l.IncomeVolume')"
        width="260px" align="right">
        <template slot-scope="scope">
          <div class="inner-income">
            <div v-for="(it,idx) in scope.row.profit" :key="idx">
              <span :class="`income-type-label-${idx}`">{{it.type}}</span>
              <span class="income-volume">{{it.val}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
span.income-type-label-0 {
  height:22px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,202,155,1);
  line-height:22px;
  letter-spacing:1px;
}
span.income-type-label-1 {
  height:19px;
  font-size:16px;
  font-family:Lato-Regular,Lato;
  font-weight:400;
  color:rgba(255,87,47,1);
  line-height:19px;
  letter-spacing:1px;
}

.inner-expand-wrapper {
  display: inline;
  justify-content: space-between;
  align-items: center;
}

span.income-volume {
  height:30px;
  font-size:16px;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:22px;
  letter-spacing:1px;
}

span.income-volume::before {
  content: '+';
  margin-right: .2rem;
  font-size: 16px;
}
span.income-volume::after {
  content: 'BAS';
  margin-left: .2rem;
  font-size: 16px;
}

.income-popover {
  background:rgba(235,237,237,.5);
  color: rgba(74, 75, 104, 1);
}

.inner-expand-wrapper {
  width: 100%;
  padding: 0;
}
</style>
<script>
export default {
  name:"BreakDownIncomeDetails",
  computed: {

  },
  data() {
    return {
      pager:{
        pagenumber:1,
        pagesize:20,
        total:0
      },
      items:[
        {
          recepitnumber:'001',
          root:'lv',
          incometype:1,
          domain:'bbc.lv',
          transts:'2017-02-12',
          operator:'0x08970FEd061E7747CD9a38d680A601510CB659FB',
          payment:30,
          profit:[
            {
              type:'分账',
              val:3
            },
            {
              type:'Minner',
              val:1
            }
          ]
        },
        {
          recepitnumber:'002',
          root:'lv',
          incometype:1,
          domain:'bbc.lv',
          transts:'2017-02-12',
          operator:'0x08970FEd061E7747CD9a38d680A601510CB659FB',
          payment:400,
          profit:[
            {
              type:'分账',
              val:40
            }
          ]
        }
      ],
      ctrl:{
        loading:false
      },
      ruleState:{

      }
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style>

</style>
