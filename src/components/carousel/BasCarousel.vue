<template>
  <div class="bas-carousel bas-carousel--horizontal">
    <div class="bas-carousel__container" style="height:200px;">
      <span class="bas-carousel__arrow bas-carousel__arrow--left">
        <i class="fa fa-arrow-circle-left bas-arrow-circle"></i>
      </span>
      <!-- <button type="button">

      </button> -->
      <span class="bas-carousel__arrow bas-carousel__arrow--right">
        <i class="fa fa-arrow-circle-right bas-arrow-circle"></i>
      </span>

      <div class="bas-carousel__item">
        <div class="bas-carousel__mask">AAA</div>
        <h3 class="medium">AAA</h3>
      </div>
      <div class="bas-carousel__item">
        <div class="bas-carousel__mask">BBB</div>
        <h3 class="medium">BBB</h3>
      </div>
      <div class="bas-carousel__item">
        <div class="bas-carousel__mask">CCC</div>
        <h3 class="medium">CCC</h3>
      </div>
      <div class="bas-carousel__item">
        <div class="bas-carousel__mask">DDD</div>
        <h3 class="medium">DDD</h3>
      </div>
      <div class="bas-carousel__item">
        <div class="bas-carousel__mask">EEE</div>
        <h3 class="medium">EEE</h3>
      </div>
    </div>
  </div >
</template>

<script>
export default {
  name:"BasCarousel"
}
</script>
<style>
.bas-carousel {
  position: relative;
}
.bas-carousel--horizontal {
  overflow-x: hidden;
}

.bas-carousel__arrow {
  border:none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: .3s;
  background: transparent;
}

.bas-carousel__arrow:active {
  border: none;
  outline: none;
}

.bas-arrow-circle {
  font-size:24px;
  color: rgba(245,246,246,1);
  background: transparent;
}

.bas-arrow-circle:hover, .bas-arrow-circle:active{
  border: none;
  outline: none;
  color: rgba(0,202,155,1);
  background:rgba(245,246,246,1);
}
</style>
