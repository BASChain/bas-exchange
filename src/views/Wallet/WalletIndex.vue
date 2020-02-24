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
        <span class="small">总收益:</span>
        <span>+3000</span>
        <span class="small mr-2">BAS</span>
        <span class="mr-2">
          <a class="bas-text-green">提现</a>
        </span>
      </div>
    </el-col>
  </el-row>
  <div>
    <el-row id="walletBalance" :gutter="20" class="bas-white-bg">
      <el-col :span="12">
        <div class="bas-wallet--banlance">
          <div >
            <h4>{{ ethBalance }}</h4>
            <p>ETH Balance</p>
          </div>
          <div>
            <el-popover
              width="220"
              placement="bottom-end"
              trigger="click"
              >
              <div id="basQrcodeContainer" class="bas-popover-box text-center">
                <div aria-label="Qrcode">

                </div>
                <p class="small">
                  {{ walletAddress }}
                </p>
              </div>
              <a slot="reference" class="bas-link">转账</a>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12" >
        <div class="bas-wallet--banlance">
          <div>
            <h4>{{basBalance}}</h4>
            <p>BAS Balance</p>
          </div>
          <div>
            <a class="bas-link">转账</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


  <!-- Table -->
  <div class="pt-2">
    <mine-domain-list />
  </div>


</div>
</template>

<script>

import MineDomainList from './MineDomainList.vue'
export default {
  name:"WalletIndex",
  components:{
    MineDomainList,
  },
  computed:{
    walletAddress(){
      return this.$store.state.web3.wallet
    },
    ethBalance(){
      return this.$store.getters["web3/getEthBalance"]
    },
    basBalance(){
      return this.$store.getters["web3/getBasBalance"]
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

.bas-popover-box {
  display: inline-flex;
  width: 200px;
  direction: column;
  justify-content: center;
  align-items: center;
}
.bas-popover-box>p {
  cursor: pointer;
  width: 100%;
  margin-left: -15px;
  color:rgba(4,6,46,1);
  text-overflow: ellipsis;
  white-space:nowrap;
  overflow:hidden;
  margin: auto;
  margin-bottom: 4px;
}
</style>
