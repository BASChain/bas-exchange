<template>
  <el-carousel :interval="10000"  height="837px"
    id="HomeCarousel">
    <el-carousel-item v-for="item in 3" :key="item">
      <div>
        <img :src=" '/static/img/banner' + item + '.png' " :alt="item" class="header-carousel">
      </div>

    </el-carousel-item>
  </el-carousel>

</template>

<script>
export default {
  name:"HeaderCarouselEle",
  data() {
    return {
      bannerHeight:937,
      screenWith:1920,
    }
  },

  mounted() {
    //this.initCarousel()
    const that = this;
    // window.addEventListener('resize',function(){
    //   let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //   that.screenWith = window.width();
    //   that.resizeCarousel()
    // },false)
  },
  methods: {
    initCarousel() {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWith = width;


      //document.getElementById('HomeCarousel').style.height = this.bannerHeight+'px'
    },
    resizeCarousel() {
      //this.bannerHeight = 937/1920 * this.screenWith;
      //document.getElementById('HomeCarousel').style.height = this.bannerHeight +'px'
    }
  }
}
</script>
<style>
.index-carousel-wrap {
  height: calc(100vh-100px);
  background-color: black;
}

.el-carousel__container {
  height: calc(100vh-100) !important;
}

.el-carousel__item {
  height: calc(100vh-100) !important;
  background-color:rgba(4,6,46,1);
}


.header-carousel {
  width:100%;
  height: calc(100vh-100) !important;
}
</style>
