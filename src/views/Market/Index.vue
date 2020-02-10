<template>
  <v-layout>
    <page-container>
      <div slot="body">
        <div class="container">
          <div class="row">
            Market
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

export default {
  name:'MarketIndex',
  components:{
    VLayout,
    PageContainer,
    FootContainer,
  },

}
</script>
