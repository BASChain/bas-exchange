<template>
  <v-layout topbarTheme="black">
    <page-container>
      <header-carousel slot="header" />
      <div slot="body">
        <about-section />
        <decenter-section />
        <crit-section />
        <see-news-section />
        <future-section />
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import HeaderCarousel from './components/Carousel.vue'
import AboutSection from './AboutSection.vue'
import DecenterSection from './DecenterSection.vue'
import CritSection from './CritSection.vue'
import FutureSection from './FutureSection.vue'
import SeeNewsSection from './SeeNewsSection.vue'

import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:'HomeIndex',

  components:{
    VLayout,
    PageContainer,
    HeaderCarousel,
    AboutSection,
    DecenterSection,
    CritSection,
    SeeNewsSection,
    FutureSection,
    FootContainer,
  },
}
</script>
<style>
  .test{
    font-size:36px;
  }
</style>
