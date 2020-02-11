<template>
  <div :class="mainwarpClassNames">
    <header v-if="hasSlot('header')">
      <slot name="header" />
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

export default {
  name:"PageContainer",
  mixins:[
    SlotMixin,
  ],
  components:{
  },

  props: {
    fixTop: {
      default:true,
      type:Boolean,
      required:false
    },
  },
  computed: {
    mainwarpClassNames(){
      const classNames = ['main-warp']
      console.log(this.fixTop)
      if(this.fixTop){
        classNames.push('main-t100')
      }
      return classNames
    }
  },
}
</script>
<style>


  .main-t100 {
    position: relative;
    top:100px;
  }

  .footer-warp {
    padding: 1rem 0;
    background-color: rgba(245,246,246,1);
  }

</style>
