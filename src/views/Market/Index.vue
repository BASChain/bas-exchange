<template>
  <v-layout>
    <page-container>
      <div slot="body">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <bas-arrow arrowType="left" disabled/>
            <bas-arrow arrowType="right"/>
          </div>
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
import BasArrow from '@/components/carousel/BasArrow.vue'

export default {
  name:'MarketIndex',
  components:{
    VLayout,
    PageContainer,
    FootContainer,
    BasArrow,
  },

}
</script>
