<template>
  <div>
    <top-bar />
    <div class="main-container">
      <slot slot />
    </div>
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

  props:{
    hasHeader:{
      default:false,
      type:Boolean,
      required:false
    }
  },

  components: {
    TopBar,
  },

  methods:{

  },
  computed: {
    classNamesMain() {
      const mainClassNames = ['main-container']
      if(!this.hasCarouselHeader){
        mainClassNames.push('main-t100')
      }
      return mainClassNames
    }
  }
}
</script>

<style>
.main-t100 {
  position: relative;
  top:100px;
}

.carousel-wrap {
  width: 100%;
  height: 60vh;
}
</style>
