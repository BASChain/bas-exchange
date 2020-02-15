<template>
  <el-card class="col-md-8 col-sm-10 box-card">
    <!-- <div class="clearfix" slot="header">

    </div> -->
    <div class="domain-regist--result-container text-center">
      <img src="/static/icons/bingo.png" class="bas-bingo">
      <h6 class="bas-text-green mt-2">
        {{$t(`p.${registState}`)}}
      </h6>
      <h2>🌟🌟👀.com</h2>
      <h6 style="color:rgba(212,216,216,1)">域名已发放到您的账号中，请注意查收</h6>
    </div>

    <div class="w-100 box-card domain-registed-refer">
      <el-form class="domain-registed-refer--left">
        <el-form-item class="bas-el-item">
          <h4>数据映射</h4>
        </el-form-item>
        <el-form-item label="IPv4" class="bas-el-item">
          <span>192.168.121.128</span>
        </el-form-item>
        <el-form-item label="IPv6" class="bas-el-item">
          CDCD:910A:2222:5498:8475:1111:3900:2020
        </el-form-item>
        <el-form-item label="钱包地址" class="bas-el-item">
          0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c
        </el-form-item>
        <el-form-item label="别名" class="bas-el-item">
          0xCA33c
        </el-form-item>
        <el-form-item label="附加信息" class="bas-el-item">
          IoT设备
        </el-form-item>
      </el-form>
      <div>
        <button class="btn" >清空</button>
        <button class="btn bas-btn-primary">去配置</button>
      </div>
    </div>

    <div class="w-100 bas-btn-group text-center">
      <button class="w-50 mx-2 btn bas-btn-green-border">
        返回注册页面
      </button>
    </div>
  </el-card>
</template>
<style>


.domain-registed-refer {
  width: 100% !important;
  padding: .5rem;
  display:inline-flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
}
.domain-registed-refer--left {
  min-width:85%;
}
</style>
<script>
export default {
  name:"RegistTransFooter",
  data(){
    return {

    }
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

