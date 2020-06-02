<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24" class="bas-mine-table--header">
        <h5 style="margin-bottom:0rem;">
          {{$t('l.domainAsset')}}
        </h5>

        <div>
          <!-- <el-button class="bas-btn-primary" size="medium" >
          转入
          </el-button> -->
          <el-popover v-if="currentWallet !==''"
            width="150"
            placement="top-start"
            trigger="click"
            >
            <div id="transQrcodeContainer" class="bas-popover-box text-center">
              <wallet-qr-code width="120" id="ethbal"
                tipPlacement="left"
                :content="currentWallet"/>
            </div>
            <el-button slot="reference" type="primary">
              {{$t('l.tranInBasOrEth')}}<i class="fa fa-qrcode bas-fa-qrcode"></i>
            </el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <div class="bas-tabs-wrapper">
      <el-tabs
        @tab-click="handChangeTab"
        v-model="tabs.activeName">
        <el-tab-pane :label="subdomainLabel" name="subasset">
          <sub-asset-list />
        </el-tab-pane>
        <el-tab-pane :label="topTableLabel" name="topasset">
          <root-asset-list />
        </el-tab-pane>
      </el-tabs>
      <div class="bas-table-refresh">
        <div class="inner" @click="reloadAssets">
          <span>
            <i class="fa fa-refresh"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>

import WalletQrCode from '@/components/WalletQrCode.vue'
import SubAssetList from './domaintables/SubAssetList.vue'
import RootAssetList from './domaintables/RootAssetList.vue'
import {checkSupport} from '@/web3-lib/networks'

export default {
  name:"MineDomainList",
  components:{
    WalletQrCode,
    SubAssetList,
    RootAssetList,
  },
  computed: {
    topTableLabel(){
      return this.$t('l.topdomainLabel')
    },
    subdomainLabel(){
      return this.$t('l.subdomainLabel')
    }
  },
  data() {
    return {
      tabs:{
        activeName:'topasset',//subasset,topasset
      },
      ruleState:{
        subGas:4,
        rareGas:500,
        topGas:20
      }
    }
  },
  methods: {
    handChangeTab(){

    },
    async reloadAssets(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters['web3State']
      if(web3State.chainId &&
        checkSupport(web3State.chainId) && web3State.wallet){

        this.$store.dispatch('ewallet/syncEWalletAssets',web3State)
      }
    }
  },
  beforeMount() {
    const web3State = this.$store.getters['web3State']
    if(web3State.chainId &&
      checkSupport(web3State.chainId) && web3State.wallet){
      this.$store.dispatch('ewallet/syncEWalletAssets',web3State)
    }
  },
  mounted() {
    const web3State = this.$store.getters['web3State']
    this.$store.dispatch('ewallet/fillMyAssets',web3State)
    //this.ruleState = Object.assign(this.ruleState,ruleState)
    const activeName = this.$route.query.activeName
    if(activeName)this.tabs.activeName = activeName
  },
  update:(params)=>{
    let web3State = this.$store.getters['dapp/web3State']
    console.log('WalletTabs >>>',web3State)
  }
}
</script>
<style>
.bas-mine-table--header{
  width: 100%;
  text-align: left;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(245,246,246,1);
}
.bas-mine-table--header>h5,.bas-mine-table--header>div{
  margin-top: .75rem;
  margin-bottom: 1rem;
}

.bas-tabs-wrapper {
  position: relative;
}

.bas-tabs-wrapper .bas-table-refresh {
  position: absolute;
  float: right;
  top:12px;
  right: 10px;
}
.bas-auto-wrap{
  display: inline-block;
  width: 100%;
}
.bas-wallet-select--wrap{
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.bas-auto-wrap span.el-input__suffix {
  border-right: 1px solid #DCDFE6;
  border-radius: 4px;
  right: 0px;
}
.bas-auto-wrap>.el-input__suffix-inner {
  height: 100%;
}

.bas-suggest--item-name {
  color: rgba(0,202,155,1);
  font-size:1.1rem;
}

.bas-suggest--item-address {
  margin-left: 1.2rem;
  font-size:12px;
}

.bas-auto--suffix {
  padding-right: 5px;
  display: inline-block;
  border: none;
  height: 100%;
  font-size: 0.85rem;
}
.bas-market-dialog--body {
  width: 100%;
  display: block;
}

.bas-table-refresh i.fa-refresh {
  cursor: pointer;
}
</style>
