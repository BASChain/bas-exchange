<template>
  <el-card class="col-md-8 col-sm-10 box-card">
    <div class="domain-regist--result-container text-center">
      <img src="/static/icons/bingo.png" class="bas-bingo">
      <h6 class="bas-text-green mt-2">
        {{$t(`p.${registState}`)}}
      </h6>
      <h2>🌟🌟👀.com</h2>
      <h6 style="color:rgba(212,216,216,1)">域名已发放到您的账号中，请注意查收</h6>
    </div>
    <div class="w-100 bas-btn-group text-center">
      <button class="w-25 mx-2 btn bas-btn-green-border">
        配置域名
      </button>
      <button class="w-25 mx-2 btn bas-btn-green-border">
        去我的资产钱包
      </button>
      <button class="w-25 mx-2 btn bas-btn-primary">
        继续申请
      </button>
    </div>
  </el-card>
</template>

<script>
export default {
  name:"RegistApplyFooter",
  data(){
    return {}
  },
  props:{
    registState:{
      default:"DomainRegistConfirm",
      type:[String],
      required:true
    }
  }
}
</script>
<style>

</style>
