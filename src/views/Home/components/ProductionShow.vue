<template>
  <section-rect id="ProductionShow" hasCaption  hasDescription wrapClasses="container">
    <p class="text-center pt-4" slot="caption">
      Check out BAS Production
    </p>
    <p class="section-text text-center" slot="description">
      Are you looking to verify transaction?
    </p>

    <div class="row align-content-center product-row" slot="content">
      <div class="col-6 text-center">
        <div class="product-card" @click="downloadBrowser">
          <div class="d-block">
            <img src="/static/icons/bas-browser.png" alt="BAS Browser" class="img-fluid product-icon">
          </div>
          <div class="d-block">
            <span class="product-dl-text">Get BAS Explorer for mac</span>
            <i class="fa fa-download"></i>
          </div>
          <p class="d-block small">int</p>
        </div>
      </div>
      <div class="col-6 text-center">
        <div class="product-card" @click="downloadExtension">
          <div class="d-block">
            <img src="/static/icons/exte_icon.png" alt="BAS Extension" class="img-fluid product-icon">
          </div>
          <div class="d-block">
            <span class="product-dl-text">BAS Extensions</span>
            <i class="fa fa-plug"></i>
          </div>
          <p class="d-block small">chrome & firefox</p>
        </div>
      </div>
    </div>
  </section-rect>
</template>

<script>
import SectionRect from '@/components/SectionRect.vue'
export default {
  name:"ProductionShow",
  components:{
    SectionRect
  },
  methods:{
    downloadBrowser() {
      alert('Browser');
    },
    downloadExtension() {
      alert('Extension')
    }
  }
}
</script>
<style>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 165px;
  margin: 8px auto;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.product-icon {
  height: 54px;
  width: 54px;
}

.product-card:hover {
  cursor: pointer;
}


</style>
