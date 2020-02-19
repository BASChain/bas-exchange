<template>
<div>
  <el-row :gutter="20" class="bas-white-bg">
    <el-col :span="24" class="bas-wallet-info">
      <div class="bas-wallet-info--inner">
        <img src="/static/icons/bingo.png" width="52px" height="52px">
        <div>
          <p style="margin-bottom:.85rem;">PaymentWallet</p>
          <span class="bas-small">0x413367ffd0e8b254990686ccd9a9ef4ac629e745</span>
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

  <el-row id="walletBalance" :gutter="20" class="bas-white-bg">
    <el-col :span="12">
      <div class="bas-wallet--banlance">
        <div >
          <h4>39999.9999</h4>
          <p>ETH Balance</p>
        </div>
        <div>
          <a class="bas-text-green">转账</a>
        </div>
      </div>
    </el-col>
    <el-col :span="12" >
      <div class="bas-wallet--banlance">
        <div>
          <h4>109999.9999</h4>
          <p>BAS Balance</p>
        </div>
        <div>
          <a class="bas-text-green">转账</a>
        </div>
      </div>
    </el-col>
  </el-row>

  <-- Table -->
</div>
</template>

<script>
export default {
  name:"WalletIndex"
}
</script>
<style>
.bas-wallet-info {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: .5rem auto;
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
