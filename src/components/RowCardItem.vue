<template>
  <div class="bas-card-item">
    <div class="bas-card-item__header">
      <span style="font-size:22px;">
        {{ info.domain }}
      </span>

      <div class="bas-card-item__header-rt" >
        <span style="font-size:24px;">
          {{ info.price }}
        </span>
        <span >BAS/Year</span>
        <span v-if="showUpdate"> {{ info.update }} </span>
        <el-button v-if="showBtn"
        class="bas-btn-orange">
          Sell
        </el-button>
      </div>
    </div>
    <div class="bas-card-item__body">
      <span >
        <i class="fa fa-circle-o bas-dot"></i>
        {{ info.owner }}
      </span>
      <el-button class="bas-text-green"
        style="margin-right:20px;"
        @click="gotoWhois(info.domain)"
        type="text">
        Whois >>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:"RowCardItem",
  data(){
    return {
    }
  },
  props:{
    info:{
      default:{},
      type:Object,
      required:false
    },
    transAttr:String,
    showBtn:String,
  },
  computed:{

  },
  methods:{
    getTransDate(){
      const dt = '';
      return dt
    },
    showUpdate(){
      return !!this.info.transAttr
    },
    gotoWhois(domain){
      if(!domain)return;
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    }
  },
  mounted() {
    // this.setItem({
    //   domain:'🌟.こんにちは',
    //   owner:'0x08970FEd061E7747CD9a38d680A601510CB659FB',
    //   price:"200"
    // })
  }
}
</script>
<style>

</style>
