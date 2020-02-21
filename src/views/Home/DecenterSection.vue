<template>
  <div class="container">
    <h1 class="section-title bas-pt-100">{{ captionTitle }}</h1>
    <el-row :gutter="24" >
      <el-col :span="12" style="border:1px solid #88c;background:#555;height:30px;"></el-col>
      <el-col :span="12" style="border:1px solid #88c;background:#555;height:30px;"></el-col>
    </el-row>


    <div class="bas-home--decenter-wrap">
      <div class="bas-home--decenter-wfbox">

        <div class="bas-home--decenter-overflow-container">
          <div class="bas-home-scroll-cards">
            <div class="bas-home-scroll-card">
              <div>
                <img src="/static/icons/home_decenter_wf1.png" class="bas-home-scroll-card--img">
                <div class="bas-home-scroll-card--body">
                  <h5>域名注册</h5>
                  <p>Bas chain可直接注册域名，以实时的记账形式消耗BAS数字货币，
                    并有效避免了传统域名 注册的多层级操作以及时间长、费用高等问题
                  </p>
                </div>
                <div class="bas-home-scroll-card--footer">
                  <span class="bas-text-green">
                    去注册 <i class="fa fa-long-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="bas-home-scroll-card">
              <div>
                <img src="/static/icons/home_decenter_wf2.png" class="bas-home-scroll-card--img">
                <div class="bas-home-scroll-card--body">
                  <h5 class="bas-home-scroll-card--body-title">域名交易</h5>
                  <p>bas使交易信息更透明化、公开化；域名所有权归秘钥所有者，不必担心被强制变更的风 险；
                    bas更加智能可自动执行合约，无需值守，有效的避免中间商赚取差价的行为；命名 支持任何语言，
                    无法抢注，采用区块链交易，像比特币一样安全
                  </p>
                </div>
                <div class="bas-home-scroll-card--footer">
                  <span class="bas-text-green">
                    去注册 <i class="fa fa-long-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="bas-home-scroll-card">
              <div>
                <img src="/static/icons/home_decenter_wf3.png" class="bas-home-scroll-card--img">
                <div class="bas-home-scroll-card--body">
                  <h5>加入矿池</h5>
                  <p>bas域名信息变更速度更快，通过矿机打包成功即完成一次变更， 时长不超过20s，
                  </p>
                </div>
                <div class="bas-home-scroll-card--footer">
                  <span class="bas-text-green">
                    去注册 <i class="fa fa-long-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- <div class="bas-home--decenter-nav bas-home--decenter-nav--right">

        </div> -->
      </div>
    </div>

  </div>
</template>
<style module="About">

.bas-home--decenter-wfbox {
  position: relative;
}

.bas-home--decenter-nav {
  position: relative;
  z-index: 5;
  border: 1px solid #00b;
}

.bas-home--decenter-nav--left {
  float: left;
  left: 10px;
}

.bas-home--decenter-nav--right {
  float:right;
  right: 10px;
}

.bas-home--decenter-wfbox {
  position: relative;
  width: 100%;
  display: flex;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
}
.bas-home--decenter-overflow-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.bas-home-scroll-cards {
  display: flex;
	transition: transform 150ms ease-out;
	transform: translatex(0px);
}

.bas-home-scroll-card {
  width: 50%;
  /* padding-left:12px;
  padding-right: 12px; */
}

.bas-home-scroll-card:first-child {
  /* margin-left: -12px; */
}

.bas-home-scroll-card:last-child {
  /* margin-right: -12px; */
}

.bas-home-scroll-card>div {
  display: flex;
  min-height: 480px;
  flex-direction:  column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid rgba(235,237,237,1);
}


.bas-home-scroll-card--body {
  display: block;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: .25rem;
  width: 100%;
}
.bas-home-scroll-card--img {
  padding: 0 !important;
  align-self: top;
  width: 100%;
  border: 1px dashed rgba(235,237,237,1);
}

.bas-home-scroll-card--body-title {
  margin: 1rem auto;
  text-align: center;
}

.bas-home-scroll-card--body>h5 {
  width: 100%;
  justify-content: center;
  align-self: auto;
}

.bas-home-scroll-card--footer {
  display: inline-flex;
  padding: .5rem auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(235,237,237,1);
  height: 45px;
  background: #fff;
}
</style>

<script>
export default {
  name:"DecenterSection",
  data() {
    return {
      captionTitle:"完全去中心化"
    }
  }
}
</script>
