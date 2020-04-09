<template>
  <div>
    <div class="container mb-5">
      <h1 class="section-title bas-pt-100">{{ $t('p.HomeAboutSectionTitle') }}</h1>
      <p class="about-desc text-center">{{ $t('p.HomeAboutSectionDesc') }}</p>
      <p class="about-demo">{{ demoCharacters }}</p>
      <p class="about-demo-emoji"> {{ demoEmoji }}</p>
    </div>
    <!-- <triple-cards id="DealDoneDomainCarousel"
      captionText="HomeTransactionCarouselCaption"
      :items="latestes"
      class="apply-triple-container-subdomains d-none d-md-block"/> -->
  </div>
</template>

<script>
import TripleCards from '@/components/triple/TripleCards.vue'

import {
  hasExpired,dateFormat,
  handleDomain,
} from '@/utils'
import {
  getDomainType,isSub,
  CheckSearchLegal,getDomainTopType
} from '@/utils/Validator.js'
import DomainProxy from '@/proxies/DomainProxy'
export default {
  name:"AboutBas",
  components:{
    TripleCards,
  },
  data(){
    return {
      pagination:{
        pagenumber:1,
        pagesize:18,
        total:0
      },
      latestes:[],
      captionTitle:"命名一切",
      description:"支持世界任意国家语言以及emoji",
      demoCharacters:"你好/hello/こんにちは/Γειάσου/Здравствулте/Alô/안녕하세요",
      demoEmoji:"😌/❤️/😂/❤️.👪...",
      subTitle:"标题",
      rightDesc:"一段文字描述，一段文字描述，一段文字描述，一段文字描述一段文字 描述，一段文字描述，一段文字描述，一段文字描述，一段文字描述， 一段文字描述一段文字描述，一段文字描述"
    }
  },
  computed:{

  },
  mounted() {
    // const proxy = new DomainProxy()
    // const params = {
    //   pagenumber:1,
    //   pagesize:this.pagination.pagesize,
    //   top:258
    // }
    // proxy.getLatestRegist(params).then(resp=>{
    //   const ret = proxy.transTripleData(resp)
    //   console.log('>>>',ret)
    //   if(ret.state){
    //     this.latestes = Object.assign(ret.domains)
    //   }
    // }).catch(ex=>{
    //   console.log('load top 12 rootdomain error',ex)
    // })
  },
}
</script>
<style>
.about-section-bg {
  background:rgba(250,250,250,1);
}
.about-desc {
  font-size:26px;
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  color:rgba(4,6,46,1);
  line-height:37px;
  letter-spacing:1px;
}

.about-demo {
  text-align: center;
  font-size:20px;
  font-weight:500;
  color:rgba(0,202,155,1);
  line-height:28px;
  letter-spacing:1px;
}

.about-demo-emoji {
  font-family:AppleColorEmoji;
  text-align: center;
  font-size:16px;
  font-weight:500;
  line-height:26px;
}

</style>
