<template>
  <v-layout>
    <page-container class="fixed">
      <div slot="body" class="fixed" >
        <router-view :key="$route.fullpath" class="mail-layout-body pt-2"/>
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
    mounted() {
      this.$store.dispatch('dapp/loadPublicMailDomains')
    },
  }
</script>
<style>
.mail-layout-body{
  height: 100%;
}
</style>
