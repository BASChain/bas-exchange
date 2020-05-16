<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane :label="OnSaleTabName" name="selling">
            <el-table type="index"
              v-loading="pager.loading"
              @cell-click="gotoDetail"
              :show-header="true"
              :data="sellItems"
              style="width: 100%">
              <el-table-column
                :class-name="'bas-link'"
                prop="domaintext"
                index="domain"
                :label="$t('l.Domain')"
               >
              </el-table-column>
              <el-table-column
                align="center"
                prop="ordertime"
                :sortable="true"
                :formatter="timeFormat"
                :label="$t('l.OnSaleDate')"
                width="180">
              </el-table-column>
              <!-- <el-table-column
                align="center"
                prop="expireDate"
                :label="$t('l.ExpiredDate')"
                width="180">
              </el-table-column>               -->
              <el-table-column
                 width="140"
                prop="priceVol"
                :sortable="false"
                :label="$t('l.PriceBas')+'(BAS)'">
              </el-table-column>
              <el-table-column header-align="center"  width="220"
                align="center" :label="$t('l.Operating')">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEditPrice(scope.$index, scope.row)">
                    {{$t('l.ChangePrice')}}
                  </el-button>
                  <el-button
                    size="mini"
                    @click="handleRevokeSale(scope.$index, scope.row)">
                    {{$t('l.Revoke')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row :gutter="20" class="bas-white-bg">
              <el-col :md="24" :sm="24">
                <el-pagination class="text-center"
                  :page-size="pager.pagesize"
                  :current-page="pager.pagenumber"
                  layout="prev, pager, next"
                  :total="sellTotal"
                  @current-change="pagerChange"
                  @prev-click="prevChange"
                  @next-click="nextChange"
                  :hide-on-single-page="false">
                </el-pagination>
              </el-col>
              <div class="float-table-total">
                <span >
                  {{$t('l.TableTotal')}} {{pager.total}} {{$t('l.TableRecord')}}
                </span>
                <span @click="reloadSellItems">
                  <i class="fa fa-refresh"></i>
                </span>
              </div>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>


    </el-row>

    <!-- revokeSale -->
    <el-dialog
      :title="$t('p.RevokeDialogTitle')"
      :visible.sync="revokeVisible"
      width="30%"
      :before-close="dialogBeforClose"
      :close-on-click-modal="false"
      :show-close="false">
      <h6 class="text-center">{{revokeTips}}</h6>

      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="revokeDialog.loading" style="float:left;"/>
          <span v-if="revokeDialog.loading" class="small pr-3">{{$t('p.RevokeDialogExcutingTip')}}</span>
        </span>
        <el-button :disabled="revokeDialog.loading" @click="cancelRevoke">
          {{$t('g.Cancel')}}
        </el-button>
        <el-button :disabled="revokeDialog.loading"
          @click="confirmRevoke">
          {{$t('g.Confirm')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="`域名改价:[${cpd.domaintext}]`"
      :visible.sync="cpd.visible"
      width="35%"
      :before-close="cancelChangePrice"
      :close-on-click-modal="false"
      :show-close="false">
      <div class="bas-eldialog-body">
        <el-form :inline="true">
          <el-form-item prop="price"
            :error="cpd.error"
            :show-message="!cpd.validState"
            :label="$t('l.PriceBas')"
            class="basunit-number--wrapper">
            <el-input-number
              placeholder="Please input Price"
              :clearable="true"
              v-model="cpd.pricevol"
              name="price"
              :precision="2" :step="1.0"

              :min="ctrl.minprice"
              :max="ctrl.maxprice"
              :disabled="cpd.loading"
              @change="priceChangeValid"
              :controls="false"
              class="bas-unit-number"
              >
            </el-input-number>
            <span class="bas-unit">BAS</span>
            <span class="bas-text-warning">
              {{$t('l.DomainPriceMaxTips')}}
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="cpd.loading" style="float:left;"/>
          <span v-if="cpd.loading" class="small pr-3">
            {{$t('g.TransactionWaitTips')}}
          </span>
        </span>
        <el-button :disabled="cpd.loading" @click="cancelChangePrice">
          {{$t('g.Cancel')}}
        </el-button>
        <el-button :disabled="cpd.loading"
          @click="submitChangeDomainPrice">
          {{$t('g.Confirm')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.pager-refresh {
  width: 100%;
  height: 100%;
  display: inline-flex;
  direction: row;
  justify-content: flex-end;
  align-items: center;
}
.pager-refresh a {
  cursor: pointer;
  text-decoration: none;
}
.pager-refresh a:focus,.pager-refresh a:hover {
  color: #409EFF;
}
.pager-refresh * {
  line-height: 28px;
  font-weight: 500;
  font-size:13px;
}


</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'

import SellingTable from './trans/SellingTable'
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float,
  transBAS2Wei,
} from '@/utils'
import {getWeb3State} from '@/bizlib/web3'
import {marketInstance,
removeSellOrderEmitter,
changeOnSellPriceEmitter,
} from '@/bizlib/web3/market-api'

import {MarketProxy} from '@/proxies/MarketProxy.js'
export default {
  name:"UserInTransaction",
  components:{
    LoadingDot,
    SellingTable,
  },
  computed: {
    OnSaleTabName(){
      return this.$t('l.Selling')
    },
    revokeVisible(){
      return this.revokeDialog.visible
    },
    revokeTips(){
      const isCN = this.$store.state.lang === 'zh-CN'
      return isCN ? `您确定要撤回域名[${this.revokeDialog.domaintext}]` :`Are you sure you want to remove [${this.revokeDialog.domaintext}]`
    }
  },
  data(){
    return {
      activeTab:'selling',
      sellTotal:0,
      sellItems:[],
      allItems:[],
      pager:{
        pagenumber:1,
        pagesize:200,
        total:0,
        loading:false,
      },
      revokeDialog:{
        loading:false,
        visible:false,
        domaintext:'',
        hash:''
      },
      cpd:{
        loading:false,
        visible:false,
        hash:'',
        domaintext:'',
        pricevol:'',
        validState:true,
        error:''
      },
      validRules:{
        price:[

        ]
      },
      ctrl:{
        minprice:0.00,
        maxprice:100000000,
      },
      ruleState:{
        decimals:18
      }
    }
  },

  methods: {
    timeFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    priceChangeValid(val,old){
      console.log(val,parseFloat(val)<=0.00,parseFloat(val - this.ctrl.maxprice) >0.00)
      const isCN = this.$store.state.lang === 'zh-CN'
      if(val ===''|| parseFloat(val)<=0.00 || parseFloat(val - this.ctrl.maxprice) >0.00){
        this.cpd.validState = false;
        this.cpd.error = isCN ? '请设置[0~100,000,000]区间价格' : `Pricing must be between 0 and 100,000,000`
      }else{
        this.cpd.validState = true;
        this.cpd.error = ''
      }
    },
    handleTabClick(tab,event){
      console.log(tab, event);
    },
    getCurrentPage(tab){

    },
    gotoDetail(row, column, cell){
      console.log(row)
      if(!row.domaintext || column.index !=='domain')return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      //row.domaintext = row.domaintext.trim().toLowerCase()
      this.$router.push({
        path:`/domain/detail/${row.domaintext}`
      })
    },
    dialogBeforClose(){
      //阻止Mask
    },
    handleRevokeSale(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let web3State = getWeb3State()
      let wallet = web3State.wallet

      if(isOwner(row.owner,web3State.wallet)){
        this.revokeDialog = Object.assign(this.revokeDialog,{
          loading:false,
          visible:true,
          domaintext:row.domaintext,
          hash:row.hash
        })
        console.log(this.revokeDialog)
      }else{
        let msg = `当前操作域名${row.domaintext} 不在登录账户 [${wallet}]下,请刷新页面确认.`
        this.$message(this.$basTip.error(msg))
        return
      }
    },

    cancelRevoke(){
      this.revokeDialog = Object.assign(this.revokeDialog,{
        loading:false,
        visible:false,
        domaintext:'',
        hash:''
      })
    },
    confirmRevoke(){
      let web3State = getWeb3State()
      const wallet = web3State.wallet
      const chainId = web3State.chainId
      const hash = this.revokeDialog.hash;
      console.log(hash,chainId,wallet)

      removeSellOrderEmitter(hash,chainId,wallet).on('transactionHash',txhash=>{
        this.revokeDialog.loading = true
      }).on('receipt',(receipt)=>{
        this.revokeDialog = Object.assign(this.revokeDialog,{
          loading:false,
          visible:false,
          domaintext:'',
          hash:''
        })
        this.$message(this.$basTip.warn(this.$t('g.OperateTipSuccess')))
        this.loadSellItems({pagenumber:1,pagesize:100})
      }).on('err',(err,receipt) =>{
          console.log(err)
          let errMsg = that.$t('g.MetaMaskRejectedAuth')
          if(err.code === 4001){
            that.$message(that.$basTip.error(errMsg))
          }else if(err.code === -32601 && err.message){
            that.$message(that.$basTip.error(err.message))
          }else{
            errMsg = this.$t('g.OperateTipFail')
            that.$message(that.$basTip.error(err.message))
          }
          this.revokeDialog = Object.assign(this.revokeDialog,{
            loading:false,
            visible:false,
            domaintext:'',
            hash:''
          })
      })

    },
    handleEditPrice(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let web3State = getWeb3State()
      let wallet = web3State.wallet

      if(isOwner(row.owner,wallet)){
        this.cpd = Object.assign({
          loading:false,
          visible:true,
          domaintext:row.domaintext,
          hash:row.hash,
          pricevol:row.priceVol
        })
      }else{
        let msg = `当前操作域名${row.domaintext} 不在登录账户 [${wallet}]下,请刷新页面确认.`
        this.$message(this.$basTip.error(msg))
        return
      }
    },
    cancelChangePrice(){
      this.cpd = Object.assign({
        loading:false,
        visible:false,
        domaintext:'',
        hash:'',
        pricevol:0
      })
    },
    submitChangeDomainPrice(){
      //改价
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      if(!this.cpd.validState){
        this.$message(this.$basTip.error(`你输入的价格必须大于${this.ctrl.minprice},并且小于${this.ctrl.maxprice}`))
        return;
      }
      let web3State = getWeb3State()
      let chainId = web3State.chainId;
      let wallet = web3State.wallet
      let hash = this.cpd.hash;

      if(hash){
        const strWei = transBAS2Wei(this.cpd.pricevol);
        changeOnSellPriceEmitter(hash,strWei,chainId,wallet).on('transactionHash',txhash=>{
          this.cpd.loading = true;
        }).on('receipt',(receipt)=>{
          this.$message(this.$basTip.warn(this.$t('g.OperateTipSuccess')))
          this.loadSellItems({pagenumber:1,pagesize:100})
          this.cpd = Object.assign({
            loading:false,
            visible:false,
            domaintext:'',
            hash:'',
            pricevol:0
          })
        }).on('err',(err,receipt) =>{
          this.cpd.loading = false;
          this.$message(this.$basTip.error(this.$t('g.OperateTipFail')))
        })
      }else{
        throw new Error('lost hash')
      }
    },
    reloadSellItems(){
      const params = {
        pagenumber:this.pager.pagenumber,
        pagesize:this.pager.pagesize
      }
      this.loadSellItems(params)
    },
    pagerChange(val){
      this.pageTrigger(val)
    },
    prevChange(val){
      this.pageTrigger(val)
    },
    nextChange(val){
      this.pageTrigger(val)
    },
    pageTrigger(val){
      const params = {
        pagenumber:val,
        pagesize:this.pager.pagesize
      }
      this.loadSellItems(params)
    },
    loadSellItems({pagenumber=1,pagesize=10}) {
      let web3State = getWeb3State()
      let wallet = web3State.wallet;
      if(!wallet){
        this.$metamask({name:"wallet.transaction"})
        return
      }
      let decimals = this.ruleState.decimals;
      const market = new MarketProxy()
      this.pager.loading = true;
      market.getSellingDomains({
        pagenumber,
        pagesize,
        wallet
      }).then(resp=>{
        if(resp.state){
          this.sellTotal = resp.totalpage
          this.pager.pagenumber = resp.pagenumber || pagenumber
          this.pager.pagesize = pagesize
          this.pager.total=resp.totalpage

          let list =resp.domains.map(item=>{
            item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
            item.shortAddress = compressAddr(item.owner)
            item.priceVol = wei2Float(item.price,decimals)
            item.domaintext = toUnicodeDomain(item.domain)
            return item
          })
          //console.log(list)
          this.sellItems = Object.assign(list)
        }else{
          this.pager.total=0
        }
        this.pager.loading = false;
      }).catch(ex=>{
        console.log(ex)
        this.pager.loading = false;
      })
    }
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    const params = {
      pagenumber:this.pager.pagenumber||1,
      pagesize:this.pager.pagesize||100,
    }
    //this.loadSellItems(params)
  },
}
</script>
<style>

</style>
