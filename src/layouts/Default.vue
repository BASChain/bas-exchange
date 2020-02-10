<template>
  <div>
    <top-bar />
    <slot />
  </div>
</template>

<script>
import TopBar from '@/header/TopBar.vue'

export default {
  name:'DefaultLayout',
  data() {
    return {
      menuCollapsed:false,
    };
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
