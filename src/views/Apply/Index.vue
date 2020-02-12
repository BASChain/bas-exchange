<template>
  <v-layout topbarTheme="white">
    <page-container>
      <div slot="body">
        <div class="container">
          <div class="row">
            Apply
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
  name:"ApplyIndex",
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
}
</script>
<style>

</style>
