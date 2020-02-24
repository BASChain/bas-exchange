<template>
  <div class="container">
    <el-row>
      <h1 class="section-title">未来已来</h1>
    </el-row>
    <el-row :gutter="24" class="row justify-content-center align-items-center " style="margin-bottom:1.5rem;">
      <el-col :span=12>
        <img src="/static/icons/bas_app_sences.png" class="img-fluid">
      </el-col>
      <el-col :span=12>
        <h4>标题</h4>
        <p>{{appSencesDesc}}</p>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="row justify-content-start align-items-center">
      <el-col :span="rowSize"
        v-for="(sence,index) in appSences" :key="index"
      >
        <div class="bas-app-sence--box">
          <img :src="`/static/icons/${sence.icon}`" class="bas-app-sences--icon">
          <p class="bas-app-sences--text">
            {{sence.text}}
          </p>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import Lodash from 'lodash'
export default {
  name:"AppSences",
  data(){
    return {
      rowSize:8,
      appSencesDesc:"根节点1个，辅根节点12个， 集中在少数国家手中形成技术霸权 多次利用技术霸权攻击主权国家 仅仅支持英文根域名服务 根域名范围是固定范围选中，无法自定义",
      appSences:[
        {
          icon:"tickets_icon.png",
          text:"飞机/火车身份认证"
        },
        {
          icon:"medical_icon.png",
          text:"医疗就诊挂号"
        },
        {
          icon:"web_icon.png",
          text:"网站登录认证"
        },
        {
          icon:"credit_icon.png",
          text:"征信身份认证"
        },
        {
          icon:"travel_icon.png",
          text:"酒店/会务认证"
        },
        {
          icon:"other_icon.png",
          text:"其他任何认证场景"
        }
      ]
    }
  },
  props:{
    caption:String
  },
  mounted(){
    this.rowSize = (document.body.clientWidth <=768 ? 12 : 8)
    const that = this;
    window.onresize = _.debounce(()=>{
      console.log('AppSence Resize>>>>')
      that.rowSize = (document.body.clientWidth <=768 ? 12 : 8)
    },400)

  }
}
</script>
<style>
.bas-app-sence--box {
  width: 100%;
  margin: .75rem auto;
  display: inline-flex;
  direction: ltr;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  border:1px solid rgba(235,237,237,1);
}
.bas-app-sence--box img {
  height: 106px;
  width: 106px;
  margin: 1.5rem .5rem 1.5rem 1.5rem;
  padding: 2px;
  border: 1px dashed #E1E5E5;
}

</style>
