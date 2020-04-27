<template>
<div>
  <el-row :gutter="20" class="bas-white-bg">
    <el-col :span="24" class="bas-wallet-info">
      <div class="bas-wallet-info--inner">
        <img src="/static/icons/pay.png" class="bas-wallet-icon">
        <div>
          <p style="margin-bottom:.85rem;">PaymentWallet</p>
          <span class="bas-small">{{ walletAddress }}</span>
        </div>
      </div>

      <div>
        <!-- <span class="small">
          {{$t('l.sumIncomeBas')}}
        </span>
        <span>
          {{drawBas}}
        </span>
        <span class="small mr-2">BAS</span>
        <span class="mr-2">
          <a @click="recoverBas" class="bas-text-green">
            {{$t('l.recoverBasBtn')}}
          </a>
        </span> -->
        <!-- <span>
          <a class="bas-text-green" @click="refreshWalletBase">
            <i class="fa fa-refresh" style="font-size:14px;font-weight:100;"></i>
          </a>
        </span> -->
      </div>
    </el-col>
  </el-row>
  <div>
    <el-row id="walletBalance" :gutter="20" class="bas-white-bg">
      <el-col :span="8">
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <h4>
              {{drawBas}}
            </h4>
            <p>
              {{$t('l.canRecover')}}
            </p>
            <div>
              <a @click="gotoBreakdownDetail" class="bas-link">
                {{$t('l.recoverDetailItems')}}
              </a>
              <!-- <a class="bas-link">
                {{$t('l.recoverDetailItems')}}
              </a> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <h4>{{ ethBalance }}</h4>
            <p>{{$t('p.WalletIndexEthBalance')}}</p>
            <div>
              <el-popover v-if="hasWallet"
                width="150"
                placement="bottom-end"
                trigger="click"
                >
                <div id="basQrcodeContainer" class="bas-popover-box text-center">
                  <wallet-qr-code width="120" id="ethbal"
                    tipPlacement="right"
                    :content="walletAddress"/>
                </div>
                <a slot="reference" class="bas-link">
                  {{$t('l.transInBtn')}}
                </a>
              </el-popover>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="8" >
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <h4>{{basBalance}}</h4>
            <p>{{$t('p.WallletIndexBASBalance')}}</p>
            <div>
              <el-popover v-if="hasWallet"
                width="150"
                placement="bottom-end"
                trigger="click"
                >
                <div id="basQrcodeContainer" class="bas-popover-box text-center">
                  <wallet-qr-code width="120" id="ethbal"
                    tipPlacement="left"
                    :content="walletAddress"/>
                </div>
                <a slot="reference" class="bas-link">
                  {{$t('l.transInBtn')}}
                </a>
              </el-popover>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>


  <!-- Table -->
  <div class="pt-2">
    <mine-domain-tabs />
  </div>
</div>
</template>

<style>
.bas-balance--wrapper {
  width: 100%;
  text-align: center;
  display: block;
  background: rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
  margin-bottom: 1.25rem;
}

.bas-balance--wrapper>div.d-block {
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: center;
  margin: .75rem auto;
}
</style>

<script>

import MineDomainList from './MineDomainList.vue'
import MineDomainTabs from './MineDomainTabs.vue'
import WalletQrCode from '@/components/WalletQrCode.vue'
import { refreshAccount,getNewBalance } from '@/bizlib/web3/token-api'
import { recoverBAS } from '@/bizlib/web3/miner-api'
import { mapState } from 'vuex'
import {wei2BasFormat} from '@/utils'
export default {
  name:"WalletIndex",
  components:{
    MineDomainList,
    MineDomainTabs,
    WalletQrCode,
  },
  computed:{
    hasWallet(){
      return Boolean(this.$store.state.web3.wallet)
    },
    walletAddress(){
      return this.$store.state.web3.wallet
    },
    ethBalance(){
      return this.$store.getters["web3/getEthBalance"]
    },
    basBalance(){
      return this.$store.getters["web3/getBasBalance"]
    },
    ...mapState({
      drawBas:state =>{
        //console.log(state)
        return wei2BasFormat(state.web3.drawWei,state.web3.decimals)
      }
    })
  },
  mounted(){
    //load balance
    this.$store.dispatch('web3/refreshAccountBase')

  },
  methods:{
    refreshWalletBase(){
      refreshAccount().then(data=>{
        console.log(data)
        this.$store.dispatch('web3/fillChaidAndWallet',data)
      }).catch(ex=>{
        console.log(ex)
      })
    },
    recoverBas(){
      let wei = this.$store.state.web3.drawWei
      if(wei==0 || wei ==='0'){
        this.$message(this.$basTip.error(this.$t('p.WalletRecoverZeroTip')))
        return
      }

      const dappState = this.$store.getters['web3/dappState']
      //
      recoverBAS(dappState.chainId,dappState.wallet).then(resp=>{
        let msg = this.$t('p.recoverSuccess') + this.drawBas
        this.refreshWalletBase()
        this.$message(this.$basTip.warn(msg))
      }).catch(ex=>{
        console.log('recover>>'+ex)
        if(ex==4001){
          this.$message(this.$basTip.error(ex.message))
        }else if(ex== -32601){
          this.$message(this.$basTip.error(ex.message))
        }
      })
    },
    gotoBreakdownDetail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        name:'income.home'
      })
    }
  }

}
</script>
<style>
.bas-wallet-info {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: .5rem auto;
}

.bas-wallet-icon {
  width: 52px;
  height: 52px;
  margin: 2px 4px;
}

.bas-wallet-info--inner {
  display: inline-flex;
  justify-content: flex-start;
}

.bas-wallet--banlance {
  height: 7rem;
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: space-between;
  align-items: center;
  margin: .5rem auto;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.bas-wallet--banlance>div {
  margin: auto 1rem;
}


</style>
