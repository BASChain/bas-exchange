<template>
  <div>

  </div>
</template>

<script>
export default {
  name:"MarketSearchReultList",
  computed: {

  },
  data() {
    return {
      total:0,
      pagenumber:1,
      pagesize:8,
      items:[]
    }
  },
  methods: {

  },
  mounted() {
    this.total = this.initTotal
    this.items = this.initItems
  },
  props:{
    searchText:{
      default:'',
      type:[String,Number]
    },
    initTotal:{
      default:0,
      type:[String,Number],
    },
    initItems:{
      default:[],
      type:Array
    }
  }
}
</script>
<style>

</style>
