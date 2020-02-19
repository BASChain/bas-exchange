<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="全部" name="all">
            <el-table
              :show-header="false"
              :data="getAllItems"
              style="width: 100%">
              <el-table-column
                prop="domain"
                label="域名"
                width="260">
              </el-table-column>
              <el-table-column
                prop="update"
                label="到期日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                sortable
                label="类型">
              </el-table-column>
              <el-table-column header-align="center"
                align="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRevoke(scope.$index, scope.row)">
                    撤回
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="售卖中" name="selling">
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
                label="到期日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                sortable
                label="类型">
              </el-table-column>
              <el-table-column header-align="center"
                align="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRevoke(scope.$index, scope.row)">
                    撤回
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="求购中" name="purchasing">
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
                label="到期日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="state"
                sortable
                label="类型">
              </el-table-column>
              <el-table-column header-align="center"
                align="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRevoke(scope.$index, scope.row)">
                    撤回
                  </el-button>
                </template>
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
  name:"UserInTransaction",
  data(){
    return {
      activeTab:'all',
      items:SearchList,
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
    filterArray(items,currentPage){
      const total = items.length
      let max = currentPage;
      if(total == 0) {
        max = 1;
      }else{
        max = total/this.pageSize + (total%this.pageSize > 0 ? 1 : 0)
      }
      if(currentPage<0 || currentPage > max){
        currentPage = 1;
      }

      if(total<= this.pageSize) {
        return {
          items,
          currentPage:1
        }
      }
      if(this.pageSize*(currentPage-1)){

      }

    },
    handleTabClick(tab,event){
      console.log(tab, event);
    },
    getCurrentPage(tab){

    }
  }
}
</script>
<style>

</style>
