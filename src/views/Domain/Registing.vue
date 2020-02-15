<template>
  <div>
Registing
  </div>
</template>
<style>

</style>
<script>
export default {
  name:"DomainRegisting",
  data() {
    return {
      commitDomain:{}
    }
  },
  mounted(){
    const commitDomain = $route.params.commitDomain;
    console.log(commitDomain)
    this.commitDomain = Object.assign({},commitDomain)
  },
  computed:{

  }
}
</script>
