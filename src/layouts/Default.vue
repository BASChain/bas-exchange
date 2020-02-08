<template>
  <div>
    <top-bar />
    <slot />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name:'DefaultLayout',
  data() {
    return {
      menuCollapsed:false,
    };
  },

  components:{
    TopBar,
  },

  components: {
    TopBar,
  },

  methods:{

  },
  computed: {

  }
}
</script>

<style>



</style>
