<template>
  <v-layout>
    <page-container>
      <div slot="body">
        <router-view :key="$route.fullpath" />
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
    name:"BreakdownHome",
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },
    data() {
      return {}
    },

  }
</script>
<style>

</style>
