<template>
  <div class="container">
    <el-row>
      <h1 class="section-title">
        {{$t('p.HomeFeatureSectionTitle')}}
      </h1>
    </el-row>
    <el-row :gutter="24" class="row justify-content-center align-items-center " style="margin-bottom:1.5rem;">
      <el-col :span=12>
        <img :src="`/static/icons/bas_app_sences_${i18nSuffix}.png`" class="img-fluid">
      </el-col>
      <el-col :span=12>
        <h4>
          {{$t('p.HomeFeatureSectionSubTitle')}}
        </h4>
        <p class="mt-4 w-75" style="line-space:1.25rem">{{$t('p.HomeFeatureSectionDesc')}}</p>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="row justify-content-start align-items-center">
      <el-col :lg="8" :md="8" :sm="12" :xs="12"
        v-for="(sence,index) in appSences" :key="index"
      >
        <div class="bas-app-sence--box">
          <img :src="`/static/icons/${sence.icon}`" class="bas-app-sences--icon">
          <p class="bas-app-sences--text">
            {{$t(`${sence.i18n}`)}}
          </p>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name:"AppSences",
  computed: {
    ...Vuex.mapState({
      i18nSuffix:state => state.lang.toLowerCase(),
    })
  },
  data(){
    return {
      rowSize:8,
      appSencesDesc:"BAS系统不仅可以获取IP地址映射、区块链地址这些基础功能，还可以让物联网设备间不依赖于中心网关 也能相互发现，同时能进行更安全的身份认证和加密通讯，免于信道劫持的风险； 帮助用户生成和管理包括互联网应用之内的众多账号，并免于泄露密码的风险； 帮助企业和机构管理用户身份，例如征信信息，BAS能使这些信息更加完整，难以伪造，方便获取。",
      appSences:[
        {
          icon:"tickets_icon.png",
          text:"飞机/火车身份认证",
          i18n:'p.HomeAppSenceSection1'
        },
        {
          icon:"medical_icon.png",
          text:"医疗就诊挂号",
          i18n:'p.HomeAppSenceSection2'
        },
        {
          icon:"web_icon.png",
          text:"网站登录认证",
          i18n:'p.HomeAppSenceSection3'
        },
        {
          icon:"credit_icon.png",
          text:"征信身份认证",
          i18n:'p.HomeAppSenceSection4'
        },
        {
          icon:"travel_icon.png",
          text:"酒店/会务认证",
          i18n:'p.HomeAppSenceSection5'
        },
        {
          icon:"other_icon.png",
          text:"其他任何认证场景",
          i18n:'p.HomeAppSenceSection6'
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
    // window.onresize = _.debounce(()=>{
    //   console.log('AppSence Resize>>>>')
    //   that.rowSize = (document.body.clientWidth <=768 ? 12 : 8)
    // },400)

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

.bas-app-sence--box--mini {
  direction: column;
  justify-content: center;
  align-items: center;
}
.bas-app-sence--box img {
  height: 106px;
  width: 106px;
  margin: 1.5rem .5rem 1.5rem 1.5rem;
  padding: 2px;

}

</style>
