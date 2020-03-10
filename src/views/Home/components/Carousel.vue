<template>
  <el-carousel :interval="5000" :height="carouselHeight"
    id="HomeCarousel">
    <el-carousel-item v-for="(item,idx) in banners"
      :key="idx">
      <div class="bas-carousel--inner">
        <img :src="`/static/img/${item.img}`" :alt="item.name" class="header-carousel">

        <!-- index 1 -->
        <div  v-if="idx ===1" class="bas-carsouel-float d-none d-md-block">
          <div class="bas-carsouel-inner--container">
            <div class="bas-carsouel-inner--block" >
              <h1 class="text-center" style="font-size:4.75rem;">
                免费领取BAS测试币
              </h1>
              <p style="margin:.75rem auto;font-size:1.2rem;">仅限在Ropsten测试网络使用</p>
              <div class="bas-carsouel-inner--block">
                <button @click="getETHFree"
                  class="carsouel-btn">{{ $t('p.HomeCarouselGetEth') }}</button>
                <button @click="getBASFree" style="margin-left:1.5rem;"
                  class="carsouel-btn">{{ $t('p.HomeCarouselGetBAS') }}</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </el-carousel-item>
  </el-carousel>

</template>
<style>
.bas-carsouel-float {
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color:#fff;
  border: 2px solid #fff;
}

.bas-carsouel-inner--block {
  clear: inherit;
  display:block;
  text-align: center;
  margin-bottom: 2rem;
}

.bas-carsouel-inner--container {
  clear: both;
  width: 100%;
  height: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto;
}

.carsouel-btn {
  background: rgba(4,6,46,.9);
  border: 1px solid rgba(4,6,46,1);
  margin-top: 1rem;
  color: #fff;
  width: 150px;
  height: 52px;
  font-weight:400;
  font-size:1rem;
  opacity: 0.9;
}


.carsouel-btn:hover {
  opacity: 0.75;
}

</style>
<script>
import Lodash from 'lodash'
import { checkGetFreeNetwork,getFreeBas } from '@/bizlib/web3/getfree-api'
export default {
  large:false,
  name:"HeaderCarouselEle",
  data() {
    return {
      carouselHeight:'100vh',
      banners:[
        {
          name:"FirstBanner",
          img:'banner_0.png'
        },
        {
          name:"Second",
          img:'banner_1.png'
        },
        {
          name:"Third",
          img:'banner_2.png'
        }
      ]
    }
  },
  computed: {

  },
  mounted() {
    //todo check injected
  },
  methods: {
    initCarousel() {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWith = width;
    },
    resizeCarousel() {

    },
    getETHFree(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      console.log('>>>')
    },
    getBASFree(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;
      if(!chainId || !wallet){
        throw new Error('no chainId or wallet')
      }
      
      if(!checkGetFreeNetwork(chainId)){
        let errTip = "当前网络不是测试网络,请通过Metamask切换到[Ropsten]"
        this.$message(this.$basTip.error(errTip))
        return;
      }
      let tips = ''
      getFreeBas(chainId,wallet).on('transactionHash',(txhash)=>{
        console.log('GetFreeBas:',txhash);
        tips = '申请已提交,正在处理...'
        this.$message(this.$basTip.warn(tips))
      }).on('receipt',(receipt)=>{
        console.log('GetFreeBas:',receipt);
        tips = 'BAS 已下发,请到钱包查询'
        this.$message(this.$basTip.warn(tips))
      }).catch('error',(err,receipt)=>{
        if(err.code === 4001){
          let errMsg = this.$t('g.MetaMaskRejectedAuth')
          this.$message(this.$basTip.error(errMsg))
        }else{
          tips = 'BAS 申请失败,请重试'
          this.$message(this.$basTip.warn(tips))
        }
      })

    }
  }
}
</script>
<style>

</style>
