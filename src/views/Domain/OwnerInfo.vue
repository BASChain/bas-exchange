<template>
 <v-layout>
   <page-container>
     <div class="bas-gray-bg" slot="body">
       <div class="container">
         <div class="row justify-content-center">
           <div class="col-7 bas-card">
             <div class="bas-card__header bas-green-bg">
               <div class="bas-card__header-title"> {{getDomain}} ❤️🌟.cn 域名注册信息</div>
               <div class="bas-card__tools d-none">
                  <button class="btn btn-secondary">Regist</button>
               </div>
             </div>
             <div class="bas-card__body">
              <div class="bas-inline">
                <label class="bas-form-label">所有者</label>
                <span>0x08970FEd061E7747CD9a38d680A601510CB659FB</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">電話</label>
                <span>08618220200123</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">郵箱</label>
                <span>admin@bas.com</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">網站</label>
                <span>https://❤️🌟.cn</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">地址</label>
                <span>xin,bj,china</span>
              </div>
               <hr>
              <div class="bas-whois--second">
                <div class="d-block">
                  <div class="bas-inline">
                    <label class="bas-form-label">域名类型</label>
                    <span>非英文根域名</span>
                  </div>
                  <div class="bas-inline">
                    <label class="bas-form-label">域名权限</label>
                    <span>已开放注册二级域名</span>
                  </div>
                  <div class="bas-inline">
                    <label class="bas-form-label">到期时间</label>
                    <span>2025-12-30 12:25:35</span>
                  </div>
                </div>
                <div class="bas-whois--right-container">
                  <div class="bas-price-container">
                    <h1 class="bas-text-green d-inline" style="font-size:">500</h1>
                    <span class="bas-text-green">BAS/年</span>
                  </div>
                  <div class="bas-whois-btn-container">
                    <button class="btn bas-primary-btn">去注册</button>
                  </div>
                </div>
              </div>
             </div>
             <div class="bas-card__body bas-card__body--last-radius">
               <div>
                 <h3>映射数据：</h3>
               </div>
              <div class="bas-inline">
                <label class="bas-form-label">所有者</label>
                <span>0x08970FEd061E7747CD9a38d680A601510CB659FB</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">電話</label>
                <span>08618220200123</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">郵箱</label>
                <span>admin@bas.com</span>
              </div>
              <div class="bas-inline">
                <label class="bas-form-label">網站</label>
                <span>https://❤️🌟.cn</span>
              </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     <div class="bas-body-split"></div>
     <foot-container slot="footer"/>
   </page-container>
 </v-layout>
</template>
<style>

.bas-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-radius: 5px 5px 0 0;
}
.bas-card__header-title {
  padding-left: 20px;
  color: #fff;
}

.bas-card__tools {
  margin-right: .5rem;
}

.bas-card__body {
  padding: 10px;
  font-size: 18px;
  border-left: 1px solid  rgba(235,237,237,1);
  border-right: 1px solid  rgba(235,237,237,1);
  border-bottom: 1px solid  rgba(235,237,237,1);
}

.bas-card__body--last-radius {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px ;
}

.bas-card {
  margin: .5rem 0 ;
  overflow: hidden;
  background-color: #fff;
  transition: .3s;
}

.bas-whois--second {
  width: 100%;
  display: inline-flex;
  direction: row;
  align-items: center;
  justify-content:space-between;
}
.bas-whois--right-container {
  display: inline-block;
  justify-items: center;
  min-width: 200px;
}
.bas-price-container {
  display: inline-block;
  justify-items: baseline;
  font-size: 14px;
}
</style>

<script>
import VLayout from '@/layouts/Default.vue'
import PageContainer from '@/components/PageContainer.vue'
import FootContainer from '@/footer/FootContainer.vue'

export default {
  name:"OwnerInfo",
  data(){
    return {}
  },
  components: {
     VLayout,
     PageContainer,
     FootContainer,
  },
  mounted(){
    const id = this.$route.params.id;
    console.log('Whois>>>>>',id)
  },
  computed:{
    getDomain(){
      return  this.$route.params.id
    }
  }
}
</script>
