<template>
  <v-layout topbarTheme="white">
    <page-container>
      <div slot="body">
        <div class="container">
          <div class="col-12 text-center">
            <p class="apply-slogan">{{$t('g.ApplySlogan')}}</p>
          </div>
        </div>

        <searcher-component class="container"/>


        <triple-cards id="applyRootDomainCarousel"
          intPaginationFactor=495
          captionText="ApplyRootCarouselCaption"
          :items="getRootItems"
          showOpen
          class="apply-triple-container-root"/>

        <triple-cards id="applyRootDomainCarousel"
          intPaginationFactor=495
          captionText="ApplySubCarouselCaption"
          :items="getRootItems"
          class="apply-triple-container-subdomains"/>
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
import BasCarousel from '@/components/carousel/BasCarousel.vue'
import TripleCards from '@/components/triple/TripleCards.vue'

import { rootDomainItem } from '@/mock/data'

export default {
  name:"ApplyIndex",
  data() {
    return {

    }
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
     SearcherComponent,
     BasCarousel,
     TripleCards,
  },
  computed:{
    getRootItems(){
      return rootDomainItem;
    },
    getSubItems(){
      return rootDomainItem;
    }
  }
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
