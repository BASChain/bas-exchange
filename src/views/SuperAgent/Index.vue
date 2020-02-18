<template>
 <v-layout>
   <page-container>
     <div slot="body" class="container">

       <div class="row justify-content-center align-items-center pb-5">
         <div class="col-5 text-center pt-5">
           <div class="bas-supnode--imgbox">
             <img src="/static/img/bas_dl_ext1.jpg" class="img-fluid">
           </div>
           <h3>超级节点</h3>
           <p>Some Characts AAAA</p>
           <button class="btn bas-btn-primary w-25">
             加入
           </button>
         </div>
         <div class="col-5 text-center pt-5">
           <div  class="bas-supnode--imgbox">
             <img src="/static/img/bas_dl_ext1.jpg" class="img-fluid">
           </div>
           <h3>超级节点</h3>
           <p>Some Characts AAAA</p>
           <button class="btn bas-btn-primary w-25">
             加入
           </button>
         </div>
       </div>
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
  name:"AgentIndex",
  data(){
    return {
      demos:[

      ]
    }
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
}
</script>
<style>
.bas-supnode--imgbox {
  height: 240px;
  background:rgba(216,216,216,1);
  opacity:0.3;
  border:1px solid rgba(151,151,151,1);
}
</style>
