<template>
  <div class="mile-stone-container">
    <div class="milestaone-prefix"
      :class="`left-${i18nSuffix}`">
    </div>
    <div class="milestone-phase ms-panku">

    </div>
    <div class="milestaone-suffix"
      :class="`right-${i18nSuffix}`"></div>
  </div>
</template>

<script>
export default {
  name:"MileStoneLine",
  computed: {
    ...Vuex.mapState({
      i18nSuffix:state => state.lang.toLowerCase()
    })
  },
  data() {
    return {

    }
  },
  mounted() {

  },
}
</script>
<style>


.mile-stone-container {
  width: 100%;
  display: flex;
  margin: 24px 0;
}
.milestaone-prefix {
  width:722px;
  height: 119px;
}
.left-zh-cn {
  background-image:url('./assets/left_zh-cn.png');
  background-size:cover;
  background-position:50%;
}
.left-en {
  background-image:url('./assets/left_zh-cn.png');
  background-size:cover;
  background-position:50%;
}
.left-jp {
  background-image:url('./assets/left_zh-cn.png');
  background-size:cover;
  background-position:50%;
}
.milestone-phase {
  height: 119px;
  width: 110px;
}
.ms-panku {
  background-image:url('./assets/ms-panku.png');
  background-size:cover;
  background-position:50%;
}
.milestaone-suffix {
  flex: auto;
  height: 119px;
}

.right-zh-cn {
  background-image:url('./assets/r-line.png');
  background-size:cover;
  background-position:100%;
}
.right-en {
  background-image:url('./assets/r-line.png');
  background-size:cover;
  background-position:50%;
}
.right-jp {
  background-image:url('./assets/r-line.png');
  background-size:cover;
  background-position:50%;
}
</style>
