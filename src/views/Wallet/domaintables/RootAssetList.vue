<template>
  <div>
    <el-table type="index"
      v-loading="tableLoading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        :class-name="'bas-link'"
        prop="domaintext"
        index="domain"
        :label="$t('l.Domain')"
        >
      </el-table-column>
      <el-table-column
        prop="expire"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        :formatter="translateType"
          width="180"
        :label="$t('l.DomainType')">
      </el-table-column>
      <el-table-column header-align="center"
        index="operate" width="380"
        align="right" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown class="bas-drop">
            <el-button size="mini" type="default" >
               {{$t('l.MoreOperation')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="scope.row.canRechargeYear <= 0"
                @click.native="handleShowRechage(scope.$index,scope.row)"
                >
                {{$t('l.Recharge')}}
              </el-dropdown-item>
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hadExpired"
                @click.native="goSetting(scope.$index,scope.row)">
               {{$t('l.Configuration')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handleShowTransout(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder">
                {{$t('l.TransOut')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="showActvationDialog(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder || scope.row.mailActived">
                {{$t('l.ActivationMailBtn')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="goRegistSub(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired">
                 {{$t('l.RegistSubDomain')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'primary'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- mail dialog begin -->
    <el-dialog  width="24%"
      :close-on-click-modal="false"
      :show-close="!mailDialog.loading"
      :before-close="cancelMailDialog"
      :title="$t()"
      :visible.sync="mailDialog.visible">

      <div class="contianer mail-dialog--body">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h5>
              开启
              <span>{{'@' + mailDialog.domaintext}}</span>
              的邮箱服务
            </h5>
            <div class="bas-mail-expire">
              {{$t('l.ExpiredDate') + ':'}}
              <span>{{expireTime(mailDialog.expire)}}</span>
            </div>
          </div>
        </div>
        <!-- <div class="bas-mail-expire">
          {{$t('l.ExpiredDate') + ':' + this.items.expire}}
        </div> -->
        <div class="row">
          <div class="col-12 text-center bas-open-mail">
            <el-button  :disabled="mailDialog.loading"
              type="primary"
              @click="submitActivationMail()">
              {{
                $t('p.EWalletActivationMailServiceNotice', {cost:this.mailServiceBas})
              }}
            </el-button>
          </div>
        </div>

        <el-checkbox v-model="mailDialog.checked"
          :disabled="mailDialog.loading  || mailDialog.checklocked"
          class="bas-check-public">{{$t('l.ActivationOnlyInternal')}}

        </el-checkbox>
      </div>
    </el-dialog>

    <!-- Trans Out Dialog -->
    <el-dialog  width="45%"
      :close-on-click-modal="false"
      :show-close="!transDialog.loading"
      :before-close="handleHideTransOut"
      :visible.sync="transDialog.visible"
      custom-class="transout-dialog">
      <div slot="title" class="transout-header">
        <h5> {{transoutTitle}} </h5>
      </div>

      <div class="transout-body" >
        <div class="inner">
          <el-form label-width="126px"
            @submit.native.prevent>
            <el-form-item :label="$t('l.TransToDomainLabel')">
              <el-input type="text" v-model="transDialog.totext"
                @input="fetchDomainInfo"
                :disabled="transDialog.loading"
                :placeholder="$t('l.TransToDomainPlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('l.TransToDomainBCA')">
              <el-input type="text" v-model="transDialog.tobca"
                :disabled="transDialog.loading"
                :placeholder="$t('l.TransToDomainBCAPlaceHolder')"/>
            </el-form-item>
            <el-form-item>
              <div class="transout-tips">
                <span>{{$t('l.TransToDomainBCAPTips')}}</span>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="bas-btns-between">
                <el-button type="primary"
                  @click="submitTransOut"
                  :disabled="transDialog.loading"
                  class="bas-btn-primary bas-w-60">
                  {{transDialog.loading ?  $t('l.Transactioning'): $t('l.Confirm')}}
                  <loading-dot v-if="transDialog.loading"/>
                </el-button>
                <el-button type="plaintext"
                  @click="handleHideTransOut"
                  :disabled="transDialog.loading"
                  class="bas-btn-secondary bas-w-30">
                  {{$t('l.Cancel')}}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>

      </div>

    </el-dialog>

    <!-- SaleOn Dialog -->
    <el-dialog width="476px"
      :close-on-click-modal="false"
      :show-close="!saleOn.loading"
      :before-close="hideSaleOnDialog"
      :visible.sync="saleOn.visible"
      top="35vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
        <div class="title">
          <span class="">
            {{$t('p.SaleOnDialogRootDomainTitle')}}
          </span>
          <span class="title-domain">
            {{saleOn.domaintext}}
          </span>
        </div>
        <div class="sub-title">
          <span>
            {{$t('p.CommonDialogSubTitleExpireLabel',{expiration:saleOn.expireDate})}}
          </span>
        </div>
      </div>
      <div class="bas-dg-body">
        <el-input type="text"
          :disabled="saleOn.loading"
          :placeholder="$t('p.SaleOnDialogUnitBasPlaceholder')"
          v-model="saleOn.salebas" class="input-unit-bas"
          :min="0" :max="100">
          <div class="suffix" slot="suffix">BAS</div>
        </el-input>

        <el-button @click="submitSetSalePrice"
          :disabled="saleOn.loading"
          type="primary" class="w-100 bas-btn-primary">
          <div>
            <LoadingDot v-if="saleOn.loading" />
          </div>
          {{saleOn.loading ? $t('l.Transactioning') : $t('l.Confirm')}}
        </el-button>
      </div>
    </el-dialog>

    <!-- recharge Dialog -->
    <el-dialog width="846px"
      :close-on-click-modal="false"
      :show-close="!recharge.loading"
      :before-close="hideRechargeDialog"
      :visible.sync="recharge.visible"
      top="20vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
        <div class="title">
          <span>
            {{$t('l.Domain')}} :
          </span>
          <span>{{recharge.domaintext}}</span>
        </div>
        <div class="expiration-tip">
          <span>
           {{
             $t('p.MailRechargeDialogExpirationTip',{expireDate:recharge.expirationText})
            }}
          </span>
          <hr>
        </div>
      </div>

      <div class="bas-dg-body">
        <el-row :gutter="24">
          <el-col v-for="(it,idx) in recharge.items"
            :key="idx"
            :class="( idx >= 3 ) && Boolean(!recharge.moreshow) ? 'd-none' : ''"
            :span="8">
            <div class="recharge-year-box"
              @click="selectedYear(it.y)"
              :class=" it.y === recharge.chargeYears ? 'box-selected':''">
              <div class="inner-box">
                <div class="year-box-inline">
                  <span>{{$t(`l.RechargeY${it.y}`)}}</span>
                </div>
                <div class="year-box-inline">
                  <span class="bas-unit">{{it.total}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="bas-inline-between recharge-tips">
            <div class="max-tip">
              {{$t('p.MailRechargeMaxYearsComments',{year:recharge.maxchargeYears})}}
            </div>
            <div @click="toggleMoreshow"
              class="recharge-more-toggle">
              <span>
                <div class="fa" :class="recharge.moreshow ? 'fa-chevron-up' : 'fa-chevron-down'"></div>
                {{$t('l.MoreChargeYears')}}
              </span>
            </div>
          </div>
        </el-row>
      </div>

      <div class="dialog-footer" slot="footer">
        <div class="container text-center">
          <el-button type="primary"
            :disabled="recharge.loading"
            @click="submitRechargeDomain"
            class="bas-w-40 bas-btn-primary">
            <div style="position:relative;">
              <LoadingDot v-if="recharge.loading"/>
            </div>
             {{recharge.loading ? $t('l.RechargingTip') : $t('l.ConfirmRechargeBtn')}}
          </el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<style lang="css">
.expiration-tip div.title {
  font-size:22px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}
.expiration-tip span{
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:25px;
}

</style>

<script>
import {
  TS_DATEFORMAT,dateFormat,
  wei2Bas,bas2Wei,isOwner,
  numThousandsFormat,hasExpired,
  maxRechageYears,getYearItems
} from '@/utils'
import {str2ConfDatas} from '@/web3-lib/utils'
import {APPROVING_SATE,CONFIRMING_STATE,FAILURE_STATE} from '@/web3-lib/utils/cnst.js'
import {
  getDomainType,isRareTop,
  MAX_BILLON_VOL,validBetweenZero2Billion
} from '@/utils/Validator.js'

import {activationRootMailService} from '@/web3-lib/apis/mail-manager-api'
import {
  transoutOwnershipCi,approveTraOspEmitter
} from '@/web3-lib/apis/ownership-api'
import { validAdd2Market,addHashToMarket } from '@/web3-lib/apis/market-api'

import { getDomainBCADatas } from '@/web3-lib/apis/domain-api'
import { validRecharge4Domain,rechargeRootDomain } from '@/web3-lib/apis/oann-api'
import {approveTokenEmitter} from '@/web3-lib/apis/token-api'

import {
  USER_REJECTED_REQUEST,
  UNSUPPORT_NETWORK,
  LACK_OF_ETH,
  LACK_OF_TOKEN,
  DOMAIN_NOT_EXIST,
  ACCOUNT_NOT_MATCHED,
  MAILSERVICE_ONLY_RARE_OPEN,
  DOMAIN_EXPIRED,
  MAILSERVICE_HAS_ACTIVED
} from '@/web3-lib/api-errors.js'


import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"EWalletRootAssetList",
  components:{
    LoadingDot
  },
  computed: {
    showDialogOpenConfirmBtn(){
      return this.mailDialog.domaintext && isRareTop(this.mailDialog.domaintext)
    },
    transoutTitle(){
      return this.$t('p.WalletHomeTransoutDialogTitle',{text:this.transDialog.domaintext||''})
    },
    ...Vuex.mapState({
      items:state => state.ewallet.assets.filter( it =>{
        it.hadExpired = hasExpired(it.expire)
        return it.isRoot == true
      }),
      mailServiceBas:state => wei2Bas(state.dapp.mailSeviceGas),
      domainYearItems: state => state.dapp.domainYearItems,
    })
  },
  data() {
    return {
      mailDialog:{
        visible:false,
        loading:false,
        hash:null,
        owner:null,
        domaintext:null,
        expire: 0,
        checked: false,
        checklocked:false
      },
      transDialog:{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        tobca:'',
        totext:'',
        state:''
      },
      saleOn:{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        owner:'',
        salebas:0,
        expire:0,
        expireDate:''
      },
      recharge:{
        visible:false,
        loading:false,
        moreshow:false,
        chargeYears:0,
        maxchargeYears:0,
        state:'',//approving
        items:[],
        expiration:0,
        expirationText:'',
        domaintext:'',
        domainhash:'',
        owner:''
      }
    }
  },
  methods: {
    expireTime(expiretime) {
      return dateFormat(expiretime, 'YYYY-MM-DD HH:mm:ss')
    },
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    translateType(row){
      let domainType = getDomainType(row.domaintext)
      return this.$t(`g.${domainType}`)
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/detail/${domaintext}`
      })
    },
    hideSaleOnDialog(){
      this.saleOn = Object.assign({},this.saleOn,{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        owner:'',
        salebas:4,
        expire:0
      })
    },
    handleShowSaleOn(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const ruleState = this.$store.getters['dapp/ruleState']
      let salebas = ruleState.subBas
      if(row.isRoot) salebas = ruleState.rootBas
      if(row.isRare) salebas = ruleState.rareBas

      this.saleOn = Object.assign({},this.saleOn,{
        visible:true,
        loading:false,
        domaintext:row.domaintext,
        domainhash:row.hash,
        owner:row.owner,
        salebas:salebas,
        expire:row.expire,
        expireDate:dateFormat(row.expire,TS_DATEFORMAT)
      })
    },
    async submitSetSalePrice(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      let errMsg =''
      const web3State = this.$store.getters["web3State"]
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const network = web3State.network
      const domaintext = this.saleOn.domaintext
      const domainhash = this.saleOn.domainhash

      console.log(this.saleOn)

      if(!domainhash){
        console.error('doaminhash lost.')
        return
      }


      const owner = this.saleOn.owner
      if(!isOwner(wallet,owner)){
        errMsg = this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{network,asset:domaintext})
        this.$message(this.$basTip.error(errMsg))
        return
      }
      const salebas = this.saleOn.salebas

      if(!validBetweenZero2Billion(salebas)){
        errMsg = this.$t('p.SaleOnPriceUnitBasValidError',{begin:"0",end:numThousandsFormat(MAX_BILLON_VOL)})
        this.$message(this.$basTip.error(errMsg))
        return
      }

      try{
        /** domainhash,salewei,spender,chainId,wallet, */
        const resp = await validAdd2Market(domainhash,salebas,chainId,wallet)

        const salewei = resp.salewei
        const spender = resp.spender

        console.log("emmitt>>>>>",domainhash,spender,chainId,wallet)
        let that = this
        approveTraOspEmitter(domainhash,spender,chainId,wallet).on('transactionHash',txhash=>{
          that.saleOn.loading = true
        }).on('receipt', async (receipt)=>{
          const pricewei = Web3.utils.toWei(salebas+'','ether')
          try{
            const ret = await addHashToMarket(domainhash,pricewei,chainId,wallet)

            that.$store.dispatch('ewallet/updateAssetProps',{hash:domainhash,isorder:true})
            that.saleOn = Object.assign({},this.saleOn,{
              visible:false,
              loading:false,
              domaintext:'',
              domainhash:'',
              owner:'',
              salebas:4,
              expire:0
            })
          }catch(ex){
            that.saleOn.loading = false
            if(ex.code === USER_REJECTED_REQUEST){
              errMsg = that.$t(`code.${USER_REJECTED_REQUEST}`)
              that.$message(that.$basTip.error(errMsg))
              return
            }else{
              console.error(ex)
            }
          }
        }).on('error',(err,receipt)=>{
          that.saleOn.loading = false
          if(err.code === USER_REJECTED_REQUEST){
            errMsg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(errMsg))
            return
          }else{
            console.error(err)
          }
        })
      }catch(ex){
        console.error(ex)
        that.saleOn.loading = false
      }
    },
    goSetting(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/updaterefdata/${domaintext}`,
        name:'domain.updaterefdata',
        params:{
          domaintext:domaintext,
          hash:row.hash,
          expire:row.expire,
          owner:row.owner,
          isRoot:row.isRoot,
          openApplied:row.openApplied,
          isCustomed:row.isCustomed,
          customedPrice:row.customedPrice
        }
      })
    },
    handleShowTransout(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      this.transDialog = Object.assign(this.transDialog,{
        visible:true,
        loading:false,
        domaintext:row.domaintext,
        domainhash:row.hash,
        tobca:'',
        totext:'',
        state:''
      })
    },
    handleHideTransOut(){
      this.transDialog = Object.assign(this.transDialog,{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        tobca:'',
        totext:'',
        state:''
      })
    },
    async submitTransOut(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const domaintext = this.transDialog.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domainhash =this.transDialog.domainhash
      const spender = this.transDialog.tobca

      let msg = ''
      if(!Web3.utils.isAddress(spender)){
        msg = this.$t('p.WalletTransOutAddressFormatErr')
        this.$message(this.$basTip.error(msg))
        return
      }
      if(isOwner(wallet,spender)){
        msg = this.$t('p.WalletTransOutAddressSelfErr')
        this.$message(this.$basTip.error(msg))
        return
      }
      try{
        this.transDialog.loading = true
        const hash = await transoutOwnershipCi(domainhash,spender,chainId,wallet)
        //update
        //this.$store.dispatch('ewallet/removeMyAssetByHash',hash)

        this.$store.dispatch('ewallet/removeEWalletAssetsIndexedDB',hash)

        this.transDialog = Object.assign(this.transDialog,{
          visible:false,
          loading:false,
          domaintext:'',
          domainhash:'',
          tobca:'',
          totext:'',
          state:''
        })
      }catch(ex){
        this.transDialog.loading = false
        switch (ex) {
          case DOMAIN_NOT_EXIST:
          case DOMAIN_EXPIRED:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            return
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          case ACCOUNT_NOT_MATCHED:
            break;
          default:
            break;
        }
        console.error('>>>',ex)
      }
    },
    handleShowRechage(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const ruleState = this.$store.getters["dapp/ruleState"]
      const canRegMaxYear = row.canRechargeYear || maxRechageYears(row.expire)

      const unitbas = row.isRare ? ruleState.rareBas : ruleState.rootBas
      const items = getYearItems(canRegMaxYear,unitbas)

      console.log(row)

      this.recharge = Object.assign({},this.recharge,{
        visible:true,
        loading:false,
        moreshow:false,
        chargeYears:canRegMaxYear,
        maxchargeYears:canRegMaxYear,
        state:'',//approving
        items:items,
        expiration:row.expire,
        expirationText:dateFormat(row.expire,TS_DATEFORMAT),
        domaintext:row.domaintext,
        domainhash:row.hash,
        owner:row.owner
      })
    },
    hideRechargeDialog(){
      this.recharge = Object.assign({},this.recharge,{
        visible:false,
        loading:false,
        moreshow:false,
        chargeYears:0,
        maxchargeYears:0,
        state:'',//approving
        items:[],
        expiration:0,
        expirationText:'',
        domaintext:'',
        domainhash:'',
        owner:''
      })
    },
    toggleMoreshow(){
      this.recharge.moreshow = !this.recharge.moreshow
    },
    selectedYear(year){
      if(this.recharge.loading)return
      this.recharge.chargeYears = year
    },
    async submitRechargeDomain(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters["web3State"]
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const network = web3State.network

      const ruleState = this.$store.getters["dapp/ruleState"]

      const domainhash = this.recharge.domainhash
      const year = this.recharge.chargeYears
      const canRechargeYear = this.recharge.maxchargeYears

      let msg = ''
      const that = this;
      try{
        const validRet = await validRecharge4Domain(domainhash,year,chainId,wallet)

        const approveAddress = validRet.spender
        const costwei = validRet.costwei
        approveTokenEmitter(approveAddress,costwei,chainId,wallet).on('transactionHash',txhash =>{
          that.recharge.loading = true
        }).on('receipt',async (receipt)=> {
          try{
            console.log("Approve",receipt)
            const receipt = await rechargeRootDomain(domainhash,year,chainId,wallet)
            that.$store.dispatch('ewallet/updateMyAsset',{hash:domainhash})

            //this.$store.dispatch('ewallet/updateEWalletAssetsIndexedDB',assetpart)
            that.hideRechargeDialog()
          }catch(ex){
            that.recharge.loading = false
            if(ex.code === USER_REJECTED_REQUEST){
              msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
              that.$message(that.$basTip.error(msg))
              return;
            }else{
              console.error('Recharge error',ex)
            }
          }
        }).on('error',(err,receipt)=> {
          that.recharge.loading = false
          if(err.code === USER_REJECTED_REQUEST){
            msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(msg))
            return;
          }else{
            console.error('Approve error',err)
          }
        })

      }catch(ex){
        switch (ex) {
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.message(this.$basTip.error(msg))
            return;
          case RECHARGE_YEAR_RANGE:
            msg = this.$t(`code.${ex}`,{max:canRechargeYear})
            this.message(this.$basTip.error(msg))
            return;

          case PARAM_ILLEGAL:
          case DOMAIN_NOT_EXIST:
            console.error('PARAM_ILLEGAL',ex)
            return;
          default:
            console.error(ex)
            break;
        }
      }
    },
    goRegistSub(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const toptext = row.domaintext
      if(!row.openApplied){
        const msg = this.$t('code.200001',{roottext:toptext})
        this.$message(this.$basTip.error(msg))
        return
      }
      this.$router.push({
        path:`/domain/applysub/${toptext}`,
      })
    },
    //activation Mail
    cancelMailDialog(){
      this.mailDialog = Object.assign(this.mailDialog,{
        visible:false,
        loading:false,
        owner:null,
        hash:null,
        domaintext:null,
        checked: true,
        checklocked:false
      })
    },
    showActvationDialog(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const hash = row.hash
      const domaintext = row.domaintext

      this.mailDialog = Object.assign({},this.mailDialog,{
        visible:true,
        hash,
        owner:row.owner,
        domaintext,
        expire: row.expire,
        checked: !row.isRare ? true : false,
        checklocked:!row.isRare
      })
    },
    async submitActivationMail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const isPublic = !this.mailDialog.checked
      const ruleState = this.$store.getters["dapp/ruleState"]
      const domaintext =  this.mailDialog.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet;
      const owner = this.mailDialog.owner

      console.log(">>>>>>>>>>>isPublic",isPublic)

      //const isPublic = this.mailDialog.isPublic
      const hash = this.mailDialog.hash

      try{
        this.mailDialog.loading=true
        const resp = await activationRootMailService(hash,isPublic,chainId,wallet)
        console.log(resp)
        this.mailDialog = Object.assign({},{
          visible:false,
          loading:false,
          owner:null,
          hash:null,
          domaintext:null,
          checked:false,
        })

        //update My assets list
        const assetpart ={hash,mailActived:true,mailPublic:isPublic}
        //this.$store.dispatch('ewallet/updateAssetProps',assetpart)

        //ewallet/syncEWalletAssets
        this.$store.dispatch('ewallet/updateEWalletAssetsIndexedDB',assetpart)
      }catch(ex){

        this.mailDialog.loading=false
        let msg = ''
        switch (ex) {
          case MAILSERVICE_HAS_ACTIVED:
            msg = this.$t(`code.${MAILSERVICE_HAS_ACTIVED}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          case LACK_OF_TOKEN:
          case LACK_OF_ETH:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            break;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`,{wallet,asset:domaintext})
            this.$message(this.$basTip.error(msg))
            break;
          default:
            console.log('logic error',ex)
            break;
        }

      }
    },
    async fetchDomainInfo(val){
      console.log(val)
      const text = this.transDialog.totext

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet

      if(text && chainId){
        const datas = await getDomainBCADatas(text,chainId)
        console.log(datas)
        if(datas && datas.length ){
          const bca = datas.find( d => Web3.utils.isAddress(d) && !isOwner(d,wallet))
          console.log(bca)
          if(bca){
            this.transDialog.tobca = bca
          }
        }
      }
    }
  },
}
</script>
<style>
h5 {
  margin-bottom: 0px;
  font-size:22px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}
h5 > span {
  color: rgba(0,202,155,1);
}
.bas-mail-expire {
  width: 100%;
  text-align: center;
  height:17px;
  font-size:14px;
  font-family:Lato-Regular,Lato;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:17px;
  margin-bottom: 14px;
}
.bas-check-public {
  text-align: center;
  width: 100%;
  margin-top: 8px;
  height:17px;
  font-size:14px;
  font-family:Lato-Regular,Lato;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:17px;
  margin-bottom: 14px;
}
.mail-dialog--body{
  display: inline;
  justify-content: center;
}
.transout-dialog div.el-dialog__body{
  padding-top: 0px;
}
.transout-header h5 {
  text-align: center;
  font-size:18px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  line-height:25px;
}

.transout-tips {
  background:rgba(255,87,47,.1);
  border-radius:2px;
  padding: .25rem .75rem;
}

.transout-tips * {
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  color:rgba(255,87,47,1);
  line-height:20px;
}

.transout-body {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.transout-body div.inner {
  width: 65%;
}
</style>
