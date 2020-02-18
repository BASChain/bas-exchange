<template>
  <v-layout>
    <page-container>
      <div slot="body" class="bas-gray-bg">
        <el-container class="container">
          <el-aside width="226">
            left
          </el-aside>
          <el-main>
            Main
          </el-main>
        </el-container>
      </div>

      <!-- Footer -->
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>

<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'

  export default {
    name:"UserLayout",
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
