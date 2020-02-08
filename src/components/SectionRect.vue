<template>
  <section :id="id">
    <div :class="wrapClasses">
      <h1 v-if="hasCaption" class="section-caption">
        <slot name="caption"/>
      </h1>
      <div v-if="hasDescription">
        <slot name="description"/>
      </div>
      <slot name="content"/>
    </div>
  </section>
</template>

<script>
export default {
  name:"SectionRect",
  props:{
    hasCaption:{
      default:false,
      type:Boolean,
      required:false
    },
    hasDescription:{
      default:false,
      type:Boolean,
      required:false
    },
    wrapClasses: {
      default:'',
      type:String,
      required:false
    },
    id:{
      type:String,
      required:true
    }
  },
  computed:{
    classWrapSection() {
      const classNames = ['']
      if(this.wrapClasses){

      }
    }
  }
}
</script>
<style>

.section-caption {
  font-size:36px;
  font-family:PingFangSC-Medium,PingFang SC,Roboto-Medium,Roboto;
  font-weight:500;
  color:rgba(4,6,46,1);
  line-height:42px;
  letter-spacing:1px;
}
</style>
