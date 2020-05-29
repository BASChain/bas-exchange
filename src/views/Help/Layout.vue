<template>
  <v-layout>
    <page-container>
      <div slot="body" class="container" style="margin-top:40px;">
        <el-container>
          <help-left-nav />
          <el-main class="bas-help-right">
            <router-view :key="key" />
          </el-main>
        </el-container>
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>
<style>
.bas-help-right {
  padding: 0;
}
</style>
<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'
  import HelpLeftNav from './components/LeftNav'

  export default {
    name:"HelpLayout",
    data() {
      return {}
    },
    components: {
      VLayout,
      PageContainer,
      FootContainer,
      HelpLeftNav,
    },
    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
    }
  }
</script>

