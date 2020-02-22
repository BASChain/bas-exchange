<template>
  <div>
    <div class="container">
      <h1 class="section-title bas-pt-100">{{ captionTitle }}</h1>
      <p class="about-desc text-center">{{ description }}</p>
      <p class="about-demo">{{ demoCharacters }}</p>
      <p class="about-demo-emoji"> {{ demoEmoji }}</p>
    </div>
    <triple-cards id="DealDoneDomainCarousel"
      captionText="HomeTransactionCarouselCaption"
      :items="getItems"
      class="apply-triple-container-subdomains"/>
  </div>
</template>

<script>
import TripleCards from '@/components/triple/TripleCards.vue'

//
import { rootDomainItem } from '@/mock/data'
export default {
  name:"AboutBas",
  components:{
    TripleCards,
  },
  data(){
    return {
      captionTitle:"命名一切",
      description:"支持世界任意国家语言以及emoj",
      demoCharacters:"",
      demoEmoji:"😌/❤️/😂/❤️.👪...",
      subTitle:"标题",
      rightDesc:"一段文字描述，一段文字描述，一段文字描述，一段文字描述一段文字 描述，一段文字描述，一段文字描述，一段文字描述，一段文字描述， 一段文字描述一段文字描述，一段文字描述"
    }
  },
  computed:{
    getItems(){
      return rootDomainItem
    }
  }
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
