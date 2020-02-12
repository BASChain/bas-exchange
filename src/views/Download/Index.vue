<template>
 <v-layout>
   <page-container>
     <span slot="header">
       Download
     </span>
   </page-container>
 </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:"DownloadIndex",
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
}
</script>
<style>

</style>
