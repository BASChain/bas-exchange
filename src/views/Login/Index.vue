<template>
  <v-layout>
    <page-container>
     <div slot="body" class="container">
       <div class="row justify-content-center align-items-center">
         <h2 class="col-8 text-center">Login</h2>
       </div>
       <form  class="form">
         <div class="row justify-content-center align-items-center">
           <label class="col-8">Install MetaMask</label>
           <button class="col-8" @click="metaMaskConnect">Connect MetaMask</button>
         </div>
       </form>
     </div>

      <!-- <foot-container slot="footer"/> -->
    </page-container>
  </v-layout>
</template>

<script >
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'

  export default {
    name:"LoginIndex",
    data() {
      return {}
    },
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },
    methods:{
      metaMaskConnect(){

      }
    }
  }
</script>
<style>

</style>
