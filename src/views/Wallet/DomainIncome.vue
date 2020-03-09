<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="全部" name="all">
            <el-table
              :show-header="true"
              :data="getAllItems"
              style="width: 100%">
              <el-table-column
                prop="domain"
                label="域名"
                width="260">
              </el-table-column>
              <el-table-column
                prop="update"
                label="成交日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="price"
                sortable
                label="收入">
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="根域名" name="rootDomain">
            <el-table
              :show-header="false"
              :data="getIntransItems"
              style="width: 100%">
              <el-table-column
                prop="domain"
                label="域名"
                width="260">
              </el-table-column>
              <el-table-column
                prop="update"
                label="成交日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="price"
                sortable
                label="收入">
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="子域名" name="sunDomain">
            <el-table
              :show-header="false"
              :data="getPurchaseItems"
              style="width: 100%">
              <el-table-column
                prop="domain"
                label="域名"
                width="260">
              </el-table-column>
              <el-table-column
                prop="update"
                label="成交日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="price"
                sortable
                label="收入">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//mock
import { SearchList } from '@/mock/domain'
export default {
  name:"WalletDomainIncome",
  data(){
    return {
      activeTab:'all',
      items:[],//SearchList
      pageSize:5,
      tableAll:{
        currentPage:1
      },
      tableIntrans:{
        currentPage:2
      },
      tablePurchase:{
        currentPage:3
      }
    }
  },
  computed: {
    getAllItems(){
      return this.items.filter((item,idx)=>idx <=5);
    },
    getIntransItems(){
      return this.items.filter((item,idx) => (item.state == 'buy' && idx<=5))
    },
    getPurchaseItems(){
      return this.items.filter((item,idx) => (item.state != 'buy' && idx<=5))
    }
  },
  methods: {

    handleTabClick(tab,event){
      console.log(tab, event);
    }
  }
}
</script>
<style>

</style>
