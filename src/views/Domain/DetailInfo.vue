<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header bas-green-bg text-white">
          <div class="bas-card__header-title">
            {{getDomain ? getDomain :'❤️🌟.cn'}} {{$t('p.DominDetailRegistTitle')}}
          </div>
          <div class="bas-card__tools d-none">
            <button class="btn btn-secondary">Regist</button>
          </div>
        </div>
        <div class="bas-card__body">
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
          <span class="bas-small">0x08970FEd061E7747CD9a38d680A601510CB659FB</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
          <span>08618220200123</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
          <span>admin@bas.com</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailSiteLabel')}}</label>
          <span>https://❤️🌟.cn</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailContactAddressLabel')}}</label>
          <span>xin,bj,china</span>
        </div>
          <hr>
        <div class="bas-whois--second">
          <div class="d-block">
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailTypeLabel')}}</label>
              <span>非英文根域名</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailAuthorityLabel')}}</label>
              <span>已开放注册二级域名</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainExpirationLable')}}</label>
              <span>2025-12-30 12:25:35</span>
            </div>
          </div>
          <div class="bas-whois--right-container">
            <div class="bas-price-container">
              <h1 class="bas-text-green d-inline" style="font-size:">500</h1>
              <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
            </div>
            <div class="bas-whois-btn-container w-100">
              <button class="btn bas-btn-primary w-100" @click="gotoRegist">去注册</button>
            </div>
          </div>
        </div>
        </div>
        <div class="bas-card__body bas-card__body--last-radius">
          <div class="bas-card__header-title pt-2 pb-3">
           映射数据：
          </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
          <span class="bas-small">0x08970FEd061E7747CD9a38d680A601510CB659FB</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailContactsLabel')}}</label>
          <span>08618220200123</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailEmailLabel')}}</label>
          <span>admin@bas.com</span>
        </div>
        <div class="bas-inline">
          <label class="bas-form-label">{{$t('p.DomainDetailSiteLabel')}}</label>
          <span>https://❤️🌟.cn</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:"DomainDetail",
  data(){
    return {
      id:'',
      info:null
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.id = this.$route.params.id;
  },
  computed:{
    ...mapGetters([
      'checkMetamaskEnable'
    ]),
    getDomain(){
      return  this.id
    },
  },
  methods:{
    gotoRegist() {
      let next =  {
        name:"domain.regist",
        params:{
          id:this.id||''
        }
      }
      this.$router.push(next)
      // if(this.checkMetamaskEnable){
      //   this.$router.push(next)
      // }else{
      //   this.$metamask()
      // }
    }
  }
}
</script>
<style>

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
