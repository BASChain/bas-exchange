<template>
  <div>
    <el-carousel :interval="10000" :height="carouselHeight"
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
                  {{$t('p.HomeGetFreeTitle')}}
                </h1>
                <p style="margin:.75rem auto;font-size:1.2rem;">
                  {{$t('p.HomeGetFreeNetworksTips')}}
                </p>
                <div class="bas-carsouel-inner--block">
                  <button v-loading.lock="ctrl.ethLoading"
                    @click="getETHFree" :disabled="ctrl.ethLoading"
                    class="carsouel-btn">{{ $t('p.HomeCarouselGetEth') }}</button>
                  <button
                    :disabled="ctrl.basLoading" v-loading.lock="ctrl.basLoading"
                    @click="getBASFree" style="margin-left:1.5rem;"
                    class="carsouel-btn">{{ $t('p.HomeCarouselGetBAS') }}</button>
                </div>
              </div>
            </div>

          </div>

          <div v-if="idx ===1 && isCN"
            class="bas-carsouel-float d-none d-md-block">
            <div class="bas-carsouel-inner--block" >
              <div class="slogan-inner-flex">
                <div class="bas-slogan-block">
                  <span class="bas-slogan yellow-cn">
                    区块
                  </span>
                  <span class="bas-slogan">
                    存续
                  </span>
                  <span class="bas-slogan mr-1">
                    历史
                  </span>
                  <span class="bas-slogan ml-1">
                    科技
                  </span>
                  <span class="bas-slogan green-cn">
                    链接
                  </span>
                  <span class="bas-slogan">
                    未来
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div v-if="idx ===1 && !isCN"
            class="bas-carsouel-float d-none d-md-block">
            <div class="bas-carsouel-inner--block">
              <div class="slogan-inner-flex">
                <div class="bas-slogan-block">
                  <span class="bas-slogan yellow-cn">
                    Block
                  </span>
                  <span class="bas-slogan">
                    Records
                  </span>
                  <span class="bas-slogan">
                    Hostory
                  </span>
                </div>
                <div class="bas-slogan-block">
                  <span class="bas-slogan">
                    Techology
                  </span>
                  <span class="bas-slogan green-cn">
                    Links
                  </span>
                  <span class="bas-slogan">
                    Future
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="bas-declare-wrapper">
      <h6>{{$t('p.HomeDeclaration')}}</h6>
    </div>
  </div>


</template>
<style>
.slogan-inner-flex {
  position: fixed;
  width: 100%;
  left:0;
  top:50%;
  transform: translateY(-50%);
  text-align: center;
  -webkit-transform: translateY(-50%);
}
.bas-carsouel-inner-block {
  position:absolute;
  float: left;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
}
.bas-carsouel-inner--container-en .bas-carsouel-block {
  width: 100%;
}

.bas-slogan-block span.bas-slogan {
  font-size:72px;
  font-weight:500;
  line-height:100px;
  letter-spacing:0px;
  margin: 0;
  padding: auto 0;
}

span.yellow-cn {
  color:rgba(253,191,79,1);
}
span.green-cn {
  color:rgba(0, 202, 155, 1);
}

.bas-declare-wrapper {
  height: 48px;
  width: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items:center;
  color: #fff;
  background: rgba(0,202,155,1);
}

.bas-declare-wrapper h6 {
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:22px;
}
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
  /* border: 2px solid #fff; */
}

.bas-carsouel-inner--block {
  clear: inherit;
  display:block;
  text-align: center;
  margin-bottom: 2rem;
}

.bas-carsouel-inner--container {
  clear: both;
  width: 100vw;
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
  width: 160px;
  height: 52px;
  font-weight:400;
  font-size:1rem;
  opacity: 0.9;
}


.carsouel-btn:hover {
  opacity: 0.75;
}

.carsouel-btn:disabled {
  background: transparent;
  color: #fff;
  cursor: none;
  border: 1px solid rgba(245,246,246,1);
}

</style>
<script>
import Lodash from 'lodash'
import { mapState } from 'vuex'
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
      carouselHeight:"66.67vh",
      declaration:"声明：BAS官网发行的Token只应用于BAS系统内部交易，不具有任何金融属性，也不支持任何交易所交易",
      banners:[
        {
          name:"FirstBanner",
          img:'banner_670_0.png'
        },
        {
          name:"Second",
          img:'banner_670_1.png'
        },
        // {
        //   name:"Third",
        //   img:'banner_2.png'
        // }
      ],
      ctrl:{
        ethLoading:false,
        basLoading:false,
      }
    }
  },
  computed: {
    ...mapState({
      isCN:state=> {return state.lang ==='zh-CN'}
    })
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

      let proxy = new GetFreeProxy()

      let that = this
      //校验余额
      that.ctrl.ethLoading = true
      getEthBalance(wallet).then(bal=>{
        const flag = parseFloat(bal) <= 0.019
        console.log(bal,parseFloat(bal))
        if(!flag){
           that.$message(that.$basTip.error('您已经有足够ETH,无需在申请.'))
           that.ctrl.ethLoading = false
        }
        return flag
      }).then(flag=>{
        if(flag){
          proxy.validFreeState(wallet,1).then(resp=>{
            const state = resp.state
            if(state === 1 || state === 2){
              throw (9000+state)
            }else {
              proxy.getFreeEth(wallet,1).then(resp=>{
                const state = resp.state
                if(state){
                  let errMSG = "申请已提交.区块链交易正在确认中..."
                  that.$message(that.$basTip.warn(errMSG))
                }else{
                  that.$message(that.$basTip.error('你已经申请过ETH.'))
                }
                that.ctrl.ethLoading = false
              }).catch(exi=>{
                popError(exi,that,'GetETH  Err')
                that.ctrl.ethLoading = false
              })
            }
          }).catch(ex=>{
            popError(ex,that,'Valid>>')
            that.ctrl.ethLoading = false
          })
        }else{
          that.ctrl.ethLoading = false
        }
      }).catch(ex=>{
        console.log(ex)
        that.ctrl.ethLoading = false
      })
      function popError(ex,vm,tag){
        let errMSG = ''
        console.log(tag,ex)
        if(ex === 9000 ){
          errMSG = '您已经有足够ETH,无需在申请.'
        }else if(ex===9001){
          errMSG = "区块交易正在确认中,请勿重复申请"
        }else if(ex===9002){
          errMSG = "您已经申请过ETH,不能重复申请"
        }
        else if(ex === 9998){
          errMSG = '请安装MetaMask浏览器扩展'
        }
         vm.$message(vm.$basTip.error(errMSG))
      }

      // sendProxy.getFreeEth(wallet,1).then(resp=>{
      //   const state = resp.state
      //   if(state === 1 || state === 2)throw (9000+state)
      //   let errMSG = "申请已提交.区块链交易正在确认中.."
      //    this.$message(this.$basTip.error(errMSG))
      // }).catch(ex=>{
      //   let errMSG = "区块网络忙,请稍候再试."
      //   if(ex===9001){
      //     errMSG = "区块交易正在确认中,请勿重复申请"
      //   }else if(ex===9002){
      //     errMSG = "您已经申请过ETH,不能重复申请"
      //   }
      //   this.$message(this.$basTip.error(errMSG))
      //   console.error(ex)
      // })

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
      const proxy = new GetFreeProxy()
      this.ctrl.basLoading = true
      proxy.validFreeState(wallet,0).then(resp=>{
        console.log(resp)
        const state = resp.state
        if(state === 1 || state === 2)throw (9000+state)
        proxy.getFreeBas(wallet).then(resp=>{
          if(resp.state){
            this.$message(this.$basTip.warn("申请提交成功,区块确认中.稍后到我的钱包中查看"))
          }else{
            console.log()
            this.$message(this.$basTip.error(`申请失败,你已经申请过`))
          }
          this.ctrl.basLoading = false
        }).catch(ex=>{
          this.ctrl.basLoading =false
          console.error(ex)
          //this.$message(this.$basTip.error(ex))
        })
      }).catch(ex=>{
        this.ctrl.basLoading = false
        errMSG = "区块网络忙,请稍候再试."
        if(ex===9001){
          errMSG = "区块交易正在确认中,请勿重复申请"
        }else if(ex===9002){
          errMSG = "您已经申请过BAS,不能重复申请"
        }
        this.$message(this.$basTip.error(errMSG))
        console.error(ex)
      })


      // getBasCheck(chainId,wallet).then(ret=>{
      //   if(ret){
      //     let tips = ''
      //     getFreeBas(chainId,wallet).on('transactionHash',(txhash)=>{
      //       console.log('GetFreeBas:',txhash);
      //       tips = '申请已提交,正在处理(区块记账一般需要10秒~180秒)...'
      //       this.$message(this.$basTip.warn(tips))
      //     }).on('receipt',(receipt)=>{
      //       console.log('GetFreeBas:',receipt);
      //       tips = 'BAS 已下发,请到钱包查询'
      //       this.$message(this.$basTip.warn(tips))
      //     }).catch('error',(err,receipt)=>{
      //       if(err.code === 4001){
      //         let errMsg = this.$t('g.MetaMaskRejectedAuth')
      //         this.$message(this.$basTip.error(errMsg))
      //       }else{
      //         tips = 'BAS 申请失败,请重试'
      //         this.$message(this.$basTip.warn(tips))
      //       }
      //     })
      //   }
      // }).catch(ex=>{
      //   console.log(ex);
      //   if(ex === 1001){
      //     errMSG = 'MetaMask 未登录,请点击我的钱包或MetaMask插件登录.'
      //     this.$message(this.$basTip.error(errMSG))
      //   }else if(ex === 1002){
      //     errMSG = '您的ETH不足以支付GAS费,请先领取ETH'
      //     this.$message(this.$basTip.error(errMSG))
      //     return;
      //   }else if(ex === 1004){
      //     errMSG = '您已经申请过BAS.请到点击右上角"我的钱包"查看'
      //     this.$message(this.$basTip.error(errMSG))
      //   }else if(ex === 3001){
      //     errMSG = "当前网络不是测试网络,请通过Metamask切换到[Ropsten]"
      //     this.$message(this.$basTip.error(errMSG))
      //   }
      //   else if(ex.code === -32601){
      //     errMSG = '区块网络请求超时,请重试.'
      //     this.$message(this.$basTip.error(errMSG))
      //   }else if(ex.code === 4001){
      //     errMSG = '您拒绝了账号授权.'
      //     this.$message(this.$basTip.error(errMSG))
      //   }
      // })
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
