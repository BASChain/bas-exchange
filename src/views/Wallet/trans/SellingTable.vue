<template>
<div class="">
  <el-table
    :show-header="false"
    :data="domains"
    style="width: 100%">
    <el-table-column
      prop="domaintext"
      label="域名"
      width="260">
    </el-table-column>
    <el-table-column
      prop="expireDate"
      label="到期日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="priceVol"
      sortable
      label="价格">
    </el-table-column>
    <el-table-column header-align="center"
      align="right" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleRevokeSale(scope.$index, scope.row)">
          撤回
        </el-button>
      </template>
    </el-table-column>
  </el-table>


</div>
</template>

<script>
import {
  toUnicodeDomain,compressAddr,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'
import {getWeb3State} from '@/bizlib/web3'

import {MarketProxy} from '@/proxies/MarketProxy.js'
export default {
  name:"WalletSellingTable",
  computed: {

  },
  data() {
    return {
      pagenumber:1,
      pagesize:10,
      total:0,
      domains:[],


      ruleState:{
        decimals:18
      }
    }
  },
  methods: {
    handleRevokeSale(index,row){
      console.log(row)
    },
    cancelRevoke(){
      this.revokeDialog.visible =false
      this.revokeDialog.domainText = ''
      this.revokeDialog.hash = ''
    }

  },
  mounted() {
    this.domains = Object.assign(this.items)
    this.total = this.initTotal
    //this.loadTable(params)
  },
  props:{
    items:{
      default:[],
      type:Array
    },
    initTotal:Number
  }
}
</script>
<style>

</style>
