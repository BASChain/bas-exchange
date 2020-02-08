<template>

  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators>

    <b-carousel-slide
      img-src="/static/img/banner.png"
      >
      <div class="container">
        <div class="row">
          <div class="col-4">First</div>
        </div>
      </div>
    </b-carousel-slide>
    <b-carousel-slide
      img-src="/static/img/banner1.png"
      >
      <div class="container">


      </div>
    </b-carousel-slide>
    <b-carousel-slide
      img-src="/static/img/banner.png"
    >
      <div class="container">
        kshfdasfddsfasdfkadsf

      </div>
    </b-carousel-slide>
  </b-carousel>

</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
<style>

</style>
