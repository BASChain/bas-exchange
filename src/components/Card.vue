<template>
  <div class="">
    <h4 v-if="hasSlot('header')" :class="classNamesHeader">
      <slot name="header" />
    </h4>
    <div
      v-if="hasSlot('body')"
      class="card-body">
      <slot name="body"/>
    </div>
    <div class="card-footer">
      Footer
    </div>
  </div>
</template>

<script>
import SlotMixin from '@/mixins/slot'

export default {
  name: 'Card',
  mixins: [
    SlotMixin
  ],
  computed: {
    classNamesHeader() {
      const classNames = ['card-header']

      return classNames;
    }
  }
}
</script>
<style>

</style>
