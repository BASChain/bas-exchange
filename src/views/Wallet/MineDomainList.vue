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
          width="260">
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
          label="类型">
        </el-table-column>
        <el-table-column header-align="center"
          index=""
          align="right" label="操作">
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
              size="mini"
              type="success"
              @click="transOut(scope.$index, scope.row)">
              出售
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20" class="bas-white-bg">
        <el-pagination class="text-center"
          :page-size="getPageSize"
          :current-page="pager.pageNumber"
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
      close-on-click-modal="false"
      :before-close="cancelTransOut"
      :visible.sync="transoutVisible" >
        <div class="bas-transout-body">
          <div class="bas-inline-flex">
            <div class="bas-info-label bas-label-100">域名</div>
            <div class="bas-info-text">
              <h4>{{transOutName}}</h4>
            </div>
          </div>
          <div class="bas-inline-flex">
            <div class="bas-info-label bas-label-100" >接收地址</div>
            <el-input placeholder="Please input Address"
              :clearable="true"
              v-model="transTo"></el-input>
          </div>
        </div>
        <div class="dialog-footer" slot="footer">
          <span class="bas-dialog-footer--tips">
            <loading-dot v-if="transOutState" style="float:left;"/>
            <span v-if="transOutState" class="small pr-3">正在转出,请稍候...</span>
          </span>
          <el-button @click="cancelTransOut">{{$t('g.Cancel')}}</el-button>
          <el-button @click="transOutCommit">
            {{$t('g.Confirm')}}
          </el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import LoadingDot from '@/components/LoadingDot.vue'
import {isAddress,keccak256} from 'web3-utils'
import { transferDomainEmitter } from '@/bizlib/web3/asset-api'
import {dateFormat} from '@/utils'
import {currentWallet } from '@/bizlib/web3'
import {getDomainType} from '@/utils/domain-validator.js'

import WalletQrCode from '@/components/WalletQrCode.vue'
import WalletProxy from '@/proxies/WalletProxy.js'
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
      transOutMessage:'',
      transOutState:false,
      tableData: [

      ],
      pager:{
        pageNumber:1,
        pageSize:5,
        total:0
      }
    }
  },
  mounted() {
    this.reloadTable()
  },
  computed: {
    currentWallet(){
      return this.$store.state.web3.wallet ||''
    },
    getPageSize(){
      return this.pager.pageSize
    },
    getTotal(){
      return this.pager.total;
    }
  },
  methods:{
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
      //console.log(row,column,cellVal)
      let expireDate = dateFormat(cellVal)
      return expireDate
    },
    translateType(row){
      let domainType = getDomainType(row.name)
      return domainType
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
          console.log('>>>>>',resp)
          if(resp.state){
            let list = resp.data
            list.forEach(item=>{item.owner = wallet})
            //console.log(list)
            this.tableData = list
          }
        }
      ).catch(ex=>{
        console.log(ex)
      })
    },
    reloadTable(){
      const walletProxy = new WalletProxy();
      let wallet = currentWallet();
      walletProxy.getTotal(wallet).then(resp=>{
        console.log(resp)
        if(resp.state){
          this.pager.total = resp.data
        }
      }).catch(ex=>{
        console.log(ex)
      })

      walletProxy.getList({
        wallet,
        pageNumber:this.pager.pageNumber,
        pageSize:this.pager.pageSize
      }).then(
        resp =>{
          console.log('>>>>>',resp)
          if(resp.state){
            let list = resp.data
            list.forEach(item=>{item.owner = wallet})
            //console.log(list)
            this.tableData = list
          }
        }
      ).catch(ex=>{
        console.log(ex)
      })
    },
    transIn(){//转入

    },
    transOutHandler(index,row){
      this.transOutName = row.name;
      if(row.hash){

      }
      this.transoutVisible = true;
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
      console.log('>>>>>>>>>>>>>>>>>>',this.transTo)
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
      console.log(hash,to,wallet)
      //check wallet
      transferDomainEmitter(to,hash,wallet).on('transactionHash',(txhash)=>{
        this.transOutState = true;
      }).on('receipt',(receipt)=>{
        this.transOutState = false;
        this.transoutVisible = false;
      }).on('error',(error,receipt)=>{
        this.transOutState = false;
        if(error.code===4001){
          let errMsg = that.$t('g.MetaMaskRejectedAuth')
          that.$message(that.$basTip.error(errMsg))
        }
        console.log(error,receipt)
      })
    },
    takeOff(index,row){//下架

    },
    pushOn(index,row){//上架

    },
    goSetting(index,row){//去配置
      //console.log(row.name)
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        name:'domain.subsettings',
        params:{
          domain:row.name
        }
      })
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      row.name = row.name.trim().toLowerCase()
      this.$router.push({
        path:`/domain/detail/${row.name}`
      })
    }
  }
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
