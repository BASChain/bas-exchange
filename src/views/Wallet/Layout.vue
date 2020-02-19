<template>
  <v-layout>
    <page-container>
      <div slot="body" class="bas-gray-bg">
        <el-container class="container pt-2 pb-2">
          <el-aside width="226px">
            <wallet-left-nav/>
          </el-aside>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </div>

      <!-- Footer -->
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<style>
.bas-wallet-container {
  padding: 1.5rem auto;

}
</style>
<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'
  import WalletLeftNav from './components/LeftNav.vue'

  export default {
    name:"UserLayout",
    data() {
      return {}
    },
    components: {
      VLayout,
      PageContainer,
      FootContainer,
      WalletLeftNav,
    },
  }
</script>

