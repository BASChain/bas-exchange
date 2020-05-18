<template>
  <div :class="mainwarpClassNames">
    <header v-if="hasSlot('header')">
      <slot name="header" />
    </header>

    <div class="body-wrap fixed" v-if="hasSlot('body')">
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
  mounted(){
  },
  mixins:[
    SlotMixin,
  ],
  components:{
  },
  props: {
    keepTop:{
      default:false,
      type:Boolean,
      required:false
    },
    fixTop: {
      default:false,
      type:Boolean,
      required:false
    },
    topbarClass:{
      default:'',
      type:String,
      required:false
    }
  },
  computed: {
    mainwarpClassNames(){
      const classNames = []
      if(!this.keepTop){
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
  top:70px;
}

.footer-warp {
  padding: .5rem 0;
  background-color: rgba(245,246,246,1);
}

</style>
