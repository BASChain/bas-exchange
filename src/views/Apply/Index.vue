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
            v-show="topItems && topItems.length>0"
            intPaginationFactor=495
            captionText="ApplyRootCarouselCaption"
            :items="topItems"
            showOpen
            class="apply-triple-container-root"/>
        </div>

        <div class="container bas-gray-bg">
          <triple-cards v-show="subItems && subItems.length>0"
            id="applyRootDomainCarousel"
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
  computed:{
    ...Vuex.mapState({
      topItems:state => {
        return state.assets.latestRoots ||[]
      },
      subItems:state => {
        return state.assets.lastestSubs ||[]
      }
    })
  },
  data() {
    return {
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

  mounted() {
    console.log('Apply Mounted>>>>>')
    this.$store.dispatch('assets/checkStorageIndexedDB')
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
