<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="售卖中" name="selling">
            <el-table type="index"
              height="550px"
              @cell-click="gotoDetail"
              :show-header="true"
              :data="sellItems"
              style="width: 100%">
              <el-table-column
                :class-name="'bas-link'"
                prop="domaintext"
                index="domain"
                label="域名"
               >
              </el-table-column>
              <el-table-column
                align="center"
                prop="expireDate"
                label="到期日期"
                width="180">
              </el-table-column>
              <el-table-column
                 width="100"
                prop="priceVol"
                sortable
                label="价格">
              </el-table-column>
              <el-table-column header-align="center"  width="150"
                align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEditPrice(scope.$index, scope.row)">
                    改价
                  </el-button>
                  <el-button
                    size="mini"
                    @click="handleRevokeSale(scope.$index, scope.row)">
                    撤回
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row :gutter="20" class="bas-white-bg">
                <el-pagination class="text-center"
                  :page-size="pagination.pagesize"
                  :current-page="pagination.pagenumber"
                  layout="prev, pager, next"
                  :total="sellTotal"
                  @current-change="pageChange"
                  @prev-click="prevChange"
                  @next-click="nextChange"
                  :hide-on-single-page="false">
                </el-pagination>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>


    </el-row>

    <!-- revokeSale -->
    <el-dialog
      title="撤回在出售域名"
      :visible.sync="revokeVisible"
      width="30%"
      :before-close="dialogBeforClose"
      :close-on-click-modal="false"
      :show-close="false">
      <h6 class="text-center">{{revokeTips}}</h6>

      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="revokeDialog.loading" style="float:left;"/>
          <span v-if="revokeDialog.loading" class="small pr-3">正在撤回,请稍候...</span>
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
          <el-form-item label="价格">
            <el-input-number
              placeholder="Please input Price"
              :clearable="true"
              v-model="cpd.pricevol"
              :precision="2" :step="1.0"
              controls-position="right"
              :min="0.00"
              :max="maxPrice"
              :disabled="cpd.loading"
              >
            </el-input-number>
            <span class="bas-text-warning">
              最大可设置为100,000,000
            </span>
          </el-form-item>
        </el-form>
            <!-- <span class="text-warning pl-1">
              最低{{dialog.minPrice}}BAS
              :min="dialog.minPrice"
            </span> -->

      </div>
      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="cpd.loading" style="float:left;"/>
          <span v-if="cpd.loading" class="small pr-3">正在提交,请稍候...</span>
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
  data(){
    return {
      activeTab:'selling',
      sellTotal:0,
      sellItems:[],
      allItems:[],
      pagination:{
        pagenumber:1,
        pagesize:200,
        total:100,
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
        pricevol:''
      },
      maxPrice:10000000,
      ruleState:{
        decimals:18
      }
    }
  },
  computed: {
    revokeVisible(){
      return this.revokeDialog.visible
    },
    revokeTips(){
      return `您确定要撤回域名[${this.revokeDialog.domaintext}]`
    }
  },
  methods: {
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
      if(parseFloat(this.cpd.pricevol) <= 0.0) {
        this.$message(this.$basTip.error('你输入的价格必须大于0'))
        return ;
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

    loadSellItems({pagenumber=1,pagesize=10}) {
      let web3State = getWeb3State()
      let wallet = web3State.wallet;
      let decimals = this.ruleState.decimals;
      const market = new MarketProxy()
      market.getSellingDomains({
        pagenumber,
        pagesize,
        wallet
      }).then(resp=>{
        if(resp.state){
          this.sellTotal = resp.totalpage
          this.pagination.pagenumber = pagenumber
          this.pagination.pagesize = pagesize

          let list =resp.domains.map(item=>{
            item.expireDate = item.expiretime ? dateFormat(item.expiretime,TS_DATEFORMAT) : ''
            item.shortAddress = compressAddr(item.owner)
            item.priceVol = wei2Float(item.price,decimals)
            item.domaintext = toUnicodeDomain(item.domain)
            return item
          })
          console.log(list)

          this.sellItems = Object.assign(list)
        }
      }).catch(ex=>{
        console.log(ex)
      })
    }
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    const params = {
      pagenumber:this.pagination.pagenumber||1,
      pagesize:this.pagination.pagesize||100,
    }
    this.loadSellItems(params)
  },
}
</script>
<style>
.bas-eldialog-body {
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
