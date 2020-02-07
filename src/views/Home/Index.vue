<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span >

      </span>
      <div slot="body">
        <a
          class="btn btn-outline-primary"
          href="https://github.com/Aventador-lab/Vue-demo/issues"
          target="_blank"
        >
          <i
            class="fa fa-github fa-fw"
            aria-hidden="true"
          />
          <span class="pl-2">
            GitHub
          </span>
        </a>
      </div>
      <div slot="footer">
        Copyright @ 2020 BAS.
      </div>
    </v-card>
  </v-layout>
</template>
<script>
import VLayout from '@/layouts/Default.vue'
//import VCard from '@/components/Card.vue';

export default {
  name:'HomeIndex',

  components:{
    VLayout,
    //VCard,
  },
}
</script>
