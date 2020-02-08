<template>
  <section-rect id="KeepSafedShow" hasCaption wrapClasses="container">
    <p class="text-center pt-4" slot="caption">
      We keep you safed
    </p>
    <div slot="content" class="row pt-3 pb-4">
      <div class="col-md-4">
        <div class="card keep-safed-card ">
          <div>
            <img src="/static/icons/customer_icon.png"  class="img-fluid keep-icons">
            <p class="keep-safed-title">
              Buyer Protection Program
            </p>
            <p class="keep-safed-text">
              We protect every transaction through a careful escrow process, leading to 100% successful acquisitions since 2014.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card keep-safed-card ">
          <div>
            <img src="/static/icons/customer_icon.png"  class="img-fluid keep-icons">
            <p class="keep-safed-title">
              Safe Payments by Adyen
            </p>
            <p class="keep-safed-text">
              Our partner Adyen processes all payments with professional-grade security so you never have to worry!
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card keep-safed-card ">
          <div>
            <img src="/static/icons/customer_icon.png"  class="img-fluid keep-icons">
            <p class="keep-safed-title">
              Best Customer Support
            </p>
            <p class="keep-safed-text">
              Customers love our team! We are always available for you and respond to your chat or email 7 days a week.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section-rect>
</template>

<script>
import SectionRect from '@/components/SectionRect.vue'
export default {
  name:"KeepSafedShow",
  components:{
    SectionRect,
  },
}
</script>
<style>
.keep-safed-card {
  border:none;
  padding: 4px;
}

.keep-icons {
  height: 40px;
  width: 40px;
}
.keep-safed-title {
  font-size:20px;
  font-weight:600;
}

.keep-safed-text {
  font-weight:300;
  font-size:18px;
  line-height:22px;
}
</style>
