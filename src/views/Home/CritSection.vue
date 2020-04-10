<template>
  <div class="home-crit-container mt-5">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-8">
          <img src="/static/img/crit_bg.png" class="img-fluid">
        </div>
        <div class="col-md-4 col-sm-8">
          <div class="crit-tipbox">
            <ul class="home-crit-ul">
              <li class="home-crit-li-red">
                {{ $t('p.HomeTraNodeTitle')}}
                <p class="home-li-content">
                  {{ $t('p.HomeTraNodeDesc') }}
                </p>
              </li>
            </ul>
          </div>
          <div class="crit-tipbox">
            <ul class="home-crit-ul">
              <li class="home-crit-li-green">
                {{ $t('p.HomeBasNodeTitle') }}
                <p class="home-li-content">
                  {{ $t('p.HomeBasNodeDesc') }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"CritSection",
  data() {
    return {
      liOne:{
        title:"HomeTraNodeTitle",
        content:"HomeTraNodeDesc"
      },
      liTwo:{
        title:"HomeBasNodeTitle",
        content:"HomeBasNodeDesc"
      }
    }
  }
}
</script>
<style>
.home-crit-container {
  background-color: rgba(4,6,46,1);
}

.home-crit-container .row {
  min-height: 100vh;
}

.home-crit-ul {
  font-size:20px;
  font-weight:500;
  line-height:28px;
  letter-spacing:1px;
}

.home-crit-li-red {
  color: #E55151;
}

.home-crit-li-green {
  color: #00CA9B;
}

.home-li-content {
  font-size:18px;
  font-weight:300;
  color:rgba(255,255,255,1);
  line-height:30px;
}

.crit-tipbox {
  position: inherit;
  margin: 40px 0 20px 20px;
  padding-top: 20px;
  max-width:400px;
  min-height: 140px;
  border-radius: 5px;
  border: 1px solid rgba(108,108,115,.5);
  background: rgba(108,108,115,.35);
}

.crit-tipbox:before ,.crit-tipbox:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 10px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
}

.crit-tipbox:before {
  left: -16px;
  border-right-color: rgba(108,108,115,.5);
  z-index: 1;
}

@media (min-width: 375) {

.crit-tipbox {
  position: inherit;
  margin: 40px 0 20px 20px;
  padding-top: 20px;
  max-width:100%;
  min-height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(108,108,115,.5);
  background: rgba(108,108,115,.35);
}

}
</style>
