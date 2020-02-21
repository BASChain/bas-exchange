<template>
  <div class="container">
    <el-carousel :interval="20000" type="card" height="200px">
      <el-carousel-item class="bas-el-carousel-item--wrapper"
        v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<script>
export default {
  name:"TripleEleCards"
}
</script>

