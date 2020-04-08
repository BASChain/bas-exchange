<template>
  <v-layout topbarTheme="white">
    <page-container>
      <div slot="body">
        <div class="container">
          <div class="col-12 text-center">
            <p class="apply-slogan">{{$t('g.ApplySlogan')}}</p>
          </div>
        </div>

        <domain-searcher />
        <!-- <searcher-component class="container"/> -->

        <div class="container px-2 bas-gray-bg">
          <triple-cards id="applyRootDomainCarousel"
            intPaginationFactor=495
            captionText="ApplyRootCarouselCaption"
            :items="topItems"
            showOpen
            class="apply-triple-container-root"/>
        </div>

        <div class="container bas-gray-bg">
          <triple-cards id="applyRootDomainCarousel"
            intPaginationFactor=495
            captionText="ApplySubCarouselCaption"
            :items="subItems"
            class="apply-triple-container-root"/>
        </div>

      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'
import SearcherComponent from './components/Searcher.vue'
import DomainSearcher from './components/DomainSearcher.vue'
import BasCarousel from '@/components/carousel/BasCarousel.vue'
import TripleCards from '@/components/triple/TripleCards.vue'

import { rootDomainItem } from '@/mock/data'

import DomainProxy from '@/proxies/DomainProxy'

export default {
  name:"ApplyIndex",
  data() {
    return {
      topItems:[],
      subItems:[]
    }
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
     SearcherComponent,
     DomainSearcher,
     BasCarousel,
     TripleCards,
  },
  computed:{

  },
  mounted() {
    const proxy = new DomainProxy()

    proxy.getLatestRegist({pagenumber:1,pagesize:12,top:258}).then(resp=>{
      const ret = proxy.transTripleData(resp)
      console.log('>>>',ret)
      if(ret.state){
        this.topItems = Object.assign(ret.domains)
      }
    }).catch(ex=>{
      console.log('load top 12 rootdomain error',ex)
    })
    proxy.getLatestRegist({pagenumber:1,pagesize:12,top:2}).then(resp=>{
      const rets = proxy.transTripleData(resp)
      console.log('sub>>>',rets)
      if(rets.state){
        this.subItems = Object.assign(rets.domains)
      }
    }).catch(ex=>{
      console.log('load top 12 subdomain error',ex)
    })
  },
}
</script>
<style>
.apply-slogan {
  margin: 1.75rem auto;
  font-size:3.5rem;
  font-family:Lato-Regular,Lato;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:86px;
  letter-spacing:2px;
}

.comp-carousel-container {
  min-height: 280px;
  background:rgba(245,246,246,1);
}

.apply-triple-container-2 {
  margin: 3rem auto;
  background:rgba(245,246,246,1);
}
</style>
