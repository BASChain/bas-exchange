<template>
  <div>
    <el-table type="index"
      v-loading="loading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        prop="fulltext"
        index="hash"
        :formatter="mailtextShow"
        :label="$t('l.BMailAccount')"
        >
      </el-table-column>
      <el-table-column
        prop="domaintext"
        index="domain"
        :formatter="domainMailFormat"
        :label="$t('l.EWalletDomainMailServers')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="expiration"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        width="140">
      </el-table-column>

      <el-table-column
        prop="bca"
        header-align="center"
        align="left"
        :label="$t('l.BMailBCALabel')"
        width="420">
      </el-table-column>

      <el-table-column header-align="center"
        index="operate" width="200"
        align="right" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" type="default">
              {{$t('l.MoreOperation')}} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.abandoned"
                @click.native="gotoUpdateMailInfo(scope.$index,scope.row)">
                {{$t('l.UpdateTagLabel')}}
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.abandoned"
                :command="scope.row"
                @click.native="abandonMail(scope.$index,scope.row)"
                >
                {{$t('l.AbandonLabel') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            size="mini"
            :disabled="!Boolean(scope.row.canRechargeYear)"
            :type="!Boolean(scope.row.canRechargeYear) ? 'default':'primary'"
            @click="recharge4Mail(scope.$index, scope.row)">
            {{$t('l.RechargeLabel')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" class="bg-white" style="margin:0px;">
      <div class="bg-white" style="height:25px;"></div>
      <div class="float-table-total">
        <span >
          {{$t('l.TableTotal')}} {{itemTotal}} {{$t('l.TableRecord')}}
        </span>
        <span @click="reloadRecords">
          <i class="fa fa-refresh"></i>
        </span>
      </div>
    </el-row>

    <!-- Dialog -->
    <el-dialog  width="25%"
      :close-on-click-modal="false"
      :show-close="!abandon.loading"
      :before-close="cancelAbandonDialog"
      :visible.sync="abandon.visible"
      top="35vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
      </div>

      <div class="bas-dg-body">
        <div class="abandon-title">
          <span>{{$t('p.MailAbandonDialogTitlePrefix')}}</span>
          <span class="mail-name">{{abandon.mailtext}}</span>
          <span>{{$t('p.MailAbandonDialogTitleSuffix')}}</span>
        </div>

        <div class="text-center">
          <span class="bas-dg-gray-tips">
            {{$t('p.MailAbandonDialogWarnTip')}}
          </span>
        </div>

        <div class="text-center">
          <el-button :disabled="abandon.loading"
            type="primary"
            @click="submitAbandon" class="bas-w-60 bas-btn-primary btn-abandon">
            <div>
              <LoadingDot v-if="abandon.loading" />
            </div>
            {{abandon.loading ? $t('l.Transactioning') : $t('l.ConfirmAbandon')}}
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- recharge dialog -->
    <el-dialog  width="40%"
      :close-on-click-modal="false"
      :show-close="!recharge.loading"
      :before-close="hideRechargeDialog"
      :visible.sync="recharge.visible">

      <div class="recharge-header" slot="title">
        <div class="title">
          <label>{{$t('l.MailLabel')}}:</label>
          <span>{{recharge.mailtext}}</span>
        </div>
        <div class="expiration-tip">
          <span>
           {{
             $t('p.MailRechargeDialogExpirationTip',{expireDate:recharge.expirationText})
            }}
          </span>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div v-for="(it,idx) in recharge.items"
            :key="idx"  class="col-4"
            @click="selectedYear(it.y)"
            :class="(idx >=3) && Boolean(!recharge.moreshow) ? 'd-none': ''">
            <div class="clearfix recharge-year-box" :class=" it.y === recharge.chargeYears ? 'box-selected':''">
              <div class="inner-box">
                <div class="year-box-inline">
                  <span>{{$t(`l.RechargeY${it.y}`)}}</span>
                </div>
                <div class="year-box-inline">
                  <span class="bas-unit">{{it.bas}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="bas-inline-between">
            <div class="max-tip">
              {{$t('p.MailRechargeMaxYearsComments',{year:recharge.maxchargeYears})}}
            </div>
            <div @click="toggleMoreshow"
              class="more-toggle">
              <span>
                <div class="fa" :class="recharge.moreshow ? 'fa-chevron-up' : 'fa-chevron-down'"></div>
                {{$t('l.MoreChargeYears')}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-footer" slot="footer">
        <div class="container text-center">
          <el-button type="primary"
            :disabled="recharge.loading"
            @click="submitRechargeMail"
            class="w-25 bas-btn-primary">
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
.abandon-title {
  width: 100%;
  text-align: center;
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:28px;
  letter-spacing:1px;
}

.btn-abandon {
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  line-height:28px;
  font-size:20px;
  letter-spacing:1px;
}

.bas-dg-gray-tips {
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:20px;
}

.abandon-title span.mail-name {
  color:  #00CA9B ;
}
.recharge-header {
  border-bottom: 1px solid rgba(235,237,237,1);
  padding-bottom: .75rem;
}

.recharge-header div.title {
  font-size:22px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}

.recharge-header div.expiration-tip {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:25px;
}

.bas-inline-between div.more-toggle {
  cursor: pointer;
}

.bas-inline-between div.more-toggle:hover {
  color: rgba(4,6,46,.85);
}

.recharge-year-box {
  cursor: pointer;
  width: 100%;
  height:106px;
  display: inline-flexbox;
  direction: column;
  justify-content: center;
  align-items: center;
  background:rgba(245,246,246,1);
  border-radius:4px;
  border:1px solid rgba(243,245,245,1);
  padding: 1.5rem .25rem;
  margin: 9px auto;
}

.recharge-year-box>div.inner-box{
  width: 100%;
  text-align: center;
}

.recharge-year-box:hover {
  background:linear-gradient(270deg,rgba(0,231,185,1) 0%,rgba(0,202,155,1) 100%);
  color: rgba(255,255,255,1);
}

.box-selected {
  background:linear-gradient(270deg,rgba(0,231,185,1) 0%,rgba(0,202,155,1) 100%);
  color: rgba(255,255,255,1);
}

.recharge-year-box .year-disabled {
  color:rgba(150,150,166,1);
  background:rgba(255,255,255,1);
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
}
div.year-box-inline{
  width: 100%;
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  line-height:28px;
  letter-spacing:1px;
}

.box-selected div.year-box-inline{
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
  letter-spacing:1px;
}

span.bas-unit {
  font-size:36px;
  font-family:Lato-Bold,Lato;
  font-weight:bold;
  color:rgba(0,202,155,1);
  line-height:44px;
  letter-spacing:1px;
}

span.bas-unit::after {
  content: 'BAS';
  font-size: 14px;
}

.box-selected span.bas-unit,.box-selected span.bas-unit::after,.recharge-year-box:hover span.bas-unit {
  color:rgba(255,255,255,1);
}

</style>

<script>
import {
  dateFormat,compressAddr,hasExpired,
  maxRechageYears,wei2Bas
} from '@/utils'

import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
  MAIL_HASH_INVALID,ACCOUNT_NOT_MATCHED,LACK_OF_TOKEN
}from '@/web3-lib/api-errors'
import {approveTokenEmitter} from '@/web3-lib/apis/token-api'
import {
  abandonedMail,valid4Recharge,rechargeMail
} from '@/web3-lib/apis/mail-manager-api'


import LoadingDot from '@/components/LoadingDot.vue'
export default {
  name:"EWalletMailList",
  components:{
    LoadingDot
  },
  computed: {
    ...Vuex.mapState({
      items:state => state.ewallet.mails.filter(m => !m.abandoned),
      unitBas:state => wei2Bas(state.dapp.mailRegGas)
    }),
    itemTotal(){
      return this.items.length
    }
  },
  data() {
    return {
      confirm:{
        visible:false,
        loading:false,
        contents:'',
        title:'',
        hash:'',
        fulltext:'',
      },
      abandon:{
        visible:false,
        loading:false,
        hash:'',
        mailtext:'',
        owner:''
      },
      recharge:{
        visible:false,
        loading:false,
        expiration:0,
        expirationText:'',
        moreshow:false,
        chargeYears:0,
        maxchargeYears:0,
        state:'',//approving
        items:[],
        mailtext:'',
        mailhash:'',
        owner:''
      },
      transState:'',//approving
      yearItems:[
        {y:5,bas:10},{y:4,bas:8},{y:3,bas:6},{y:2,bas:4},{y:1,bas:2}
      ]
    }
  },
  methods: {
    domainMailFormat(row,column,cellVal){
      return `@${cellVal}`
    },
    expireFormat(row,column,cellVal){
      return cellVal ? dateFormat(cellVal) : ''
    },
    hashShort(row,column,cellVal){
      return compressAddr(cellVal)
    },
    mailtextShow(row,column,cellVal){
      const shortAlias = compressAddr(row.hash)
      return row.aliasName ? `${row.aliasName}` : `${shortAlias}`
    },
    gotoDetail(){

    },
    toggleMoreshow(){
      this.recharge.moreshow = !this.recharge.moreshow
    },
    hideRechargeDialog(){
      this.recharge = Object.assign({},this.recharge,{
        visible:false,
        loading:false,
        expiration:0,
        expirationText:'',
        chargeYears:0,
        maxchargeYears:0,
        mailtext:'',
        mailhash:'',
        owner:''
      })
    },
    recharge4Mail(index,row){
      if(!row.hash){
        console.error('no hash')
        return
      }
      const domaintext = row.domaintext
      const mailtext = row.aliasName ? row.aliasName : compressAddr(row.hash) ;
      const expirationTS = row.expiration
      const maxYear = row.canRechargeYear || maxRechageYears(row.expiration)
      const unitPrice = parseFloat(this.unitBas)

      this.recharge = Object.assign({},this.recharge,{
        visible:true,
        loading:false,
        expiration:row.expiration,
        expirationText:dateFormat(row.expiration),
        chargeYears:maxYear,
        maxchargeYears:maxYear,
        items:this.yearItems.filter( i => i.y<=maxYear).map(it =>{
          it.bas = parseFloat(it.y)*unitPrice
          return it
        }),
        mailtext:mailtext,
        mailhash:row.hash,
        owner:row.owner
      })
      //console.log(this.recharge)
    },
    selectedYear(year){
      if(this.recharge.loading)return
      this.recharge.chargeYears = year
    },
    cancelAbandonDialog(){
      this.abandon = Object({},{
        visible:false,
        loading:false,
        hash:'',
        mailtext:'',
        owner:''
      })
    },
    abandonMail(index,row){
      //console.log(row.hash)
      const mailtext = row.aliasName ? row.aliasName : compressAddr(row.hash) ;
      this.abandon = Object.assign({},{
        visible:true,
        loading:false,
        hash:row.hash,
        mailtext:mailtext,
        owner:row.owner
      })
    },
    async submitAbandon(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const owner = this.abandon.owner

      const fulltext = this.abandon.mailtext

      const hash = this.abandon.hash
      if(!hash){
        console.error('null hash')
        return
      }

      try{
        this.abandon.loading = true
        const ret = await abandonedMail(hash,chainId,wallet)
        console.log(ret)
        this.abandon = Object({},{
          visible:false,
          loading:false,
          hash:'',
          mailtext:'',
          owner:''
        })
        this.$store.dispatch('ewallet/updataMyMailProps',ret)
      }catch(ex){
        this.abandon.loading = false
        let msg = ''
        switch (ex) {
          case PARAM_ILLEGAL:
            console.error(ex)
            return;
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.ex`,{wallet,owner})
            this.$message(this.$basTip.error(msg))
            return
          case MAIL_HASH_INVALID:
            msg = this.$t(`code.${ex}`,{text:fulltext})
            this.$message(this.$basTip.error(msg))
            return;
          default:
            break;
        }
        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${USER_REJECTED_REQUEST}`)
          this.$message(this.$basTip.error(msg))
          return ;
        }
        console.error(ex)
      }
    },
    gotoUpdateMailInfo(index,row){
      console.log(row)
      //hash, fulltext
      const hash = row.hash
      const domaintext = row.domaintext

      if(hash && domaintext){
        this.$router.push({
          path:`/mail/detail/${hash}/${domaintext}`,
          name:'mail.detail',
          params:{
            hash:hash,
            domaintext
          }
        })
      }
    },
    reloadRecords(){
      const web3State = this.$store.getters['web3State']
      //console.log("reload","ewallet/loadEWalletMails",web3State)
      if(web3State.chainId && web3State.wallet){
        this.$store.dispatch('ewallet/loadEWalletMails',web3State)
      }
    },
    async submitRechargeMail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const owner = this.recharge.owner
      const web3State = this.$store.getters['web3State']
      const year = this.recharge.chargeYears
      const hash = this.recharge.mailhash
      const mailtext = this.recharge.mailtext

      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const that = this

      let errMsg = ''
      try{
        const validResp = await valid4Recharge(hash,year,chainId,wallet)
        console.log(validResp)

        approveTokenEmitter(validResp.spender,validResp.costwei,chainId,wallet).on(
          'transactionHash',txhash=>{
            that.recharge.loading = true
          }
        ).on('receipt',async (receipt)=>{
          console.log('receipt',receipt)
          const ret = await rechargeMail(hash,year,chainId,wallet)
          console.log(ret)
          that.$store.dispatch('ewallet/updateMailInfo',{hash:hash,chainId:chainId})
          that.recharge.loading = false
          that.hideRechargeDialog()
        }).on('error',(err,receipt)=>{
          that.recharge.loading = false
          if(err.code===USER_REJECTED_REQUEST){
            errMsg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(errMsg))
            return;
          }else{
            console.error('Approve error',err)
          }
        })

      }catch(ex){
        let msg = ''
        switch (ex) {
          case LACK_OF_TOKEN:
          case UNSUPPORT_NETWORK:
            msg = this.$t('code.${ex}')
            this.$message(this.$basTip(msg))
            return;
          case MAIL_HASH_INVALID:
            msg = this.$t('code.${ex}',{text:mailtext})
            this.$message(this.$basTip(msg))
            return;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t('code.${ex}',{wallet,owner:''})
            this.$message(this.$basTip(msg))
            return;
          default:
            console.error(ex)
            break;
        }

      }
    }
  },
  async beforeMount() {
    this.$store.dispatch('ewallet/fillEWalletMails')
  },
  async mounted() {
    const web3State = this.$store.getters['web3State']
    console.log("ewallet/loadEWalletMails",web3State)
    if(web3State.chainId && web3State.wallet){
      this.$store.dispatch('ewallet/loadEWalletMails',web3State)
    }
  },
}
</script>
<style>

</style>
