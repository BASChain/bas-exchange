<template>
  <div class="bas-item-card">
    <div class="bas-item-card__header">
      <span style="font-size:22px;">
        🌟.こんにちは
      </span>

      <div class="bas-item-card__header-rt" >
        <span style="font-size:24px;">200</span>
        <span >BAS/Year</span>
        <el-button class="bas-btn-orange">
          Sell
        </el-button>
      </div>
    </div>
    <div class="bas-item-card__body">
      <span >
        <i class="fa fa-circle-o bas-dot"></i>
        0x08970FEd061E7747CD9a38d680A601510CB659FB
      </span>
      <el-button class="bas-text-green"
        style="margin-right:20px;"
        type="text">
        Whois >>
      </el-button>
    </div>
  </div>
</template>

<style>
.bas-item-card {
  width: 100%;
  background:rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
}

.bas-item-card__header {
  width: 100%;
  padding: .5rem ;
  display: inline-flex;
  direction: lrt;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(235,237,237,1)
}

.bas-item-card__body {
  width: 100%;
  padding: .5rem ;
  display: inline-flex;
  direction: lrt;
  justify-content: space-between;
  align-items: center;
}

.bas-item-card__header-rt {
  margin: 0 .5rem;
  padding: 0 .5rem;
}

.bas-item-card__header-rt>span {
  width:80px;
  margin-right: .25rem;
}


</style>

<script>
export default {
  name:"BasDomainRowItem",
  props:{
    domain:String,
    unitPrice:{
      default:0,
      type:[Number,String],
      required:true
    },
    owner:String
  },
  computed:{
    rtBtnClass(){
      return ''
    }
  }
}
</script>

