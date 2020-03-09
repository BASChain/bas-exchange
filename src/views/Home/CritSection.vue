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
                {{ liOne.title }}
                <p class="home-li-content">
                  {{ liOne.content }}
                </p>
              </li>
            </ul>
          </div>
          <div class="crit-tipbox">
            <ul class="home-crit-ul">
              <li class="home-crit-li-green">
                {{ liTwo.title }}
                <p class="home-li-content">
                  {{ liTwo.content }}
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
        title:"传统节点",
        content:"根节点1个，辅根节点12个， 集中在少数国家手中形成技术霸权 多次利用技术霸权攻击主权国家 仅仅支持英文根域名服务 根域名范围是固定范围选中，无法自定义"
      },
      liTwo:{
        title:"Bas节点",
        content:"64个主根节点，128个辅助节点 所有权归不同国家不同机构所有 掌握秘钥即掌握数据所有权 通过区块链共识算法，所有节点公平对待， 公开数据，共同治理， 根域名不限制语言与数量。"
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
