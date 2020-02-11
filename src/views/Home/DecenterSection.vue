<template>
  <div class="container">
    <h1 class="section-title bas-pt-100">{{ captionTitle }}</h1>
    <div class="row justify-content-center ">
      <div class="red">
        Scrolll
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DecenterSection",
  data() {
    return {
      captionTitle:"完全去中心化"
    }
  }
}
</script>
<style module="About">
.red {
  color:brown;
}
</style>
