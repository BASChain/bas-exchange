<template>
  <el-carousel :interval="105000" :height="carouselHeight"
    id="HomeCarousel">
    <el-carousel-item v-for="(item,idx) in banners"
      :key="idx">
      <div class="bas-carousel--inner">
        <img :src="`/static/img/${item.img}`" :alt="item.name" class="header-carousel">
        <div v-if="idx ===1" class="bas-carsouel-float d-none d-md-block">
          <button @click="getETHFree"
            class="carsouel-btn">{{ $t('p.HomeCarouselGetEth') }}</button>
          <button @click="getBASFree"
            class="carsouel-btn">{{ $t('p.HomeCarouselGetBAS') }}</button>
        </div>

      </div>
    </el-carousel-item>
  </el-carousel>

</template>
<style>
.bas-carsouel-float {
  position: absolute;
  left: 10%;
  top: 52%;
}
.bas-carsouel-float .carsouel-btn {
  margin: 0.5rem auto;
  width: 150px;
  height: 52px;
  font-weight:400;
  font-size:1rem;
  border: 1.5px solid #fff;
  border-radius: 5px;
  opacity: 0.85;
}

.bas-carsouel-float .carsouel-btn {
  margin: 0.5rem auto;
  width: 150px;
  height: 52px;
  font-weight:400;
  font-size:1rem;
  border: 1.5px solid #fff;
  border-radius: 5px;
  opacity: 0.85;
}

.carsouel-btn:hover {
  opacity: 0.7;
}

</style>
<script>
import Lodash from 'lodash'
export default {
  large:false,
  name:"HeaderCarouselEle",
  data() {
    return {
      carouselHeight:'100vh',
      banners:[
        {
          name:"FirstBanner",
          img:'banner_0.png'
        },
        {
          name:"Second",
          img:'banner_1.png'
        },
        {
          name:"Third",
          img:'banner_2.png'
        }
      ]
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    initCarousel() {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWith = width;
    },
    resizeCarousel() {

    },
    getETHFree(){

    },
    getBASFree(){

    }
  }
}
</script>
<style>

</style>
