<template>
 <v-layout>
   <page-container>
     <span slot="body">
        超级节点/域名代理
     </span>
   </page-container>
 </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:"AgentIndex",
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
}
</script>
<style>

</style>
