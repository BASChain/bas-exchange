<template>
  <div>
    <div class="container pt-3 pb-3">
      <div class="app-exporer-zh-cn'">
        <!-- <div class="app-explorer--left">
          <div class="inner-center">
            <h1>
              {{explorer.title}}
            </h1>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>
<style>
.app-exporer-zh-cn {
  height: 420px;
  width: 100%;
  background-image: url('./assets/app_explorer_bg_cn.png');
  background-size: cover;
  background-position: 50%;
}

.app-exporer-en {
  height: 420px;
  width: 100%;
  background-image: url('./assets/app_explorer_bg_en.png');
  background-size: cover;
  background-position: 50%;
}

/* .app-explorer--left {
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.app-explorer--left .inner-center {
  display: inline-flex;
  direction: column;
  width: 60%;
  color:#fff;
} */

</style>
<script>
import { mapState } from 'vuex'
export default {
  name:"AppStoreIndex",
  computed: {
    ...mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style>

</style>
