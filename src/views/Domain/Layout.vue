<template>
  <v-layout>
    <page-container class="bas-gray-bg">
      <div class="bas-gray-bg domain-wrapper--min" slot="body">
        <router-view :key="$route.fullpath" class="pt-5"/>
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
    name:"DomainLayout",
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
.bas-gray-split {
  width: 100%;
  height:1px;
  background:rgba(225,229,229,1);
}

.domain-wrapper--min {
  height: 100%;
}
</style>
