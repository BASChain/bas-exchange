<template>
  <v-layout>
    <page-container hasCarouselHeader>
      <header-carousel slot="header" />

      <div slot="body">
        <keep-safed-show />
        <production-show />
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import HeaderCarousel from '@/components/Carousel.vue'
import ProductionShow from './components/ProductionShow.vue'
import KeepSafedShow from './components/KeepSafedShow.vue'

import FootContainer from '@/components/FootContainer.vue'

export default {
  name:'HomeIndex',

  components:{
    VLayout,
    PageContainer,
    HeaderCarousel,
    ProductionShow,
    KeepSafedShow,
    FootContainer,
  },
}
</script>
<style>
  .test{
    font-size:36px;
  }
</style>
