<template>
  <div>
    <el-table type="index"
      v-loading="tableLoading"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        :class-name="'bas-link'"
        prop="name"
        index="domain"
        :label="$t('l.Domain')"
        :formatter="domainFormat"
        >
      </el-table-column>
      <el-table-column
        prop="expire"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="type"
        :formatter="translateType"
          width="180"
        :label="$t('l.DomainType')">
      </el-table-column> -->
      <el-table-column header-align="center"
        index="operate" width="380"
        align="center" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'primary'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>

          <el-dropdown>
            <el-button size="mini" type="default" >
              {{$t('l.MoreOperation')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hasExpired"
                @click.native="goSetting(scope.$index,scope.row)">
                {{$t('l.Configuration')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handleShowTransout(scope.$index,scope.row)"
                :disabled="scope.row.hasExpired || scope.row.isorder">
                {{$t('l.TransOut')}}
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.rechargeYears <= 0"
                @click.native="handleShowRechage(scope.$index,scope.row)"
                >
                {{$t('l.Recharge')}}
              </el-dropdown-item>
              <!-- <el-dropdown-item
                @click.native="goRegistSub(scope.$index,scope.row)"
                :disabled="scope.row.hasExpired">
                {{$t('l.RegistSubDomain')}}
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-row :gutter="20" class="bas-white-bg">
      <el-pagination class="text-center"
        :page-size="pager.pagesize"
        :current-page="pager.pagenumber"
        layout="prev, pager, next"
        :total="pager.total"
        @current-change="pageChange"
        @prev-click="prevChange"
        @next-click="nextChange"
        :hide-on-single-page="false">
      </el-pagination>
      <div class="float-table-total">
        <span >
          {{$t('l.TableTotal')}} {{pager.total}} {{$t('l.TableRecord')}}
        </span>
        <span @click="refreshTableList">
          <i class="fa fa-refresh"></i>
        </span>
      </div>
    </el-row>

    <!-- dialog transout -->
    <el-dialog :title="transoutDialogTitle" width="35%"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="cancelTransOut"
      :visible.sync="transDialog.visible">
      <div>
        <div class="bas-inline-flex ">
          <div class="bas-info-label bas-label-100">
            {{$t('l.Domain')}}
          </div>
          <div class="bas-info-text">
            <h4>{{transoutDomaintext}}</h4>
          </div>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100"> {{$t('l.TransToAlias')}}</div>
            <el-input
            @change="aliasChanged"
            placeholder="Please input domain"
            :disabled="transDialog.transoutState"
            :clearable="true"
            v-model="transDialog.alias"></el-input>
        </div>
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100"> {{$t('l.TransToAddress')}}</div>
          <el-input
            v-loading="transDialog.loading"
            :disabled="transDialog.transoutState"
            placeholder="Please input Address"
            :clearable="true"
            v-model="transDialog.transTo">
          </el-input>
        </div>
      </div>

      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="transDialog.transoutState" style="float:left;"/>
          <span v-if="transDialog.transoutState" class="small pr-3">
            {{$t('p.WalletHomeTransoutDialogStateTip')}}
          </span>
        </span>
        <el-button :disabled="transDialog.transoutState"
         @click="cancelTransOut">{{$t('g.Cancel')}}</el-button>
        <el-button :disabled="transDialog.transoutState"
          @click="transOutCommit">
          {{$t('g.Confirm')}}
        </el-button>
      </div>
    </el-dialog>

    <!-- saleon -->
    <el-dialog :title="saleOnDialogTitle" width="35%"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="cancelSaleOn"
      :visible.sync="saleDialog.visible">
      <div class="bas-eldialog-body">
        <el-form :inline="true" label-width="80">
          <el-form-item :label="$t('l.PriceBas')">
              <el-input-number
                placeholder="Please input Price"
                :clearable="true"
                v-model="saleDialog.priceBas"
                :precision="2" :step="1.0"
                controls-position="right"
                :max="ctrl.maxprice"
                :min="ctrl.minprice"
                :disabled="saleDialog.inprogress"
                >
              </el-input-number>
              <span class="bas-unit">BAS</span>
              <span class="bas-text-warning">
                {{$t('p.WalletDomainSalePriceTips')}} {{maxpriceText}} BAS
              </span>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="saleDialog.inprogress" style="float:left;"/>
          <span v-if="saleDialog.inprogress" class="small pr-3">{{$t('p.WalletSaleOnInprogressTip')}}</span>
        </span>
        <el-button :disabled="saleDialog.inprogress" @click="cancelSaleOn">
          {{$t('g.Cancel')}}
        </el-button>
        <el-button :disabled="saleDialog.inprogress"
          @click="commitSaleOn">
          {{$t('g.Confirm')}}
        </el-button>
      </div>
    </el-dialog>

    <!-- Rechage -->
    <el-dialog  width="60%"
      :close-on-click-modal="false"
      :show-close="!rechargeDialog.inprogress"
      :before-close="cancelRechage"
      :visible.sync="rechargeDialog.visible">
      <div class="rechage-title" slot="title">
        <div class="rechage-label-title">
          <span>{{$t('l.Domain')}} {{rechargeDialog.domaintext}}</span>
        </div>
        <div class="rechage-label-expiration">
          <span>
            {{rechargeDialogExpireDate}} {{$t('l.ExpirationRechargeSuffix')}}
          </span>
        </div>
      </div>
      <div class="bas-eldialog-body">
        <div class="container">
          <div
            v-if="rechargeDialog.maxYears > 0"
            class="row justify-content-start align-items-center">
            <div v-for="(item,idx) in rechargeBox"
              :key="idx"
              class="col-4 pt-3"
              :class=" !rechargeDialog.moreState && idx > 2 ? 'd-none' : ''"
              >
              <div @click="selectRechargeYears(item.id)"
                class="rechage-year-box"
                :class="rechargeDialog.years === item.id ? 'active' : ''">
                <div class="block text">
                  <span>
                    {{$t(`${item.i18n}`)}}
                  </span>
                </div>
                <div class="block">
                  <span class="bas-number">
                    {{item.total}}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div v-if="rechargeDialog.maxYears > 0" class="row">
            <div class="col-12 pt-2 rechage-tip-toolabr">
              <div class="block">
                <span class="max-tip">
                  {{$t('l.MaxRechargePrefix')}}
                  {{rechargeDialog.maxYears}}
                  {{$t('l.Years')}}
                </span>
              </div>
              <div class="block more-toggle" @click="toggleMore">
                <span>
                  <i class="fa"
                  :class="rechargeDialog.moreState ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                  {{$t('l.MoreChargeYears')}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer dialog-footer-recharge" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="rechargeDialog.inprogress" style="float:left;"/>
        </span>

        <el-button :disabled="rechargeDialog.inprogress" type="primary"
          class="bas-btn-primary"
          @click="confirmRechage">
          {{$t('l.ConfirmRechargeBtn')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>

import LoadingDot from '@/components/LoadingDot.vue'

import DomainProxy from '@/proxies/DomainProxy.js'
import { getWeb3State } from '@/bizlib/web3'

import {
  handleDomain,toUnicodeDomain,dateFormat,
  isOwner,hasExpired,numThousandsFormat,
  transBAS2Wei,maxRechageYears,
} from '@/utils'
import {
  getDomainType,isTop
} from '@/utils/Validator.js'

import {
  ownerShipInstance,
  transferDomainEmitter,
} from '@/bizlib/web3/ownership-api.js'
import {marketInstance} from '@/bizlib/web3/market-api'
import ContractManager from '@/bizlib/abi-manager/index'
import { checkBalance,tokenInstance } from '@/bizlib/web3/token-api.js'
import { oannInstance,rechargeDomain } from '@/bizlib/web3/oann-api.js'

export default {
  name:"RWalletootTableList",
  components:{
    LoadingDot,
  },
  computed: {
    transoutDialogTitle(){
      return this.$t('p.WalletHomeTransoutDialogTitle')
    },
    transoutDomaintext(){
      if(!this.transDialog.name)return ''
      return toUnicodeDomain(this.transDialog.name)
    },
    saleOnDialogTitle(){
      const name = this.saleDialog.name
      const text = name ? toUnicodeDomain(name) : ''
      const prefix = this.$t('p.WalletSaleOnDialogTitlePrefix')

      return `${prefix}[${text}]`
    },
    maxpriceText(){
      return numThousandsFormat(this.ctrl.maxprice)
    },
    rechargeDialogExpireDate(){
      if(!this.rechargeDialog.expire) return ''
      return dateFormat(this.rechargeDialog.expire)
    },
    rechargeBox(){
      let max = this.rechargeDialog.maxYears
      if(max<=0)return []
      const unitPrice = this.rechargeDialog.unitBas
      let items = []
      for(var i=max;i>0;i--){
        items.push(
          {
            id:i,
            total:unitPrice*i,
            i18n:`l.RechargeY${i}`
          }
        )
      }
      return items
    }
  },
  data() {
    return {
      pager:{
        pagenumber:1,
        pagesize:50,
        total:0
      },
      items:[],
      ctrl:{
        itemsloading:false,
        minprice:0.00,
        maxprice:100000000,
      },
      transDialog:{
        loading:false,
        transoutState:false,
        visible:false,
        name:'',
        hash:'',
        transToAlias:'',
        transTo:'',
      },
      saleDialog:{
        loading:false,
        inprogress:false,
        visible:false,
        name:'',
        hash:'',
        priceBas:'',
      },
      rechargeDialog:{
        loading:false,
        visible:false,
        inprogress:false,
        name:'',
        domaintext:'',
        hash:'',
        expire:0,
        unitBas:0,
        years:0,
        maxYears:0,
        moreState:false
      },
      ruleState:{
        subGas:4,
        rareGas:500,
        topGas:20
      }
    }
  },
  methods: {
    domainFormat(row,column,cellVal){
      let domain = toUnicodeDomain(cellVal)
      return domain
    },
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    translateType(row){
      let domainType = getDomainType(row.name)
      return this.$t(`g.${domainType}`)
    },
    reloadTable(val){
      const web3State = getWeb3State()
      const wallet = web3State.wallet
      if(!wallet){
        this.$metamask()
        return;
      }

      const proxy = new DomainProxy();

      this.ctrl.itemsloading = true

      const params = {
        wallet,
        pageNumber:val||this.pager.pagenumber,
        pageSize:this.pager.pagesize,
        domaintype:2
      }

      proxy.getDomainList(params).then(resp=>{
        if(resp.state){
          let list = resp.data||[]
          this.pager.total = resp.totalcnt||0
          list.forEach(item => {
            item.owner = wallet
            item.hasExpired = hasExpired(item.expire)
            item.rechargeYears = maxRechageYears(item.expire)

            return item
          })
          this.items = list
          console.log(list)
          this.pager.pagenumber = val
        }else{
          this.items = []
          this.pager.total = 0
        }
        this.ctrl.itemsloading = false
      }).catch(ex=>{
        this.ctrl.itemsloading = false
      })
    },
    pageChange(val){
      this.pageTrigger(val)
    },
    prevChange(val){
      this.pageTrigger(val)
    },
    nextChange(val){
      this.pageTrigger(val)
    },
    pageTrigger(val){
      this.reloadTable(val)
    },
    refreshTableList(){
      const current = this.pager.pagenumber
      this.reloadTable(current)
    },
    //tranout begin
    cancelTransOut(){
      const tmpState = {
        loading:false,
        visible:false,
        transoutState:false,
        name:'',
        hash:'',
        transToAlias:'',
        transTo:'',
      }
      this.transDialog = Object.assign({},tmpState)
    },
    handleShowTransout(index, row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(hasExpired(row.expire)){
        this.$message(this.$basTip.error(this.$t('p.WalletDomainTransoutExpiredTip')))
        return;
      }
      const tmpState = {
        loading:false,
        transoutState:false,
        visible:true,
        name:row.name,
        hash:row.hash,
        transToAlias:'',
        transTo:'',
      }
      this.transDialog = Object.assign(this.transDialog,tmpState)
    },
    async transOutCommit(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(this.transOutState){
        return
      }

      const web3State = getWeb3State()
      const wallet = web3State.wallet
      let err = ''
      const to = this.transDialog.transTo
      const name = this.transDialog.name
      const hash = this.transDialog.hash

      if(!Web3.utils.isAddress(to)){
        const prefixErr = this.$t('p.WalletTransOutAddressFormatErr')
        err = `${prefixErr}:${to}`
        this.$message(this.$basTip.error(err))
        return;
      }

      if(isOwner(to,wallet)){
        const ownerErr = this.$t('p.WalletTransOutAddressSelfErr')
        err = `${ownerErr}:${to}`
        this.$message(this.$basTip.error(err))
        return;
      }
      console.log(hash,to,wallet,isOwner(to,wallet))
      const pagenumber = this.pager.pagenumber
      transferDomainEmitter(to,hash,web3State.chainId,wallet).on('transactionHash',(txhash)=>{
        this.transDialog.transoutState = true;
      }).on('receipt',(receipt)=>{
        this.transDialog.transoutState = false;
        this.transDialog.visible = false;
        let that = this;
        setTimeout(() => {
          that.reloadTable(pagenumber)
        }, 3000);

      }).on('error',(error,receipt)=>{
        this.transDialog.transoutState = false;
        if(error.code===4001){
          let errMsg = that.$t('g.MetaMaskRejectedAuth')
          this.$message(that.$basTip.error(errMsg))
        }
        console.log(error,receipt)
      })
    },

    aliasChanged(val){//transout alias
      this.transDialog.transTo = ''
      if(val){
        const proxy = new DomainProxy()
        const text = handleDomain(val)
        const web3State = getWeb3State()

        this.transDialog.loading = true
        proxy.getDomainInfo(text).then(data=>{
          if(data.state){
            data = proxy.transData(data)
            console.log('Serve API:',data)
            if(data.dns && data.dns.bcaddr
              && !isOwner(web3State.wallet,data.dns.bcaddr)){
                this.transDialog.transTo = data.dns.bcaddr
            }
          }
          this.transDialog.loading = false
        }).catch(ex=>{
          console.log(ex)
          this.transDialog.loading = false
        })
      }

    },

    //Sale On begin
    cancelSaleOn(){
      const tmpState = {
        loading:false,
        inprogress:false,
        visible:false,
        name:'',
        hash:'',
        priceBas:this.ruleState.subGas||4.00,
      }
      this.saleDialog = Object({},tmpState)
    },
    handleShowSaleOn(index,row){
      if(!row.name || !row.hash){
        console.err('no name or hash parameter.')
        return
      }
      if(hasExpired(row.expire)){
        this.$message(this.$basTip.error(this.$t('p.WalletDomainSaleOnExpiredTip')))
        return;
      }
      const domainType = getDomainType(row.name)
      let priceBas = 4.0
      if(domainType === 'raretop'){
        priceBas = this.ruleState.rareGas
      }else if(domainType === 'commontop') {
        priceBas = this.ruleState.topGas
      }else if(domainType === 'subdomain'){
        priceBas = this.ruleState.subGas
      }
      const tmpState = {
        loading:false,
        inprogress:false,
        visible:true,
        name:row.name,
        hash:row.hash,
        priceBas:priceBas
      }
      this.saleDialog = Object.assign({},tmpState)
    },
    commitSaleOn(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let decimals = this.ruleState.decimals ||18;

      const data = this.saleDialog;
      if(data.priceBas <=0.00 || parseFloat(data.priceBas - this.ctrl.maxprice) > 0){
        this.$message(this.$basTip.error(
          `你输入的价格必须大于${this.ctrl.minprice},并且小于${this.ctrl.maxprice}`
        ))
        return
      }
      let web3State = getWeb3State()
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const inst = marketInstance(chainId,wallet)
      const osInst = ownerShipInstance(chainId,wallet)

      let priceWei = transBAS2Wei(data.priceBas)
      let errMsg = ''
      const BasMarketOpts = ContractManager.BasMarket(chainId)
      const approveAddress = BasMarketOpts.address; //inst._address;
      console.log('Approve Params>>>>>',approveAddress,data,priceWei+'')
      const pagenumber = this.pager.pagenumber
      let that = this
      that.saleDialog.inprogress = true
      osInst.methods.approve(data.hash,approveAddress).send({from:wallet}).then(resp =>{
        console.log('Approve complete...')
        inst.methods.AddToSells(data.hash,priceWei+'').send({from:wallet}).then(resp=>{
          that.saleDialog.visible =false
          that.saleDialog.inprogress = false
          that.cancelSaleOn()
          that.reloadTable(pagenumber)
        }).catch(ex=>{
          if(ex.code === 4001){
            that.$message(this.$basTip.warn(this.$t('code.4001')))
          }
          that.saleDialog.inprogress = false
        })
      }).catch(ex=>{
        if(ex.code === 4001){
          that.$message(this.$basTip.warn(this.$t('code.4001')))
        }
        that.saleDialog.inprogress = false
      })
    },
    //rechange
    handleShowRechage(index,row){
      const unitBas = row.regsubdomainprice ? row.regsubdomainprice/(10**18) : this.ruleState.subGas
      const tmp = {
        loading:false,
        visible:true,
        inprogress:false,
        name:row.name,
        domaintext:toUnicodeDomain(row.name),
        hash:row.hash,
        owner:row.owner,
        expire:row.expire,
        unitBas,
        years:row.rechargeYears,
        maxYears:row.rechargeYears,
        moreState:false
      }
      this.rechargeDialog = Object.assign({},tmp)
    },
    cancelRechage(){
      const tmp = {
        loading:false,
        visible:false,
        inprogress:false,
        name:'',
        domaintext:'',
        hash:'',
        owner:"",
        expire:'',
        unitBas:4,
        years:0,
        maxYears:0,
        moreState:false
      }
      this.rechargeDialog = Object.assign({},tmp)
    },
    async confirmRechage(){
      const data = this.rechargeDialog;
      console.log(data)

      const years = data.years
      if(!years){
        this.$message(this.$basTip.error(this.$t('p.RechargeDomainYearIllegal')))
        return;
      }
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let decimals = this.ruleState.decimals ||18

      let web3State = getWeb3State()
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const approveAddress = ContractManager.BasOANN(chainId).address
      const hash = data.hash

      if(!approveAddress || data.name === undefined || data.name === ''){
        console.error('Params Illegal: NO OANN address at chainId '+ chainId+',')
        return;
      }

      if(!isOwner(data.owner,wallet)){
        this.$message(this.$basTip.error(this.$t('code.80001')))
        return;
      }

      const token = tokenInstance(chainId,wallet)

      let that = this;
      let unitBas = data.unitBas
      const approveWei = transBAS2Wei(years * unitBas)
      const name = data.name
      console.log('approve before>>> :',approveAddress,data.name,years,approveWei)
      try{
        that.rechargeDialog.inprogress = true
        await checkBalance(chainId,wallet,years * unitBas)

        token.methods.approve(approveAddress,approveWei+'').send({from:wallet}).then(resp=>{
          //commit recharge
          console.log('approve>>> complete:',approveAddress,data.name,years)
          rechargeDomain(name,years,chainId,wallet).then(res=>{
            that.rechargeDialog.inprogress = false
            that.reloadTable(1)
            resetDialog();
          }).catch(ex=>{
            that.rechargeDialog.inprogress = false
            innerErrorPop(ex)
          })
        }).catch(ex=>{
          that.rechargeDialog.inprogress = false
          innerErrorPop(ex)
        })
      }catch(ex){
        this.$message(this.$basTip.error(this.$t(`code.${ex}`)))
        return;
      }


      function innerErrorPop(ex){
        console.log(ex)
        if(ex.code == 4001){
          that.$message(that.$basTip.error(that.$t('code.4001')))
        }
      }

      function resetDialog(){
        const tmp = {
          loading:false,
          visible:false,
          inprogress:false,
          name:'',
          domaintext:'',
          hash:'',
          owner:"",
          expire:0,
          unitBas:0,
          years:0,
          maxYears:0,
          moreState:false
        }
        that.rechargeDialog = Object.assign({},tmp)
      }
    },
    selectRechargeYears(y){
      if(!this.rechargeDialog.inprogress){
        this.rechargeDialog.years = y
      }
    },
    toggleMore(){
      this.rechargeDialog.moreState = !this.rechargeDialog.moreState
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      let name = toUnicodeDomain(row.name)
      this.$router.push({
        path:`/domain/detail/${name}`
      })
    },
    goSetting(index, row) {
      //console.log(row)
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let domain = row.name
      this.$router.push({path:`/domain/dnsupdate/${domain}`})
    },
    goRegistSub(index, row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      const domain = row.name
      if(isTop(domain)){
        const toptext = toUnicodeDomain(domain)
        this.$router.push({
          path:`/domain/applysub/${toptext}`,
        })
      }else{
        this.$message(this.$basTip.error(`您选择的是子域名${domain}`))
        return
      }
    }
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign(this.ruleState,ruleState)
    this.reloadTable(1)
  },
}
</script>
<style>
.rechage-year-box {
  cursor: pointer;
  display: inline-block;
  width:100%;
  height:106px;
  direction: column;
  justify-content: center;
  align-items: center;
  color:rgba(4,6,46,1);
  background:rgba(245,246,246,1);
  border-radius:4px;
  border:1px solid rgba(243,245,245,1);
  /* transition: ease-in .4s,transform .2s; */
}
.rechage-tip-toolabr {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: .5rem .75rem;
}
.rechage-year-box:focus ,.rechage-year-box:hover,.rechage-year-box.active {
  color:rgba(255,255,255,1);
  background:linear-gradient(270deg,rgba(0,231,185,1) 0%,rgba(0,202,155,1) 100%);
  border:1px solid rgba(243,245,245,1);
}

.rechage-year-box > div.block{
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: center;
  align-items: center;
}

.rechage-year-box .text span {
  margin-top: 1.25rem;
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  line-height:28px;
  letter-spacing:1px;
}

.rechage-year-box span.bas-number {
  font-size:36px;
  font-family:Lato-Bold,Lato;
  font-weight:bold;
  color:rgba(0,202,155,1);
  line-height:44px;
  letter-spacing:1px;
}

.rechage-year-box span.bas-number::after {
  content: 'BAS';
  font-size:14px;
  font-family:Lato-Regular,Lato;
  font-weight:400;
  line-height:17px;
}
.rechage-year-box:focus span.bas-number,.rechage-year-box:hover span.bas-number,.rechage-year-box.active span.bas-number {
  color:rgba(255,255,255,1);
}


.rechage-title {
  border-bottom: 1px solid rgba(235,237,237,1);
}
.rechage-label-title span {
  font-size:22px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
}
.more-toggle {
  cursor: pointer;
}
.rechage-label-expiration {
  margin-bottom: .5rem;
}

.dialog-footer-recharge {
  text-align: center;
}

.bas-btn-primary.el-button--success.is-disabled:hover {
  background-color: rgba(255,255,255,.3);
  color:#C0C4CC;
}
</style>
