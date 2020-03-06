<template>
  <div>
    <el-row :gutter="20" class="bas-white-bg" >
      <el-col :span="24" class="bas-mine-table--header">
        <h5 style="margin-bottom:0rem;">域名资产</h5>
        <div>
          <!-- <el-button class="bas-btn-primary" size="medium" >
          转入
          </el-button> -->
          <el-button type="success">
          转入域名<i class="fa fa-qrcode bas-fa-qrcode"></i>
          </el-button>
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
          prop="date"
          label="到期日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          sortable
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
          :page-size="5"
          layout="prev, pager, next"
          :total="30">
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
export default {
  name:"MineDomainList",
  components:{
    LoadingDot,
  },
  data() {
    return {
      transoutVisible:false,
      transTo:'',
      transOutName:'',
      transOutMessage:'',
      transOutState:false,
      tableData: [
        {
          date: '2022-05-02',
          name: 'cbs.lanbery',
          type: '二级域名',
          hash:'0x4c5c429881eb7f0c95e2771f62899808a009496f2f24fdd95850ab92c204edbf'
        }, {
          date: '2021-05-04',
          name: 'expiredtest2',
          type: '顶级5字符内域名',
          hash:''
        }, {
          date: '2016-05-01',
          name: 'expiredtest1',
          type: '子域名',
          hash:'0x2e0f80ea0370143174416af8f2da0dadbe05a6c282e376dc9fa3d7d5145969d6'
        }, {
          date: '2028-05-03',
          name: 'lanbery',
          type: '顶级5字符内域名',
          hash:'0x00f69be5c125d6ec3023374357cb911088ab1a7e72b3f9d1eb5fc68dc3e1aa1a'
        }
      ]
    }
  },
  computed: {

  },
  methods:{
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
