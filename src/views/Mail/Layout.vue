<template>
  <v-layout>
    <page-container class="bas-gray-bg">
      <div slot="body">
        <router-view :key="$route.fullpath" class="pt-2"/>
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
    name:"MailLayout",
    data() {
      return {}
    },
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },
  }
</script>
<style>

</style>
