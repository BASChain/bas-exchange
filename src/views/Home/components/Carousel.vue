<template>
  <el-carousel :interval="30000" :height="carouselHeight"
    id="HomeCarousel">
    <el-carousel-item v-for="(item,idx) in banners"
      :key="idx">
      <div class="bas-carousel--inner">
        <img :src="`/static/img/${item.img}`" :alt="item.name" class="header-carousel">

        <!-- index 1 -->
        <div  v-if="idx ===0" class="bas-carsouel-float d-none d-md-block">
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
import {
  getBasCheck,
  checkGetFreeNetwork,getFreeBas,checkApplyRecord,
  checkSendBas,
} from '@/bizlib/web3/getfree-api'
import {getEthBalance,checkoutMetaMaskBase} from '@/bizlib/web3'
import GetFreeProxy from '@/proxies/GetFreeProxy.js'
export default {
  large:false,
  name:"HeaderCarouselEle",
  data() {
    return {
      carouselHeight:"100vh",
      banners:[
        {
          name:"FirstBanner",
          img:'banner_1.png'
        },
        {
          name:"Second",
          img:'banner_0.png'
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
      //let url= "https://faucet.metamask.io/";
      //window.open(url,'Get Ether');
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;

      getEthBalance(wallet).then(bal=>{
        if(parseFloat(bal) >= 0.02){
           this.$message(this.$basTip.error('您已经有足够ETH,无需在申请.'))
           return;
        }else{
          let sendProxy = new GetFreeProxy()
          sendProxy.getFreeEth(wallet).then(resp=>{
            if(resp.state){
              this.$message(this.$basTip.warn('请求已提交,区块确认中...'))
            }else{
              this.$message(this.$basTip.error('申请失败,'+resp.errmsg))
            }
          }).catch(ex=>{
            console.log('GetFreeETH:',ex);
            this.$message(this.$basTip.error('网络错误,请重试.'))
            return
          })
        }
      }).catch(ex=>{
        console.log(ex)
        if(ex === 9998){
          this.$message(this.$basTip.error('请安装MetaMask浏览器扩展'))
        }
      })

    },
    getBASFree(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;

      let errMSG = ''
      getBasCheck(chainId,wallet).then(ret=>{
        if(ret){
          let tips = ''
          getFreeBas(chainId,wallet).on('transactionHash',(txhash)=>{
            console.log('GetFreeBas:',txhash);
            tips = '申请已提交,正在处理(区块记账一般需要10秒~180秒)...'
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
      }).catch(ex=>{
        console.log(ex);
        if(ex === 1001){
          errMSG = 'MetaMask 未登录,请点击我的钱包或MetaMask插件登录.'
          this.$message(this.$basTip.error(errMSG))
        }else if(ex === 1002){
          errMSG = '您的ETH不足以支付GAS费,请先领取ETH'
          this.$message(this.$basTip.error(errMSG))
          return;
        }else if(ex === 1004){
          errMSG = '您已经申请过BAS.请到点击右上角"我的钱包"查看'
          this.$message(this.$basTip.error(errMSG))
        }else if(ex === 3001){
          errMSG = "当前网络不是测试网络,请通过Metamask切换到[Ropsten]"
          this.$message(this.$basTip.error(errMSG))
        }
        else if(ex.code === -32601){
          errMSG = '区块网络请求超时,请重试.'
          this.$message(this.$basTip.error(errMSG))
        }else if(ex.code === 4001){
          errMSG = '您拒绝了账号授权.'
          this.$message(this.$basTip.error(errMSG))
        }
      })
    },
    async getBASFromServer(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      console.log('Start GetBAS send...')
      let dappState = this.$store.getters['web3/dappState']
      let chainId = dappState.chainId;
      let wallet = dappState.wallet;

      if(!checkGetFreeNetwork(chainId)){
        let errTip = "当前网络不是测试网络,请通过Metamask切换到[Ropsten]"
        this.$message(this.$basTip.error(errTip))
        return;
      }

      let ethBal = await getEthBalance(wallet)
      console.log('>>>>>',ethBal)
      if(parseFloat(ethBal) <= 0.0){
        let checkEthMsg = '您的ETH不足以支付GAS费,请先领取ETH'
        this.$message(this.$basTip.error(checkEthMsg))
        return;
      }
      //checkSendBas
      let sendMsg = ''
      checkSendBas(chainId,wallet).then(ret =>{
        console.log('Check>>>',ret)
        if(ret){
          sendMsg = '您已经申请过BAS(每个帐户只允许申请一次).请到点击右上角"我的钱包"查看'
          this.$message(this.$basTip.error(sendMsg))
          return;
        }else{
          let sendProxy = new GetFreeProxy()
          sendProxy.getFreeBas(wallet).then(resp=>{
            if(resp.state){
              sendMsg = '您的申请已经提交,您可以到我的钱包刷新确认(区块确认时间一般10秒~60秒之间)'
              this.$message(this.$basTip.warn(sendMsg))
              return
            }else{
              sendMsg = resp.errmsg
              console.log('>>>>Send get Error:',sendMsg)

              this.$message(this.$basTip.error(sendMsg))
              return
            }
          }).cath(ex=>{
            console.log(ex)
            sendMsg = `网络异常,请重试.:${ex.message}`
            this.$message(this.$basTip.error(sendMsg))
            return;
          })
        }
      })
    }
  }
}
</script>
<style>

</style>
