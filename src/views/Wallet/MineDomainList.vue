<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24" class="bas-mine-table--header">
        <h5 style="margin-bottom:0rem;">
          <i class="fa fa-refresh" @click="reloadTable"
            style="font-size:14px;cursor:pointer"></i>
          域名资产
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
            <el-button slot="reference" type="success">
              转入BAS 或 ETH<i class="fa fa-qrcode bas-fa-qrcode"></i>
            </el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-table type="index"
        :data="tableData" @cell-click="gotoDetail"
        style="width: 100%">
        <el-table-column
          :class-name="'bas-link'"
          prop="name"
          index="domain"
          label="域名"
          :formatter="domainFormat"
         >
        </el-table-column>
        <el-table-column
          prop="expire"
          label="到期日期"
          :formatter="expireFormat"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          sortable
          :formatter="translateType"
           width="180"
          label="类型">
        </el-table-column>
        <el-table-column header-align="center"
          index="operate" width="380"
          align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="goSetting(scope.$index, scope.row)">
              去配置
            </el-button>

            <el-button
              size="mini"
              @click="transOutHandler(scope.$index, scope.row)">
              转出
            </el-button>
            <el-button
              :disabled="scope.row.isorder"
              size="mini"
              @click="saleOn(scope.$index, scope.row)">
              出售
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20" class="bas-white-bg">
        <el-pagination class="text-center"
          :page-size="getPageSize"
          :current-page="currentPageNumber"
          layout="prev, pager, next"
          :total="getTotal"
          @current-change="pageChange"
          @prev-click="prevChange"
          @next-click="nextChange"
          :hide-on-single-page="false">
        </el-pagination>
    </el-row>

    <el-dialog title="转出域名"
      width="35%"
      :close-on-click-modal="false"
      :before-close="cancelTransOut"
      :visible.sync="transoutVisible" >
        <div class="bas-transout-body">
          <div class="bas-inline-flex">
            <div class="bas-info-label bas-label-100">域名</div>
            <div class="bas-info-text">
              <h4>{{showTransoutName}}</h4>
            </div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label bas-label-100" >接收类型</div>
            <el-radio-group
              @change="ResetTransTo"
              v-model="transoutType">
              <el-radio :label="1">
                {{$t('g.ByAddress')}}
              </el-radio>
              <el-radio :label="2">
                {{$t('g.ByDomainName')}}
              </el-radio>
            </el-radio-group>
          </div>

          <div  class="bas-inline-flex">
            <div class="bas-info-label bas-label-100" >接收方</div>
            <el-input v-show="!showCBAddress"
              placeholder="Please input Address"
              :clearable="true"
              v-model="transTo"></el-input>

            <el-autocomplete  v-if="showCBAddress"
              class="bas-auto-wrap"
              :width="'100%'" type="text"
              v-model="transOutAlias"
              :fetch-suggestions="queryWallet"
              :maxlength="64"
              placeholder="Please enter a domain"
              @select="walletAliasSelect"
              :append="''"
              >
              <template slot-scope="{ item }">
                <div class="bas-wallet-select--wrap">
                  <div class="bas-suggest--item-name">
                    {{item.showname}}
                  </div>
                  <div class="bas-suggest--item-address">
                    {{item.walletaddress}}
                  </div>
                </div>
              </template>
              <button v-if="currentPageNumber"
                slot="suffix" class="bas-auto--suffix">
                {{ transTo }}
              </button>
            </el-autocomplete>
          </div>

        </div>
        <div class="dialog-footer" slot="footer">
          <span class="bas-dialog-footer--tips">
            <loading-dot v-if="transOutState" style="float:left;"/>
            <span v-if="transOutState" class="small pr-3">正在转出,请稍候...</span>
          </span>
          <el-button @click="cancelTransOut">{{$t('g.Cancel')}}</el-button>
          <el-button :disabled="transOutState"
           @click="transOutCommit">
            {{$t('g.Confirm')}}
          </el-button>
        </div>
    </el-dialog>

    <el-dialog :title="dialog.title"
      width="35%"
      :close-on-click-modal="false"
      :before-close="cancelDialog"
      :visible.sync="dialog.visible">
      <div class="bas-transout-body">
        <div class="bas-inline-flex">
          <div class="bas-info-label bas-label-100">域名</div>
          <div class="bas-info-text">
            <h4>{{dialog.name}}</h4>
          </div>
          <div class="bas-info-label bas-label-100" >价格</div>
          <el-input-number
            placeholder="Please input Price"
            :clearable="true"
            v-model="dialog.price"
            :precision="2" :step="1.0"
            controls-position="right"
            >
            </el-input-number>
            <!-- <span class="text-warning pl-1">
              最低{{dialog.minPrice}}BAS
              :min="dialog.minPrice"
            </span> -->
        </div>
      </div>
      <div class="dialog-footer" slot="footer">
        <span class="bas-dialog-footer--tips">
          <loading-dot v-if="dialog.loading" style="float:left;"/>
          <span v-if="dialog.loading" class="small pr-3">{{dialog.tip}}</span>
        </span>
        <el-button @click="cancelDialog">
          {{$t('g.Cancel')}}
        </el-button>
        <el-button :disabled="dialog.loading"
          @click="submitDialog">
          {{$t('g.Confirm')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
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
</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import {isAddress,keccak256} from 'web3-utils'

import {
  dateFormat,hasExpired,isOwner,
  toUnicodeDomain,etherToWeiStr,transBAS2Wei,
} from '@/utils'
import {currentWallet,getWeb3State } from '@/bizlib/web3'

import {
  ownerShipInstance,
  transferDomainEmitter,
} from '@/bizlib/web3/ownership-api.js'
import {marketInstance} from '@/bizlib/web3/market-api'
import {getDomainType} from '@/utils/Validator.js'

import ContractManager from '@/bizlib/abi-manager/index'
import WalletQrCode from '@/components/WalletQrCode.vue'
import WalletProxy from '@/proxies/WalletProxy.js'
import DomainProxy from '@/proxies/DomainProxy.js'


export default {
  name:"MineDomainList",
  components:{
    LoadingDot,
    WalletQrCode,
  },
  data() {
    return {
      transoutVisible:false,
      transTo:'',
      transOutName:'',
      transOutHash:'',
      transOutMessage:'',
      transOutState:false,
      transoutType:1,//1 address ,2 domain
      transoutOwner:'',
      transOutAlias:'',
      tableData: [

      ],
      pager:{
        pageNumber:1,
        pageSize:18,
        total:0
      },
      dialog:{
        type:1,//出售
        title:'出售',
        name:'',
        hash:'',
        visible:false,
        price:4,
        minPrice:4,
        loading:false,
        tip:'正在提交...'
      },
      ruleState:{
        subGas:4,
        rareGas:500,
        topGas:20
      }
    }
  },
  mounted() {
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign(this.ruleState,ruleState)
    this.reloadTable()
  },
  computed: {
    currentWallet(){
      return this.$store.state.web3.wallet ||''
    },
    showCBAddress(){
      if(this.transoutType == 1)return false;
      return true;
    },
    transPlaceholder(){
      return this.transoutType == 1 ? 'Please enter address' : 'Please enter a base string'
    },
    getPageSize(){
      return this.pager.pageSize
    },
    getTotal(){
      return this.pager.total;
    },
    currentPageNumber(){
      return this.pager.pageNumber
    },
    showWalletSuffix(){
      return (this.transoutType == 2 && !!this.transTo)
    },
    showTransoutName(){
      return toUnicodeDomain(this.transOutName)
    }
  },
  methods:{
    dialogUndo(){

    },
    pageChange(val){
      console.log("newPage",val)
      this.pageTrigger(val)
    },
    prevChange(val){
      this.pageTrigger(val)
    },
    nextChange(val){
      this.pageTrigger(val)
    },

    expireFormat(row,column,cellVal){
      let expireDate = dateFormat(cellVal)
      return expireDate
    },
    domainFormat(row,column,cellVal){
      let domain = toUnicodeDomain(cellVal)
      return domain
    },
    translateType(row){
      let domainType = getDomainType(row.name)
      return this.$t(`g.${domainType}`)
    },
    pageTrigger(currentPage){
      const walletProxy = new WalletProxy();
      let wallet = currentWallet();
      walletProxy.getList({
        wallet,
        pageNumber:currentPage,
        pageSize:this.pager.pageSize
      }).then(
        resp =>{
          console.log(currentPage,'>>>>>',resp)
          if(resp.state){
            let list = resp.data
            list.forEach(item=>{item.owner = wallet})
            //console.log(list)
            this.tableData = list
          }else{
            this.tableData= []
          }
        }
      ).catch(ex=>{
        console.log(ex)
      })
    },
    reloadTable(){
      //const walletProxy = new WalletProxy();
      const proxy = new DomainProxy();
      let wallet = currentWallet();
      this.pager.pageNumber = 1;

      proxy.getDomainTotal(wallet).then(resp=>{
        console.log(resp)
        if(resp.state){
          this.pager.total = resp.data
        }else{
          this.pager.total = 0;
        }
      }).catch(ex=>{
        console.log(ex)
      })

      proxy.getDomainList({
        wallet,
        pageNumber:this.pager.pageNumber,
        pageSize:this.pager.pageSize
      }).then(
        resp =>{
          //console.log('>>>>>',resp)
          if(resp.state){
            let list = resp.data
            list.forEach(item=>{item.owner = wallet})
            //console.log(list)
            this.tableData = list
          }else{
            this.tableData= []
          }
        }
      ).catch(ex=>{
        console.log(ex)
      })
    },
    transOutHandler(index,row){
      this.transOutName = row.name;
      this.transOutHash = row.hash
      if(hasExpired(row.expire)){
        let err = `当前域名已过期不能转出.`
        this.$message(this.$basTip.error(err))
        return;
      }
      this.transoutVisible = true;
    },
    walletAliasSelect(it){
      if(it){
        this.transOutAlias = it.showname
        this.transTo = it.walletaddress
      }else{
        this.transOutAlias = ''
        this.transTo = ''
      }
    },
    ResetTransTo(){
      this.transTo = ''
    },
    queryWallet(text,cb){
      let list = []
      //this.fecthSuggesttList()
      const proxy = new DomainProxy()
      let wallet = currentWallet();
      let params = {
        text
      }
      if(wallet){
        params.wallet = wallet
      }
      proxy.getWalletSuggest(params).then(resp=>{
        if(resp.state){
          list = resp.domainhashpair
          list.map(item=>{
            item.showname = toUnicodeDomain(item.domainname)
            return item
          })
          cb(list)
        }else{
          cb([])
        }
      }).catch(ex=>{
        console.log(ex)
        cb(list)
      })
    },
    fecthSuggesttList(tx){
      return [
      ]
    },
    cancelTransOut(){
      this.transOutName = ''
      this.transTo = ''
      this.transoutVisible = false
    },
    async transOutCommit(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(this.transOutState){
        return
      }
      //console.log('>>>>>>>>>>>>>>>>>>',this.transTo)
      let err = ''
      let to = this.transTo;
      let name = this.transOutName;
      let hash = keccak256(name);
      if(!isAddress(to)){
        err = `接收地址不正确:${to}`
        this.$message(this.$basTip.error(err))
        return;
      }
      let dappState = this.$store.getters['web3/dappState']
      let wallet = dappState.wallet;
      if(isOwner(to,wallet)){
        err = `不能转给自己:${to}`
        this.$message(this.$basTip.error(err))
        return;
      }
      let that = this;
      //check wallet
      let web3State = getWeb3State()
      console.log(hash,to,wallet)
      transferDomainEmitter(to,hash,web3State.chainId,wallet).on('transactionHash',(txhash)=>{
        this.transOutState = true;
      }).on('receipt',(receipt)=>{
        this.transOutState = false;
        this.transoutVisible = false;
        this.reloadTable()
      }).on('error',(error,receipt)=>{
        this.transOutState = false;
        if(error.code===4001){
          let errMsg = that.$t('g.MetaMaskRejectedAuth')
          this.$message(that.$basTip.error(errMsg))
        }
        console.log(error,receipt)
      })
    },
    saleOn(row,column,cellVal){
      const item = column
      console.log(row,item)
      let errMsg = ""

      if(hasExpired(item.expire)){
        errMsg = `${item.name} 已过期`
        this.$message(this.$basTip.warn(errMsg))
        return;
      }
      if(!item.hash){
        console.log('no hash')
        return;
      }
      let nameText = toUnicodeDomain(item.name)
      let domainType = getDomainType(nameText)
      let min = 4
      if(domainType === 'raretop'){
        min = this.ruleState.rareGas
      }else if(domainType === 'commontop') {
        min = this.ruleState.topGas
      }else if(domainType === 'subdomain'){
        min = this.ruleState.subGas
      }

      let diaState = {
        type:1,
        title:'出售',
        loading:false,
        name:nameText,
        hash:item.hash,
        visible:true,
        price:min,
        minPrice:min,
      }
      this.dialog = Object.assign(this.dialog,diaState)
      console.log(this.dialog)
    },
    cancelDialog(){
      let diaState = {
        type:1,
        title:'出售',
        loading:false,
        name:'',
        hash:'',
        visible:false,
        price:4,
        minPrice:4,
      }
      this.dialog = Object.assign({},diaState)
    },
    submitDialog(){
      const type = this.dialog.type;
      switch (type) {
        case 1:
          this.submitOnSale()
          break;

        default:
          break;
      }
    },
    submitOnSale(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      let decimals = this.ruleState.decimals ||18;
      const data = this.dialog;
      if(!data.hash || !data.price){
        console.error('param error')
        return
      }
      let web3State = getWeb3State()
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const inst = marketInstance(chainId,wallet)
      const osInst = ownerShipInstance(chainId,wallet)

      this.dialog.loading = true;
      let priceWei = transBAS2Wei(data.price)
      let errMsg = ''
      const BasMarketOpts = ContractManager.BasMarket(chainId)
      const approveAddress = BasMarketOpts.address; //inst._address;
      console.log('Approve Params>>>>>',approveAddress,data,priceWei+'')
      let that = this
      //0x4b91b82bed39B1d946C9E3BC12ba09C2F22fd3ee
      osInst.methods.approve(data.hash,approveAddress).send({from:wallet}).then(resp =>{
        console.log('Approve complete...')
        inst.methods.AddToSells(data.hash,priceWei+'').send({from:wallet}).then(resp=>{
          that.dialog.visible =false
          that.dialog.loading = false
          that.reloadTable()
        }).catch(ex=>{
          if(ex.code === 4001){
            errMsg = '您取消了授权'
            that.$message(this.$basTip.warn(errMsg))
          }
          that.cancelDialog()
        })
      }).catch(ex=>{
        if(ex.code === 4001){
          errMsg = '您取消了授权'
          this.$message(this.$basTip.warn(errMsg))
        }
        this.cancelDialog()
      })
      console.log(data.hash,priceWei+'')


    },
    async changeSellData(inst,hash,priceWei,wallet){

    },
    goSetting(index,row){//去配置
      //console.log(row.name)
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      if(hasExpired(row.expire)){
        let err = `当前域名已过期不能操作.`
        this.$message(this.$basTip.error(err))
        return;
      }

      let domain = row.name
      //this.$router.push({path:`/domain/settings/${domain}`})
      this.$router.push({path:`/domain/dnsupdate/${domain}`})
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      row.name = row.name.trim().toLowerCase()
      this.$router.push({
        path:`/domain/detail/${row.name}`
      })
    }
  },
watch: {
  transOutAlias(val,old){
    // console.log(val,'----',old)
    if(!val && old){
      this.transTo = ''
    }
  }
},
}
</script>
<style>
.bas-fa-qrcode {
  margin: auto .5rem;
  font-size:18px;
}

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
.bas-mine--domain-pagination {
  text-align: center;
}

.bas-btn-primary:active {
  background-color:rgba(0,202,155,1) !important;
}

.bas-transout-body .bas-inline-flex {
  margin: .5rem auto;
  align-items: center;
}


</style>
