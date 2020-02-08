<template>
  <div :class="mainwarpClassNames">
    <header v-if="hasSlot('header')" class="carousel-wrap">
      <slot name="header" />
      <search-container/>
    </header>

    <div class="body-wrap" v-if="hasSlot('body')">
      <slot name="body"/>
    </div>
    <div
      v-if="hasSlot('footer')"
      class="footer-warp">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import SlotMixin from '@/mixins/slot';
import SearchContainer from './SearchContainer.vue'
export default {
  name:"PageContainer",
  mixins:[
    SlotMixin,
  ],
  components:{
    SearchContainer,
  },

  props: {
    hasCarouselHeader: {
      default:false,
      type:Boolean,
      required:false
    },
  },
  computed: {
    mainwarpClassNames(){
      const classNames = ['main-warp']
      console.log(this.hasCarouselHeader)
      if(!this.hasCarouselHeader){
        classNames.push('main-t100')
      }
      return classNames
    }
  },
}
</script>
<style>
  .carousel-wrap {
    width: 100%;
    min-height: 75vh;
  }

  .main-t100 {
    position: relative;
    top:64px;
  }

  .footer-warp {
    padding: 1rem 0;
    background-color: rgba(245,246,246,1);
  }

</style>
