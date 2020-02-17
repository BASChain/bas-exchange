<template>
  <div>
    <div class="text item">
      Recent Transactions Top 10
    </div>
    <div class="bas-pager-container">
      <row-card-item v-for="(item,idx) in latestList"
        :key="idx" :info="item" transAttr="update"
        showBtn="1"
      />
    </div>
    <div class="bas-pagination">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>
<style>

</style>
<script>
import RowCardItem from '@/components/RowCardItem.vue'
//mock data
import { SearchList } from '@/mock/domain'

export default {
  name:"MarketRelatedList",
  data(){
    return {
      list:[],
      currentPage:1,
      pageSize:5,
      total:0
    }
  },
  props:{
    filterType:{
      default:'all',
      type:String,
      required:false
    },
    searchText:{
      default:'',
      type:String,
      required:false
    }
  },
  mounted(){
    this.list = SearchList;
    //console.log(JSON.stringify(this.latestList))
  },
  components:{
    RowCardItem,
  }
}
</script>
