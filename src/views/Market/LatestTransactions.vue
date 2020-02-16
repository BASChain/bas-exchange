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
  </div>
</template>
<style>

</style>
<script>
import RowCardItem from '@/components/RowCardItem.vue'
//mock data
import { Top10List } from '@/mock/domain'

export default {
  name:"MarketLatestTransaction",
  data(){
    return {
      latestList:[]
    }
  },
  mounted(){
    this.latestList = Top10List;
    console.log(JSON.stringify(this.latestList))
  },
  components:{
    RowCardItem,
  }
}
</script>

