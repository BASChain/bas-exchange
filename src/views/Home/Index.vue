<template>
  <v-layout topbarTheme="black">
    <page-container keepTop>
      <header-carousel slot="header" />
      <div slot="body" style="margin-bottom:2.5rem;">
        <about-section />
        <mile-stone-line />
        <Top10DomainCombox />
        <!-- <FavoriteSection /> -->
        <decenter-section />
        <crit-section />
        <see-news-section />
        <app-sences />
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
import MileStoneLine from './MileStoneLine.vue'
import Top10DomainCombox from './Top10DomainCombox'
import FavoriteSection from './FavoriteSection'
import DecenterSection from './DecenterSection.vue'
import CritSection from './CritSection.vue'
import FutureSection from './FutureSection.vue'
import SeeNewsSection from './SeeNewsSection.vue'
import AppSences from './AppSences.vue'

import TripleEleCards from './components/TripleEleCards'

import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:'HomeIndex',

  components:{
    VLayout,
    PageContainer,
    HeaderCarousel,
    AboutSection,
    MileStoneLine,
    Top10DomainCombox,
    FavoriteSection,
    DecenterSection,
    CritSection,
    SeeNewsSection,
    FutureSection,
    AppSences,
    FootContainer,
    TripleEleCards,
  },
  data() {
    return {
    }
  },
}
</script>
<style>
  .test{
    font-size:36px;
  }
</style>
