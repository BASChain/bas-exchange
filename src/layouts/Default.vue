<template>
  <div>
    <top-bar v-bind:isBlack="isBlackTheme"/>
    <!-- <div>{{topbarTheme}}</div> -->
    <slot />
  </div>
</template>

<script>
import TopBar from '@/header/TopBar.vue'
//import TopBar from '@/header/TopEleNav.vue'
//import TopBar from '@/header/TopBSBar.vue'

export default {
  name:'DefaultLayout',
  data() {
    return {
      menuCollapsed:false,
    };
  },
  props:{
    topbarTheme: {
      default:'white',
      type:String,
      required:false
    }
  },
  components: {
    TopBar,
  },

  methods:{

  },
  computed: {
    isBlackTheme (){
      return !!(this.topbarTheme ==='black')
    }
  }
}
</script>

<style>


</style>
