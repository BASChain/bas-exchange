<template>
  <div>
    <v-layout>

      <page-container>
        <header-carousel slot="header" />
        <div class="container" slot="body">
          <h3 class="text-center">HHHHHH</h3>
          <div class="row justify-content-center align-items-center">
            <div class="6">
              <img src="/static/img/banner1.png" alt="logo" class="img-fluid" slot="header">
            </div>
          </div>
          <div class="row">
            <p class="small">HHHHHH</p>
          </div>
        </div>
        <div class="container" slot="footer">
          <img src="/static/img/banner.png" alt="logo" class="img-fluid" >
        </div>
      </page-container>
    </v-layout>
  </div>

</template>
<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import HeaderCarousel from '@/components/Carousel.vue'

import VCard from '@/components/Card.vue'
import SearchSection from './components/SearchSection.vue'

export default {
  name:'HomeIndex',

  components:{
    PageContainer,
    HeaderCarousel,
    SearchSection,
    VLayout,
    VCard,
  },
}
</script>
