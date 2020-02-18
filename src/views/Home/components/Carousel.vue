<template>
  <el-carousel :interval="10000" height="100vh"
    id="HomeCarousel">
    <el-carousel-item v-for="(item,idx) in banners"
      :key="idx">
      <div class="bas-carousel--inner">
        <img :src="`/static/img/${item.img}`" :alt="item.name" class="header-carousel">
      </div>
    </el-carousel-item>
  </el-carousel>

</template>

<script>
export default {
  name:"HeaderCarouselEle",
  data() {
    return {
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
  height: 100vh !important;
}
.bas-carousel--inner {
  width: 100vw;
  height: 100vh;
}
</style>
